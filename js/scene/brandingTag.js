function launchBrandingTag() {
  const tagContainer = document.createElement('div');
  tagContainer.classList.add('dls-tag');

  // Set the background image via JavaScript
  tagContainer.style.backgroundImage = `
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('./assets/Logos/GraphicAI.png')`;
  tagContainer.style.backgroundSize = 'cover';
  tagContainer.style.backgroundPosition = 'center';
  tagContainer.style.backgroundRepeat = 'no-repeat';

  // DUSTY - with inline styles to force everything
  const line1 = document.createElement('div');
  line1.classList.add('tag-line', 'brand-main');
  line1.textContent = 'DUSTY';
  line1.style.fontSize = '48px'; // Easy to change this number
  line1.style.color = '#ff00ff';
  line1.style.fontWeight = 'bold';
  line1.style.textShadow = '0 0 15px #ff00ff';
  line1.style.margin = '0';
  line1.style.lineHeight = '1.1';
  line1.style.background = 'none';
  line1.style.webkitTextFillColor = '#ff00ff';

  // LOGIC - with inline styles
  const line2 = document.createElement('div');
  line2.classList.add('tag-line', 'brand-main');
  line2.textContent = 'LOGIC';
  line2.style.fontSize = '48px'; // Easy to change this number
  line2.style.color = '#ff00ff';
  line2.style.fontWeight = 'bold';
  line2.style.textShadow = '0 0 15px #ff00ff';
  line1.style.margin = '0';
  line2.style.lineHeight = '1.1';
  line2.style.background = 'none';
  line2.style.webkitTextFillColor = '#ff00ff';

  // STUDIO - with inline styles
  const line3 = document.createElement('div');
  line3.classList.add('tag-line', 'brand-studio');
  line3.textContent = 'STUDIO';
  line3.style.fontSize = '36px'; // Easy to change this number
  line3.style.color = '#00ffff';
  line3.style.fontWeight = 'bold';
  line3.style.textShadow = '0 0 12px #00ffff';
  line1.style.margin = '0';
  line3.style.lineHeight = '1.1';
  line3.style.background = 'none';
  line3.style.webkitTextFillColor = '#00ffff';

  // Separator
  const separator = document.createElement('div');
  separator.style.height = '10px';

  // Slogan
  const line4 = document.createElement('div');
  line4.classList.add('tag-line', 'brand-slogan');
  line4.textContent = 'WELCOME TO THE VOID OF CREATION';
  line4.style.fontSize = '24px'; // Easy to change this number
  line4.style.color = '#ffffff';
  line4.style.fontWeight = 'normal';
  line4.style.margin = '4px 0';
  line4.style.background = 'none';
  line4.style.webkitTextFillColor = '#ffffff';

  // Description
  const line5 = document.createElement('div');
  line5.classList.add('tag-line', 'brand-description');
  line5.textContent = 'WHERE GRAPHIC DESIGN MEETS AI TECHNOLOGIES';
  line5.style.fontSize = '24px'; // Easy to change this number
  line5.style.color = '#ffffff';
  line5.style.fontWeight = 'normal';
  line5.style.margin = '4px 0';
  line5.style.background = 'none';
  line5.style.webkitTextFillColor = '#ffffff';

  tagContainer.appendChild(line1);
  tagContainer.appendChild(line2);
  tagContainer.appendChild(line3);
  tagContainer.appendChild(separator);
  tagContainer.appendChild(line4);
  tagContainer.appendChild(line5);

  document.body.appendChild(tagContainer);
}

window.launchBrandingTag = launchBrandingTag;