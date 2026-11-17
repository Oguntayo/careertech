export const CUSTOM_TEMPLATE_ID = "custom";

type Template = {
  id: string;
  name: string;
  description: string;
  swatch: [string, string, string];
  /** Design instructions sent to the model. */
  prompt: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "classic",
    name: "Classic Slab",
    description: "Grey header band, slab-serif type, dates in a side column.",
    swatch: ["#e5e5e5", "#f0f0f0", "#4a4a4a"],
    prompt:
      "Full-width light grey (#e5e5e5) header band holding the name in bold slab-serif (Zilla Slab) with the " +
      "target title beneath and a wrapped row of contact items. Every section heading is a full-width light " +
      "grey (#f0f0f0) bar with centred, bold, uppercase text. Experience, education and project entries use a " +
      "two-column grid: a narrow left column for dates and location, a wide right column with the bold " +
      "organisation, role, bullet list and a tech-stack line. Skills sit in a two-column grid of bold group " +
      "headings with bullet-separated items. Dark grey text (#4a4a4a), Zilla Slab throughout, 9.5pt body.",
  },
  {
    id: "modern",
    name: "Modern Sidebar",
    description: "Navy sidebar for contact and skills, teal accents.",
    swatch: ["#14213d", "#14a38b", "#ffffff"],
    prompt:
      "Two-column layout. A dark navy (#14213d) sidebar about 32% wide on the left holds the name, contact " +
      "details, skills and education in white and light text. The main column on white holds a profile summary " +
      "and experience, with section headings underlined by a thin teal (#14a38b) line. Font: Inter. Large bold " +
      "name, compact scannable bullets.",
  },
  {
    id: "minimal",
    name: "Minimal Serif",
    description: "Single column, lots of whitespace, black on white.",
    swatch: ["#ffffff", "#d6d3d1", "#1c1917"],
    prompt:
      "Single column, generous whitespace, black on white. The name is set large in a serif (Lora) at the top " +
      "left with contact details on one muted line beneath. Section headings are small, letter-spaced, " +
      "uppercase sans-serif (Inter) with a 1px rule underneath. Each entry shows organisation and right-aligned " +
      "dates on one line, the role in italics, then concise bullets. No colour fills and no icons.",
  },
];

export const getTemplate = (id: string) => TEMPLATES.find((template) => template.id === id);

export const templateLabel = (id: string) =>
  id === CUSTOM_TEMPLATE_ID ? "Your uploaded design" : (getTemplate(id)?.name ?? "Resume");
