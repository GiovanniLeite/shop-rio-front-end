import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 600px;
    padding: 0 ${theme.spacings.small};
    color: ${theme.colors.gray2};
    max-height: 300px;
    overflow: auto;
    margin: 0 auto;

    @media only screen and (max-width: 800px) {
      width: 500px;
    }

    @media only screen and (max-width: 600px) {
      width: 400px;
    }

    @media only screen and (max-width: 500px) {
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

    ul {
      list-style: none;
      font-weight: bold;
      width: 100%;
    }

    li {
      padding: ${theme.spacings.small};
      border-radius: 3px;
      margin-bottom: ${theme.spacings.verySmall};
      position: relative;
      display: flex;

      @media only screen and (max-width: 800px) {
        font-size: 80%;
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

    li img {
      height: 24px;
      width: 24px;
      border-radius: 3px;
      margin-right: ${theme.spacings.small};
    }

    li a {
      color: ${theme.colors.gray2};
      /* to align icon */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    li span {
      position: absolute;
      top: 11px;
      right: 8px;
      width: 24px;
      height: 24px;
      padding-top: 3px;
      cursor: pointer;
      background-color: #fff;
      border-radius: 3px;

      @media only screen and (max-width: 800px) {
        padding-top: 5px;
      }

      @media only screen and (max-width: 500px) {
        padding-top: 6px;
      }
    }
  `}
`;
