import React from "react";
import { connect } from "react-redux";
import {
  setCurrentPage,
  getUsers,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthContainer";
import { compose } from "redux";
import {
  getUsersS,
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getIsFetching,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);

    this.props.setCurrentPage(pageNumber);
    // this.props.toggleIsFetching(true);

    // usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
    //   this.props.toggleIsFetching(false);
    //   this.props.setUsers(data.items);
    // });
  };

  render() {
    return (
      <>
        <Preloader isFetching={this.props.isFetching} />
        <Users {...this.props} onPageChanged={this.onPageChanged} />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.commonPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

let mapStateToProps = (state) => {
  return {
    users: getUsersS(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, { setCurrentPage, getUsers, follow, unfollow }),
  withAuthRedirect
)(UsersContainer);
