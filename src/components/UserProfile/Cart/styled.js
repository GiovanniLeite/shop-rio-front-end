import { Dialog } from '@mui/material';
import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;

    @media only screen and (max-width: 500px) {
      width: 350px;
    }

    @media only screen and (max-width: 420px) {
      width: 300px;
    }

    ul {
      list-style: none;
      display: grid;
      grid-template-columns: 10% 50% 5% 20% 5% 5%;
      gap: 4px;

      @media only screen and (max-width: 500px) {
        grid-template-columns: 25% 15% 30% 10% 10%;
      }
    }

    ul.title {
      font-weight: bold;
      border-radius: 3px 3px 0 0;
      min-width: 300px;

      @media only screen and (max-width: 500px) {
        border-bottom: 1px solid ${theme.colors.gray2};
        width: 350px;
      }

      @media only screen and (max-width: 420px) {
        width: 300px;
      }
    }

    div.content {
      width: 100%;
      min-width: 300px;
      max-height: 300px;
      overflow: auto;

      @media only screen and (max-width: 500px) {
        border-bottom: 1px solid ${theme.colors.gray2};
        width: 350px;
      }

      @media only screen and (max-width: 420px) {
        width: 300px;
      }

      /* width */
      ::-webkit-scrollbar {
        width: 6px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: ${theme.colors.white3};
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.lightGray};
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.gray};
      }
    }

    ul.amount {
      grid-template-columns: 100%;
      border-radius: 0 0 3px 3px;
      min-width: 300px;

      @media only screen and (max-width: 500px) {
        width: 350px;
      }

      @media only screen and (max-width: 420px) {
        width: 300px;
      }
    }

    ul.amount li {
      justify-content: right;
      align-items: right;
      padding-right: ${theme.spacings.verySmall};
    }

    li {
      display: inline-block;
      margin-left: 3px;
      margin-bottom: 3px;
      border-radius: 3px;
      font-size: 90%;

      /* to align icon */
      display: flex;
      justify-content: center;
      align-items: center;

      @media only screen and (max-width: 700px) {
        font-size: 80%;
      }

      @media only screen and (max-width: 500px) {
        height: 40px;
      }
    }

    ul:nth-child(2n + 1) {
      background-color: ${theme.colors.white2};
    }

    ul:nth-child(2n) {
      background-color: ${theme.colors.white3};
    }

    li.titleName {
      justify-content: left;
      align-items: left;

      @media only screen and (max-width: 500px) {
        justify-content: center;
        align-items: center;
      }
    }

    li.liImg {
      @media only screen and (max-width: 500px) {
        display: none;
      }
    }

    img {
      width: 100%;
      border-radius: 3px;
    }

    a {
      cursor: pointer;
    }

    a.disabled {
      cursor: auto;
      color: ${theme.colors.gray};
      opacity: 1;
    }

    button {
      background-color: ${theme.colors.blueButton};
      padding: 10px;
      color: #fff;
      border: none;
      width: 100%;
      margin: ${theme.spacings.small} 0;
      border-radius: 3px;

      &:hover {
        background-color: ${theme.colors.blueHover};
        cursor: pointer;
      }

      @media only screen and (max-width: 500px) {
        width: 350px;
      }

      @media only screen and (max-width: 420px) {
        width: 300px;
      }
    }

    button:disabled {
      background: ${theme.colors.lightGray};
      cursor: auto;
    }
  `}
`;

export const DialogZ = styled(Dialog)`
  ${({ theme }) => css`
    h3 {
      margin: 15px;
      margin-bottom: 5px;
      text-align: center;

      @media only screen and (max-width: 700px) {
        font-size: 90%;
      }
    }

    span {
      border-bottom: 1px solid ${theme.colors.gray2};
      width: 150px;
      margin: 0 auto;
      margin-top: ${theme.spacings.medium};
    }

    p {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      font-weight: bold;
      font-family: 'Open Sans', sans-serif;
      font-size: 120%;
      text-align: right;
      padding: ${theme.spacings.verySmall};
    }

    img {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      padding: ${theme.spacings.verySmall};
      margin-top: ${theme.spacings.medium};
    }

    .MuiDialogActions-root {
      display: grid;
      grid-template-columns: 100%;
    }

    div.unitPlus {
      height: 40px;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 33% 34% 33%;

      button {
        cursor: pointer;
        border: none;
        border-radius: 3px;

        &:hover {
          background-color: ${theme.colors.blueHover};
        }
      }

      input {
        border: none;
        border-radius: 3px;
        text-align: center;
      }
    }

    div.sideButton {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      margin-top: ${theme.spacings.verySmall};

      button {
        background-color: ${theme.colors.blueButton};
        height: 40px;
        width: 100%;
        color: #fff;
        border: none;
        margin-bottom: ${theme.spacings.verySmall};
        border-radius: 3px;
        cursor: pointer;
        /* to align icon */
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: ${theme.colors.blueHover};
        }
      }
    }
  `}
`;
