import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    font-family: 'Open Sans', sans-serif;
    max-width: 650px;
    margin: 0 auto;

    @media only screen and (max-width: 700px) {
      padding-top: 85px;
      max-width: 700px;
    }

    button.MuiButtonBase-root {
      font-weight: bold;
      font-size: 11px;
      color: ${theme.colors.blueButton};
    }

    .Mui-selected {
      color: #000;

      span.MuiTouchRipple-root {
        color: ${theme.colors.blueButton};
      }
    }

    span.MuiTabs-indicator {
      background-color: ${theme.colors.blueButton};
    }

    a.admButton {
      display: block;
      background-color: ${theme.colors.blueButton};
      padding: 10px;
      color: #fff;
      border: none;
      border-radius: 3px;
      margin: 0 auto;
      width: 100%;
      min-width: 300px;
      margin-bottom: ${theme.spacings.small};

      &:hover {
        background-color: ${theme.colors.blueHover};
        cursor: pointer;
      }
    }
  `}
`;
