import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import FormSubForMess from "./FormSubForMess/FormSubForMess";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let onSendMessageClick = (value) => {
    props.sendMessage(value);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <FormSubForMess
          onSendMessageClick={onSendMessageClick}
        />
      </div>
    </div>
  );
};

export default Dialogs;
