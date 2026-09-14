import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/about-section";
import { SpacesGrid } from "@/components/spaces-grid";
import { ScheduleTable } from "@/components/schedule-table";
import { CtaContact } from "@/components/cta-contact";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function Home() {
  return (
    <div id="topo" className="flex flex-1 flex-col bg-protur-cream">
      <SiteHeader />

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2400&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2400&auto=format&fit=crop"
        title="Um dia para cuidar de você"
        date="19 e 20 de setembro"
        scrollToExpand="Role para expandir"
      >
        <p className="mx-auto max-w-2xl text-center text-lg text-protur-green/70">
          Turismo de bem-estar levado até dentro da sua empresa: movimento,
          respiração, saúde e conteúdo educacional em um único dia.
        </p>
      </ScrollExpandMedia>

      <AboutSection />
      <SpacesGrid />
      <ScheduleTable />
      <CtaContact />
      <SiteFooter />
    </div>
  );
}
