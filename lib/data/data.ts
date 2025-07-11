import HeroImage from "@/public/hero-image.jpg";
import { StaticImageData } from "next/image";
import { RecipeBlogTypes } from "../types/type";

export const RecipeBlog: RecipeBlogTypes[] = [
  {
    id: 1,
    title: "Ujang Mewing",
    date: "10 Juli 2025",
    category: "Dessert",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    detailsRecipe:
      "lorem dolor dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis",

    image: HeroImage as StaticImageData
  },
  {
    id: 2,
    title: "Ujang Cihuy",
    date: "10 Juli 2025",
    category: "Dessert",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    detailsRecipe:
      "lorem dolor dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis",
    image: HeroImage as StaticImageData
  },
  {
    id: 3,
    title: "Ujang Kedu",
    date: "10 Juli 2025",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    detailsRecipe:
      "lorem dolor dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis",
    image: HeroImage as StaticImageData
  },
  {
    id: 4,
    title: "Ujang Kedu",
    date: "10 Juli 2025",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    image: HeroImage as StaticImageData
  },
  {
    id: 5,
    title: "Ujang Kedu",
    date: "10 Juli 2025",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    image: HeroImage as StaticImageData
  },
  {
    id: 6,
    title: "Ujang Kedu",
    date: "10 Juli 2025",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    image: HeroImage as StaticImageData
  },
  {
    id: 7,
    title: "Ujang Kedu",
    date: "10 Juli 2025",
    category: "Dinner",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui maxime ipsam corporis  ",
    image: HeroImage as StaticImageData
  }
];
