import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 400px;
    max-height: 300px;
    padding: 0 ${theme.spacings.small};
    color: ${theme.colors.gray2};
    overflow: auto;
    margin: 0 auto;

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
    }

    li:nth-child(2n + 1) {
      background-color: ${theme.colors.white2};
    }

    li:nth-child(2n) {
      background-color: ${theme.colors.white3};
    }

    li a {
      color: ${theme.colors.gray2};
    }

    li span {
      float: right;
      cursor: pointer;
      padding-top: 2px;
    }
  `}
`;
