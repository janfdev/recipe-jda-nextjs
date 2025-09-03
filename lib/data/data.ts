import { CategoryTypes } from "../types/type";
import {
  BookmarkCheckIcon,
  ChartBarStacked,
  Home,
  MessageCircleHeart,
  User,
  Utensils
} from "lucide-react";

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

export const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin/dashboard",
      icon: Home
    },
    {
      title: "Recipes",
      url: "/admin/dashboard/recipes",
      icon: Utensils
    },
    {
      title: "Categories",
      url: "/admin/dashboard/categories",
      icon: ChartBarStacked
    },
    {
      title: "Profile",
      url: "/admin/dashboard/profile",
      icon: User
    }
  ],
  navUser: [
    {
      title: "Profile",
      url: "/profile",
      icon: User
    },
    {
      title: "Komentar Saya",
      url: "/profile/comments",
      icon: MessageCircleHeart
    },
    {
      title: "Resep Disimpan",
      url: "/profile/saved-recipe",
      icon: BookmarkCheckIcon
    }
  ]
};

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
