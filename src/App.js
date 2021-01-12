import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./Config/routes.js";
import AppRoute from "./Components/AppRoutes";
import { AuthProvider } from "./Context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              onlyAdmin={route.onlyAdmin}
            />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
