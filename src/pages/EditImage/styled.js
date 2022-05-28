import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    @media only screen and (max-width: 700px) {
      padding-top: 85px;
    }

    div.box {
      max-width: 480px;
      background: #fff;
      margin: 20px auto;
      padding: 30px;
      box-shadow: 0 0 10px ${theme.colors.gray2};
      color: ${theme.colors.gray2};

      @media only screen and (max-width: 530px) {
        max-width: 350px;
        margin: ${theme.spacings.small} auto;
        padding: ${theme.spacings.small};
      }

      form {
        h4 {
          text-align: center;
        }

        label {
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme.colors.white2};
          border: 5px dashed ${theme.colors.blueButton};
          margin: 30px auto;
          margin-top: 5px;
          cursor: pointer;
          overflow: hidden;

          img {
            width: 280px;
            height: 280px;
          }
        }

        input {
          display: none;
        }
      }

      div.removeImg {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        div {
          width: calc(50% - 5px);

          img {
            width: 100%;
          }

          button {
            background-color: ${theme.colors.blueButton};
            padding: 5px;
            color: #fff;
            border: none;
            border-radius: 3px;
            margin: 0 auto;
            width: 100%;
            cursor: pointer;

            &:hover {
              background-color: ${theme.colors.blueHover};
            }
          }
        }
      }
    }
  `}
`;
