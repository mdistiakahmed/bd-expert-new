import { defineArrayMember, Rule } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: Rule) => rule.required().error("Required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule: Rule) => rule.required().error("Required"),
    },

    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      options: {
        hotspot: true, // Enables hotspot/crop functionality in the Studio
      },
      validation: (rule: Rule) => rule.required().error("Required"),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },

    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (rule: Rule) => rule.max(200).error("Max 200 characters"),
    },

    {
      name: "categories",
      type: "reference",
      to: { type: "categories" },
      title: "Categories",
    },

    {
      name: "serial",
      type: "number",
    },

    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [{ type: "text", name: "alt", title: "Alt" }],
        },
        // Video block
        defineArrayMember({
          type: "object",
          name: "videoEmbed",
          title: "Video Embed",
          icon: PlayIcon, // Optional icon for the video block
          fields: [
            {
              name: "url",
              type: "url",
              title: "Video URL",
              description: "Enter the YouTube or Vimeo URL",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: false,
                  scheme: ["http", "https"],
                }).error("Please enter a valid URL"),
            },
            {
              name: "title",
              type: "string",
              title: "Video Title",
              description: "Add a title to describe the video",
            },
          ],
        }),
      ],
    },
    {
      name: "fileUpload",
      title: "File Upload",
      type: "file",
    },
  ],
};
