import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-4">
        <Hero />
      </main>

      <SocialLinks variant="split" />
    </div>
  );
}
