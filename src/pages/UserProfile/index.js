import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import UserNotification from '../../components/UserProfile/UserNotification';
import Profile from '../../components/UserProfile/Profile';
import Address from '../../components/UserProfile/Address';
import Cart from '../../components/UserProfile/Cart';
import Wishes from '../../components/UserProfile/Wishes';
import Security from '../../components/UserProfile/Security';
import MainContainer from '../../components/MainContainer';
import { Container } from './styled';

export default function UserProfile({ match, history }) {
  const user = useSelector((state) => state.auth.user);

  const tabNum = get(match, 'params.tab', 0);
  const [value, setValue] = useState(parseInt(tabNum));

  const mediumViewport = useMediaQuery('(min-width:700px)');

  useEffect(() => {
    if (user.adm != 0) {
      history.push('/adm/profile');
      return;
    }
    setValue(parseInt(tabNum));
    // eslint-disable-next-line
  }, [match]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>{user.name || 'Perfil'} | shopRio</title>
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
              <Tab label="Notificações" {...a11yProps(0)} />
              <Tab label="Perfil" {...a11yProps(1)} id="teste" />
              <Tab label="Endereço" {...a11yProps(2)} />
              <Tab label="Carrinho" {...a11yProps(3)} />
              <Tab label="Desejos" {...a11yProps(4)} />
              <Tab label="Segurança" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <UserNotification userId={user.id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Profile />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Address />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Cart />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Wishes userId={user.id} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Security />
            </TabPanel>
          </Box>
        </Container>
      </MainContainer>
    </>
  );
}

UserProfile.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};

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
