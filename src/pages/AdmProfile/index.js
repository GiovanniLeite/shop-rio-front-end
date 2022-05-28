import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import Pending from '../../components/AdmProfile/Pending';
import Report from '../../components/AdmProfile/Report';
import Profile from '../../components/AdmProfile/Profile';
import Security from '../../components/AdmProfile/Security';
import MainContainer from '../../components/MainContainer';
import { Container } from './styled';

export default function AdmProfile() {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  if (user.adm !== 1 && user.adm !== 2) {
    history.push('/profile/');
  }

  const [value, setValue] = useState(0);

  const mediumViewport = useMediaQuery('(min-width:700px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>{user.name || 'Perfil'} | Administrador | shopRio</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Helmet>
      <MainContainer>
        <Container>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              display: mediumViewport ? 'flex' : 'block',
            }}
          >
            <Tabs
              orientation={mediumViewport ? 'vertical' : 'horizontal'}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider', bgcolor: mediumViewport ? '#fff' : '#ebebeb' }}
            >
              <Tab label="Pendentes" {...a11yProps(0)} />
              <Tab label="Relatórios" {...a11yProps(1)} />
              <Tab label="Perfil" {...a11yProps(2)} />
              <Tab label="Segurança" {...a11yProps(3)} />
              <Tab label="ADM" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Pending />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Report />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Profile />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Security />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Link to="/adm/search-categories/categories" className="admButton">
                Categorias
              </Link>
              <Link to="/adm/search-products/products" className="admButton">
                Produtos
              </Link>
              {user.adm === 2 && (
                <Link to="/adm/search-users/users" className="admButton">
                  Usuários
                </Link>
              )}
            </TabPanel>
          </Box>
        </Container>
      </MainContainer>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
