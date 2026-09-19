import { NextResponse } from "next/server";

// Inscricao = ingresso da Pulse. O RPC grava a inscricao, cria pedido + digital_ticket
// (QR valido no check-in da Pulse) e a Edge Function protur-ticket-email dispara o
// e-mail padrao da Pulse com o QR.
export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_PULSE_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_PULSE_SUPABASE_ANON_KEY;
  const eventId = process.env.NEXT_PUBLIC_PULSE_EVENT_ID;
  const apiSecret = process.env.PROTUR_API_SECRET;

  if (!supabaseUrl || !anonKey || !eventId || !apiSecret) {
    return NextResponse.json({ error: "Configuração ausente." }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const campo = (k: string) => String(body[k] ?? "").trim();
  const nome = campo("nome_completo");
  const email = campo("email");
  const telefone = campo("telefone");
  const endereco = campo("endereco");

  if (!nome || !email || !telefone || !endereco) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  const base = supabaseUrl.replace(/\/$/, "");

  const rpc = await fetch(`${base}/rest/v1/rpc/claim_protur_ticket_public`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_api_secret: apiSecret,
      p_event_id: eventId,
      p_nome_completo: nome,
      p_email: email,
      p_telefone: telefone,
      p_endereco: endereco,
    }),
  });

  const ingresso = await rpc.json().catch(() => null);
  if (!rpc.ok || !ingresso?.ok) {
    console.error("Falha ao emitir ingresso na Pulse", rpc.status, ingresso);
    return NextResponse.json({ error: "Não foi possível concluir a inscrição." }, { status: 502 });
  }

  // Reenvio do mesmo formulario nao dispara e-mail de novo.
  if (!ingresso.already) {
    try {
      const envio = await fetch(`${base}/functions/v1/protur-ticket-email`, {
        method: "POST",
        headers: {
          apikey: anonKey,
          "x-protur-secret": apiSecret,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: ingresso.order_id,
          recipientEmail: email.toLowerCase(),
        }),
      });
      if (!envio.ok) console.error("Falha no e-mail da Pulse", envio.status, await envio.text());
    } catch (error) {
      // O ingresso ja existe; falha de e-mail nao derruba a inscricao.
      console.error("Falha no e-mail da Pulse", error);
    }
  }

  return NextResponse.json({ ok: true, ticket_number: ingresso.ticket_number });
}
