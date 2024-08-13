import { type SchemaTypeDefinition } from "sanity";
import { post } from "./schemas/post";
import { profile } from "./schemas/profile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, profile],
};
