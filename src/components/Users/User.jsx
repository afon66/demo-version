import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom/dist";

let User = ({ u, followingInProgress, unfollow, follow }) => {
  return (
    <div>
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
        </div>
    </div>
  );
};

export default User;
