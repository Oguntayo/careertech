export const PAGE_SIZE = 9;

type Paginated<T> = { items: T[]; page: number; pageCount: number };

export function parsePage(value: string | undefined) {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export const offsetFor = (page: number, pageSize: number) => (page - 1) * pageSize;

export function paginate<T>(items: T[], total: number, page: number, pageSize: number): Paginated<T> {
  return { items, page, pageCount: Math.max(1, Math.ceil(total / pageSize)) };
}
