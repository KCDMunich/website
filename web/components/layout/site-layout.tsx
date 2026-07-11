import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { siteState } from '@/lib/site-state';

type SiteLayoutProps = {
  children: React.ReactNode;
  homepage?: boolean;
};

export function SiteLayout({ children, homepage = false }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        homepage={homepage}
        navigation={siteState.navigation}
        sponsorship={siteState.sponsorship}
        ticketing={siteState.ticketing}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter navigation={siteState.navigation} />
    </div>
  );
}
