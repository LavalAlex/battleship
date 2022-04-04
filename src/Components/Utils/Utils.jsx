export const BOARDROWS = 10;
export const BOARDCOLUMNS = 10;
export const BOARD = BOARDCOLUMNS * BOARDROWS;

export const squateState = {
  empty: "empty",
  ship: "ship",
  hit: "hit",
  miss: "miss",
  shipSunk: "shipSunk",
  forbidden: "forbidden",
  awaiting: "awaiting",
};

export const stateToClass = {
  [squateState.empty]: "empty",
  [squateState.ship]: "ship",
  [squateState.hit]: "hit",
  [squateState.miss]: "miss",
  [squateState.shipSunk]: "shipSunk",
  [squateState.forbidden]: "forbidden",
  [squateState.awaiting]: "awaiting",
};

// Returns an empty board
export const generateEmptyLayout = () => {
  return new Array(BOARDROWS * BOARDCOLUMNS).fill(squateState.empty);
};

// Returns the index of a clicked square from coordinates and viceversa
export const coordsToIndex = (coordinates) => {
  const { x, y } = coordinates;

  return y * BOARDROWS + x;
};

export const indexToCoords = (index) => {
  return {
    x: index % BOARDROWS,
    y: Math.floor(index / BOARDROWS),
  };
};

// Returns the indices that entity would take up
export const entityIndices = (entity) => {
  let position = coordsToIndex(entity.position);

  let indices = [];
  for (let i = 0; i < entity.length; i++) {
    indices.push(position);
    position =
      entity.orientation === "vertical" ? position + BOARDROWS : position + 1;
  }
  return indices;
};

// Alternative take
export const entityIndices2 = (entity) => {
  let indices = [];
  for (let i = 0; i < entity.length; i++) {
    const position =
      entity.orientation === "vertical"
        ? coordsToIndex({ y: entity.position.y + i, x: entity.position.x })
        : coordsToIndex({ y: entity.position.y, x: entity.position.x + i });
    indices.push(position);
  }

  return indices;
};

// If it fits, I sits. Checks the ship doesn't overflow
export const isWithinBounds = (entity) => {
  return (
    (entity.orientation === "vertical" &&
      entity.position.y + entity.length <= BOARDROWS) ||
    (entity.orientation === "horizontal" &&
      entity.position.x + entity.length <= BOARDCOLUMNS)
  );
};

// Place an entity on a layout
export const putEntityInLayout = (oldLayout, entity, type) => {
  let newLayout = oldLayout.slice();

  if (type === "ship") {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = squateState.ship;
    });
  }

  if (type === "forbidden") {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = squateState.forbidden;
    });
  }

  if (type === "hit") {
    newLayout[coordsToIndex(entity.position)] = squateState.hit;
  }

  if (type === "miss") {
    newLayout[coordsToIndex(entity.position)] = squateState.miss;
  }

  if (type === "shipSunk") {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = squateState.shipSunk;
    });
  }

  return newLayout;
};

// Check that the indices of the ship currently being placed all correspond to empty squares
export const isPlaceFree = (entity, layout) => {
  let shipIndices = entityIndices2(entity);

  return shipIndices.every((idx) => layout[idx] === squateState.empty);
};

// Used during placement to calculate how many squares a ship is out of bounds, so that the remaining squares on the board turn red
export const calculateOverhang = (entity) =>
  Math.max(
    entity.orientation === "vertical"
      ? entity.position.y + entity.length - BOARDROWS
      : entity.position.x + entity.length - BOARDCOLUMNS,
    0
  );

// Checks if the ship you're trying to place is within bounds and the space is free. Both need to return true
export const canBePlaced = (entity, layout) =>
  isWithinBounds(entity) && isPlaceFree(entity, layout);

// Generates layout and assigns each comp ship a random orientation and set of coordinates; returns all placed ships
export const placeAllComputerShips = (computerShips) => {
  let compLayout = generateEmptyLayout();

  return computerShips.map((ship) => {
    while (true) {
      let decoratedShip = randomizeShipProps(ship);

      if (canBePlaced(decoratedShip, compLayout)) {
        compLayout = putEntityInLayout(
          compLayout,
          decoratedShip,
          squateState.ship
        );
        return { ...decoratedShip, placed: true };
      }
    }
  });
};

// Generate a random orientation and starting index on board for computer ships
export const generateRandomOrientation = () => {
  let randomNumber = Math.floor(Math.random() * Math.floor(2));

  return randomNumber === 1 ? "vertical" : "horizontal";
};

export const generateRandomIndex = (value = BOARD) => {
  return Math.floor(Math.random() * Math.floor(value));
};

// Assign a ship a random orientation and set of coordinates
export const randomizeShipProps = (ship) => {
  let randomStartIndex = generateRandomIndex();

  return {
    ...ship,
    position: indexToCoords(randomStartIndex),
    orientation: generateRandomOrientation(),
  };
};

// Place the computer ship in the layout
export const placeCompShipInLayout = (ship, compLayout) => {
  let newCompLayout = compLayout.slice();

  entityIndices2(ship).forEach((idx) => {
    newCompLayout[idx] = squateState.ship;
  });
  return newCompLayout;
};

// Gets the neighboring squares to a successful computer hit
export const getNeighbors = (coords) => {
  let firstRow = coords.y === 0;
  let lastRow = coords.y === 9;
  let firstColumn = coords.x === 0;
  let lastColumn = coords.x === 9;

  let neighbors = [];

  // coords.y === 0;
  if (firstRow) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y + 1 }
    );
  }

  // coords.y === 9;
  if (lastRow) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y - 1 }
    );
  }
  // coords.x === 0
  if (firstColumn) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y }, // right
      { x: coords.x, y: coords.y + 1 }, // down
      { x: coords.x, y: coords.y - 1 } // up
    );
  }

  // coords.x === 9
  if (lastColumn) {
    neighbors.push(
      { x: coords.x - 1, y: coords.y }, // left
      { x: coords.x, y: coords.y + 1 }, // down
      { x: coords.x, y: coords.y - 1 } // up
    );
  }

  if (!lastColumn || !firstColumn || !lastRow || !firstRow) {
    neighbors.push(
      { x: coords.x - 1, y: coords.y }, // left
      { x: coords.x + 1, y: coords.y }, // right
      { x: coords.x, y: coords.y - 1 }, // up
      { x: coords.x, y: coords.y + 1 } // down
    );
  }

  let filteredResult = [
    ...new Set(
      neighbors
        .map((coords) => coordsToIndex(coords))
        .filter((number) => number >= 0 && number < BOARD)
    ),
  ];

  return filteredResult;
};

// Give ships a sunk flag to update their color
export const updateSunkShips = (currentHits, opponentShips) => {
  let playerHitIndices = currentHits.map((hit) => coordsToIndex(hit.position));

  let indexWasHit = (index) => playerHitIndices.includes(index);

  let shipsWithSunkFlag = opponentShips.map((ship) => {
    let shipIndices = entityIndices2(ship);
    if (shipIndices.every((idx) => indexWasHit(idx))) {
      return { ...ship, sunk: true };
    } else {
      return { ...ship, sunk: false };
    }
  });

  return shipsWithSunkFlag;
};
