import styled, { css } from 'styled-components';

export const Container = styled.header`
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  position: relative;
  z-index: 3;

  a:hover {
    cursor: pointer;
  }
`;

export const FixedHeader = styled.div`
  position: fixed;
  width: 100%;
`;

export const TopBar = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.darkBlue2};
    position: absolute;
    z-index: 2;

    div {
      margin: 0 auto;
      max-width: 140rem;
      overflow: hidden;
      padding: ${theme.spacings.verySmall};

      a {
        text-decoration: none;
        color: #fff;

        /* to align icon */
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 0.8;
        }
      }

      @media only screen and (max-width: 1500px) {
        padding-left: ${theme.spacings.xLarge};
        padding-right: ${theme.spacings.xLarge};
      }

      @media only screen and (max-width: 1400px) {
        padding-left: ${theme.spacings.medium};
        padding-right: ${theme.spacings.medium};
      }

      @media only screen and (max-width: 700px) {
        padding-left: ${theme.spacings.small};
        padding-right: ${theme.spacings.small};
      }
    }

    ul.socialMedia {
      list-style: none;
      float: left;

      @media only screen and (max-width: 700px) {
        margin-top: 3px;
      }
    }

    ul.socialMedia li {
      display: inline-block;
    }

    ul.subscribeLogin {
      list-style: none;
      float: right;
    }

    ul.subscribeLogin li {
      display: inline-block;
      margin-left: 2px;
      margin-right: 2px;
      color: #fff;
    }

    ul.subscribeLogin li a {
      font-size: 80%;
    }
  `}
`;

export const MainBar = styled.div`
  ${({ theme }) => css`
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 103, 154, 1) 0%, rgba(0, 212, 255, 1) 100%);
    margin-top: 32px;
    box-shadow: 0 0 10px #000;


    @media only screen and (max-width: 700px) {
      height: 50px;
    }

    div {
      input#check {
        display: none;
      }

      input#check:checked ~ .darkBackground {
        display: block;
      }

      input#check:checked ~ label#icon {
        svg > path {
          stroke: #494950;
        }

        span {
          color: ${theme.colors.darkGray};
        }
      }

      input#check:checked ~ div.sideBar {
        transform: translateX(300px);
      }

      input#check:checked ~ div.sideBar nav a div.link {
        opacity: 1;
        margin-top: 0;
        transition-delay: 0.2s;
      }

      label#icon {
        cursor: pointer;
        padding: 10px;
        padding-bottom: 2px;
        position: absolute;
        z-index: 3;

        /* to align icon */
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          padding-left: 10px;
          color: #fff;
        }
      }

      div.sideBar {
        background-color: #eee;
        height: 100vh;
        width: 300px;
        position: absolute;
        transition: all 0.2s linear;
        left: -300px;
        z-index: 2;
        font-size: 12pt;


        @media only screen and (max-width: 700px) {
          margin-top: 3px;
        }

        @media only screen and (max-width: 460px) {
          margin-top: 0;
        }
      }

      nav {
        width: 100%;
        position: absolute;
        top: 50px;

        a {
          text-decoration: none;

          &:hover {
            opacity: 0.7;
          }
        }

        div.searchSideBar {
          padding: 5px;

          div {
            background-color: #fff;
            padding-right: 5px;
          }

          input {
            padding: 10px;
            width: 100%;
            background: url('http://localhost:3001/images/search_evmmru.png')
              no-repeat center right;
            border: none;
          }

          input:focus {
            outline: none;
          }
        }

        div.link {
          padding: 10px;
          transition: all 0.2 linear;
          color: ${theme.colors.darkGray};
          border-bottom: 1px solid #494950;

          &:hover {
            color: #797986;
          }
        }

        div#categoriesSide {
          border-bottom: 1px solid #494950;
          max-height: 300px;
          overflow: auto;

          /* width */
          ::-webkit-scrollbar {
            width: 6px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: ${theme.colors.gray};
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: ${theme.colors.gray2};
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: ${theme.colors.darkGray};
          }

          input#checkCategoriesSideBar {
            display: none;
          }

          input#checkCategoriesSideBar:checked ~ ul#categoriesSideBar {
            display: block;
          }

          label#showCategoriesSideBar {
            cursor: pointer;
            padding: 10px;
            display: block;

            &:hover {
              color: #797986;
            }
          }

          ul#categoriesSideBar {
            display: none;
            list-style: none;
          }

          ul#categoriesSideBar li {
            color: #494950;
            padding: 5px;
            margin-left: 25px;
            border-top: 1px solid #494950;
          }

          ul#categoriesSideBar li span {
            float: right;
          }

          ul#categoriesSideBar li a {
            color: #494950;
          }
        }

        div.link.login {
          color: ${theme.colors.darkBlue}
          font-weight: bold;
          display: grid;
          grid-template-columns: 15% 85%;

          div.loginZ {
            /* to align icon */
            display: flex;
            justify-content: center;
            align-items: center;
          }

          span {
            color: ${theme.colors.darkGray};
            font-weight: 400;
            font-size: 80%;
          }
        }
      }

      .darkBackground {
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1;
        display: none;
      }


    }

    div.home {
      margin: 0 auto;
      width: 132px;

      a {
        font-size: 200%;
        color: #fff;
        text-decoration: none;
      }

      @media only screen and (max-width: 500px) {
        width: 40px;
        padding-top: 8px;

        a {
          font-size: 150%;
        }
      }
    }

    div.searchBar {
      position: absolute;
      right: 15px;
      top: 42px;
      padding-right: 8px;
      background-color: #fff;

      @media only screen and (max-width: 650px) {
        display: none;
      }
    }

    input.search {
      background: url('http://localhost:3001/images/search_evmmru.png')
        no-repeat center right;
      padding: 10px;
      border: none;
      width: 85px;
      -webkit-transition: all 0.5s linear;
      transition: all 0.5s linear;
    }

    input.search:focus {
      width: 220px;
      outline: none; // tirar efeito do navegador de borda azul
    }
  `}
`;

export const BottomBar = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightGray};
    padding-top: 85px;

    @media only screen and (max-width: 700px) {
      display: none;
    }

    div {
      max-width: 140rem;
      margin: 0 auto;
    }

    input#checkCategories {
      display: none;
    }

    input#checkCategories:checked ~ nav#categoriesBottomBar {
      display: block;
    }

    label#showCategories {
      cursor: pointer;
      padding: 10px;
      display: block;

      @media only screen and (max-width: 600px) {
        display: none;
      }
    }

    nav#categoriesBottomBar {
      display: none;
      border-top: 1px solid #a3a3a3;
    }

    ul {
      list-style: none;
    }

    ul li {
      display: inline-block;
      padding: 10px;

      @media only screen and (max-width: 1300px) {
        font-size: 90%;
      }

      @media only screen and (max-width: 1205px) {
        font-size: 80%;
        padding: 10px;
      }

      @media only screen and (max-width: 1020px) {
        padding: 5px;
      }

      @media only screen and (max-width: 930px) {
        font-size: 70%;
      }
    }

    ul li a {
      text-decoration: none;
      color: ${theme.colors.gray2};
      letter-spacing: 0.7px;

      &:hover {
        opacity: 0.7;
      }
    }
  `}
`;
