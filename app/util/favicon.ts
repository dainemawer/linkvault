export const getFavicon = (url: string, size: number) => {
  return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=${size}`;
};