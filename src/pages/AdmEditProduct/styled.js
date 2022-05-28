import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    @media only screen and (max-width: 700px) {
      padding-top: 85px;
    }

    form {
      width: 600px;
      padding: ${theme.spacings.small};
      color: ${theme.colors.gray2};
      background-color: ${theme.colors.white3};
      border-radius: 3px;
      margin: ${theme.spacings.small} auto;

      @media only screen and (max-width: 700px) {
        width: 400px;
      }

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

      a {
        display: block;
        margin: ${theme.spacings.medium} 0;
      }

      a img {
        max-width: 300px;
        margin: 0 auto;
        border-radius: 3px;
        display: block;
      }

      label,
      input,
      textarea,
      button {
        display: block;
      }

      label {
        font-weight: bold;
      }

      input,
      textarea,
      select {
        padding: ${theme.spacings.small};
        margin-top: ${theme.spacings.verySmall};
        margin-bottom: ${theme.spacings.small};
        background-color: ${theme.colors.lightGray};
        border: none;
        border-radius: 3px;
        width: 100%;
      }

      textarea {
        height: 300px;

        @media only screen and (max-width: 700px) {
          height: 150px;
        }
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

        &:hover {
          background-color: ${theme.colors.blueHover};
          cursor: pointer;
        }
      }
    }
  `}
`;

export const Picture = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px;
    position: relative;
    margin-top: 20px;

    img {
      width: 95%;
      max-width: 150px;
    }

    a.icon {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      position: absolute;
      bottom: 0;
      color: ${theme.colors.blueButton};
      background: #fff;
      width: 36px;
      height: 36px;
      border-radius: 50%;

      &:hover {
        color: ${theme.colors.blueHover};
      }
    }
  `}
`;
