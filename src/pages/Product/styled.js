/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    color: ${theme.colors.gray2};
    padding: ${theme.spacings.xLarge} 0;

    @media only screen and (max-width: 900px) {
      padding: ${theme.spacings.medium} 0;
    }

    @media only screen and (max-width: 600px) {
      padding-top: 100px;
    }

    a {
      color: ${theme.colors.gray2};
      width: 100%;
      padding-left: 15px;
      font-weight: bold;

      @media only screen and (max-width: 900px) {
        font-size: 80%;
      }
    }

    div.mainInfo {
      display: grid;
      grid-template-columns: 34% 66%;

      @media only screen and (max-width: 900px) {
        grid-template-columns: 50% 50%;
      }

      @media only screen and (max-width: 650px) {
        grid-template-columns: 100%;
      }

      div.images {
        h3 {
          text-align: center;
          display: none;
          margin-top: ${theme.spacings.medium};

          @media only screen and (max-width: 650px) {
            display: block;
          }
        }
      }

      div.info {
        display: grid;
        grid-template-columns: 60% 40%;
        padding: 15px;

        @media only screen and (max-width: 900px) {
          grid-template-columns: 100%;
        }

        div.title {
          padding-right: 5px;
        }

        h3 {
          font-size: 150%;

          @media only screen and (max-width: 900px) {
            font-size: 120%;
          }

          @media only screen and (max-width: 650px) {
            display: none;
          }
        }

        h4 {
          margin: ${theme.spacings.medium} 0;
          color: ${theme.colors.gray};
        }

        p {
          font-size: 150%;
          font-family: 'Open Sans', sans-serif;
          color: ${theme.colors.gray};
          text-decoration: line-through;

          @media only screen and (max-width: 1000px) {
            font-size: 100%;
          }
        }

        h2 {
          font-size: 260%;
          font-family: 'Open Sans', sans-serif;

          @media only screen and (max-width: 1000px) {
            font-size: 200%;
          }
        }

        div > div {
          width: 100%;
          display: grid;
          grid-template-columns: 15% 70% 15%;
          margin-bottom: ${theme.spacings.medium};

          button,
          input {
            border: none;
            height: 40px;
          }

          button {
            background-color: #ddd;
          }

          input {
            text-align: center;
            font-weight: bold;
          }
        }

        button.cart,
        button.wish {
          border: none;
          border-radius: 3px;
          width: 100%;
          font-size: 150%;
          font-weight: bold;
          letter-spacing: -1px;
          color: #fff;
          padding: 15px 0;
          margin-top: ${theme.spacings.small};
          background-color: ${theme.colors.blueButton};

          @media only screen and (max-width: 1000px) {
            font-size: 120%;
          }
        }

        button:hover {
          cursor: pointer;
          background-color: ${theme.colors.blueHover};
        }
      }
    }

    div.description {
      padding: 15px;
      background-color: ${theme.colors.white2};

      @media only screen and (max-width: 1250px) {
        margin: 0 15px;
      }

      p {
        margin: ${theme.spacings.small};
      }
    }
  `}
`;
