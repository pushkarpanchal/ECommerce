import React from "react";
// Layout Types
import DefaultLayout from "./Layouts/DefaultLayout";
import Login from "./Layouts/Login";
import Product from "./Layouts/Product";
import ProductDetail from "./Layouts/ProductDetail";
import Dashboard from "./Layouts/Dashboard";
import Cart from "./Layouts/Cart";
import Admin from "./Layouts/Admin";

// Route Views

export default [
  {
    path: "/",
    exact: true,
    element: <Login />,
  },
  {
    path: "dashboard",
    exact: true,
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        element: <Product />,
        exact: true,
        path: "product",
      },
      {
        element: <ProductDetail />,
        path: "product/:id",
      },
      {
        element: <Cart />,
        exact: true,
        path: "cart",
      },
      {
        element: <Admin />,
        exact: true,
        path: "admin",
      },
    ],
  },
];
