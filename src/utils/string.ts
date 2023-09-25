function toSlug(str: string): string {
  return str.replaceAll(', ', '-').replaceAll(' ', '-');
}

export { toSlug };
