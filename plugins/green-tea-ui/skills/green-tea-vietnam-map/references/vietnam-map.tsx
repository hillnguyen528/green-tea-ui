"use client";

import { VIETNAM_OUTLINE_PATH } from "@/data/vietnam-outline";
import { MAP_HEIGHT, MAP_WIDTH, projectToMap } from "@/lib/geo";
import { cn } from "@/lib/utils";
// Điểm trên bản đồ: chỉ cần id, tên và toạ độ thật (lấy từ nguồn ghi rõ).
export type MapPoint = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
};

type VietnamMapProps = {
  points: MapPoint[];
  activeId: string;
  /** Rê chuột hoặc focus vào marker. */
  onSelect: (id: string) => void;
  /** Bấm vào marker; mặc định giống onSelect. */
  onActivate?: (id: string) => void;
  /**
   * Chiều cao tối đa (độ dài CSS). Bản đồ thu nhỏ cả chiều ngang theo đúng tỉ lệ,
   * để marker (định vị theo % khung) luôn trùng với hình SVG bên dưới.
   */
  maxHeight?: string;
  className?: string;
};

// Hai quần đảo được vẽ tượng trưng bằng cụm chấm tại đúng vị trí địa lý.
const ARCHIPELAGOS = [
  {
    name: "Q.Đ. Hoàng Sa",
    center: { lat: 16.5, lng: 111.9 },
    dots: [
      [0, 0], [9, -6], [-8, 5], [14, 7], [-3, -11], [5, 13],
    ],
  },
  {
    name: "Q.Đ. Trường Sa",
    center: { lat: 9.6, lng: 114.2 },
    dots: [
      [0, 0], [12, -9], [-11, 8], [20, 10], [-4, -16], [8, 20], [-18, -6], [26, -2],
    ],
  },
];

export function VietnamMap({
  points,
  activeId,
  onSelect,
  onActivate,
  maxHeight,
  className,
}: VietnamMapProps) {
  return (
    <div
      className={cn("relative mx-auto w-full", className)}
      style={{
        aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}`,
        width: maxHeight
          ? `min(100%, calc(${maxHeight} * ${(MAP_WIDTH / MAP_HEIGHT).toFixed(4)}))`
          : undefined,
      }}
    >
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="absolute inset-0 size-full"
        role="img"
        aria-labelledby="tea-map-title"
      >
        <title id="tea-map-title">
          Bản đồ Việt Nam, gồm quần đảo Hoàng Sa và Trường Sa
        </title>
        <defs>
          <pattern id="sea-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" className="fill-paper/10" />
          </pattern>
        </defs>
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#sea-dots)" aria-hidden="true" />
        <path
          d={VIETNAM_OUTLINE_PATH}
          className="fill-leaf/30 stroke-sprout/60"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {ARCHIPELAGOS.map((group) => {
          const { x, y } = projectToMap(group.center);
          return (
            <g key={group.name}>
              {group.dots.map(([dx, dy]) => (
                <circle
                  key={`${dx}-${dy}`}
                  cx={x + dx}
                  cy={y + dy}
                  r="2"
                  className="fill-sprout/70"
                />
              ))}
              <text
                x={x}
                y={y + 46}
                textAnchor="middle"
                className="fill-paper/70 text-[19px]"
              >
                {group.name}
              </text>
            </g>
          );
        })}
        <text
          x={MAP_WIDTH * 0.7}
          y={MAP_HEIGHT * 0.68}
          textAnchor="middle"
          aria-hidden="true"
          className="fill-paper/25 font-display text-[26px] italic"
        >
          Biển Đông
        </text>
      </svg>

      {points.map((point) => {
        // Marker đặt đúng toạ độ thật, không dịch đi để tránh chồng nhau:
        // trên mobile, danh sách vùng bên cạnh bản đồ là cách chọn chính.
        const { x, y } = projectToMap(point.coordinates);
        const active = point.id === activeId;
        return (
          <button
            key={point.id}
            type="button"
            aria-label={point.name}
            aria-pressed={active}
            onClick={() => (onActivate ?? onSelect)(point.id)}
            onMouseEnter={() => onSelect(point.id)}
            onFocus={() => onSelect(point.id)}
            className={cn(
              "group absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              active ? "z-20" : "z-10",
            )}
            style={{
              left: `${(x / MAP_WIDTH) * 100}%`,
              top: `${(y / MAP_HEIGHT) * 100}%`,
            }}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute size-3 rounded-full",
                active ? "animate-pulse-ring bg-gold" : "bg-transparent",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "relative block rounded-full border-2 transition-[width,height,background-color,border-color] duration-300 ease-calm",
                active
                  ? "size-4 border-paper bg-gold"
                  : "size-3 border-night bg-sprout group-hover:size-4",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-full ml-1 rounded-full px-2.5 py-1 text-[0.8125rem] font-medium whitespace-nowrap transition-opacity duration-300",
                active
                  ? "bg-gold text-night opacity-100"
                  : "bg-night/90 text-paper opacity-0 group-hover:opacity-100",
              )}
            >
              {point.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
