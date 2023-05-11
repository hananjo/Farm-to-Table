import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CreateProductForm from "./components/CreateProductForm/CreateProductForm";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import Cart from "./components/Cart";
import NotFound from "./components/PageNotFound/"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" component={Products} />
          <Route exact path="/products/new" component={CreateProductForm} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/products/:id/update" component={UpdateProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
