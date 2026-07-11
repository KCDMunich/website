'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MenuIcon, Ticket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DISCORD_URL, MENUS, type MenuItem } from '@/lib/constants';
import { EVENT_CONFIG } from '@/lib/event-config';
import type { SitePresentation } from '@/lib/site-presentation';
import { cn } from '@/lib/utils';

import { DiscordIcon } from './icons';
import { SiteLogo } from './site-logo';

type SiteHeaderProps = {
  homepage?: boolean;
  navigation: SitePresentation['navigation'];
  sponsorship: SitePresentation['sponsorship'];
  ticketing: SitePresentation['ticketing'];
};

function getMenuHref(item: MenuItem): string {
  return item.to || (item.homeTo ? item.homeTo : '/');
}

function getMenuLabel(item: MenuItem, navigation: SitePresentation['navigation']): string {
  if (item.text === 'Schedule') return navigation.scheduleLabel;
  if (item.text === 'Speakers') return navigation.speakersLabel;
  return item.text;
}

function getVisibleMenuItems(
  items: MenuItem[],
  navigation: SitePresentation['navigation']
): MenuItem[] {
  return items.filter((item) => {
    if (item.text === 'Schedule') return navigation.showSchedule;
    if (item.text === 'Speakers') return navigation.showSpeakers;
    return true;
  });
}

function DesktopNav({
  lightText,
  navigation,
}: {
  lightText: boolean;
  navigation: SitePresentation['navigation'];
}) {
  const linkClass = cn(
    'cursor-pointer text-[15px] font-semibold transition-colors',
    lightText ? 'text-white/90 hover:text-[#0bbbef]' : 'text-primary hover:text-primary/70'
  );
  const shellClass = (activeLightText: boolean) =>
    cn(
      'rounded-lg !bg-transparent px-2.5 py-1.5 focus:!bg-transparent',
      activeLightText
        ? 'text-white/90 hover:!bg-white/10 hover:text-[#0bbbef] focus-visible:ring-white/25 data-open:text-[#0bbbef]'
        : 'text-primary hover:!bg-primary/5 hover:text-primary/70 focus-visible:ring-primary/25 data-active:font-bold'
    );

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {getVisibleMenuItems(MENUS.header, navigation).map((item) => (
          <NavigationMenuItem key={item.text}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(shellClass(lightText), 'text-[15px] font-semibold')}
                >
                  {getMenuLabel(item, navigation)}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid min-w-[8rem] gap-1 p-1">
                    {item.children.map((child) => (
                      <li key={child.text}>
                        <NavigationMenuLink
                          href={child.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer font-semibold text-primary hover:bg-primary/5 hover:text-primary/80"
                        >
                          {child.text}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                className={shellClass(lightText)}
                render={<Link href={getMenuHref(item)} className={linkClass} />}
              >
                {getMenuLabel(item, navigation)}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({
  lightText,
  navigation,
  open,
  onOpenChange,
  sponsorship,
  ticketing,
}: {
  lightText: boolean;
  navigation: SitePresentation['navigation'];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sponsorship: SitePresentation['sponsorship'];
  ticketing: SitePresentation['ticketing'];
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'lg:hidden',
              lightText && 'text-white hover:bg-white/10 hover:text-white'
            )}
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent fullScreen className="bg-background">
        <SheetHeader className="flex-row items-center justify-between border-b border-border/60 px-5 py-4">
          <Link href="/" className="cursor-pointer" onClick={() => onOpenChange(false)}>
            <SiteLogo variant="default" />
          </Link>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col px-5 py-6">
          <div className="flex flex-1 flex-col gap-1">
            {getVisibleMenuItems(MENUS.mobile, navigation).map((item) => {
              if (item.children) {
                const isExpanded = expandedItem === item.text;

                return (
                  <div key={item.text} className="border-b border-border/60">
                    <button
                      type="button"
                      className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-2xl font-semibold text-primary"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedItem(isExpanded ? null : item.text)}
                    >
                      {getMenuLabel(item, navigation)}
                      <span
                        className={cn('text-base transition-transform', isExpanded && 'rotate-180')}
                      >
                        ▾
                      </span>
                    </button>
                    {isExpanded ? (
                      <ul className="mb-3 space-y-2 pl-1">
                        {item.children.map((child) => (
                          <li key={child.text}>
                            <a
                              href={child.to}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block cursor-pointer py-2 text-lg font-medium text-primary/80 hover:text-primary"
                              onClick={() => onOpenChange(false)}
                            >
                              {child.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.text}
                  href={getMenuHref(item)}
                  className="cursor-pointer border-b border-border/60 py-4 text-2xl font-semibold text-primary hover:text-primary/80"
                  onClick={() => onOpenChange(false)}
                >
                  {getMenuLabel(item, navigation)}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto space-y-3 pt-8">
            {ticketing.mode === 'open' ? (
              <Button
                size="lg"
                className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
                nativeButton={false}
                render={
                  <a
                    href={EVENT_CONFIG.featured.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                onClick={() => onOpenChange(false)}
              >
                <Ticket className="size-4" />
                Get tickets
              </Button>
            ) : null}
            {ticketing.mode === 'sold-out' ? (
              <Button size="lg" className="h-12 w-full" disabled>
                Tickets sold out
              </Button>
            ) : null}
            {sponsorship.isRecruiting ? (
              <Button
                size="lg"
                className="h-12 w-full bg-[#0bbbef] text-base font-semibold text-primary hover:bg-[#35c8f2]"
                nativeButton={false}
                render={<Link href="/#sponsors" />}
                onClick={() => onOpenChange(false)}
              >
                Become a {EVENT_CONFIG.next.edition} sponsor
              </Button>
            ) : null}
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full text-base font-semibold"
              onClick={() => {
                window.open(DISCORD_URL, '_blank', 'noopener,noreferrer');
                onOpenChange(false);
              }}
            >
              Join Discord
              <DiscordIcon className="size-4" />
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader({
  homepage = false,
  navigation,
  sponsorship,
  ticketing,
}: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${header.getBoundingClientRect().height}px`
      );
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [homepage, scrolled, mobileOpen]);

  const onHero = homepage && !scrolled;
  const lightText = onHero;

  return (
    <header
      ref={headerRef}
      data-site-header=""
      className={cn(
        'z-50 w-full transition-all duration-300',
        homepage
          ? cn(
              'fixed inset-x-0 top-0',
              scrolled
                ? 'border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-xl'
                : 'bg-linear-to-b from-black/50 via-black/20 to-transparent backdrop-blur-[2px]'
            )
          : 'sticky top-0 border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-50 shrink-0 cursor-pointer">
          <SiteLogo variant={onHero ? 'hero' : 'default'} />
        </Link>

        <DesktopNav lightText={lightText} navigation={navigation} />

        <div className="flex items-center gap-2">
          {ticketing.mode === 'open' ? (
            <Button
              size="sm"
              variant={onHero ? 'outline' : 'default'}
              className={cn(
                'hidden font-semibold sm:inline-flex',
                onHero
                  ? 'border-white/80 bg-transparent text-white hover:bg-white/10 hover:text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
              nativeButton={false}
              render={
                <a
                  href={EVENT_CONFIG.featured.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Ticket className="size-4" />
              Tickets
            </Button>
          ) : null}
          {ticketing.mode === 'sold-out' ? (
            <Button
              size="sm"
              variant={onHero ? 'outline' : 'default'}
              className={cn(
                'hidden font-semibold sm:inline-flex',
                onHero
                  ? 'border-white/50 bg-transparent text-white'
                  : 'bg-primary text-primary-foreground'
              )}
              disabled
            >
              Sold out
            </Button>
          ) : null}
          {sponsorship.isRecruiting ? (
            <Button
              size="sm"
              className={cn(
                'hidden font-semibold sm:inline-flex',
                onHero
                  ? 'bg-[#0bbbef] text-primary hover:bg-[#35c8f2]'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
              nativeButton={false}
              render={<Link href="/#sponsors" />}
            >
              Sponsor {EVENT_CONFIG.next.edition}
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'hidden lg:inline-flex',
              lightText
                ? 'text-white/90 hover:bg-white/10 hover:text-white'
                : 'text-primary hover:bg-primary/5'
            )}
            onClick={() => window.open(DISCORD_URL, '_blank', 'noopener,noreferrer')}
          >
            Discord
            <DiscordIcon className="size-4" />
          </Button>
          <MobileNav
            lightText={lightText}
            navigation={navigation}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            sponsorship={sponsorship}
            ticketing={ticketing}
          />
        </div>
      </div>
    </header>
  );
}
