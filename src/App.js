import React, {useEffect, useReducer} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './style.scss';
import HomeContainer from "./containers/HomeContainer";
import Header from "./components/HeaderComponent";
import ViewArticleContainer from "./containers/ViewArticleContainer";
import CreateArticleContainer from "./containers/CreateArticleContainer";
import LoginContainer from "./containers/LoginContainer";
import {userReducer} from "./reducers";
import {getToken} from "./utils";
import {isAuthService} from "./services/userService";
import {SET_USER} from "./actions";
import {ROUTE} from "./constants";
import ViewTagContainer from "./containers/ViewTagContainer";

const initalUserState = null;
export const UserContext = React.createContext(initalUserState);

function App() {
  const [userStore, userDispatch] = useReducer(userReducer, {});

  useEffect(() => {
    if (getToken()) {
      isAuthService(getToken()).then((res) => {
        if (res && res.name) {
          userDispatch({type: SET_USER, payload: res});
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, []);

  return (
    <UserContext.Provider value={{userStore, userDispatch}}>
    <div className="App">
      <BrowserRouter>
        <Header userStore={userStore} userDispatcher={userDispatch}/>
        <Switch>
          <Route
            exact
            path={ROUTE.HOME}
            component={HomeContainer}/>
          <Route
            exact
            path={ROUTE.READ}
            component={ViewArticleContainer}/>
          <Route
            exact
            path={ROUTE.WRITE}
            component={CreateArticleContainer}/>
          <Route
            exact
            path={ROUTE.TAG}
            component={ViewTagContainer}/>
          <Route
            exact
            path={ROUTE.AUTH}
            component={(props) => (<LoginContainer userDispatcher={userDispatch} {...props}/>)}/>
        </Switch>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
