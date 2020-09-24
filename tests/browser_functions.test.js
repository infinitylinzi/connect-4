const each = require('jest-each').default;
const { TestResult } = require('@jest/types');
const jquery = require('jquery');

jest.mock('jquery');

const browser_functions = require('../app_files/browser_functions');
const {
  getFormSize,
  drawNewGrid,
  drawArrows,
  updateGrid,
  updateUiWinner,
  updateUiTurn,
  setBoardArray,
  newGame,
} = require('../app_files/browser_functions');

test('Board array in the browser matches board array in the server', () => {
  // Arrange
  const gameState = {
    rows: 6,
    cols: 7,
    boardArray: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
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
  const rows = 6;
  const cols = 7;
  const expectedOutput = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];

  // Act
  const actualOutput = setBoardArray(gameState, rows, cols);

  // Assert
  expect(actualOutput).toEqual(expectedOutput);
});

test.skip('the gamestate is reset to start a new game', () => {
  // Arrange
  const gameState = {
    rows: 6,
    cols: 7,
    boardArray: [
      [null, 'red', null, null, null, null, null],
      [null, 'red', null, null, null, null, null],
      [null, 'red', null, null, null, null, null],
      [null, 'red', null, null, null, null, null],
      [null, 'yellow', 'red', 'yellow', null, null, null],
      ['yellow', 'yellow', 'yellow', 'red', 'red', 'yellow', null],
    ],
    turn: 'yellow',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 12,
    lastPiece: {
      row: 0,
      col: 1,
    },
    winner: 'red',
  };

  // what do I need to do with these???
  const userInputRows = jquery.mockReturnValue(6);
  const userInputCols = jquery.mockReturnValue(7);

  const mockSetBoardArray = jest.fn().mockImplementation;
  //   jest.mockImplementation(setBoardArray(gameState, userInputRows, userInputCols) => {

  //   })

  const expectedOutput = {
    rows: 6,
    cols: 7,
    boardArray: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    turn: 'yellow',
    scoreRed: 0,
    scoreYellow: 0,
    gameId: 13,
    lastPiece: {
      row: 0,
      col: 0,
    },
    winner: null,
  };

  // Act
  const actualOutput = newGame(gameState);

  // Assert
  expect(actualOutput).toEqual(expectedOutput);
});

// jquery.mockReturnValue(value)
