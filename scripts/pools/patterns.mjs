const STROKE = "#1e293b";

function arrow(dir, x, y, fill = "#2563eb") {
  const s = 32;
  const pts = [0, -s, s, s, 0, s * 0.4, -s, s];
  return {
    type: "polygon",
    x,
    y,
    points: pts,
    fill,
    rotation: dir * 90,
    stroke: STROKE,
    strokeWidth: 2,
  };
}

function triangle(dir, x, y, fill = "#0ea5e9") {
  const s = 36;
  return {
    type: "polygon",
    x,
    y,
    points: [0, -s, s * 0.95, s * 0.85, -s * 0.95, s * 0.85],
    fill,
    rotation: dir * 90,
    stroke: STROKE,
    strokeWidth: 2,
  };
}

function square(x, y, fill = "#f59e0b", rotation = 0) {
  return {
    type: "rect",
    x,
    y,
    width: 64,
    height: 64,
    fill,
    rotation,
    stroke: STROKE,
    strokeWidth: 2,
  };
}

function circle(x, y, fill = "#2563eb", r = 32, outline = false) {
  return {
    type: "circle",
    x,
    y,
    size: r * 2,
    fill: outline ? "transparent" : fill,
    stroke: STROKE,
    strokeWidth: outline ? 3 : 2,
  };
}

function ring(x, y, r = 34) {
  return {
    type: "ring",
    x,
    y,
    size: r * 2,
    innerRadius: r - 11,
    fill: "transparent",
    stroke: STROKE,
    strokeWidth: 3,
  };
}

function diamond(x, y, fill = "#8b5cf6") {
  return {
    type: "polygon",
    x,
    y,
    points: [0, -38, 38, 0, 0, 38, -38, 0],
    fill,
    stroke: STROKE,
    strokeWidth: 2,
  };
}

function star(x, y, fill = "#f43f5e", pointsCount = 5, outer = 40, inner = 18) {
  return {
    type: "star",
    x,
    y,
    pointsCount,
    size: outer * 2,
    innerRadius: inner,
    fill,
    stroke: STROKE,
    strokeWidth: 2,
  };
}

function polygon(n, x, y, fill = "#10b981", rot = 0) {
  const pts = [];
  const r = 40;
  for (let i = 0; i < n; i++) {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
    pts.push(Math.round(Math.cos(ang) * r * 100) / 100, Math.round(Math.sin(ang) * r * 100) / 100);
  }
  return {
    type: "polygon",
    x,
    y,
    points: pts,
    fill,
    rotation: rot,
    stroke: STROKE,
    strokeWidth: 2,
  };
}

function semicircle(dir, x, y, fill = "#f59e0b") {
  return {
    type: "semicircle",
    x,
    y,
    size: 70,
    fill,
    rotation: dir * 180,
    stroke: STROKE,
    strokeWidth: 3,
  };
}

function lineSeg(x1, y1, x2, y2, color = "#334155") {
  return {
    type: "line",
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
    width: Math.hypot(x2 - x1, y2 - y1),
    rotation: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
    stroke: color,
    strokeWidth: 5,
  };
}

function dotOnCircle(dir, x, y) {
  const r = 34;
  const off = { top: [0, -r], right: [r, 0], bottom: [0, r], left: [-r, 0] }[dir];
  return [
    circle(x, y, "transparent", r, true),
    {
      type: "circle",
      x: x + off[0],
      y: y + off[1],
      size: 16,
      fill: "#334155",
      stroke: "#334155",
      strokeWidth: 1,
    },
  ];
}

const GRID_POS = [
  [50, 50],
  [150, 50],
  [50, 150],
  [150, 150],
];

function pattern(width, height, shapes, questionMark = false) {
  return { width, height, shapes, questionMark };
}

function grid2x2(cells) {
  return cells
    .map((sh, i) => (Array.isArray(sh) ? sh : [sh]).map((s) => ({ ...s, x: GRID_POS[i][0], y: GRID_POS[i][1] })))
    .flat()
    .filter(Boolean);
}

export {
  arrow,
  triangle,
  square,
  circle,
  ring,
  diamond,
  star,
  polygon,
  semicircle,
  lineSeg,
  dotOnCircle,
  pattern,
  grid2x2,
};