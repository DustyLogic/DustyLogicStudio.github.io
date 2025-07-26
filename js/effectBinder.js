// effectBinder.js
export function applyEffectsFromManifest(manifest) {
  Object.entries(manifest).forEach(([selector, effectList]) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      console.warn(`No elements found for selector: ${selector}`);
      return;
    }

    elements.forEach(element => {
      effectList.forEach(effect => element.classList.add(effect));
    });
  });
}