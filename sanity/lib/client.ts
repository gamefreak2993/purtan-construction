import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const isValidProjectId = /^[a-z0-9-]+$/.test(projectId);

export const client = isValidProjectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

export async function sanityFetch<T>(query: string, params?: Record<string, string>): Promise<T> {
  if (!client) return [] as unknown as T;
  if (params) {
    return client.fetch<T>(query, params);
  }
  return client.fetch<T>(query);
}
