import React from "react";
import preloader from "../../../assets/images/preloader.svg";
import "./Preloader.module.css";
import s from "./Preloader.module.css";

const Preloader = (props) => {
  return (
    <div className={s.preloader}>
      {props.isFetching ? <img src={preloader} /> : null}
    </div>
  );
};

export default Preloader;
