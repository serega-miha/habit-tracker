import './tableHabits.scss'

import CheckBox from '../checkBox/checkBox';
import { today, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';

import JsonBin from '../../../service/request/JsonBin';
import Modal from '../../Modal/Modal';
import { useState, useEffect } from 'react';
import EditHabit from '../editHabit/EditHabit';




const TableHabits = (props) => {

    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalEditId, setOpenModalEditId] = useState('')

    function renderModalWindow(bool){
    const modalEditHabit = <Modal
    
    active={openModalEdit}
    setActive={setOpenModalEdit}
        // habitId={item.id}
        >
            <EditHabit
            onUpdateDataBaseLoaded={props.onUpdateDataBaseLoaded}
            dataBase={props.dataBase}
            idDataBase={openModalEditId}
            setOpenModalEdit={setOpenModalEdit}
            renderAfterAdd={props.renderAfterAdd}
            />
            <h2>{openModalEditId}</h2>
        </Modal>
       if (bool) {
        return modalEditHabit
    }else{
        return null
    }
    }
    //сделал чтобы модальное окно исчезало из ДОМ дерева, когда его закрываешь!
    useEffect(() => {
        renderModalWindow(openModalEdit) 
    }, [])




    // const today = new Date();
    // const countDaysOfMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const newRequest = new JsonBin();




    //функция изменения статуса привычки
    const onChangeStatus = (numDataBase, dataId) => {
        // console.log(numDataBase);
        // console.log(dataId);
        const filterDataBase = props.dataBase.filter((item) => item.id === numDataBase)[0];
        //  console.log(filterDataBase);

        const status = filterDataBase.results.filter((item) => item.dateDay === dataId)[0].status;
        // console.log(status);
        let newStatus;
        switch (status) {
            case 0:
                newStatus = 1;
                break
            case 1:
                newStatus = 2;
                break
            case 2:
                newStatus = 3;
                break
            case 3:
                newStatus = 0;
                break
            default:
                newStatus = 0;
                break
        }
        // const dataBaseItem = filterDataBase;
        const habitList = filterDataBase.results;

        // console.log(habitList); 
        const newHabitList = habitList.map((item) => {
            if (item.dateDay === dataId) {
                return {
                    ...item,
                    status: newStatus
                }
            } else {
                return item;
            }
        })
        // console.log(newHabitList);
        const newDataBaseItem = {
            ...filterDataBase,
            results: newHabitList
        }
        // const newDataBase = props.dataBase.map((item, i) => {
        //     if (i === numDataBase){
        //         return newDataBaseItem
        //     } else {
        //         return item
        //     }
        // })
        // console.log(newDataBaseItem);
        // props.onChangeDataBase(newDataBase);
        props.onUpdateDataBaseLoaded(newDataBaseItem, numDataBase);
        props.renderAfterAdd();
    }


    // console.log(props.dataBase);






    function renderHabitsNew(arr, todayYear, todayMonth) {
        const countDaysOfMonth = 32 - new Date(todayYear, todayMonth, 32).getDate();
        // console.log('function is working');


        const habitRow = arr.map((item, j) => {
            // const startYear = new Date(item.startDate).getFullYear();
            // const finishYear = new Date(item.finishDate).getFullYear();
            // const startMonth = new Date(item.startDate).getMonth() + 1;
            // const finishMonth = new Date(item.finishDate).getMonth() + 1;
            // const startDay = new Date(item.startDate).getDate();
            // const finishDay = new Date(item.finishDate).getDate();

            const habitDaysArr = item.results.filter((el) => new Date(el.dateDay).getMonth() === +todayMonth);


            if (habitDaysArr.length > 0) {
                // const newHabitDaysArr = habitDaysArr
                const itemStartDay = new Date(habitDaysArr[0].dateDay).getDate() - 1;



                const justClassName = 'list-day block-empty';
                const todayClassName = 'list-day block-empty block-empty__active'
                const borderClassName = 'list-day block-empty block-empty__border'

                const statusArr = [];
                let j = 0;
                const habitDaysDisable = Array.from({ length: itemStartDay }, (el, i) => {
                    j++;
                    statusArr[j] = 0;
                    return (
                        <li key={j}
                            //это сделано для выделения сегодня стилями
                            className={today.getDate() === j && today.getMonth() === props.selectedMonth - 1 ? todayClassName : justClassName}

                        ><CheckBox
                                status={0}
                                disable={"disabled"}

                            /></li>
                    )
                })
                //рендер блоков
                const habitsDaysActive = habitDaysArr.map((el, i) => {
                    j++;
                    if (today.getMonth() === props.selectedMonth - 1) {
                        if (today.getDate() > 3 && j < today.getDate() - 3) {
                            //время прошло кнопа disable
                            statusArr[j] = el.status === 1 ? 3 : el.status;
                            return (
                                <li key={j}
                                    //это сделано для выделения сегодня стилями
                                    className={justClassName}

                                    dataId={el.dateDay}
                                    onClick={() => onChangeStatus(item.id, el.dateDay)}
                                ><CheckBox
                                        status={el.status === 1 ? 3 : el.status}
                                        date={item.startDate}

                                        disable={"disabled"}

                                    /></li>
                            )
                        } else if (today.getDate() - 3 === j) {
                            //граница 3 дня, проверка прошлой границы
                            statusArr[j] = el.status
                            return (
                                <li key={j}
                                    //это сделано для выделения сегодня стилями
                                    className={borderClassName}

                                    dataId={el.dateDay}
                                    onClick={() => onChangeStatus(item.id, el.dateDay)}
                                ><CheckBox
                                        status={el.status}
                                        date={item.startDate}

                                        disable={""}

                                    /></li>
                            )
                        } else if (today.getDate() === j) {
                            //рендес сегодня с белой тенью
                            statusArr[j] = el.status
                            return (
                                <li key={j}
                                    //это сделано для выделения сегодня стилями
                                    className={todayClassName}

                                    dataId={el.dateDay}
                                    onClick={() => onChangeStatus(item.id, el.dateDay)}
                                ><CheckBox
                                        status={el.status}
                                        date={item.startDate}

                                        disable={""}

                                    /></li>
                            )
                        } else {
                            //все остальные блоки
                            statusArr[j] = el.status
                            return (
                                <li key={j}
                                    //это сделано для выделения сегодня стилями
                                    className={today.getDate() === j && today.getMonth() === props.selectedMonth - 1 ? todayClassName : justClassName}

                                    dataId={el.dateDay}
                                    onClick={() => onChangeStatus(item.id, el.dateDay)}
                                ><CheckBox
                                        status={el.status}
                                        date={item.startDate}

                                        disable={""}

                                    /></li>
                            )
                        }
                    } else {
                        //рендер остальных месяцев
                        // j++;
                        return (
                            <li key={i}
                                //это сделано для выделения сегодня стилями
                                className={justClassName}

                                dataId={el.dateDay}
                                onClick={() => onChangeStatus(item.id, el.dateDay)}
                            ><CheckBox
                                    status={el.status}
                                    date={item.startDate}

                                    disable={"disabled"}

                                /></li>
                        )
                    }


                })


                const habitDaysAdd = Array.from({ length: 1 }, (el, i) => {
                    return (

                        <li key={j}
                            //это сделано для выделения сегодня стилями
                            className='list-day block-empty'


                        >
                             <button className='my-btn' habit-id={item.id} onClick={() => pushButton(true, item.id)}>Продлить</button>
                            {renderModalWindow(openModalEdit)}
                        </li>
                    )
                })

                // console.log(statusArr);
                // console.log(statusArr.slice(1,today.getDate() + 1));


                function calculPercent(arr, todayDate) {
                    let newArr = arr.slice(1, todayDate + 1);
                    let goodBlock = newArr.filter(item => item === 2);
                    let allBlock = newArr.filter(item => item > 0);
                    let percent = (goodBlock.length / allBlock.length) * 100;
                    if (allBlock.length > 0) {
                        return percent.toFixed(0) + '%'
                    } else {
                        return 'нет данных'
                    }

                }



                // const habitsDays = [...habitDaysDisable, ...habitsDaysActive];
                function createHabitDays(arr1, arr2, arr3) {
                    let habitsArr = []
                    if ((arr1.length + arr2.length) >= countDaysOfMonth) {
                        habitsArr = [...arr1, ...arr2]
                    } else {
                        habitsArr = [...arr1, ...arr2, ...arr3]
                    }
                    return habitsArr;
                }
                // createHabitDays(habitDaysDisable, habitsDaysActive, habitDaysAdd)

                // console.log(arrForPercent);


                // const habitsDaysActive = habitDaysArr.map((el, i) => {
                //     j++;
                //     return (
                //         <li key={j} 
                //         //это сделано для выделения сегодня стилями
                //         className={today.getDate() === j && today.getMonth() === props.selectedMonth - 1 ? todayClassName : justClassName}

                //         dataId =  {el.dateDay}
                //         onClick = {() => onChangeStatus(item.id, el.dateDay)}
                //         ><CheckBox
                //                 status={el.status}
                //                 date={item.startDate}

                //                 disable={""}

                //             /></li>
                //     )
                // })




                function onDeleteHabit(event) {
                    let idHabit = event.getAttribute('habit-id');
                    newRequest.deleteResource(idHabit);
                    props.renderAfterAdd();
                }

                const percent = calculPercent(statusArr, today.getDate());
                const habitsDays = createHabitDays(habitDaysDisable, habitsDaysActive, habitDaysAdd);
                console.log(habitsDays);
             
                function pushButton(bool, number){
                    setOpenModalEdit(bool)
                    setOpenModalEditId(number)
                }


                j = 0;
                return (
                    <div className="habits__row-name " key={item.id} >
                        <div className="habits__need block-empty name__habit">
                            <button className='my-btn' habit-id={item.id} onClick={() => pushButton(true, item.id)}>Редактировать</button>
                            {renderModalWindow(openModalEdit)}
                        </div>
                        <div className="habits__name block-empty name__habit"><p>{item.nameHabit}</p></div>
                        <ul className="habits__list-days ">
                            {habitsDays}
                            {/* {habitDaysDisable}
                        {habitsDaysActive} */}

                        </ul>

                        <div className="habits__percent block-empty">{percent}</div>
                        <button onClick={(e) => onDeleteHabit(e.target)} className="my-btn" habit-id={item.id}>Удалить</button>
                    </div>
                )
            } else {
                return null;
            }



        })
        return habitRow

    }


    // renderHabitsNew(props.dataBase, '2024', '02');


    // const habitRow = renderHabits(props.dataBase)
    const habitRow = renderHabitsNew(props.dataBase, props.selectedFullYear, props.selectedMonth - 1);

    return (
        <div className="habits__table-body">
            {habitRow}
        </div>
    )
}


export default TableHabits;