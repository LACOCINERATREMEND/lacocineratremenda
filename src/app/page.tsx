import { HomeHero } from "@/components/home-hero";
import { VisitBeacon } from "@/components/visit-beacon";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col pb-12">
      <VisitBeacon page="inicio" />
      <HomeHero />
    </div>
  );
}
