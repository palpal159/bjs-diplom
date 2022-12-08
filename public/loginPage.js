'use strict'

let user = new UserForm();

user.loginFormCallback = (data) => ApiConnector.login(data, 
  (response) => {
  if (response.success !== true){
    setLoginErrorMessage(response.error);
  } else {
    location.reload();
  }
});

user.registerFormCallback = (data) => ApiConnector.register(data, 
  (response) => {
    if (response.success !== true){
      setRegisterErrorMessage(response.error);
    } else {
      location.reload();
    }
});