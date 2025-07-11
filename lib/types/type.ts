import { StaticImageData } from "next/image";

export type TopMenuTypes = {
  name: string;
  href?: string;
  link?: string;
};

export type RecipeBlogTypes = {
  id: number;
  title: string;
  date: string;
  category?: string;
  description: string;
  detailsRecipe?: string;
  image: string | StaticImageData;
};
