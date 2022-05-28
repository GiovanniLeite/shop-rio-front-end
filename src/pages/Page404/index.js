import { Helmet } from 'react-helmet';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Erro 404 | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Container>
          <div>
            <h1>Erro 404</h1>
            <br />
            <h1>Página não encontrada</h1>
            <br />
          </div>
        </Container>
      </MainContainer>
    </>
  );
}
