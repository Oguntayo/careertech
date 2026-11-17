const dateFormatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

export const formatDate = (date: Date) => dateFormatter.format(date);

export function excerpt(text: string, length: number) {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > length ? `${flat.slice(0, length).trimEnd()}…` : flat;
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "resume";
}
