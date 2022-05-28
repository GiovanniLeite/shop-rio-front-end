import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';

import MainContainer from '../../components/MainContainer';
import Banner from '../../components/HomeComponents/Banner';
import Offers from '../../components/HomeComponents/Offers';
import { Container } from './styled';

export default function Home() {
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([[], [], [], [], [], [], [], [], []]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/products/');

        /**START filtering by category */
        const mercearia = [];
        const hortifruti = [];
        const frios = [];
        const limpeza = [];
        const higiene = [];
        const bebidas = [];
        const doces = [];
        const acougue = [];
        const off = [];

        for (let i = 0; i < data.length; i++) {
          const enough =
            mercearia.length > 5 &&
            hortifruti.length > 5 &&
            frios.length > 5 &&
            limpeza.length > 5 &&
            higiene.length > 5 &&
            bebidas.length > 5 &&
            doces.length > 5 &&
            acougue.length > 5 &&
            off.length > 5;

          if (enough) {
            break;
          }

          switch (data[i].category_id) {
            case 8:
              if (mercearia.length < 6) mercearia.unshift(data[i]);
              break;
            case 10:
              if (hortifruti.length < 6) hortifruti.unshift(data[i]);
              break;
            case 9:
              if (frios.length < 6) frios.unshift(data[i]);
              break;
            case 6:
              if (limpeza.length < 6) limpeza.unshift(data[i]);
              break;
            case 7:
              if (higiene.length < 6) higiene.unshift(data[i]);
              break;
            case 2:
              if (bebidas.length < 6) bebidas.unshift(data[i]);
              break;
            case 4:
              if (doces.length < 6) doces.unshift(data[i]);
              break;
            case 1:
              if (acougue.length < 6) acougue.unshift(data[i]);
              break;
            default:
              break;
          }

          if (off.length < 6 && data[i].discount) {
            off.unshift(data[i]);
          }
        }
        setProducts([mercearia, hortifruti, frios, limpeza, higiene, bebidas, doces, acougue, off]);
        /**END filtering by category */
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }

    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>

      <MainContainer>
        <Container>
          <Banner />
          {isLoading && <p>Carregando ...</p>}
          {!isLoading && <Offers products={products} />}
        </Container>
      </MainContainer>
    </>
  );
}
