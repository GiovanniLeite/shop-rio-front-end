import styled, { css } from 'styled-components';
import api_url from '../../config/api';

export const Container = styled.section`
  ${({ theme }) => css`
    @media only screen and (max-width: 700px) {
      padding-top: 85px;
    }

    div.sectionOffers {
      padding: ${theme.spacings.medium} 0;

      @media only screen and (max-width: 700px) {
        padding-top: ${theme.spacings.small};
      }

      div.searchBar {
        margin-bottom: ${theme.spacings.medium};

        @media only screen and (max-width: 1200px) {
          margin-left: 3px;
          margin-right: 3px;
        }

        div.inputContent {
          padding: ${theme.spacings.verySmall};
          background: rgb(2, 0, 36);
          background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 53, 128, 1) 0%, rgba(0, 212, 255, 1) 57%);
          border-radius: 3px;

          div {
            padding-right: ${theme.spacings.verySmall};
            background-color: #fff;
            border-radius: 3px;
          }

          input {
            width: 100%;
            padding: ${theme.spacings.small};
            background: url(${`${api_url}/images/search_evmmru.png`}) no-repeat center right;
            border: none;
            background-color: #fff;
          }

          input:focus {
            outline: none;
          }
        }
      }

      div.titleOffers {
        background: rgb(2, 0, 36);
        background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 53, 128, 1) 0%, rgba(0, 212, 255, 1) 57%);
        padding: ${theme.spacings.small};
        border-radius: 3px;
        color: #fff;
        letter-spacing: 1px;

        span {
          font-weight: bold;
        }

        a {
          float: right;
          color: #fff;

          /* to align icon */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media only screen and (max-width: 1200px) {
          margin-left: 3px;
          margin-right: 3px;
        }
      }

      div.titleOffers.cat {
        /* to align icon */
        display: flex;
        align-items: center;
      }

      div.offers {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        padding-top: ${theme.spacings.verySmall};
        padding-bottom: ${theme.spacings.small};
      }

      div.card {
        margin: 3px;
        background-color: #fff;
        position: relative;
        border: 1px solid ${theme.colors.white2};

        &:hover {
          box-shadow: 0 0 10px #666;
          border: none;
        }

        span {
          color: #fff;
          font-size: 80%;
          background-color: ${theme.colors.blueHover};
          padding: ${theme.spacings.verySmall};
          opacity: 0;
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
        }

        .discount {
          opacity: 1;
        }

        img {
          width: 100%;
          z-index: 1;
        }

        h3 {
          text-align: center;
          color: ${theme.colors.gray2};
          font-size: 90%;
          height: 90px;

          &:hover {
            opacity: 0.7;
          }
        }

        p {
          text-decoration: line-through;
          text-align: center;
          color: ${theme.colors.gray};
          font-family: 'Open Sans', sans-serif;
          opacity: 0;
        }

        h2 {
          text-align: center;
          font-family: 'Open Sans', sans-serif;
          color: ${theme.colors.gray2};
        }

        button {
          cursor: pointer;
          width: 100%;
          border: none;
          padding: ${theme.spacings.verySmall};
          border-radius: 3px;
          background-color: ${theme.colors.blueButton};
          color: #fff;

          &:hover {
            background-color: ${theme.colors.blueHover};
          }
        }
      }
    }

    div.pagination {
      width: 100%;
      padding: 25px;

      div {
        margin: 0 auto;
        width: 205px;
        overflow: hidden;
        display: flex;
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

      button:disabled {
        background: ${theme.colors.lightGray};
        cursor: auto;
      }

      button + button {
        margin-left: 5px;
      }
    }
  `}
`;
