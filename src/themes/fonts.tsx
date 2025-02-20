import { Global } from '@emotion/react';

const fonts = [
  { family: 'MonaSans', weights: [400, 500, 600] },
  { family: 'WorkSans', weights: [400, 500, 600] },
];

function Fonts() {
  const generateFontFaces = () => {
    return fonts
      .map(({ family, weights }) =>
        weights
          .map(
            (weight) => `
          @font-face {
            font-family: '${family}-${weight === 400 ? 'Regular' : weight === 500 ? 'Medium' : 'SemiBold'}';
            font-weight: ${weight};
            src: url('./assets/fonts/${family}-${weight === 400 ? 'Regular' : weight === 500 ? 'Medium' : 'SemiBold'}.ttf') format('truetype');
            font-display: swap;
          }
        `,
          )
          .join(''),
      )
      .join('');
  };

  return <Global styles={generateFontFaces()} />;
}

export default Fonts;
