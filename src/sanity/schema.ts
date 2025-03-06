import { type SchemaTypeDefinition } from "sanity";
import { post } from "./schemas/post";
import { profile } from "./schemas/profile";
import { categoriesType } from "./schemas/categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, profile, categoriesType],
};
