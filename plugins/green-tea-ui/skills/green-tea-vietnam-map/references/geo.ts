// Phép chiếu equirectangular dùng chung cho đường bờ biển và marker của bản đồ trà.
// Khung hình bao trọn đất liền, quần đảo Hoàng Sa và quần đảo Trường Sa.
const LNG_MIN = 101.5;
const LNG_MAX = 117.5;
const LAT_MIN = 7.5;
const LAT_MAX = 23.9;
const SCALE = 40;
const LNG_FACTOR = Math.cos((16 * Math.PI) / 180);

export const MAP_WIDTH = Math.round((LNG_MAX - LNG_MIN) * LNG_FACTOR * SCALE);
export const MAP_HEIGHT = Math.round((LAT_MAX - LAT_MIN) * SCALE);

export function projectToMap({ lat, lng }: { lat: number; lng: number }) {
  return {
    x: (lng - LNG_MIN) * LNG_FACTOR * SCALE,
    y: (LAT_MAX - lat) * SCALE,
  };
}
