import { defineType } from "sanity";

export const beforeAfterPair = defineType({
  name: "beforeAfterPair",
  title: "Before / After Pair",
  type: "object",
  fields: [
    {
      name: "before",
      title: "Before",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    },
    {
      name: "after",
      title: "After",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "localizedString",
    },
  ],
  preview: {
    select: {
      media: "before",
    },
    prepare({ media }) {
      return {
        title: "Before / After",
        media,
      };
    },
  },
});
