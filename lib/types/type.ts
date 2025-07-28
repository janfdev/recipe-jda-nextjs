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

export interface RecipeTypes {
  id: number;
  title: string;
  date: string;
  categoryId?: string,
  category?: {
    name?: string;
  };
  description: string;
  detailsRecipe?: string;
  tags?: string[];
  ingredients: Ingredients[];
  instruction: Instructions[];
  image: string | StaticImageData;
}

export type CategoryTypes = {
  id: string;
  name: string;
};

export type LoadingState = {
  fetch: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
};

export type Context = {
  params: {
    id: string;
  };
};
