"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DISCORD_URL,
  FIENTA_TICKET_URL,
  MENUS,
  type MenuItem,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

import { DiscordIcon } from "./icons";
import { SiteLogo } from "./site-logo";

type SiteHeaderProps = {
  homepage?: boolean;
};

function getMenuHref(item: MenuItem): string {
  return item.to || (item.homeTo ? item.homeTo : "/");
}

function NavItemLink({
  item,
  className,
  onNavigate,
}: {
  item: MenuItem;
  className?: string;
  onNavigate?: () => void;
}) {
  const href = getMenuHref(item);

  if (item.external) {
    return (
      <a
        href={href}
        target={item.target || "_blank"}
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.text}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {item.text}
    </Link>
  );
}

const heroNavShellClass =
  "!bg-transparent px-2.5 py-1.5 hover:!bg-white/10 focus:!bg-transparent data-active:!bg-transparent data-active:hover:!bg-white/10 data-open:!bg-transparent data-open:hover:!bg-white/10 data-popup-open:!bg-transparent data-popup-open:hover:!bg-white/10 data-active:text-[#0bbbef] data-active:underline data-active:decoration-2 data-active:underline-offset-4 focus-visible:ring-white/25";

const defaultNavShellClass =
  "!bg-transparent px-2.5 py-1.5 hover:!bg-primary/5 focus:!bg-transparent data-active:!bg-transparent data-active:hover:!bg-primary/5 data-open:!bg-transparent data-open:hover:!bg-primary/5 data-popup-open:!bg-transparent data-active:text-primary data-active:font-bold focus-visible:ring-primary/25";

const navLinkShellClass = (lightText: boolean) =>
  cn("rounded-lg", lightText ? heroNavShellClass : defaultNavShellClass);

function DesktopNav({ lightText }: { lightText: boolean }) {
  const linkClass = cn(
    "cursor-pointer text-[15px] font-semibold transition-colors",
    lightText
      ? "text-white/90 hover:text-[#0bbbef]"
      : "text-primary hover:text-primary/70"
  );

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {MENUS.header.map((item) => (
          <NavigationMenuItem key={item.text}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    navLinkShellClass(lightText),
                    "text-[15px] font-semibold",
                    lightText
                      ? "text-white/90 hover:text-[#0bbbef] data-open:text-[#0bbbef]"
                      : "text-primary hover:text-primary/70 data-open:text-primary"
                  )}
                >
                  {item.text}
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
                className={navLinkShellClass(lightText)}
                render={<Link href={getMenuHref(item)} className={linkClass} />}
              >
                {item.text}
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
  open,
  onOpenChange,
}: {
  lightText: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
              "lg:hidden",
              lightText && "text-white hover:bg-white/10 hover:text-white"
            )}
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent fullScreen className="bg-background">
        <SheetHeader className="flex-row items-center justify-between border-b border-border/60 px-5 py-4">
          <Link
            href="/"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            <SiteLogo variant="default" />
          </Link>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col px-5 py-6">
          <div className="flex flex-1 flex-col gap-1">
            {MENUS.mobile.map((item) => {
              if (item.children) {
                const isExpanded = expandedItem === item.text;

                return (
                  <div key={item.text} className="border-b border-border/60">
                    <button
                      type="button"
                      className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-2xl font-semibold text-primary"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedItem(isExpanded ? null : item.text)
                      }
                    >
                      {item.text}
                      <span
                        className={cn(
                          "text-base transition-transform",
                          isExpanded && "rotate-180"
                        )}
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
                <NavItemLink
                  key={item.text}
                  item={item}
                  className="cursor-pointer border-b border-border/60 py-4 text-2xl font-semibold text-primary hover:text-primary/80"
                  onNavigate={() => onOpenChange(false)}
                />
              );
            })}
          </div>
          <div className="mt-auto space-y-3 pt-8">
            <Button
              size="lg"
              className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
              nativeButton={false}
              render={
                <a
                  href={FIENTA_TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              onClick={() => onOpenChange(false)}
            >
              <Ticket className="size-4" />
              Get tickets
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full text-base font-semibold"
              onClick={() => {
                window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
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

export function SiteHeader({ homepage = false }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = homepage && !scrolled;
  const lightText = onHero;

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        homepage
          ? cn(
              "fixed inset-x-0 top-0",
              scrolled
                ? "border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-xl"
                : "bg-linear-to-b from-black/50 via-black/20 to-transparent backdrop-blur-[2px]"
            )
          : "sticky top-0 border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-50 shrink-0 cursor-pointer">
          <SiteLogo variant={onHero ? "hero" : "default"} />
        </Link>

        <DesktopNav lightText={lightText} />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={onHero ? "outline" : "default"}
            className={cn(
              "hidden sm:inline-flex font-semibold",
              onHero
                ? "border-white/80 bg-transparent text-white hover:bg-white/10 hover:text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            nativeButton={false}
            render={
              <a
                href={FIENTA_TICKET_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Ticket className="size-4" />
            Tickets
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hidden lg:inline-flex",
              lightText
                ? "text-white/90 hover:bg-white/10 hover:text-white"
                : "text-primary hover:bg-primary/5"
            )}
            onClick={() =>
              window.open(DISCORD_URL, "_blank", "noopener,noreferrer")
            }
          >
            Discord
            <DiscordIcon className="size-4" />
          </Button>

          <MobileNav
            lightText={lightText}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          />
        </div>
      </div>
    </header>
  );
}