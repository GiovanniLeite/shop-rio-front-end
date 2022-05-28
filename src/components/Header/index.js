import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FaUserCircle, FaYoutubeSquare } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from 'react-icons/ai';
import { MdNotifications, MdPersonSearch } from 'react-icons/md';
import { BiCategory, BiCaretDown, BiCaretRight } from 'react-icons/bi';
import {
  RiLogoutBoxRFill,
  RiShoppingCart2Fill,
  RiHeart3Fill,
  RiUser3Fill,
  RiFileSearchLine,
  RiFileSearchFill,
} from 'react-icons/ri';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';
import useHandleError from '../../utils/useHandleError';

import { Container, FixedHeader, TopBar, MainBar, BottomBar } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const handleError = useHandleError();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/categories/');
        setCategories(data);
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }

    getData();
    // eslint-disable-next-line
  }, []);

  const handleHideMenu = () => {
    const element = document.querySelector('input#check');
    element.checked = !element.checked;
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push('/home');
  };

  const handleSearch = (e, sideBar) => {
    e.preventDefault();
    if (sideBar) handleHideMenu();
    history.push(`/search/${searchText}`);
  };

  return (
    <Container>
      <FixedHeader>
        <TopBar>
          <div>
            <ul className="socialMedia">
              <li title="Acesse o Instagram do shopRio">
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <AiFillInstagram />
                </a>
              </li>
              <li title="Acesse o Twitter do shopRio">
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  <AiFillTwitterSquare />
                </a>
              </li>
              <li title="Acesse o Facebook do shopRio">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <AiFillFacebook />
                </a>
              </li>
              <li title="Acesse o canal shopRio no Youtube">
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                  <FaYoutubeSquare />
                </a>
              </li>
            </ul>
            <ul className="subscribeLogin">
              {user.adm !== 1 && user.adm !== 2 && (
                <>
                  <li title="Perfil">
                    <Link to="/profile/1">
                      <RiUser3Fill />
                    </Link>
                  </li>
                  <li title="Notificações">
                    <Link to="/profile/0">
                      <MdNotifications />
                    </Link>
                  </li>
                  <li title="Carrinho">
                    <Link to="/profile/3">
                      <RiShoppingCart2Fill />
                    </Link>
                  </li>
                  <li title="Lista de Desejos">
                    <Link to="/profile/4">
                      <RiHeart3Fill />
                    </Link>
                  </li>
                </>
              )}
              {(user.adm === 1 || user.adm === 2) && (
                <>
                  <li title="Perfil">
                    <Link to="/adm/profile">
                      <RiUser3Fill />
                    </Link>
                  </li>
                  <li title="Procurar Categorias">
                    <Link to="/adm/search-categories/categories">
                      <RiFileSearchFill />
                    </Link>
                  </li>
                  <li title="Procurar Produtos">
                    <Link to="/adm/search-products/products">
                      <RiFileSearchLine />
                    </Link>
                  </li>
                </>
              )}
              {user.adm === 2 && (
                <li title="Procurar Usuários">
                  <Link to="/adm/search-users/users">
                    <MdPersonSearch />
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li title="Sair">
                  <a onClick={(e) => handleLogout(e)}>
                    <RiLogoutBoxRFill />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </TopBar>
        <MainBar>
          <div>
            <input type="checkbox" id="check" />
            <label id="icon" htmlFor="check" title="Menu">
              <svg width="30" height="30">
                <path d="M0,5 30,5" stroke="#fff" strokeWidth="4" />
                <path d="M0,15 30,15" stroke="#fff" strokeWidth="4" />
                <path d="M0,25 30,25" stroke="#fff" strokeWidth="4" />
              </svg>
              <span>MENU</span>
            </label>
            <div className="sideBar">
              <nav>
                <div className="searchSideBar">
                  <div>
                    <form onSubmit={(e) => handleSearch(e, true)}>
                      <input
                        type="text"
                        name="search"
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Buscar ..."
                        title="Buscar ..."
                      />
                    </form>
                  </div>
                </div>
                <div id="categoriesSide">
                  <input type="checkbox" id="checkCategoriesSideBar" />
                  <label id="showCategoriesSideBar" htmlFor="checkCategoriesSideBar" title="Categorias">
                    <BiCategory /> Categorias <BiCaretDown />
                  </label>
                  <ul id="categoriesSideBar">
                    {isLoading && <li>Carregando ...</li>}
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={{
                            pathname: `/category/${category.id}`,
                            state: { name: category.name },
                          }}
                          onClick={() => handleHideMenu()}
                        >
                          {category.name}
                          <span>
                            <BiCaretRight />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {user.adm !== 1 && user.adm !== 2 && (
                  <>
                    <Link to="/profile/1" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <RiUser3Fill /> Perfil
                      </div>
                    </Link>
                    <Link to="/profile/0" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <MdNotifications /> Notificações
                      </div>
                    </Link>
                    <Link to="/profile/3" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <RiShoppingCart2Fill /> Carrinho
                      </div>
                    </Link>
                    <Link to="/profile/4" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <RiHeart3Fill /> Desejos
                      </div>
                    </Link>
                  </>
                )}
                {(user.adm === 1 || user.adm === 2) && (
                  <>
                    <Link to="/adm/profile" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <RiUser3Fill /> Perfil
                      </div>
                    </Link>
                    <Link to="/adm/search-categories/categories" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <RiFileSearchFill /> Categorias
                      </div>
                    </Link>
                    <Link to="/adm/search-products/products" onClick={() => handleHideMenu()}>
                      <div className="link">
                        <RiFileSearchLine /> Produtos
                      </div>
                    </Link>
                  </>
                )}
                {user.adm === 2 && (
                  <Link to="/adm/search-users/users" onClick={() => handleHideMenu()}>
                    <div className="link">
                      <MdPersonSearch /> Usuários
                    </div>
                  </Link>
                )}
                {isLoggedIn ? (
                  <a
                    onClick={(e) => {
                      handleLogout(e), handleHideMenu();
                    }}
                  >
                    <div className="link">
                      <RiLogoutBoxRFill /> Sair
                    </div>
                  </a>
                ) : (
                  <Link to="/login" onClick={() => handleHideMenu()}>
                    <div className="link login" title="Acessar">
                      <div className="loginZ">
                        <FaUserCircle size={28} />
                      </div>
                      <div>
                        acesse sua conta
                        <br />
                        <span>ou cadastre-se grátis</span>
                      </div>
                    </div>
                  </Link>
                )}
              </nav>
            </div>
            <label className="darkBackground" htmlFor="check">
              <div className="darkBackground"></div>
            </label>
          </div>

          <div className="home">
            <Link to="/home" title="home">
              shopRio
            </Link>
          </div>

          <div className="searchBar" title="Buscar ...">
            <form onSubmit={(e) => handleSearch(e, false)}>
              <input
                type="text"
                name="search"
                className="search"
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Buscar ..."
              />
            </form>
          </div>
        </MainBar>
      </FixedHeader>
      <BottomBar className="bottomBar">
        <div>
          <input type="checkbox" id="checkCategories" />
          <label id="showCategories" htmlFor="checkCategories" title="Categorias">
            Categorias <BiCaretDown />
          </label>
          <nav id="categoriesBottomBar">
            <ul>
              {isLoading && <li>Carregando ...</li>}
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={{
                      pathname: `/category/${category.id}`,
                      state: { name: category.name },
                    }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </BottomBar>
    </Container>
  );
}
