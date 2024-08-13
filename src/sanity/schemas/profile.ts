import { Rule } from "sanity";

export const profile = {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule: Rule) => rule.required().error("Required"),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Enables image hotspot cropping
      },
    },
    {
      name: "resume",
      title: "Resume",
      type: "file",
    },
    {
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url", // Using URL type for validation
    },
    {
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url", // Using URL type for validation
    },
    {
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
    },
    {
      name: "projectsCompleted",
      title: "Projects Completed",
      type: "number",
    },
    {
      name: "clientsServed",
      title: "Clients Served",
      type: "number",
    },
    {
      name: "experiences",
      title: "Experiences",
      type: "array",
      of: [
        {
          type: "object",
          name: "experience",
          fields: [
            {
              name: "startDate",
              title: "Start Date",
              type: "date",
            },
            {
              name: "endDate",
              title: "End Date",
              type: "date",
            },
            {
              name: "companyName",
              title: "Company Name",
              type: "string",
            },
            {
              name: "designation",
              title: "Designation",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          name: "educationItem",
          fields: [
            {
              name: "startDate",
              title: "Start Date",
              type: "date",
            },
            {
              name: "endDate",
              title: "End Date",
              type: "date",
            },
            {
              name: "institution",
              title: "Institution",
              type: "string",
            },
            {
              name: "degree",
              title: "Degree",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "nationality",
      title: "Nationality",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "languages",
      title: "Languages",
      type: "string",
    },
  ],
};
