import styled from 'styled-components';

export const Container = styled.section`
  @media only screen and (max-width: 700px) {
    padding-top: 85px;
  }

  div {
    max-width: 400px;
    background: #fff;
    margin: 30px auto;
    padding: 30px;
    box-shadow: 0 0 10px #666;
    text-align: center;
    color: #333;

    @media only screen and (max-width: 500px) {
      width: 350px;
    }

    @media only screen and (max-width: 420px) {
      width: 300px;
    }
  }
`;
