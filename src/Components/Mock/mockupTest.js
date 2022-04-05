export const shipsAvailable = [
  {
    name: "carrier",
    length: 4,
    placed: null,
  },
  {
    name: "cruiser-01",
    length: 3,
    placed: null,
  },
  {
    name: "cruiser-02",
    length: 3,
    placed: null,
  },
  {
    name: "cruiser-03",
    length: 3,
    placed: null,
  },
  {
    name: "submarine",
    length: 2,
    placed: null,
  },
];

export const ships = [
  {
    length: 4,
    name: "carrier",
    orientation: "horizontal",
    placed: true,
    position: { x: 2, y: 1 },
  },
  {
    length: 3,
    name: "cruiser-01",
    orientation: "horizontal",
    placed: true,
    position: { x: 1, y: 8 },
  },
  {
    length: 3,
    name: "cruiser-02",
    orientation: "horizontal",
    placed: true,
    position: { x: 1, y: 0 },
  },
  {
    length: 2,
    name: "submarine",
    orientation: "vertical",
    placed: true,
    position: { x: 7, y: 2 },
  },
];

export const hits = [
  {
    position: { x: 7, y: 9 },
    type: "miss",
  },
  {
    position: { x: 9, y: 8 },
    type: "miss",
  },
  {
    position: { x: 9, y: 7 },
    type: "hit",
  },
  {
    position: { x: 8, y: 7 },
    type: "hit",
  },
  {
    position: { x: 0, y: 8 },
    type: "miss",
  },
  {
    position: { x: 9, y: 6 },
    type: "miss",
  },
  {
    position: { x: 7, y: 7 },
    type: "hit",
  },
  {
    position: { x: 8, y: 8 },
    type: "miss",
  },
  {
    position: { x: 8, y: 6 },
    type: "miss",
  },
];

export const hitsTest = () => {
  var hits = [];
  for (var i = 0; i < 15; i++) {
    hits.push({ position: { x: 8, y: i }, type: "hit" });
  }
  return hits;
};
