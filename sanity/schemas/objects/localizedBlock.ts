import { defineType } from "sanity";

export const localizedBlock = defineType({
  name: "localizedBlock",
  title: "Localized Block Content",
  type: "object",
  fields: [
    {
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "ro",
      title: "Română",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
