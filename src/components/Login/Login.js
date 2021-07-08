import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';

import Input from "../Input/Input";
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const TYPE = {
  EMAIL_INPUT: "email_input",
  EMAIL_BLUR: "email_blur",
  PWD_INPUT: "pwd_input",
  PWD_BLUR: "pwd_blur"
}

function emailReducer(state, action){
  if (action.type === TYPE.EMAIL_INPUT){
    return( {enteredEmail: action.payload, emailIsValid: action.payload.includes('@') } );
  }
  if (action.type === TYPE.EMAIL_BLUR){
    return( {enteredEmail: state.enteredEmail, emailIsValid: state.enteredEmail.includes('@') } );
  }
  return( {enteredEmail: '', emailIsValid: null} );

}

function pwdReducer(state, action){
  if (action.type === TYPE.PWD_INPUT){
    return( {enteredPassword: action.payload, passwordIsValid: action.payload.trim().length > 6 } );
  }
  if (action.type === TYPE.PWD_BLUR){
    return( {enteredPassword: state.enteredPassword, passwordIsValid: state.enteredPassword.trim().length > 6 } );
  }
  return( {enteredPassword: '', passwordIsValid: null} );

}

const Login = (props) => {

  const emailInputRef = useRef();
  const pwdInputRef = useRef();

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const[emailState, emailDispatch] = useReducer(emailReducer, {enteredEmail: '', emailIsValid: null});

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const[pwdState, pwdDispatch] = useReducer(pwdReducer, {enteredPassword: '', passwordIsValid: null});

  const [formIsValid, setFormIsValid] = useState(false);
  

  useEffect( ()=>{
   
    const myTimer = setTimeout( ()=>{
        // console.log("checking form validity..");
        setFormIsValid(
          emailState.emailIsValid && pwdState.passwordIsValid
        );
    }, 500);

    //the return statement of the useEffect() can be used for any cleanup activities
    //the return will not work only for the 1st iteration, following which, it works as usual.
    return(
      () => {
        // console.log("Cleanup");
        clearTimeout(myTimer);  // this is used to clear the timer, hence only the first timer persists
      }
    );
    
  }, 
  
  [emailState.emailIsValid, pwdState.passwordIsValid]);

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {

    emailDispatch({type: TYPE.EMAIL_INPUT, payload:event.target.value});
    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && pwdState.enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    pwdDispatch({type: TYPE.PWD_INPUT, payload:event.target.value});

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    emailDispatch({type:TYPE.EMAIL_BLUR});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    pwdDispatch({type:TYPE.PWD_BLUR});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      authCtx.onLogin(emailState.enteredEmail, pwdState.enteredPassword);
    } else if(!emailState.emailIsValid) {
        emailInputRef.current.focus();
    } else {
        pwdInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.emailIsValid}
          value={emailState.enteredEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          ref={pwdInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={pwdState.passwordIsValid}
          value={pwdState.enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
