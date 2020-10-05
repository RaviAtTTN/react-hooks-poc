import React, {useEffect, useState} from "react";
import "./style.scss";
import {getToken, setToken} from "../../utils";
import {isAuthService, loginService, signupService} from "../../services/userService";
import {SET_USER} from "../../actions";

const INPUT_FORM = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
};

function LoginContainer(props) {
  const [currentForm, setCurrentForm] = useState(INPUT_FORM.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if(getToken()){
      props.history.push('/');
    }
  }, []);

  function signup() {
    if(email && password && name) {
      signupService({
        email,
        password,
        name,
      });
      setCurrentForm(INPUT_FORM.LOGIN);
    }
  }

  function login() {
    if(email && password) {
      loginService({
        email,
        password,
      }).then((data) => {
        console.log(data.message);
        setToken(data.token);
        isAuthService(data.token).then((res) => {
          if (res && res.name) {
            props.userDispatcher({type: SET_USER, payload: res});
          }
        }).catch((err) => {
          console.log(err);
        });
        props.history.push('/');
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <div className={"login-container"}>
      {
        currentForm === INPUT_FORM.LOGIN && (
          <div className="card">
            <label htmlFor={'email'}>Email</label>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor={'password'}>Password</label>
            <input name="password" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={login}>{INPUT_FORM.LOGIN}</button>
            <div className="footer-text">
              Don't have an account? <span onClick={() => setCurrentForm(INPUT_FORM.REGISTER)}>Create one</span>
            </div>
          </div>
        )
      }
      {
        currentForm === INPUT_FORM.REGISTER && (
          <div className="card">
            <label htmlFor={'name'}>Name</label>
            <input name={'name'} value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor={'email'}>Email</label>
            <input name={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor={'password'}>Password</label>
            <input name={'password'} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signup}>{INPUT_FORM.REGISTER}</button>
            <div className="footer-text">Already have an account? <span onClick={() => setCurrentForm(INPUT_FORM.LOGIN)}>Login here</span></div>
          </div>
        )
      }
    </div>
  )
}

export default LoginContainer;