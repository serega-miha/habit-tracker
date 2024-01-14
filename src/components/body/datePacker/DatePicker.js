import './datePicker.scss'
import { useState } from 'react';
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const DatePickerCalenar = ({ ...props }) => {
    const [startDate, setStartDate] = useState(new Date());
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
  
    return (
        <DatePicker
        
            showIcon
         
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || startDate}
            onChange={val => {

                
                setFieldValue(field.name, val)
                //   console.log(`${val.getFullYear()}-${val.getMonth()}-${val.getDate()}`);
            }}
        />
    );
};


export default DatePickerCalenar