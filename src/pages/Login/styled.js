import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    max-width: 120rem;
    margin: 0 auto;
    padding: ${theme.spacings.small};
    padding-top: 30px;
    padding-bottom: ${theme.spacings.xLarge};
    display: grid;
    grid-template-columns: 50% 50%;
    min-height: 600px;

    @media only screen and (max-width: 1200px) {
      min-height: 0;
    }

    @media only screen and (max-width: 700px) {
      grid-template-columns: 100%;
    }

    @media only screen and (max-width: 600px) {
      padding-top: 95px;
    }

    section.leftContent {
      overflow: hidden;
      padding-bottom: 5px;

      div.loginSub {
        float: right;
        margin-right: ${theme.spacings.small};
        width: 320px;

        @media only screen and (max-width: 700px) {
          float: none;
          margin: 0 auto;
        }
      }
    }

    section.rightContent {
      padding-bottom: 5px;

      form {
        @media only screen and (max-width: 700px) {
          margin-top: 5px;
        }
      }
    }

    form {
      max-width: 320px;
      background-color: #fff;
      padding: ${theme.spacings.small};
      text-align: center;
      border-top: 10px solid ${theme.colors.blueButton};
      box-shadow: 0 0 10px ${theme.colors.gray2};
      color: ${theme.colors.gray2};

      @media only screen and (max-width: 700px) {
        margin: 0 auto;
      }
    }

    h2 {
      padding-top: ${theme.spacings.medium};
      padding-bottom: ${theme.spacings.large};
    }

    input {
      width: 100%;
      padding: ${theme.spacings.small};
      display: block;
      margin-bottom: ${theme.spacings.small};
      text-align: center;
      background-color: ${theme.colors.lightGray};
      border: none;
    }

    input:focus {
      outline: none;
    }

    button {
      background-color: ${theme.colors.blueButton};
      padding: 10px;
      color: #fff;
      border: none;
      margin: 0 auto;
      width: 100%;

      &:hover {
        background-color: ${theme.colors.blueHover};
        cursor: pointer;
      }
    }
  `}
`;
