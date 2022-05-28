import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import { Container } from './styled';
import api_url from '../../../config/api';

export default function Banner() {
  return (
    <Container>
      <Carousel autoPlay interval={5000} infiniteLoop={true} showArrows={false} showStatus={false} showThumbs={false}>
        <Link
          className="link"
          to={{
            pathname: '/category/10',
            state: { name: 'Hortifruti' },
          }}
          title="Veja mais"
        >
          <div>
            <img className="desktop" src={`${api_url}/images/2221_aiwt4e.jpg`} />
            <img className="mobile" src={`${api_url}/images/1_pakoup.jpg`} />
          </div>
        </Link>
        <Link
          className="link"
          to={{
            pathname: '/category/1',
            state: { name: 'Açougue' },
          }}
          title="Veja mais"
        >
          <div>
            <img className="desktop" src={`${api_url}/images/2201_bloqtu.jpg`} />
            <img className="mobile" src={`${api_url}/images/2_zx7ylc.jpg`} />
          </div>
        </Link>
        <Link
          className="link"
          to={{
            pathname: '/category/3',
            state: { name: 'Bebidas Alcoólicas' },
          }}
          title="Veja mais"
        >
          <div>
            <img className="desktop" src={`${api_url}/images/2199_fjxsvy.jpg`} />
            <img className="mobile" src={`${api_url}/images/3_yig0kb.jpg`} />
          </div>
        </Link>
      </Carousel>
    </Container>
  );
}
