

import './editHait.scss';
import JsonBin from '../../../service/request/JsonBin';
import { Formik, Form, Field, useFormikContext, ErrorMessage } from 'formik';
import { todayDate, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';
import DatePickerCalenar from '../datePacker/DatePicker';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';

const EditHabit = (props) => {
    const [idReander, setIdRender] = useState(props.idDataBase);
    const [numberOfDayPerWeek, setNumberOfDayPerWeek] = useState(3);


    const modalDataBase = props.dataBase.filter(item => item.id === props.idDataBase)[0];

    useEffect(() => {
            console.log(modalDataBase);
            // console.log((new Date().getTime()/1000/60/60/24).toFixed(0), (new Date(modalDataBase.finishDate).getTime()/1000/60/60/24).toFixed(0));

            // console.log((modalDataBase.results.slice(11).length));
    }, [idReander])

    const newRequest = new JsonBin();


   

    function onSubmit(values){

        //имя
        const nameHabit = values.name;
        //количество повторений в неделю //3
        const countOfWeek = values.countOfWeek;
        //дни повторений в неделю //['1', '3', '5']
        const nameRepeatDays = values.repeatDays;
        //дата начала
        const startDate = modalDataBase.startDate;
        //количество повт орений в днях
        const countRepeatDays = values.countWeeks * 7;
        //дата окончания
        const finishDate = (new Date().getTime()/1000/60/60/24).toFixed(0) > (new Date(modalDataBase.finishDate).getTime()/1000/60/60/24).toFixed(0) ? 
        new Date(new Date().getTime() + new Date(countRepeatDays * 24 * 60 * 60 * 1000).getTime()) : new Date(new Date(modalDataBase.finishDate).getTime() + new Date(countRepeatDays * 24 * 60 * 60 * 1000).getTime());
        //продолжительность в милисекундах
        // const startDateTime = startDate.getTime();
        const oneDayTime = 86400000;

        // console.log(new Date(startDate).getTime(), 'новая дата');
        // console.log(new Date(countRepeatDays*24*60*60*1000).getTime(), 'duration');
        // const tempFinish = new Date(startDate).getTime() + new Date(countRepeatDays*24*60*60*1000).getTime();
        // console.log(new Date(tempFinish));

        //если сегодня больше чем финиш дата
        

        

        function createResults(num, timeStartDate, repeatDaysName) {
            if (num > 0){
                function setStatusDays(date, arrRepeat) {
                    const evenNew = (el) => +el === date.getDay();
                    return arrRepeat.some(evenNew) ? 1 : 0;
                }
    
    
                let newArr = [];
                let tempTime = 0;
    
                for (let i = 0; i < num; i++) {
                    newArr[i] = { dateDay: timeStartDate + tempTime, status: setStatusDays(new Date(timeStartDate + tempTime), repeatDaysName) }
                    tempTime += oneDayTime;
                }
                return newArr;
            }else {
                return null;
            }
            
        }

       function updateResults(){
        if ((new Date().getTime()/1000/60/60/24).toFixed(0) > (new Date(modalDataBase.finishDate).getTime()/1000/60/60/24).toFixed(0)){
            let newStartDay = new Date(modalDataBase.finishDate).getTime();
            let emptyCountDays = (new Date().getTime()/1000/60/60/24).toFixed(0) - (new Date(modalDataBase.finishDate).getTime()/1000/60/60/24).toFixed(0);
            let oldResultsArray = modalDataBase.results;
            console.log(oldResultsArray);
            let emptyArrayResults = createResults(emptyCountDays,newStartDay, []);
            console.log(emptyArrayResults);
            let newCreateResultsArray = createResults(countRepeatDays,new Date().getTime(), nameRepeatDays);
            console.log(newCreateResultsArray);
            let newAddResults = [...oldResultsArray, ...emptyArrayResults, ...newCreateResultsArray]
            return newAddResults
            //если сегодня меньше чем финиш дата
        } else{
            // console.log(modalDataBase.results[0].dateDay);
            let index = 0;
            modalDataBase.results.forEach((item, i) => {
                if ((item.dateDay/1000/60/60/24).toFixed(0) === ((new Date().getTime())/1000/60/60/24).toFixed(0)){
                    index = i;
                } 
         
            })
            let oldResultsArray = modalDataBase.results.slice(0, index);
            let newStartDay = new Date().getTime();
            let addCount = modalDataBase.results.slice(11).length;
            let newCreateResultsArray = createResults(countRepeatDays + addCount,newStartDay, nameRepeatDays);
            let newAddResults = [...oldResultsArray, ...newCreateResultsArray]
            return newAddResults
        }
       }

        const results = updateResults()
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
        props.onUpdateDataBaseLoaded(newDataBaseItem, idReander)
        props.renderAfterAdd()
        props.setOpenModalEdit(false)
    }



    ///////// переменные для отображения даты начала и конца
    const renderStartDate = new Date(modalDataBase.startDate).getFullYear() + '.' + (new Date(modalDataBase.startDate).getMonth() + 1) + "." + new Date(modalDataBase.startDate).getDate();
    const renderFinishDate = new Date(modalDataBase.finishDate).getFullYear() + '.' + (new Date(modalDataBase.finishDate).getMonth() + 1) + "." + new Date(modalDataBase.finishDate).getDate();
   const daysLeft = Math.floor((new Date(modalDataBase.finishDate).getTime() - new Date().getTime())/1000/60/60/24);    
    ///////////


    return (
       
            <div className="add__habit-container">
                <Formik

                    initialValues={{
                        name: modalDataBase.nameHabit,
                        countOfWeek: modalDataBase.countOfWeek,
                        repeatDays: modalDataBase.nameRepeatDays,
                        // startDate: new Date(modalDataBase.startDate),
                        countWeeks: 0

                    }}

                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(2, 'Минимум 2 символа')
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
                                <div className="form-add__habit-item add__habit-name">
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
                                <div className="form-add__habit-item add__habit-count__days">
                                    <label className='add-label' htmlFor="countOfWeek"><h4>Количество повторений {numberOfDayPerWeek} в неделю</h4>
                                        <Field
                                            component="select"
                                            name="countOfWeek"
                                            id="countOfWeek"
                                            className="select-field"
                                            onClick={(e) => {
                                                setNumberOfDayPerWeek(e.target.value)
                                            }
                                            }


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
                               
                               
                                <div className="form-add__habit-item ">
                                   <h3>Дата начала: {renderStartDate}</h3>
                                </div>
                                <div className="form-add__habit-item ">
                                   <h3>Дата окончания: {renderFinishDate}</h3>
                                </div>
                                <div className="form-add__habit-item ">
                                   <h3>Закончиться через: {daysLeft}</h3>
                                </div>

                            </div>
                            <div className="form-add__habit-item add__habit-count__weeks">
                                    <label className='add-label' htmlFor="countWeeks"><h4>На сколько недель вы хотите продлить?</h4>
                                    </label>
                                    <Field type="number"
                                        id="countWeeks"
                                        name="countWeeks"

                                        className={errors.name && touched.name ? "input-error" : null}

                                    />
                                </div>
                            <div className="form-submit">
                                <button type="submit"
                                    className='form-btn'
                                //  disabled={isSubmitting}
                                >Сохранить изменения</button>
                                <button className='my-btn' onClick={() => props.setOpenModalCreate(false)}>Закрыть</button>
                            </div>
                        </Form>
                    )}


                </Formik>
            </div>
      
    )
}




export default EditHabit;