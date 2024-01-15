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
        const habitRow = arr.map((item, y) => {

            const habitDaysArr = item.results;
            let statusNull = 0;
            let statusRed = 0;
            let statusGood = 0;
            let statusStop = 0;
            console.log(habitDaysArr);
            const habitDays = habitDaysArr.map((el, i) => {
                let statusIcon = el.status;
                switch (statusIcon) {
                    case 0:
                        statusNull += 1;
                        break
                    case 1:
                        statusRed += 1;
                        break
                    case 2:
                        statusGood += 1;
                        break
                    case 3:
                        statusStop += 1;
                        break
                    default:
                      
                        break
                }


                while (i <= countDaysOfMonth - 1) {

                    if (item.startDate.split("-")[2] > i + 1) {

                        return (
                            <li key={i} className="list-day block-empty"
                                onClick={() => onChangeStatus(item.id, i)}
                            ><CheckBox
                                    status={0}
                                    disable={"disabled"}
                                /></li>
                        )
                    } else {


                        return (
                            <li key={i} className="list-day block-empty"
                                onClick={() => onChangeStatus(item.id, i)}
                            ><CheckBox
                                    status={el.status}
                                    date={item.startDate}
                                    disable={""}
                                /></li>
                        )
                    }
                }
            })

            function onDeleteHabit(event) {
                let idHabit = event.getAttribute('habit-id');
                newRequest.deleteResource(idHabit);
                props.renderAfterAdd();
            }

            const percent = (statusGood/(statusRed + statusStop)*100).toFixed(1);
            console.log(statusNull,statusGood, statusRed, statusStop);
           console.log(percent);


            return (
                <div className="habits__row-name " key={item.id}>
                    <div className="habits__need block-empty name__habit">{item.count}</div>
                    <div className="habits__name block-empty name__habit">{item.nameHabit}</div>
                    <ul className="habits__list-days ">
                        {habitDays}
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