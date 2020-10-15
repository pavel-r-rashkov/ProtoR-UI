export class PagedGrid<T> {
  items: T[] = [];
  totalCount: number = 0;
}

export function generateFakeItems<T>(count: number = 10): PagedGrid<T> {
  const items: T[] = [];

  for (var i = 0; i < count; i++) {
    items.push({} as T);
  }

  return { items: items, totalCount: count };
}
