import { StaticImageData } from "next/image";

export type TopMenuTypes = {
  name: string;
  href?: string;
  link?: string;
};

type Ingredients = {
  id: number;
  ingredient: string;
};
type Instructions = {
  id: number;
  step: string;
};

export interface RecipeBlogTypes {
  id: number;
  title: string;
  date: string;
  category?: string;
  description: string;
  detailsRecipe?: string;
  tags?: string[];
  ingredients: Ingredients[];
  instruction: Instructions[];
  image: string | StaticImageData;
}
