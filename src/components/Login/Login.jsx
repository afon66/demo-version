import React from "react";
import OuterLogin from "./OuterLogin/OuterLogin";
import { login } from "../../redux/auth-reducer";
import { connect } from "react-redux";

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <OuterLogin {...props} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
