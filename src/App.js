import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if(!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className='app-wrapper' >    
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs'
              element={<DialogsContainer />} />

            <Route path='/profile/:userId?'
              element={<ProfileContainer />} />

            <Route path='/users'
              element={<UsersContainer />} />

            <Route path='/login' element={<Login />} />
          </Routes>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect (mapStateToProps, {initializeApp}) (App);