const each = require('jest-each').default;
const { TestResult } = require('@jest/types');
const server_functions = require('../server/server_functions');

const {
  whoseTurn, nextTurn, placePiece, checkForWinner,
} = require('../server/server_functions');

test('find out whose turn it is', () => {
  // Arrange
  const gameState = {
    rows: 0,
    cols: 0,
    boardArray: [],
    turn: 'yellow',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 1,
    lastPiece: {
      row: 0,
      col: 0,
    },
    winner: null,
  };
  const expectedOutput = 'yellow';

  // Act
  const actualOutput = whoseTurn(gameState);

  // Assert
  expect(actualOutput).toBe(expectedOutput);
});

test('check that turn changes from red to yellow', () => {
  // Arrange
  const gameState = {
    rows: 0,
    cols: 0,
    boardArray: [],
    turn: 'yellow',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 1,
    lastPiece: {
      row: 0,
      col: 0,
    },
    winner: null,
  };
  const expectedOutput = 'red';
  // Act
  const actualOutput = nextTurn(gameState);
  // Assert
  expect(actualOutput).toBe(expectedOutput);
});

test('when arrow button clicked, piece is placed in last empty space', () => {
  // Arrange
  const gameState = {
    rows: 0,
    cols: 0,
    boardArray: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    turn: 'yellow',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 1,
    lastPiece: {
      row: 0,
      col: 0,
    },
    winner: null,
  };
  const column = 0;
  // jest.spyOn(server_functions, 'whoseTurn').mockReturnValue('yellow');
  // jest.spyOn(server_functions, 'whoseTurn').mockImplementation(() => { console.log('spy called'); return 'yellow'; });
  const expectedOutput = {
    rows: 0,
    cols: 0,
    boardArray: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      ['yellow', null, null, null],
    ],
    turn: 'yellow',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 1,
    lastPiece: {
      row: 3,
      col: 0,
    },
    winner: null,
  };
  // Act
  const actualOutput = placePiece(gameState, column);
  // Assert
  expect(actualOutput).toEqual(expectedOutput);
});

test('When there are four red pieces in a row, red is the winner', () => {
  // Arrange
  const gameState = {
    rows: 0,
    cols: 0,
    boardArray: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      ['red', 'red', 'red', 'red'],
    ],
    turn: 'red',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 1,
    lastPiece: {
      row: 0,
      col: 0,
    },
    winner: null,
  };
  const row = 3;
  const col = 1;
  const totalCols = 4;
  jest.spyOn(server_functions, 'nextTurn').mockReturnValue('red');
  const expectedOutput = 'red';

  // Act
  const actualOutput = checkForWinner(gameState, row, col, totalCols);

  // Assert
  expect(actualOutput).toEqual(expectedOutput);
});
