export type FormState = { error?: string; message?: string };

export const MAX_FILE_BYTES = 4 * 1024 * 1024;

export function field(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

export function fileField(data: FormData, name: string): File | null {
  const value = data.get(name);
  return value instanceof File && value.size > 0 ? value : null;
}

export function isImage(file: File) {
  return file.type.startsWith("image/") && file.size <= MAX_FILE_BYTES;
}

export function isHttpUrl(value: string) {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}
