import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc) {
    _id, title, slug, coverImage, category->{title, slug}, location, featured
  }`
);

export const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] {
    ..., category->{title, slug}
  }`
);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(title.en asc) { _id, title, slug }`
);

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]`
);
