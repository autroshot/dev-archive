function toSlug(str: string): string {
  return str.replaceAll(' ', '-');
}

export { toSlug };
