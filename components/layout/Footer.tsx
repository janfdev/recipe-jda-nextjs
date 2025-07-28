import React from "react";
import Link from "next/link";
import { Hamburger } from "lucide-react";
import { navItemsFooter } from "@/lib/data/data";

const Footer = () => {
  return (
    <>
      <footer className="border-t py-12">
        <div className="mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Hamburger className="h-6 w-6 text-primary" />
                <span className="font-bold">ReciVerse</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your go-to destination for delicious recipes and cooking
                inspiration.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/recipe/breakfast" className="hover:text-primary">
                    Breakfast
                  </Link>
                </li>
                <li>
                  <Link href="/recipe/lunch" className="hover:text-primary">
                    Lunch
                  </Link>
                </li>
                <li>
                  <Link href="/recipe/dinner" className="hover:text-primary">
                    Dinner
                  </Link>
                </li>
                <li>
                  <Link href="/recipe/desserts" className="hover:text-primary">
                    Desserts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navItemsFooter.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="hover:text-primary">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-sm text-muted-foreground">
                Stay updated with our latest recipes and cooking tips.
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} ReciVerse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
