import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    min-height: calc(100vh - 370px);
    max-width: 120rem;
    width: 100%;
    font-size: ${theme.font.sizes.medium};
    margin: 0 auto;
    //position: relative;
    z-index: 0;
  `}
`;
