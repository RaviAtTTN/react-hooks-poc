import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {ROUTE} from "../../constants";
import './style.scss';
import {removeToken} from "../../utils";
import {SET_USER} from "../../actions";

function Header(props) {
  useEffect(() => {
    console.log('userStore:', props.userStore);
  }, [props.userStore]);

  const onWriteClickHandler = () => {
    if(props.userStore && props.userStore.name) {
      props.history.push(ROUTE.WRITE);
    } else {
      props.history.push(ROUTE.AUTH);
    }
  };

  const onLogoutHandler = () => {
    removeToken();
    props.userDispatcher({type: SET_USER, payload: null});
  };

  return (
    <header>
      <div className={"logo-wrapper"}>
        <Link to={ROUTE.HOME}>Medium</Link>
      </div>
      <nav>
        <ul>
          <li onClick={onWriteClickHandler}>
            Write
          </li>
          <li>
            {(props.userStore && props.userStore.name) ? (
              <span>
                Currently, logged in as {props.userStore.name}
                <span onClick={onLogoutHandler}>(Logout)</span>
              </span>
            ) : (
              <Link to={ROUTE.AUTH}>
                Sign In
              </Link>)}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header);