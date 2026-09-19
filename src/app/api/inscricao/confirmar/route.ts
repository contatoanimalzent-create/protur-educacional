import { NextResponse } from "next/server";
import { Resend } from "resend";
import QRCode from "qrcode";

export async function POST(request: Request) {
  // Criado aqui (e nao no topo do modulo) para o build nao exigir a chave.
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const nome = String(body.nome_completo ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!nome || !email) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  const codigo = `PROTUR-${Date.now().toString(36).toUpperCase()}`;
  const qrPayload = JSON.stringify({ codigo, nome, email, evento: "19-20 SET" });
  // Gmail bloqueia data: URI em <img>, entao o QR vai como anexo inline (cid).
  const qrPng = await QRCode.toBuffer(qrPayload, {
    margin: 1,
    width: 320,
    color: { dark: "#0C2A4D", light: "#FFFFFF" },
  });

  const primeiroNome = nome.split(" ")[0];

  const html = `
  <div style="background:#f5f9fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e1eef6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-bottom:1px solid #e1eef6;">
        <tr>
          <td style="padding:28px 32px;text-align:center;">
            <img src="https://protureducacional.com/brand/logo.png" alt="Protur Educacional" width="160" style="display:block;margin:0 auto;" />
          </td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c2a4d;">
        <tr>
          <td style="padding:36px 32px;text-align:center;">
            <p style="color:#3fae49;font-size:12px;font-weight:bold;letter-spacing:0.2em;margin:0 0 10px;">PROTUR EDUCACIONAL</p>
            <p style="color:#ffffff;font-size:26px;font-weight:900;line-height:1.25;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;">
              UM DIA PARA<br />CUIDAR DE VOCÊ.
            </p>
            <p style="color:#7fd6e6;font-size:13px;font-weight:bold;letter-spacing:0.1em;margin:0;">
              19 E 20 DE SETEMBRO &nbsp;·&nbsp; CAIS DO LAGO
            </p>
          </td>
        </tr>
      </table>
      <div style="padding:32px;">
        <p style="color:#12849c;font-size:12px;font-weight:bold;letter-spacing:0.1em;margin:0 0 8px;">INSCRIÇÃO CONFIRMADA</p>
        <h1 style="color:#0c2a4d;font-size:24px;line-height:1.3;margin:0 0 16px;">Prontinho, ${primeiroNome}!</h1>
        <p style="color:#334155;font-size:15px;line-height:1.6;margin:0 0 24px;">
          Sua vaga no dia de bem-estar da Protur Educacional está garantida.
          Guarde este e-mail: o código abaixo é a sua confirmação.
        </p>
        <div style="text-align:center;margin-bottom:24px;">
          <img src="cid:qrcode-inscricao" alt="QR code da inscrição" width="200" height="200" style="border-radius:12px;" />
          <p style="color:#94a3b8;font-size:12px;margin:12px 0 0;">${codigo}</p>
        </div>
        <p style="color:#334155;font-size:14px;line-height:1.6;margin:0;">
          Qualquer dúvida, é só mandar mensagem no Instagram
          <a href="https://www.instagram.com/protureducacional/" style="color:#12849c;">@protureducacional</a>.
        </p>
      </div>
      <div style="background:#e1eef6;padding:20px 32px;text-align:center;">
        <p style="color:#4d6478;font-size:12px;margin:0;">Protur Educacional. Turismo de bem-estar aberto ao público.</p>
      </div>
    </div>
  </div>`;

  try {
    const { error } = await resend.emails.send({
      from: "Protur Educacional <contatopulse@animalzgroup.com>",
      to: email,
      subject: "Inscrição confirmada: Protur Educacional",
      html,
      attachments: [
        {
          filename: "qrcode-inscricao.png",
          content: qrPng,
          contentId: "qrcode-inscricao",
        },
      ],
    });
    if (error) throw error;
    return NextResponse.json({ ok: true, codigo });
  } catch (error) {
    console.error("Falha ao enviar e-mail de confirmação", error);
    return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 502 });
  }
}
