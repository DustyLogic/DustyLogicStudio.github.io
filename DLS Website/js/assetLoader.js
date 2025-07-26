// assetLoader.js
import ASSETS from '../assets/config/assets.json';

export function injectAsset(id, targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target || !ASSETS[id]) return;

  const asset = ASSETS[id];
  const element = document.createElement(asset.type);

  element.src = asset.src;
  element.className = asset.class || '';
  element.alt = asset.alt || '';
  target.appendChild(element);
}