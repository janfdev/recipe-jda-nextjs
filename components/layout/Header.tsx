"use client";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import ModeToggle from "../theme/mode-toggle";
import Logo from "@/public/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { TopMenuTypes } from "@/lib/types/type";

const TopMenu: TopMenuTypes[] = [
  { name: "Browse", href: "/recipes" },
  { name: "Category", href: "/recipes/category" },
  { name: "FAQ", href: "#faq" }
];

export default function Header() {
  return (
    <header className="sticky top-5 z-50 flex justify-center container">
      <div className="min-w-full border rounded-md w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2.5 px-4">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <div className="items-center flex gap-6">
            <div className="flex items-center">
              {TopMenu.map((menu, idx) => (
                <a
                  key={idx}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    navigationMenuTriggerStyle
                  )}
                  href={menu.href}
                >
                  {menu.name}
                </a>
              ))}
            </div>
            <Suspense>
              <ModeToggle />
            </Suspense>
            {/* <div className="flex gap-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "default" })}
              >
                Get Started
              </Link>
            </div> */}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-1">
                      <Image src={Logo} alt="logo" width={100} height={100} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-4 flex flex-col gap-0">
                  {TopMenu.map((menu, idx) => (
                    <a
                      key={idx}
                      href={menu.href}
                      className="font-semibold text-lg py-2"
                    >
                      {menu.name}
                    </a>
                  ))}
                </div>
                <Suspense>
                  <ModeToggle />
                </Suspense>
                <div className="border-t pt-4">
                  <div className="mt-2 flex flex-col gap-2">
                    <Link
                      href="/recipes"
                      className={buttonVariants({ variant: "default" })}
                    >
                      Browse Recipe
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
