import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.small};
    margin-bottom: ${theme.spacings.small};

    @media only screen and (max-width: 1200px) {
      margin-left: 3px;
      margin-right: 3px;
    }

    @media only screen and (max-width: 700px) {
      margin-bottom: 0;
    }

    a.link {
      height: 100%;
    }

    img.desktop {
      @media only screen and (max-width: 700px) {
        display: none;
      }
    }

    img.mobile {
      display: none;

      @media only screen and (max-width: 700px) {
        display: block;
      }
    }
  `}
`;
