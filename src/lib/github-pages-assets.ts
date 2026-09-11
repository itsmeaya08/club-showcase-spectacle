// Small compatibility layer for the original Lovable markup when hosted from a
// GitHub Pages project subdirectory.
const base = import.meta.env.BASE_URL;

function pageAsset(path: string) {
  if (!path.startsWith("/") || path.startsWith(base)) return path;
  // Lovable-managed /__l5e assets are handled by Lovable and should not be
  // rewritten as repository paths.
  if (path.startsWith("/__l5e/")) return path;
  return `${base}${path.slice(1)}`;
}

function repairAssets() {
  document.querySelectorAll<HTMLImageElement>("img[src]").forEach((img) => {
    const raw = img.getAttribute("src");
    if (raw) img.setAttribute("src", pageAsset(raw));
  });

  // A previous edit accidentally produced <imgsrc ...> instead of <img ...>
  // for Aya's main portrait. Repair it in the DOM without changing the design.
  document.querySelectorAll<HTMLElement>("imgsrc").forEach((broken) => {
    const img = document.createElement("img");
    for (const attr of Array.from(broken.attributes)) {
      img.setAttribute(attr.name, pageAsset(attr.value));
    }
    broken.replaceWith(img);
  });
}

if (typeof document !== "undefined") {
  repairAssets();
  new MutationObserver(repairAssets).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}
