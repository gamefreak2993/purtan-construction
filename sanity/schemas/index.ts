import type { SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { category } from "./category";
import { siteSettings } from "./siteSettings";
import { localizedString } from "./objects/localizedString";
import { localizedBlock } from "./objects/localizedBlock";
import { beforeAfterPair } from "./objects/beforeAfterPair";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  project,
  category,
  siteSettings,
  // Objects
  localizedString,
  localizedBlock,
  beforeAfterPair,
];
