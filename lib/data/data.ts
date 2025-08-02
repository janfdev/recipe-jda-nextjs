import { CategoryTypes } from "../types/type";
import { Album, Home, Panda, User } from "lucide-react";

export const categories: CategoryTypes[] = [
  {
    id: "1",
    name: "Dinner"
  },
  {
    id: "2",
    name: "Dessert"
  }
];

export const navItemsDashboard = [
  {
    name: "Home",
    url: "/admin/dashboard",
    icon: Home
  },
  {
    name: "Recipes",
    url: "/admin/dashboard/recipes",
    icon: Album
  },
  {
    name: "Categories",
    url: "/admin/dashboard/categories",
    icon: Panda
  },
];

export const navItemsFooter = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Browse Recipe",
    href: "/recipes"
  },
  {
    name: "Categories",
    href: "/recipes/categories"
  }
];
