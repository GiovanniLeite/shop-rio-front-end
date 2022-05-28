import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 100%;
    max-width: 600px;
    padding: ${theme.spacings.small};
    color: ${theme.colors.gray2};
    background-color: ${theme.colors.white3};
    border-radius: 3px;
    margin: 0 auto;

    form {
      width: 100%;
      display: grid;
      grid-template-columns: 37% 37% 26%;
      position: relative;

      @media only screen and (max-width: 500px) {
        grid-template-columns: 100%;
      }
    }

    form.email {
      grid-template-columns: 74% 26%;

      @media only screen and (max-width: 500px) {
        grid-template-columns: 100%;
      }
    }

    label {
      font-weight: bold;
      padding-right: ${theme.spacings.small};

      @media only screen and (max-width: 500px) {
        font-size: 90%;
        padding-right: 0;
      }
    }

    input {
      width: 100%;
      padding: ${theme.spacings.small};
      margin-bottom: ${theme.spacings.small};
      background-color: ${theme.colors.lightGray};
      border: none;
      border-radius: 3px;
    }

    button {
      background-color: ${theme.colors.blueButton};
      padding: 10px;
      color: #fff;
      border: none;
      border-radius: 3px;
      margin-top: 24px;
      max-height: 35px;

      &:hover {
        background-color: ${theme.colors.blueHover};
        cursor: pointer;
      }

      @media only screen and (max-width: 500px) {
        margin-top: 0;
        margin-bottom: ${theme.spacings.small};
      }
    }

    button.delete {
      background-color: red;

      &:hover {
        opacity: 0.8;
      }
    }
  `}
`;
