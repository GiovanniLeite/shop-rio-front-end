import styled, { css } from 'styled-components';
import { Dialog } from '@mui/material';

export const Container = styled.section`
  ${({ theme }) => css`
    margin: 0 auto;
    padding: ${theme.spacings.small};
    padding-top: 30px;
    padding-bottom: ${theme.spacings.xLarge};

    @media only screen and (max-width: 700px) {
      padding-top: 95px;
    }

    .button {
      background-color: ${theme.colors.blueButton};
      color: #fff;
      border: none;
      margin: ${theme.spacings.verySmall} 0;
      padding: ${theme.spacings.small};
      border-radius: 3px;
      font-weight: bold;
      cursor: pointer;
      /* to align icon */
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: ${theme.colors.blueHover};
      }
    }

    div.searchBar {
      margin-bottom: ${theme.spacings.small};

      div.inputContent {
        padding: ${theme.spacings.verySmall};
        background: rgb(2, 0, 36);
        background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 103, 154, 1) 0%, rgba(0, 212, 255, 1) 100%);
        border-radius: 3px;

        div {
          padding-right: ${theme.spacings.verySmall};
          background-color: #fff;
          border-radius: 3px;
        }

        input {
          width: 100%;
          padding: ${theme.spacings.small};
          background: url('http://localhost:3001/images/search_evmmru.png') no-repeat center right;
          border: none;
          background-color: #fff;
        }

        input:focus {
          outline: none;
        }
      }

      p {
        padding: ${theme.spacings.verySmall};
      }

      span {
        color: ${theme.colors.blueButton};
        font-weight: bold;
      }
    }

    a.newPage {
      background: rgb(2, 0, 36);
      background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 103, 154, 1) 0%, rgba(0, 212, 255, 1) 100%);
      padding: ${theme.spacings.small};
      margin-bottom: ${theme.spacings.medium};
      letter-spacing: 1px;

      &:hover {
        opacity: 1;
        background: rgb(0, 176, 243);
        background: linear-gradient(90deg, rgba(0, 176, 243, 1) 0%, rgba(38, 176, 215, 1) 100%);
      }
    }

    a.newPage svg {
      margin-right: ${theme.spacings.verySmall};
    }

    div.result {
      ul {
        list-style: none;
        font-weight: bold;
      }

      li {
        display: grid;
        grid-template-columns: 15% 55% 15% 15%;
        padding: ${theme.spacings.small};
        border-radius: 3px;
        margin-bottom: ${theme.spacings.verySmall};
        color: ${theme.colors.gray2};

        @media only screen and (max-width: 700px) {
          font-size: 90%;
        }

        @media only screen and (max-width: 600px) {
          grid-template-columns: 20% 40% 20% 20%;
        }

        @media only screen and (max-width: 500px) {
          font-size: 70%;
        }
      }

      li:nth-child(2n + 1) {
        background-color: ${theme.colors.white2};
      }

      li:nth-child(2n) {
        background-color: ${theme.colors.white3};
      }

      li a {
        color: ${theme.colors.gray2};
        cursor: pointer;
      }

      li span.center {
        /* to align icon */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      div.pagination {
        width: 100%;
        padding: 25px;

        div {
          margin: 0 auto;
          width: 172px;
          overflow: hidden;
          display: flex;
        }

        button:disabled {
          background: ${theme.colors.lightGray};
          cursor: auto;
        }

        button + button {
          margin-left: 5px;
        }
      }
    }
  `}
`;

export const DialogZ = styled(Dialog)`
  ${({ theme }) => css`
    h2 {
      text-align: center;
      letter-spacing: 0.7px;
    }

    div.divH2 {
      border-bottom: 1px solid ${theme.colors.gray2};
      margin: 0 auto;
      width: 150px;
    }

    h2,
    h3 {
      margin: 15px;
      max-width: 400px;
    }

    h3 {
      text-align: justify;
    }

    h3 strong {
      font-family: 'Open Sans', sans-serif;
    }

    h3 strong.warning {
      color: red;
    }

    button {
      background-color: ${theme.colors.blueButton};
      color: #fff;
      border: none;
      margin: ${theme.spacings.verySmall} 0;
      padding: ${theme.spacings.small};
      border-radius: 3px;
      font-weight: bold;
      cursor: pointer;
      /* to align icon */
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: ${theme.colors.blueHover};
      }
    }
  `}
`;
