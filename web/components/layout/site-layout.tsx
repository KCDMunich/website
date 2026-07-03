import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteLayoutProps = {
  children: React.ReactNode;
  homepage?: boolean;
};

export function SiteLayout({ children, homepage = false }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader homepage={homepage} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}