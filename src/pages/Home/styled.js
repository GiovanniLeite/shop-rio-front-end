/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacings.xLarge};

    @media only screen and (max-width: 700px) {
      padding-top: 85px;
    }
  `}
`;
