import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    @media only screen and (max-width: 700px) {
      padding-top: 85px;
    }

    form {
      width: 400px;
      padding: ${theme.spacings.small};
      color: ${theme.colors.gray2};
      background-color: ${theme.colors.white3};
      border-radius: 3px;
      margin: ${theme.spacings.small} auto;

      @media only screen and (max-width: 500px) {
        width: 350px;
      }

      @media only screen and (max-width: 420px) {
        width: 300px;
      }

      h2 {
        text-align: center;
        margin-bottom: ${theme.spacings.medium};
      }

      label,
      input,
      button {
        display: block;
      }

      label {
        font-weight: bold;
      }

      input {
        padding: ${theme.spacings.small};
        margin-top: ${theme.spacings.verySmall};
        margin-bottom: ${theme.spacings.small};
        background-color: ${theme.colors.lightGray};
        border: none;
        border-radius: 3px;
        width: 100%;
      }

      input:focus {
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
        cursor: pointer;

        &:hover {
          background-color: ${theme.colors.blueHover};
        }
      }
    }
  `}
`;
