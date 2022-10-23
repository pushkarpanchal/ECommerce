import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const routing = useRoutes(routes);
  return (
    <div>
      {/* {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={route.element}
          >
            {route.children &&
              route.children.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={route.element}
                  />
                );
              })}
          </Route>
        );
      })} */}
      {routing}
    </div>
  );
}

export default App;
