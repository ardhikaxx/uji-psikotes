"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  ChevronDown,
  LayoutGrid,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testMenu = [
  { href: "/test/verbal", label: "Tes Verbal" },
  { href: "/test/numeric", label: "Tes Numerik" },
  { href: "/test/logical", label: "Tes Logika" },
  { href: "/test/personality", label: "Tes Kepribadian" },
  { href: "/test/sjt", label: "Tes Situasional (SJT)" },
  { href: "/test/accuracy", label: "Tes Ketelitian" },
  { href: "/test/data-analysis", label: "Tes Analisis Data" },
  { href: "/test/visual", label: "Tes Visual" },
  { href: "/test/abstract", label: "Tes Abstrak" },
  { href: "/test/kraepelin", label: "Tes Kraepelin" },
  { href: "/test/drawing", label: "Tes Gambar (Wartegg/BAUM/DAM)" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg">
            <BrainCircuit className="size-5" />
          </span>
          <span className="text-lg">
            PsikoTest<span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href="/"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive("/")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            Beranda
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                dropdownOpen || pathname.startsWith("/test")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              Tes
              <ChevronDown
                className={cn("size-4 transition-transform", dropdownOpen && "rotate-180")}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 z-50 mt-2 w-72 rounded-xl border bg-popover p-2 shadow-lg">
                <Link
                  href="/select-field"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-accent"
                >
                  <LayoutGrid className="size-4" />
                  Latihan Per Bidang
                </Link>
                <div className="my-1 h-px bg-border" />
                {testMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDropdownOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ganti tema"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/select-field">Mulai Latihan</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background px-4 py-3 sm:hidden">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Beranda
          </Link>
          <p className="px-3 pt-2 pb-1 text-xs font-bold text-muted-foreground">
            Semua Tes
          </p>
          {testMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/select-field"
            onClick={() => setMobileOpen(false)}
            className="text-primary mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-accent"
          >
            <LayoutGrid className="size-4" />
            Latihan Per Bidang
          </Link>
        </div>
      )}
    </header>
  );
}