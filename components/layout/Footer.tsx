"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Rocket, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
  ],
  company: [
    { name: "Blog", href: "/" },
    { name: "Contact", href: "/" }
  ],
  legal: [
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/tos" },
    { name: "License", href: "/license" }
  ]
};

const socialLinks = [
  { icon: Twitter, name: "Twitter", href: "#" },
  { icon: Instagram, name: "Instagram", href: "#" },
  { icon: Youtube, name: "YouTube", href: "#" }
];

export default function FooterPage() {
  return (
    <footer id="footer" className="container px-0 pt-20 md:pt-32 pb-12">
      <div className="px-10 py-10 rounded-lg md:py-0 bg-primary/5">
        <div className="flex flex-col md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-1 text-primary">
                <Rocket size={32} strokeWidth={2.7} />
                <span className="text-xl font-bold">StarterBlocks</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Beautiful documentation template for your next project.
              </p>
              <Link
                className="inline-block text-sm border border-accent hover:border-accent/40 duration-200 cursor-pointer px-2 py-1"
                href="https://starterkitpro.com"
              >
                <div className="flex gap-1 items-center">
                  <span className="text-muted-foreground font-medium">
                    Built with
                  </span>
                  <span className="font-bold ml-1 text-base flex items-center tracking-tight">
                    <Image
                      src="https://starterkitpro.com/logo.png"
                      alt="StarterKitPro logo"
                      width={20}
                      height={20}
                    />
                    StarterKitPro
                  </span>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-3">
                <h4 className="text-base font-semibold">PRODUCT</h4>
                <ul className="space-y-2">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-base font-semibold">LINKS</h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-base font-semibold">LEGAL</h4>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-accent" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 Template Docs. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <ul className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href }, idx) => (
                  <li key={idx}>
                    <a
                      href={href}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-muted-foreground duration-200 hover:text-foreground hover:opacity-90"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
