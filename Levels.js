// Positions are world coordinates; guard min and max mark the ends of a patrol.
// Patrol speed is measured in pixels per second.
const LEVELS = [ { name: 'The first heist',
    hint: 'Three fast guards. Cross behind them, then keep moving.',
    cat: [ 70, 75 ],
    exit: [ 45, 365 ],
    loot: [ [ 680, 85 ], [ 450, 395 ], [ 675, 355 ] ],
    walls: [ { x: 230, y: 135, w: 110, h: 50 }, { x: 235, y: 285, w: 190, h: 65 } ],
    guards:
     [ { x: 380, y: 230, axis: 'x', min: 80, max: 690, speed: 147 },
       { x: 570, y: 80, axis: 'y', min: 55, max: 385, speed: 126 },
       { x: 280, y: 395, axis: 'x', min: 115, max: 710, speed: 150 } ] },
  { name: 'The storeroom',
    hint: 'Four patrols cover the aisles and the return route.',
    cat: [ 70, 65 ],
    exit: [ 45, 365 ],
    loot: [ [ 675, 65 ], [ 340, 150 ], [ 90, 325 ], [ 685, 365 ] ],
    walls: [ { x: 200, y: 60, w: 45, h: 205 }, { x: 430, y: 270, w: 150, h: 45 }, { x: 480, y: 80, w: 90, h: 65 } ],
    guards:
     [ { x: 340, y: 80, axis: 'y', min: 65, max: 365, speed: 168 },
       { x: 600, y: 205, axis: 'x', min: 270, max: 705, speed: 154 },
       { x: 635, y: 285, axis: 'y', min: 45, max: 410, speed: 165 },
       { x: 380, y: 395, axis: 'x', min: 115, max: 710, speed: 155 } ] },
  { name: 'The big score',
    hint: 'Five guards overlap. Use the crates to wait safely.',
    cat: [ 65, 65 ],
    exit: [ 45, 365 ],
    loot: [ [ 675, 65 ], [ 325, 190 ], [ 80, 310 ], [ 665, 340 ], [ 395, 400 ] ],
    walls: [ { x: 180, y: 170, w: 115, h: 55 }, { x: 450, y: 300, w: 90, h: 60 }, { x: 390, y: 185, w: 100, h: 50 } ],
    guards:
     [ { x: 400, y: 115, axis: 'x', min: 100, max: 690, speed: 182 },
       { x: 590, y: 260, axis: 'y', min: 185, max: 390, speed: 168 },
       { x: 160, y: 265, axis: 'x', min: 65, max: 395, speed: 161 },
       { x: 325, y: 330, axis: 'y', min: 155, max: 410, speed: 180 },
       { x: 500, y: 400, axis: 'x', min: 115, max: 710, speed: 170 } ] },
  { name: 'Crossed paths',
    hint: 'Six patrols cross. Watch both directions before moving.',
    cat: [ 65, 65 ],
    exit: [ 45, 365 ],
    loot: [ [ 680, 60 ], [ 350, 65 ], [ 95, 240 ], [ 335, 365 ], [ 690, 260 ], [ 670, 405 ] ],
    walls:
     [ { x: 180, y: 120, w: 125, h: 90 },
       { x: 470, y: 120, w: 125, h: 90 },
       { x: 180, y: 305, w: 125, h: 75 },
       { x: 470, y: 305, w: 125, h: 75 } ],
    guards:
     [ { x: 300, y: 250, axis: 'x', min: 65, max: 710, speed: 203 },
       { x: 385, y: 120, axis: 'y', min: 45, max: 410, speed: 189 },
       { x: 625, y: 330, axis: 'y', min: 55, max: 410, speed: 182 },
       { x: 300, y: 65, axis: 'x', min: 140, max: 710, speed: 195 },
       { x: 400, y: 410, axis: 'x', min: 115, max: 710, speed: 185 },
       { x: 110, y: 290, axis: 'y', min: 140, max: 410, speed: 170 } ] },
  { name: 'The vault',
    hint: 'Seven guards. Wait for gaps and plan the return trip.',
    cat: [ 65, 65 ],
    exit: [ 45, 365 ],
    loot: [ [ 320, 60 ], [ 685, 65 ], [ 80, 230 ], [ 390, 215 ], [ 685, 235 ], [ 330, 405 ], [ 685, 405 ] ],
    walls:
     [ { x: 175, y: 100, w: 110, h: 85 },
       { x: 455, y: 100, w: 110, h: 85 },
       { x: 175, y: 295, w: 110, h: 85 },
       { x: 455, y: 295, w: 110, h: 85 } ],
    guards:
     [ { x: 400, y: 50, axis: 'x', min: 150, max: 710, speed: 217 },
       { x: 180, y: 250, axis: 'x', min: 55, max: 710, speed: 203 },
       { x: 390, y: 340, axis: 'y', min: 55, max: 410, speed: 210 },
       { x: 610, y: 150, axis: 'y', min: 55, max: 410, speed: 196 },
       { x: 280, y: 410, axis: 'x', min: 115, max: 710, speed: 215 },
       { x: 110, y: 300, axis: 'y', min: 140, max: 410, speed: 195 },
       { x: 290, y: 170, axis: 'y', min: 95, max: 410, speed: 205 } ] } ];

const extraWalls = [
  [{ x: 740, y: 610, w: 130, h: 70 }, { x: 1260, y: 580, w: 100, h: 70 }, { x: 350, y: 850, w: 120, h: 50 }],
  [{ x: 850, y: 550, w: 130, h: 70 }, { x: 300, y: 620, w: 110, h: 70 }, { x: 1450, y: 600, w: 100, h: 70 }],
  [{ x: 900, y: 610, w: 130, h: 70 }, { x: 300, y: 650, w: 110, h: 70 }, { x: 1350, y: 670, w: 100, h: 70 }],
  [{ x: 870, y: 700, w: 130, h: 70 }, { x: 350, y: 630, w: 110, h: 70 }, { x: 1450, y: 650, w: 100, h: 70 }],
  [{ x: 950, y: 600, w: 130, h: 70 }, { x: 340, y: 630, w: 110, h: 70 }, { x: 1400, y: 650, w: 100, h: 70 }]
];

LEVELS.forEach((level, index) => {
  // The original layouts are stretched into larger rooms, with extra crates added.
  level.width = 1600;
  level.height = 960;
  level.exit = [45, 845];
  level.loot = level.loot.map(([x, y]) => [x * 2, y * 2]);
  level.walls = level.walls.map(wall => ({ ...wall, x: wall.x * 2, y: wall.y * 2 }));
  level.walls.push(...extraWalls[index]);
  level.guards = level.guards.map(guard => ({
    ...guard,
    x: guard.x * 2,
    y: guard.y * 2,
    min: guard.min * 2,
    max: guard.max * 2
  }));
});
