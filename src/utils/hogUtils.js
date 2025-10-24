// utility functions for hog data

// Handles weird weight key names in the hog data
export function getWeight(hog) {
  if (hog.weight != null) return hog.weight;
  const key = Object.keys(hog).find(k => k.toLowerCase().includes("weight"));
  return key ? hog[key] : 0;
}

// Handles hog images – uses hog.image if provided, else tries to load from assets or a fallback
export function getImageSrc(hog) {
  if (hog.image) return hog.image;
  const slug = hog.name?.toLowerCase().replace(/\s+/g, "_") || "hog";
  try {
    return new URL(`../assets/${slug}.jpg`, import.meta.url).href;
  } catch {
    return "https://via.placeholder.com/300x200?text=Hog";
  }
}

