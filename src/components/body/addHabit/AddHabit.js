import { useState, useEffect } from 'react';
import YocReactDatePicker from '../calendar/Calendar';
import './addHabit.scss';
import JsonBin from '../../../service/request/JsonBin';
import { Formik, Form, Field, useFormikContext, useField } from 'formik';
import { todayDate, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';

const AddHabit = (props) => {
    const [calendarDate, setCalendareDate] = useState(null);

    const newRequest = new JsonBin();






    const onGetDate = (date) => {
        setCalendareDate(date)
        
    }

    const onSubmit = (values) => {
        function createResults(num) {
            let arr = [];
            for (let i = 1; i <= num; i++) {
                arr[i - 1] = { day: i, status: 1 }
            }
            return arr;
        }
        const results = createResults(countDaysOfMonth)
        const newDataBaseItem = {
            count : values.countOfWeek,
            nameHabit : values.name,
            startDate : values.startDate,
            results
        }
        newRequest.postResource(newDataBaseItem)
        props.renderAfterAdd()
    }


    return (
        <div className="add__habit-container">
            <Formik
                initialValues={{ name: "", countOfWeek: 7, startDate: calendarDate ? calendarDate : todayDate }}
                className="add__habit"
                onSubmit={(values, {resetForm}) => {
                    onSubmit(values)
                    resetForm()}}>
                {/* {({ isSubmitting }) => ( */}
                <Form>
                    <label className='add-label' htmlFor="countOfWeek">Количество повторений в неделю</label>
                    <Field
                        component="select"
                        name="countOfWeek"
                        id="countOfWeek"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7" >7</option>
                    </Field>
                    <label className='add-label' htmlFor="nameHabitInput">Введите название привычки</label>
                    <Field type="text"
                        id="nameHabitInput"
                        name="name"
                        placeholder='name'
                        defaultValue='123'
                    />
                    <label>Дата начала привычки</label>
                    <YocReactDatePicker

                        onGetDate={onGetDate} />
                    <Field

                        type="text"
                        name="startDateHabit"
                        className='input-not-visible'
                        touched="touched"
                        onChange=''

                        setFieldValue={calendarDate}
                    // value={calendarDate}
                    />

                    <button type="submit"
                    //  disabled={isSubmitting}
                    >Создать привычку</button>
                </Form>
                {/* )} */}
            </Formik>
        </div>
    )
}


export default AddHabit;