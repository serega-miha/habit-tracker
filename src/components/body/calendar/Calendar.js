import React from "react";
import { DatePicker, RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import './Calendar.scss'

const YocReactDatePicker = () => {
  const onChangeValue = (date) => {
    const dateValue = date.toDate();
    console.log(dateValue);
  };



  return (
    <div>
      
      <DatePicker onChange={onChangeValue} />

    </div>
  );
};

export default YocReactDatePicker;