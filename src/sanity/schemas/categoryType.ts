import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoriesType = defineType({
  name: "categories",
  title: "Categories",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
  ],
});
