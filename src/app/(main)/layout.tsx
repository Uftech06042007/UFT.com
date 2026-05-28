import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SectionObserver } from "@/components/section-observer";
import { ButtonPersistence } from "@/components/button-persistence";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <SectionObserver />
      <ButtonPersistence />
      {children}
      <Footer />
    </>
  );
}
