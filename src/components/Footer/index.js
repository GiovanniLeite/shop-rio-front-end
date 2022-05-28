import { AiFillInstagram, AiOutlineTwitter, AiFillYoutube } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Container, TopBar, BottomBar } from './styled';
import { FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <Container>
      <TopBar>
        <div>
          <ul>
            <li className="titleTopBarFooter">Sobre o shopRio</li>
            <li>
              <Link to="/">Quem somos</Link>
            </li>
            <li>
              <Link to="/">Fale com o shopRio</Link>
            </li>
            <li>
              <Link to="/">Anuncie</Link>
            </li>
            <li>
              <Link to="/">Privacidade</Link>
            </li>
            <li>
              <Link to="/">Termos de uso</Link>
            </li>
            <li>
              <Link to="/">
                Conheça nossos serviços
                <br />
                0800 713 1234
              </Link>
            </li>
          </ul>
          <ul>
            <li className="titleTopBarFooter">Para Você</li>
            <li>
              <Link to="/">Cartão shopRio</Link>
            </li>
            <li>
              <Link to="/">Clube de pontos shopRio</Link>
            </li>
            <li>
              <Link to="/">Ofertas shopRio</Link>
            </li>
            <li>
              <Link to="/">Trabalhe Conosco</Link>
            </li>
          </ul>
          <ul>
            <li className="titleTopBarFooter">Aplicativos</li>
            <li>
              <Link to="/">App shopRio</Link>
            </li>
          </ul>
        </div>
      </TopBar>
      <BottomBar>
        <div>
          <span className="logo">shopRio</span>
          <span className="copyright">© COPYRIGHT 2022, shopRio NETWORKS BRASIL S.A</span>
          <ul>
            <li title="Acesse o Instagram shopRio">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <AiFillInstagram />
              </a>
            </li>
            <li title="Acesse o Twitter shopRio">
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <AiOutlineTwitter />
              </a>
            </li>
            <li title="Acesse o Facebook shopRio">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
            </li>
            <li title="Acesse o canal shopRio no Youtube">
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                <AiFillYoutube />
              </a>
            </li>
          </ul>
        </div>
      </BottomBar>
    </Container>
  );
}
