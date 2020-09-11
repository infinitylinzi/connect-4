const each = require('jest-each').default;

const {
  drawArrows,
} = require('../app_files/browser_functions');
const { TestResult } = require('@jest/types');

test.skip('drawArrows', () => {
  each([
    // first input/output
    [
      // input
      [7],
      // output
      ['<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
      ],
    ],
    // second input/output
    [
      // input
      [1],
      // output
      ['<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>'],
    ],
    // third input/output
    [
      // input
      [0],
      // output
      [],
    ],
  ]).it('when the input is "%s"', (input, expected) => {
    actual_result = drawArrows(input);
    expect(actual_result).toStrictEqual(expected);
  });
});
