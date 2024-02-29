import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="" />
        <img src={props.profile.photos.small} alt="" />
        <h5>{props.profile.aboutMe}</h5>
        <h5>Name: {props.profile.fullName}</h5>
        <h5>{props.profile.lookingForAJobDescription}</h5>
        <h5>{props.profile.contacts.instagram}</h5>
      </div>
    </div>
  );
};

export default ProfileInfo;
