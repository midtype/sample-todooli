const rgbToRgba = (r: number, g: number, b: number) => (alpha: number = 1) =>
  `rgba(${r},${g},${b},${alpha})`;

export const BRAND_1 = rgbToRgba(6, 107, 255);
export const BRAND_1_LIGHT = rgbToRgba(64, 133, 233);
export const BRAND_2 = rgbToRgba(197, 108, 214);
export const BRAND_2_LIGHT = rgbToRgba(49, 35, 174);
export const GRAY_4 = rgbToRgba(80, 80, 80);
export const GRAY_3 = rgbToRgba(120, 120, 120);
export const GRAY_2 = rgbToRgba(230, 230, 230);
export const GRAY_1 = rgbToRgba(250, 250, 250);
export const WHITE = rgbToRgba(255, 255, 255);
export const BLACK = rgbToRgba(0, 0, 0);
export const RED = rgbToRgba(255, 0, 48);
export const GREEN = rgbToRgba(126, 211, 33);
export const ORANGE = rgbToRgba(245, 166, 35);
