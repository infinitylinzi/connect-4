const each = require('jest-each').default;
const {
  drawArrows,
} = require('./app');

describe('drawArrows', () => {
  each([
    // first input/output
    [
      // input
      [7],
      // output
      [
        ['<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
          '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
          '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
          '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
          '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
          '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
          '<span class="arrow-grid"><i class="fas fa-arrow-alt-circle-down fa-2x arrow-colour" aria-hidden="true"></i></span>',
        ],
      ],
    ],
  ]).it('when the input is "%s"', (input, expected) => {
    actual_result = drawArrows(input);
    expected(actual_result).toStrictEqual(expected);
  });
});
