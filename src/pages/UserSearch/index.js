import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { AiFillCaretRight } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';
import api_url from '../../config/api';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function UserSearch(props) {
  const handleError = useHandleError();
  const idCategory = get(props, 'match.params.idCategory', '');
  const name = get(props, 'location.state.name', '');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  // Pagination
  const [products, setProducts] = useState([]); // current list of items
  const [fullListItems, setFullListItems] = useState([]); // full list of items
  const [numberOfPages, setNumberOfPages] = useState(1); //number of pages
  const maxItemsAllowed = 12; // maximum items allowed
  const [currentPage, setCurrentPage] = useState(1); // current page

  function pagination(data) {
    if (data.length > maxItemsAllowed) {
      let a = data.length / maxItemsAllowed;
      setNumberOfPages(Math.ceil(a));
      setFullListItems(data);
      setProducts(data.slice(0, maxItemsAllowed));
    } else {
      setNumberOfPages(1);
      setFullListItems(data);
      setProducts(data);
    }

    setCurrentPage(1); // att buttons
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        // category
        if (idCategory === '11') {
          // id 11 = offers
          let { data } = await axios.get(`/products/`);
          data = data.filter((e) => e.discount);
          pagination(data);
          setIsLoading(false);
          return;
        } else if (idCategory) {
          const { data } = await axios.get(`/products/category/${idCategory}`);
          pagination(data);
          setIsLoading(false);
          return;
        }

        // id or name of product
        const urlSearch = get(props, 'match.params.searchText', '');
        if (!urlSearch.match(/[a-zA-Z]+/gi)) {
          // search by id
          const response = await axios.get(`/products/${urlSearch}`); // return object
          const data = response.data ? [response.data] : [];
          pagination(data);
        } else {
          // search by name
          const { data } = await axios.get(`/products/name/${urlSearch}`); // return array
          pagination(data);
        }
      } catch (err) {
        handleError(err);
      }
      setIsLoading(false);
    }

    getData();
    // eslint-disable-next-line
  }, [idCategory, props]);

  const handleSearchBar = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // id or name of product
      if (!search.match(/[a-zA-Z]+/gi)) {
        // search by id
        const response = await axios.get(`/products/${search}`); // return object
        const data = response.data ? [response.data] : [];
        pagination(data);
      } else {
        // search by name
        const { data } = await axios.get(`/products/name/${search}`); // return array
        pagination(data);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  const handleCart = async (productId, productImg, productName, price, remainingAmount) => {
    if (!isLoggedIn) {
      toast.warning('Necessário login');
      return;
    }

    if (user.adm !== 0) {
      toast.error('Erro conta de Administrador');
      return;
    }

    if (user.open_cart !== 1) {
      toast.error('Carrinho fechado');
      return;
    }

    if (remainingAmount < 1) {
      toast.warning('Produto fora de estoque');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(`/products/${productId}`); // table product
      // checks the amount every time you click the button
      if (data.quantity < 1) {
        toast.warning('Produto fora de estoque');
        return;
      } else {
        // check duplication in cart
        const currentCart = await axios.get(`/carts/user/${user.id}&${user.current_cart_code}`); // table cart
        const duplicate = currentCart.data.filter((e) => e.product_id === productId);

        await axios.put(`/products/${productId}`, { quantity: data.quantity - 1 });

        if (duplicate.length > 0) {
          await axios.put(`/carts/${duplicate[0].id}`, { quantity: duplicate[0].quantity + 1 });
        } else {
          await axios.post(`/carts/`, {
            user_id: user.id,
            product_id: productId,
            product_img: productImg,
            product_name: productName,
            quantity: 1,
            price,
            cart_code: user.current_cart_code,
          });
        }
        toast.success(`${productName.slice(0, 10)} adicionado ao carrinho`);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  function handlePreviousNext(e, isNext) {
    e.preventDefault();

    if (isNext) {
      const nextPage = currentPage + 1;
      const end = nextPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setProducts(fullListItems.slice(start, end));
      setCurrentPage(currentPage + 1);
    } else {
      const previousPage = currentPage - 1;
      const end = previousPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setProducts(fullListItems.slice(start, end));
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      <Helmet>
        <title>{name ? name : 'Procurar'} | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <div className="sectionOffers">
            {!idCategory && (
              <div className="searchBar">
                <div className="inputContent">
                  <div>
                    <form onSubmit={handleSearchBar}>
                      <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar ..."
                        title="Buscar por código ou nome"
                      />
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div className={`titleOffers ${idCategory ? 'cat' : ' '}`}>
              {!idCategory && <>Resultados da busca</>}
              {idCategory && (
                <>
                  {'Categorias '}
                  <AiFillCaretRight />
                  {' ' + name}
                </>
              )}
            </div>
            <div className="offers">
              {products.length > 0 &&
                products.map((e) => (
                  <div className="card" key={e.id}>
                    <span className={e.discount && 'discount'}>Desconto de {e.discount}%</span>
                    <Link to={`/product/${e.id}`} title={e.name}>
                      <img src={e.Pictures.length ? e.Pictures[0].url : `${api_url}/images/no-image.jpg`} />
                      <h3>{e.name.slice(0, 45)}</h3>
                    </Link>
                    <p className={e.old_price && 'discount'}>R$ {e.old_price}</p>
                    <h2>R$ {e.price}</h2>
                    <button
                      onClick={() => {
                        handleCart(
                          e.id,
                          e.Pictures.length ? e.Pictures[0].file_name : `no-image.jpg`,
                          e.name,
                          e.price,
                          e.quantity,
                        );
                      }}
                      title="Adicionar ao Carrino"
                    >
                      {e.quantity < 1 ? 'Sem estoque' : 'Adicionar'} <RiShoppingCart2Fill />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          {numberOfPages > 1 && (
            <div className="pagination">
              <div>
                {(currentPage > 1 && (
                  <button onClick={(e) => handlePreviousNext(e, false)} title="Anterior">
                    <MdNavigateBefore /> Anterior
                  </button>
                )) || (
                  <button title="Não existe página anterior" disabled>
                    <MdNavigateBefore /> Anterior
                  </button>
                )}
                {(currentPage < numberOfPages && (
                  <button onClick={(e) => handlePreviousNext(e, true)} title="Próximo">
                    Próximo <MdNavigateNext />
                  </button>
                )) || (
                  <button title="Não existe próxima página" disabled>
                    Próximo <MdNavigateNext />
                  </button>
                )}
              </div>
            </div>
          )}
        </Container>
      </MainContainer>
    </>
  );
}
