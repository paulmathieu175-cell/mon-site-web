import TLink from "@/components/ui/TLink";

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[100svh] flex-col items-center justify-center text-center">
      <p className="font-jp text-6xl text-champagne">夜</p>
      <h1 className="display mt-6 text-6xl sm:text-8xl">Perdu dans la nuit</h1>
      <p className="mt-4 text-ivoire/60">Cette page n&apos;existe pas, ou plus.</p>
      <TLink href="/" className="label mt-10 border-b border-champagne/50 pb-2 text-champagne">
        Retour à l&apos;accueil
      </TLink>
    </section>
  );
}
