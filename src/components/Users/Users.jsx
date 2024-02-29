import React from "react";
import styles from "./users.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = ({
  pageSize,
  totalUsersCount,
  currentPage,
  onPageChanged,
  users,
  followingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <div>
      <UsersSearchForm />
      <div className={styles.container}>
        <Paginator
          pageSize={pageSize}
          totalUsersCount={totalUsersCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
        {users.map((user) => (
          <User
            u={user}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};

const UsersSearchForm = () => {
  const submit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{ term: "" }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Users;
