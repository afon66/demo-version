import React from "react";
import Header from "./Header";
import { setAuthUserData, getAuthUserData, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
  
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  login: state.auth.login,
  userId: state.auth.userId, 
  email: state.auth.email,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setAuthUserData, getAuthUserData, logout })(
  HeaderContainer
);
