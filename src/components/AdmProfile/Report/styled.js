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

      div {
        margin: ${theme.spacings.small} 0;
      }

      h2 {
        text-align: center;
      }

      label {
        padding-left: ${theme.spacings.verySmall};
      }

      input[type='text'],
      input[type='date'] {
        padding: ${theme.spacings.small};
        margin-bottom: ${theme.spacings.small};
        background-color: ${theme.colors.lightGray};
        border: none;
        border-radius: 3px;
        width: 100%;
      }

      input[type='text'],
      input[type='date'] :focus {
        outline: none;
      }

      button {
        background-color: ${theme.colors.blueButton};
        padding: 10px;
        color: #fff;
        border: none;
        border-radius: 3px;
        margin-bottom: ${theme.spacings.small};
        width: 100%;

        /* to align icon */
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: ${theme.colors.blueHover};
          cursor: pointer;
        }
      }

      button > svg {
        margin-left: 5px;
      }
    }
  `}
`;
