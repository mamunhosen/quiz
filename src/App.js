import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./Config/routes.js";
import AppRoute from "./Components/AppRoutes";
import { AuthProvider, QuestionProvider, AnswerProvider } from "./Context";
import Navbar from "./Components/Navbar/index.js";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <QuestionProvider>
        <AnswerProvider>
          <Router>
            <Navbar />
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
        </AnswerProvider>
      </QuestionProvider>
    </AuthProvider>
  );
}

export default App;
