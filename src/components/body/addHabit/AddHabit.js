
import YocReactDatePicker from '../calendar/Calendar';
import './addHabit.scss';
import JsonBin from '../../../service/request/JsonBin';
import { Formik, Form, Field, useFormikContext, ErrorMessage } from 'formik';
import { todayDate, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';
import DatePickerCalenar from '../datePacker/DatePicker';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';

const AddHabit = (props) => {
    const [numberOfDayPerWeek, setNumberOfDayPerWeek] = useState(3);

    // useEffect(() => {
    //     console.log(numberOfDayPerWeek, 'now = ');
    // }, [numberOfDayPerWeek])

    const newRequest = new JsonBin();


    const onSubmit = (values) => {

        //имя
        const nameHabit = values.name;
        //количество повторений в неделю //3
        const countOfWeek = values.countOfWeek;
        //дни повторений в неделю //['1', '3', '5']
        const nameRepeatDays = values.repeatDays;
         //дата начала
         const startDate = values.startDate;
        //количество повт орений в днях
         const countRepeatDays = values.countWeeks * 7;
         //дата окончания
         const finishDate = new Date(new Date(startDate).getTime() + new Date(countRepeatDays*24*60*60*1000).getTime()) ;
        //продолжительность в милисекундах
        const startDateTime = startDate.getTime();
        const oneDayTime = 86400000;

        // console.log(new Date(startDate).getTime(), 'новая дата');
        // console.log(new Date(countRepeatDays*24*60*60*1000).getTime(), 'duration');
        // const tempFinish = new Date(startDate).getTime() + new Date(countRepeatDays*24*60*60*1000).getTime();
        // console.log(new Date(tempFinish));

        function createResults(num) {
            function setStatusDays(date, arrRepeat){
                const evenNew = (el) => +el === date.getDay();
                return arrRepeat.some(evenNew) ? 1 : 0;
            }
    
    
            let newArr = [];
            let tempTime = 0;
    
            for (let i = 0; i < num; i++) {
                newArr[i] = { dateDay: startDateTime + tempTime, status: setStatusDays(new Date(startDateTime + tempTime), nameRepeatDays)}
                tempTime += oneDayTime;
            }   
            return newArr;
        }

        const results = createResults(countRepeatDays)
        const newDataBaseItem = {
            nameHabit,
            countOfWeek,
            nameRepeatDays,
            startDate,
            finishDate,
            countRepeatDays,
            results
        }
        // console.log(newDataBaseItem);
        newRequest.postResource(newDataBaseItem)
        props.renderAfterAdd()
    }


    return (
        <div className="add__habit-container">
            <Formik
                
                initialValues={{
                    name: "",
                    countOfWeek: 3,
                    repeatDays: ["1", "3", "5"],
                    startDate: "",
                    countWeeks: 1

                }}
                
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа')
                        .required('Обязательное поле нах'),
                    startDate: Yup.string()
                        .required('Обязательное поле нах'),
                    repeatDays: Yup.array()
                        .min(numberOfDayPerWeek, "Минимум столько галочек")
                        .max(numberOfDayPerWeek, "Минимум столько галочек")
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
                                {errors.name && touched.name ? <div className='input-error'>ошибка</div> : null}
                            </div>
                            <div className="add__habit-count__days">
                                <label className='add-label' htmlFor="countOfWeek"><h4>Количество повторений {numberOfDayPerWeek} в неделю</h4>
                                    <Field
                                        component="select"
                                        name="countOfWeek"
                                        id="countOfWeek"
                                        className="select-field"
                                        onClick={(e) => {
                                            setNumberOfDayPerWeek(e.target.value)}
                                            }
                                       

                                    >
                                        <option className='select-option' value="1">1</option>
                                        <option className='select-option' value="2">2</option>
                                        <option className='select-option' value="3">3</option>
                                        <option className='select-option' value="4">4</option>
                                        <option className='select-option' value="5">5</option>
                                        <option className='select-option' value="6">6</option>
                                        <option className='select-option'  value="7" >7</option>
                                    </Field>
                                </label>
                                    
                                <div id="checkbox-group" >Дни недели</div>
                                <div role="group" aria-labelledby="checkbox-group"
                                 
                                 className={errors.repeatDays && touched.repeatDays ? "checkbox-group input-error" : "checkbox-group"}>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value='1' />
                                        Пн
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value="2" />
                                        Вт
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value="3" />
                                        Ср
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value="4" />
                                        Чт
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value="5" />
                                        Пт
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value="6" />
                                        Сб
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="repeatDays" value="0" />
                                        Вс
                                    </label>
                                    
                                </div>
                                {errors.repeatDays && touched.repeatDays ? <div className='input-error'>нужно {numberOfDayPerWeek} галочек</div> : null}

                            </div>
                            <div className="add__habit-date__start">
                                <label><h4>Дата начала привычки</h4>
                                </label>
                                <DatePickerCalenar
                                    // setFieldValue={new Date()}
                                    name="startDate"
                                    // minDate={new Date()}
                                    placeholderText='01.01.2000'
                                    // defaultValue={new Date()}
                                    dateFormat="dd.MM.yyyy"
                                    autoComplete='off'
                                    className={errors.name && touched.name ? "input-error" : null}
                                   

                                />
                               
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