import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Home from '../pages/Home';
import Product from '../pages/Product';
import UserSearch from '../pages/UserSearch';
import Login from '../pages/Login';
import UserProfile from '../pages/UserProfile';
import AdmProfile from '../pages/AdmProfile';
import EditImage from '../pages/EditImage';
import AdmSearch from '../pages/AdmSearch';
import AdmEditProduct from '../pages/AdmEditProduct';
import AdmEditCategory from '../pages/AdmEditCategory';
import AdmEditUser from '../pages/AdmEditUser';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed={false} />
      <MyRoute exact path="/home/" component={Home} isClosed={false} />
      <MyRoute exact path="/product/:id" component={Product} isClosed={false} />
      <MyRoute exact path="/search/:searchText" component={UserSearch} isClosed={false} />
      <MyRoute exact path="/category/:idCategory" component={UserSearch} isClosed={false} />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      {/* user profile */}
      <MyRoute exact path="/profile/:tab" component={UserProfile} isClosed />
      <MyRoute exact path="/profile/" component={UserProfile} isClosed />
      {/* adm profile */}
      <MyRoute exact path="/adm/profile/" component={AdmProfile} isClosed />
      {/* adm categories */}
      <MyRoute exact path="/adm/search-categories/:name" component={AdmSearch} isClosed />
      <MyRoute exact path="/adm/new-categories/:new" component={AdmEditCategory} isClosed />
      <MyRoute exact path="/adm/edit-categories/:id" component={AdmEditCategory} isClosed />
      {/* adm products */}
      <MyRoute exact path="/adm/search-products/:name" component={AdmSearch} isClosed />
      <MyRoute exact path="/adm/new-products/:new" component={AdmEditProduct} isClosed />
      <MyRoute exact path="/adm/edit-products/:id" component={AdmEditProduct} isClosed />
      <MyRoute exact path="/adm/edit-image/:id" component={EditImage} isClosed />
      {/* edit users */}
      <MyRoute exact path="/adm/search-users/:name" component={AdmSearch} isClosed />
      <MyRoute exact path="/adm/new-users/:new" component={AdmEditUser} isClosed />
      <MyRoute exact path="/adm/edit-users/:id" component={AdmEditUser} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
