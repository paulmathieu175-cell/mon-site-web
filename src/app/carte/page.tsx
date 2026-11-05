import type { Metadata } from "next";
import Carte from "@/components/Carte";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "La carte",
  description: "La carte de YAKA : crus et sushis, robata au binchotan, plats signatures, douceurs et cocktails. Restaurant & bar à Paris.",
  alternates: { canonical: "carte/" },
};

export default function CartePage() {
  return (
    <>
      <Carte />
      <Footer />
    </>
  );
}
