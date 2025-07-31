import { StaticImageData } from "next/image";
import {
  Recipe,
  Category,
  Ingredient,
  Instruction,
  Tag,
  RecipeTag
} from "@prisma/client";

export type RecipeWithAllRelations = Recipe & {
  category: Category | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: (RecipeTag & { tag: Tag })[];
};

export type TopMenuTypes = {
  name: string;
  href?: string;
  link?: string;
};

// type Ingredients = {
//   id: number;
//   ingredient: string;
// };
// type Instructions = {
//   id: number;
//   step: string;
// };

// export interface RecipeTypes {
//   id: string;
//   title: string;
//   image?: string | StaticImageData;
//   date: string;
//   categoryId?: string;
//   category?: {
//     name?: string;
//   };
//   description: string;
//   prepTime: number;
//   difficulty: string;
//   servings: number;
//   rating?: number;
//   cookTime: number;
//   tags?: string[];
//   ingredients: Ingredients[];
//   instruction: Instructions[];
// }

// types/type.ts

export type RecipeTypes = {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  date: string;
  category: {
    name: string;
  };
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  rating?: number;
  ingredients: {
    id: string;
    ingredient: string;
  }[];
  instruction: {
    id: string;
    step: string;
  }[];
  tags: string[];
};

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

// Image Upload Props
export interface ImageUploadProps {
  value?: string[];
  onChange: (url: string[]) => void;
  folder?: string;
  className?: string;
  disabled?: boolean;
}
