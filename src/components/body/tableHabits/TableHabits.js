import './tableHabits.scss'

import CheckBox from '../checkBox/checkBox';
import { today, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';

import JsonBin from '../../../service/request/JsonBin';

const TableHabits = (props) => {


    // const today = new Date();
    // const countDaysOfMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const newRequest = new JsonBin();




    //функция изменения статуса привычки
    const onChangeStatus = (numDataBase, numDataBaseResults) => {
        // console.log(numDataBase);
        // console.log(numDataBaseResults);
        const filterDataBase = props.dataBase.filter((item) => item.id === numDataBase);
        // console.log(filterDataBase[0]);
        const status = filterDataBase[0].results[numDataBaseResults].status;
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
        const habitList = filterDataBase[0].results;

        // console.log(habitList); 
        const newHabitList = habitList.map((item) => {
            if (item.day === numDataBaseResults + 1) {
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
            ...filterDataBase[0],
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



    //рендерин привычек из базы данных
    function renderHabits(arr) {


        const habitRow = arr.map((item) => {

            const startYear = new Date(item.startDate).getFullYear();
            const startMonth = new Date(item.startDate).getMonth();
            const startDay = new Date(item.startDate).getDate();
            const newNewArr = new Array(31).fill({});



            const habitDaysArr = item.results;
            // console.log(habitDaysArr);
            // console.log(countDaysOfMonth);
            let statusNull = 0;
            let statusRed = 0;
            let statusGood = 0;
            let statusStop = 0;
            let statusDisabled = 0;
            // console.log(habitDaysArr);
            console.log(countDaysOfMonth - startDay);

            const habitDaysDisable = Array.from({length: startDay}, (el, i) => {
                return (
                                    <li key={i} className="list-day block-empty"
        
                                    ><CheckBox
                                            status={0}
                                            disable={"disabled"}
                                        /></li>
                                )
            })
//ошибка в мэп
            const habitDaysActive =  habitDaysArr.map((el, i) => {
                while ((countDaysOfMonth - 1 - startDay) >= i){
                    return (
                                            <li key={i} className="list-day block-empty"
                                           
                                            ><CheckBox
                                                    status={el.status}
                                                    date={item.startDate}
                                                    disable={""}
                                                /></li>
                                        )
                }
                
            })

//////////////////////////////////////////////////////////////////////
            // const habitDays = newNewArr.map((el, i) => {
            //     while (i <= countDaysOfMonth - 1) {
            //         if (new Date(item.startDate).getDate() > i + 1) {
            //             statusDisabled += 1;
            //             // console.log('1');
            //             return (
            //                 <li key={i} className="list-day block-empty"

            //                 ><CheckBox
            //                         status={0}
            //                         disable={"disabled"}
            //                     /></li>
            //             )
            //         } else {
            //             // console.log(i, countDaysOfMonth);
                       
            //                 return (
            //                     <li key={i} className="list-day block-empty"
            //                         onClick={() => onChangeStatus(item.id, i)}
            //                     ><CheckBox
            //                             status={2}
            //                             date={item.startDate}
            //                             disable={""}
            //                         /></li>
            //                 )
                        
                        
            //         }
            //     }
            // })

            
            // const newHabitDays = Array.from({length: countDaysOfMonth}, (el, i) => {
                
            //     if (new Date(item.startDate).getDate() > i + 1){
            //         return (
            //             <li key={i} className="list-day block-empty"

            //             ><CheckBox
            //                     status={0}
            //                     disable={"disabled"}
            //                 /></li>
            //         )
            //     } else  {
                   

            //         for (let j = 0; j < countDaysOfMonth - i; j++) {
            //             if (new Date(habitDaysArr[j].dateDay).getDate() === i + 1){
            //                 return (
            //                                     <li key={i} className="list-day block-empty"
            //                                         onClick={() => onChangeStatus(item.id, i)}
            //                                     ><CheckBox
            //                                             status={habitDaysArr[j].status}
            //                                             date={item.startDate}
            //                                             disable={""}
            //                                         /></li>
            //                                 )
            //             } else {
                            
            //                 return (
            //                     <li key={i} className="list-day block-empty"
                               
            //                     ><CheckBox
            //                             status={3}
            //                             date={item.startDate}
            //                             disable={""}
            //                         /></li>
            //                 )
            //             }
            //         }
            //     } 
            // });
//////////////////////////////////////////////////////////////////



            // console.log(new Date(habitDaysArr[0].dateDay).getDate());


            // const habitDays = habitDaysArr.map((el, i) => {
            //     let statusIcon = el.status;
            //     switch (statusIcon) {
            //         case 0:
            //             statusNull += 1;
            //             break
            //         case 1:
            //             statusRed += 1;
            //             break
            //         case 2:
            //             statusGood += 1;
            //             break
            //         case 3:
            //             statusStop += 1;
            //             break
            //         default:

            //             break
            //     }




            //     while (i <= countDaysOfMonth - 1) {

            //         if (new Date(item.startDate).getDate() > i + 1) {
            //             statusDisabled += 1;
            //             return (
            //                 <li key={i} className="list-day block-empty"
            //                     onClick={() => onChangeStatus(item.id, i)}
            //                 ><CheckBox
            //                         status={0}
            //                         disable={"disabled"}
            //                     /></li>
            //             )
            //         } else {


            //             return (
            //                 <li key={i} className="list-day block-empty"
            //                     onClick={() => onChangeStatus(item.id, i)}
            //                 ><CheckBox
            //                         status={el.status}
            //                         date={item.startDate}
            //                         disable={""}
            //                     /></li>
            //             )
            //         }
            //     }
            // })

            function onDeleteHabit(event) {
                let idHabit = event.getAttribute('habit-id');
                newRequest.deleteResource(idHabit);
                props.renderAfterAdd();
            }

            const percent = (statusGood / ((statusRed + statusStop + statusNull + statusGood) - statusDisabled) * 100).toFixed(1);
            //     console.log(statusNull, statusRed,statusGood, statusStop);
            //    console.log(percent);
            console.log(habitDaysDisable);
            console.log(habitDaysActive);
            
            return (
                <div className="habits__row-name " key={item.id}>
                    <div className="habits__need block-empty name__habit">{item.count}</div>
                    <div className="habits__name block-empty name__habit">{item.nameHabit}</div>
                    <ul className="habits__list-days ">
                        {/* {habitDaysDisable}
                        {habitDaysActive} */}
                        {/* {habitDays} */}
                        {/* {newHabitDays} */}
                    </ul>

                    <div className="habits__percent block-empty">{percent}%</div>
                    <a onClick={(e) => onDeleteHabit(e.target)} className="habit__delete" habit-id={item.id}>Удалить</a>
                </div>
            )
        })
        return habitRow

    }






    const habitRow = renderHabits(props.dataBase)

    return (
        <div className="habits__table-body">
            {habitRow}
        </div>
    )
}


export default TableHabits;