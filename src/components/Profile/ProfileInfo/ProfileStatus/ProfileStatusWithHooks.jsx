import React, { useState, useEffect } from "react";

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.status !== this.props.status) {
  //     this.setState({ status: this.props.status });
  //   }
  // }
  useEffect(() => {
      setStatus(props.status);
  }, [props.status]);

  return (
    <div>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "--------"}
          </span>
        </div>
      ) : (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
