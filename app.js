// script.js

// Function to convert hex to RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Function to convert RGB to hex
function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

// Function to calculate matching colors
function generateMatchingColors(hexColor) {
  const { r, g, b } = hexToRgb(hexColor);
  const hsv = rgbToHsv(r, g, b);
  
  // Complementary color (180 degrees shift)
  const complementaryHsv = (hsv.h + 0.5) % 1;
  const complementaryColor = hsvToRgb(complementaryHsv, hsv.s, hsv.v);
  
  // Analogous colors (30 degrees shift)
  const analogousHsv1 = (hsv.h + 0.0833) % 1;
  const analogousHsv2 = (hsv.h - 0.0833 + 1) % 1;
  const analogousColor1 = hsvToRgb(analogousHsv1, hsv.s, hsv.v);
  const analogousColor2 = hsvToRgb(analogousHsv2, hsv.s, hsv.v);
  
  // Triadic colors (120 degrees shift)
  const triadicHsv1 = (hsv.h + 0.3333) % 1;
  const triadicHsv2 = (hsv.h - 0.3333 + 1) % 1;
  const triadicColor1 = hsvToRgb(triadicHsv1, hsv.s, hsv.v);
  const triadicColor2 = hsvToRgb(triadicHsv2, hsv.s, hsv.v);
  
  return {
      original: hexColor,
      complementary: rgbToHex(complementaryColor.r, complementaryColor.g, complementaryColor.b),
      analogous1: rgbToHex(analogousColor1.r, analogousColor1.g, analogousColor1.b),
      analogous2: rgbToHex(analogousColor2.r, analogousColor2.g, analogousColor2.b),
      triadic1: rgbToHex(triadicColor1.r, triadicColor1.g, triadicColor1.b),
      triadic2: rgbToHex(triadicColor2.r, triadicColor2.g, triadicColor2.b),
  };
}

// Function to convert RGB to HSV
function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h = max === min ? 0 : max === r ? (60 * (g - b) / (max - min) + 360) % 360 : max === g ? (60 * (b - r) / (max - min) + 120) : (60 * (r - g) / (max - min) + 240);
  const s = max === 0 ? 0 : (max - min) / max;
  const v = max;

  return { h: h / 360, s, v };
}

// Function to convert HSV to RGB
function hsvToRgb(h, s, v) {
  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  if (i === 0) [r, g, b] = [v, t, p];
  else if (i === 1) [r, g, b] = [q, v, p];
  else if (i === 2) [r, g, b] = [p, v, t];
  else if (i === 3) [r, g, b] = [p, q, v];
  else if (i === 4) [r, g, b] = [t, p, v];
  else [r, g, b] = [v, p, q];

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// Function to display the matching colors and accessories
function displayMatchingColors(hexColor) {
  const colors = generateMatchingColors(hexColor);
  const displayArea = document.getElementById('matchingColors');
  
  displayArea.innerHTML = `
      <div class="color-box" style="background-color: ${colors.original};"></div>
      <div class="color-box" style="background-color: ${colors.complementary};"></div>
      <div class="color-box" style="background-color: ${colors.analogous1};"></div>
      <div class="color-box" style="background-color: ${colors.analogous2};"></div>
      <div class="color-box" style="background-color: ${colors.triadic1};"></div>
      <div class="color-box" style="background-color: ${colors.triadic2};"></div>
  `;

  displayAccessories(colors);
}

// Function to display accessories (earrings, bangles, etc.) matching the color
function displayAccessories(colors) {
  const accessoriesArea = document.getElementById('matchingAccessories');
  
  const accessories = [
      { name: 'Earrings', color: colors.original, img: 'earrings.jpg' },
      { name: 'Bangles', color: colors.complementary, img: 'bangles.jpg' },
      { name: 'Necklace', color: colors.analogous1, img: 'necklace.jpg' },
      { name: 'Bracelets', color: colors.analogous2, img: 'bracelets.jpg' },
      { name: 'Ring', color: colors.triadic1, img: 'ring.jpg' },
      { name: 'Brooch', color: colors.triadic2, img: 'brooch.jpg' }
  ];
  
  accessoriesArea.innerHTML = accessories.map(accessory => {
      return `
          <div class="accessory-item" style="background-color: ${accessory.color};">
              <img src="images/${accessory.img}" alt="${accessory.name}">
              <p>${accessory.name}</p>
          </div>
      `;
  }).join('');
}

// Event listener for color picker
document.getElementById('colorPicker').addEventListener('input', function(event) {
  displayMatchingColors(event.target.value);
});

// Initial color display
displayMatchingColors(document.getElementById('colorPicker').value);
