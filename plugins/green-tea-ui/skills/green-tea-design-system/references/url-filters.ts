// Bộ lọc một-lựa-chọn-mỗi-nhóm, lưu trên URL search params để chia sẻ được.
export type UrlFilters<K extends string> = Partial<Record<K, string>>;

export function readFilters<K extends string>(
  searchParams: { get(name: string): string | null },
  keys: readonly K[],
): UrlFilters<K> {
  const filters: UrlFilters<K> = {};
  for (const key of keys) {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  }
  return filters;
}

export function writeFilters<K extends string>(
  keys: readonly K[],
  filters: UrlFilters<K>,
) {
  const params = new URLSearchParams();
  for (const key of keys) {
    const value = filters[key];
    if (value) params.set(key, value);
  }
  const query = params.toString();
  // replaceState đồng bộ với useSearchParams của Next mà không tải lại trang.
  window.history.replaceState(
    null,
    "",
    query ? `?${query}` : window.location.pathname,
  );
}

export function toggleFilter<K extends string>(
  keys: readonly K[],
  filters: UrlFilters<K>,
  key: K,
  value: string,
) {
  const next = { ...filters };
  if (next[key] === value) delete next[key];
  else next[key] = value;
  writeFilters(keys, next);
}

export type FilterGroup<K extends string, T> = {
  key: K;
  label: string;
  options: { value: string; label: string }[];
  matches: (item: T, value: string) => boolean;
};

export function applyFilters<K extends string, T>(
  items: T[],
  groups: FilterGroup<K, T>[],
  filters: UrlFilters<K>,
) {
  return items.filter((item) =>
    groups.every((group) => {
      const value = filters[group.key];
      return !value || group.matches(item, value);
    }),
  );
}
