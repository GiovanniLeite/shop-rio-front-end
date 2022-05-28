import { DialogActions } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { AiOutlineCheck, AiOutlineClose, AiFillFileAdd } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

import axios from '../../services/axios';
import useHandleError from '../../utils/useHandleError';

import MainContainer from '../../components/MainContainer';
import { Container, DialogZ } from './styled';
import Loading from '../../components/Loading';

export default function AdmSearch(props) {
  const table = get(props, 'match.params.name', '');
  const history = get(props, 'history', '');
  const user = useSelector((state) => state.auth.user);
  if (table === 'users' && user.adm !== 2) {
    history.push('/home/');
  }

  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [namePage, setNamePage] = useState(false);
  const [linkedRecords, setLinkedRecords] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [isInput, setisInput] = useState(false);
  const [currentRegister, setCurrentRegister] = useState({
    index: null,
    id: '',
    name: '',
  });

  // Pagination
  const [items, setItems] = useState([]); // current list of items
  const [fullListItems, setFullListItems] = useState([]); // full list of items
  const [numberOfPages, setNumberOfPages] = useState(1); //number of pages
  const maxItemsAllowed = 12; // maximum items allowed
  const [currentPage, setCurrentPage] = useState(1); // current page

  function pagination(data) {
    if (data.length > maxItemsAllowed) {
      let a = data.length / maxItemsAllowed;
      setNumberOfPages(Math.ceil(a));
      setFullListItems(data);
      setItems(data.slice(0, maxItemsAllowed));
    } else {
      setNumberOfPages(1);
      setFullListItems(data);
      setItems(data);
    }
    setCurrentPage(1); // att buttons
  }

  async function getData() {
    setIsLoading(true);
    try {
      // index
      if (!search) {
        const response = await axios.get(`/${table}/`);
        pagination(table === 'products' ? response.data.reverse() : response.data);
        setIsLoading(false);
        return;
      }

      // id or name
      if (!search.match(/[a-zA-Z]+/gi)) {
        // search by id
        const response = await axios.get(`/${table}/${search}`); // return object
        const data = response.data ? [response.data] : [];
        setItems(data);
        setNumberOfPages(1);
        setFullListItems(data);
      } else {
        // search by name
        const response = await axios.get(`/${table}/name/${String(search)}`); // return array
        pagination(table === 'products' ? response.data.reverse() : response.data);
      }
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    switch (table) {
      case 'categories':
        setNamePage('Categoria');
        setLinkedRecords('Produtos, Imagens e Carrinhos');
        break;
      case 'products':
        setNamePage('Produto');
        setLinkedRecords('Imagens e Carrinhos');
        break;
      case 'users':
        if (user.adm !== 2) return;
        setNamePage('Usuário');
        setLinkedRecords('Endereços, Notificações, Desejos e Carrinhos');
        break;
    }

    getData();
    // eslint-disable-next-line
  }, [props]);

  const handleSearch = async (e) => {
    e.preventDefault();
    getData();
    setisInput(true);
    setResult(search);
  };

  const handleDelete = async (index, id) => {
    setOpen(false);
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/${table}/${id}`);
      if (get(data, 'deleted', false)) {
        const newData = [...fullListItems];
        const a = currentPage - 1; // previous page
        const b = a * maxItemsAllowed; // last position of previous page
        const realIndex = b + index;
        newData.splice(realIndex, 1);
        pagination(newData);

        toast.success(`Cod.: ${currentRegister.id} ${currentRegister.name} foi apagado!`);
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
      setItems(fullListItems.slice(start, end));
      setCurrentPage(currentPage + 1);
    } else {
      const previousPage = currentPage - 1;
      const end = previousPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setItems(fullListItems.slice(start, end));
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      <Helmet>
        <title>Procurar | Administrador | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <div className="searchBar">
            <div className="inputContent">
              <div>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar ..."
                    title="Buscar por código ou nome"
                  />
                </form>
              </div>
            </div>
            {isInput && (
              <div>
                <p>
                  {items.length === 0 && 'Nenhum resultado para '}
                  {!(items.length === 0) && 'Resultados da busca por '}
                  <span>{result}</span>
                </p>
              </div>
            )}
          </div>
          <Link className="button newPage" to={`/adm/new-${table}/true`} title="Novo Registro">
            <AiFillFileAdd /> Adicionar {namePage || ''}
          </Link>
          <div className="result">
            <ul>
              <li>
                <span className="center">Código</span>
                <span>Nome</span>
                <span className="center">Editar</span>
                <span className="center">Excluir</span>
              </li>
              {get(items[0], 'id', false) &&
                items.map((e, index) => (
                  <li key={e.id}>
                    <span className="center">{e.id}</span>
                    <span title={e.name}>{e.name.slice(0, 80)}</span>
                    <span className="center">
                      <Link to={`/adm/edit-${table}/${e.id}`} title="Editar Registro">
                        <FiEdit />
                      </Link>
                    </span>
                    <span className="center">
                      <a
                        onClick={(elem) => {
                          elem.preventDefault();
                          setCurrentRegister({ index, id: e.id, name: e.name });
                          setOpen(true);
                        }}
                        title="Excluir Registro"
                      >
                        <FaTrash />
                      </a>
                    </span>
                  </li>
                ))}
            </ul>
            {numberOfPages > 1 && (
              <div className="pagination">
                <div>
                  {(currentPage > 1 && (
                    <button className="button" onClick={(e) => handlePreviousNext(e, false)} title="Anterior">
                      <MdNavigateBefore /> Anterior
                    </button>
                  )) || (
                    <button className="button" title="Não existe página anterior" disabled>
                      <MdNavigateBefore /> Anterior
                    </button>
                  )}
                  {(currentPage < numberOfPages && (
                    <button className="button" onClick={(e) => handlePreviousNext(e, true)} title="Próximo">
                      Próximo <MdNavigateNext />
                    </button>
                  )) || (
                    <button className="button" title="Não existe próxima página" disabled>
                      Próximo <MdNavigateNext />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
        <DialogZ
          open={open}
          onClose={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <h2>Apagar o registro abaixo?</h2>
          <div className="divH2" />
          <h3>
            <strong>Cod.:</strong> {currentRegister.id}
            <br />
            <strong>Nome:</strong> {currentRegister.name.slice(0, 80)}
          </h3>
          <h3>
            <strong className="warning">Atenção:</strong> Esta ação também irá apagar registros correlatos em
            {' ' + linkedRecords}, caso existam!
          </h3>
          <DialogActions>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(currentRegister.index, currentRegister.id);
              }}
              title="Confirmar"
            >
              Confirmar <AiOutlineCheck />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              title="Cancelar"
            >
              Cancelar <AiOutlineClose />
            </button>
          </DialogActions>
        </DialogZ>
      </MainContainer>
    </>
  );
}

AdmSearch.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
