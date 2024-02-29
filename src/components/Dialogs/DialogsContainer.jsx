import React from "react";
import { sendMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthContainer";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect,
)(Dialogs);
