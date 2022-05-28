import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    form {
      width: 400px;
      padding: ${theme.spacings.small};
      color: ${theme.colors.gray2};
      background-color: ${theme.colors.white3};
      border-radius: 3px;
      margin: 0 auto;

      @media only screen and (max-width: 500px) {
        width: 350px;
      }

      @media only screen and (max-width: 420px) {
        width: 300px;
      }

      label,
      input,
      button {
        display: block;
      }

      label {
        font-weight: bold;
      }

      input,
      select {
        padding: ${theme.spacings.small};
        margin-bottom: ${theme.spacings.small};
        background-color: ${theme.colors.lightGray};
        border: none;
        border-radius: 3px;
        width: 100%;
      }

      input:focus,
      select:focus {
        outline: none;
      }

      button {
        background-color: ${theme.colors.blueButton};
        padding: 10px;
        color: #fff;
        border: none;
        border-radius: 3px;
        margin: 0 auto;
        width: 100%;
        margin-bottom: ${theme.spacings.small};

        &:hover {
          background-color: ${theme.colors.blueHover};
          cursor: pointer;
        }
      }

      button:disabled {
        background: ${theme.colors.lightGray};
        cursor: auto;
      }
    }
  `}
`;
