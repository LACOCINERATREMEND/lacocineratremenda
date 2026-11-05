import { HomeHero } from "@/components/home-hero";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeHero />
      <SiteFooter compact />
    </div>
  );
}
