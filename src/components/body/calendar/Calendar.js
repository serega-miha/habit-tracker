import React from "react";
import { DatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import './Calendar.scss'

const YocReactDatePicker = (props) => {
  const onChangeValue = (date) => {
    const dateValue = date;

    const dateString = `${dateValue.$y}-${dateValue.$M + 1}-${dateValue.$D}`
    props.onGetDate(dateString);
  };



  return (
    <div>
      
      <DatePicker onChange={onChangeValue} />

    </div>
  );
};

export default YocReactDatePicker;


