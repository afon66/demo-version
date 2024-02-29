import React, { useEffect } from "react";
import Profile from "./Profile";
import {
  getProfile,
  getStatus,
  updateStatus,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthContainer";
import { compose } from "redux";

const ProfileContainer = ({
  getProfile,
  profile,
  status,
  getStatus,
  updateStatus,
  authorizedUserId,
}) => {
  let { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      userId = authorizedUserId;
    }
    getProfile(userId);
    getStatus(userId);
  }, [userId, getProfile, getStatus]);

  return (
    <Profile profile={profile} status={status} updateStatus={updateStatus} />
  );
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
  withAuthRedirect
)(ProfileContainer);
