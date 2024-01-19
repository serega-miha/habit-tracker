
import YocReactDatePicker from '../calendar/Calendar';
import './addHabit.scss';
import JsonBin from '../../../service/request/JsonBin';
import { Formik, Form, Field, useFormikContext, ErrorMessage } from 'formik';
import { todayDate, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';
import DatePickerCalenar from '../datePacker/DatePicker';
import * as Yup from 'yup';
import { useState } from 'react';

const AddHabit = (props) => {
    const [finishDate, setFinishDate] = useState('');
    ////////////////////////////////////////////
    // const myDate = new Date();
    // console.log(myDate.getTime());

    // function addDays(myDate,days) {
    //     return new Date(myDate.getTime() + days*24*60*60*1000);
    //     }

    //     console.log(addDays(myDate,390));

    ///////////////////////////////////////////
    //  console.log(todayDate);

    const newRequest = new JsonBin();

    const onSubmit = (values) => {
        const testDate = values.startDate;
        console.log(testDate.getTime());
        console.log(testDate.getFullYear());
        console.log(testDate.getMonth() + 1);
        console.log(testDate.getDate());
        //продолжительность
        const durationHabit = values.weeksCount * 7;
         //дата начала
         const startDate = values.startDate.getFullYear() + '-' + values.startDate.getMonth() + '-' + values.startDate.getDate();
        //  const startDate = values.startDate.getFullYear() + '-' + values.startDate.getMonth() + '-' + values.startDate.getDate();
        //количество повторений в неделю
        const checkedDaysOfWeek = values.checked;


        function createResults(num) {
            let arr = [];

            for (let i = 1; i <= num; i++) {
                arr[i - 1] = { day: i, status: 1 }
                // arr[i - 1] = { year: year, month: month, day: i, status: 1 }
            }
            return arr;
        }

        const results = createResults(countDaysOfMonth)
        const newDataBaseItem = {
            count: values.countOfWeek,
            nameHabit: values.name,

            startDate,
            checkedDaysOfWeek,
            weeksCount: values.weeksCount,
            durationHabit,
            results
        }
        console.log(newDataBaseItem);
        // newRequest.postResource(newDataBaseItem)
        // props.renderAfterAdd()
    }


    return (
        <div className="add__habit-container">
            <Formik
                initialValues={{
                    name: "",
                    countOfWeek: 7,
                    startDate: "",
                    checked: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sut", "Sun"],
                    weeksCount: 4
                    
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа')
                        .required('Обязательное поле нах'),
                    startDate: Yup.string()
                        .required('Обязательное поле нах')
                })}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm()
                }}>
                {({ errors, touched }) => (
                    <Form className="add__habit">
                        <div className="form-body">
                            <div className="add__habit-name">
                                <label className='add-label' htmlFor="nameHabitInput"><h4>Введите название привычки</h4>
                                </label>
                                <Field type="text"
                                    id="nameHabitInput"
                                    name="name"
                                    placeholder='name'
                                    className={errors.name && touched.name ? "input-error" : null}

                                />
                            </div>
                            <div className="add__habit-count__days">
                                <label className='add-label' htmlFor="weeksCount"><h4>Количество повторений в неделю</h4>
                                    <Field
                                        component="select"
                                        name="weeksCount"
                                        id="weeksCount"
                                        className="select-field"
                                    >
                                        <option className='select-option' value="1">1</option>
                                        <option className='select-option' value="2">2</option>
                                        <option className='select-option' value="3">3</option>
                                        <option className='select-option' value="4">4</option>
                                        <option className='select-option' value="5">5</option>
                                        <option className='select-option' value="6">6</option>
                                        <option className='select-option' value="7" >7</option>
                                    </Field>
                                </label>
                                <div id="checkbox-group">Дни недели</div>
                                <div role="group" aria-labelledby="checkbox-group" className='checkbox-group'>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Mon" />
                                        Пн
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Tue" />
                                        Вт
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Wen" />
                                        Ср
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Thu" />
                                        Чт
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Fri" />
                                        Пт
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Sut" />
                                        Сб
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="checked" value="Sun" />
                                        Вс
                                    </label>

                                </div>


                            </div>
                            <div className="add__habit-date__start">
                                <label><h4>Дата начала привычки</h4>
                                </label>
                                <DatePickerCalenar
                                    // setFieldValue={new Date()}
                                    name="startDate"
                                    minDate={new Date()}
                                    placeholderText='01.01.2000'
                                    // defaultValue={new Date()}
                                    dateFormat="dd.MM.yyyy"
                                    autoComplete='off'
                                    className={errors.name && touched.name ? "input-error" : null}
                                    onChange={setFinishDate}
                                    
                                />
                                <h4 className='finish-date'>Дата окончания:<p>{finishDate}</p></h4>
                            </div>
                            <div className="add__habit-count__weeks">
                                <label className='add-label' htmlFor="countWeeks"><h4>Количество недель</h4>
                                </label>
                                <Field type="number"
                                    id="countWeeks"
                                    name="countWeeks"

                                    className={errors.name && touched.name ? "input-error" : null}

                                />
                            </div>
                        </div>
                        <div className="form-submit">
                            <button type="submit"
                                className='form-btn'
                            //  disabled={isSubmitting}
                            >Создать привычку</button>
                        </div>
                    </Form>
                )}


            </Formik>
        </div>
    )
}


export default AddHabit;