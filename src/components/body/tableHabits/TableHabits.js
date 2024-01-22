import './tableHabits.scss'

import CheckBox from '../checkBox/checkBox';
import { today, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';

import JsonBin from '../../../service/request/JsonBin';
import renderHabitsNew from './renderHabits';

const TableHabits = (props) => {


    // const today = new Date();
    // const countDaysOfMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const newRequest = new JsonBin();




    //функция изменения статуса привычки
    const onChangeStatus = (numDataBase, dataId) => {
        console.log(numDataBase);
        console.log(dataId);
        const filterDataBase = props.dataBase.filter((item) => item.id === numDataBase)[0];
     console.log(filterDataBase);
     
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
        const countDaysOfMonth = 32 - new Date(todayYear, todayMonth - 1, 32).getDate();
        // console.log('function is working');
    
    
        const habitRow = arr.map((item, j) => {
            // const startYear = new Date(item.startDate).getFullYear();
            // const finishYear = new Date(item.finishDate).getFullYear();
            // const startMonth = new Date(item.startDate).getMonth() + 1;
            // const finishMonth = new Date(item.finishDate).getMonth() + 1;
            // const startDay = new Date(item.startDate).getDate();
            // const finishDay = new Date(item.finishDate).getDate();
    
            const habitDaysArr = item.results.filter((el) => new Date(el.dateDay).getMonth() + 1 === +todayMonth);
    
            let statusNull = 0;
            let statusRed = 0;
            let statusGood = 0;
            let statusStop = 0;
            let statusDisabled = 0;

            if (habitDaysArr.length > 0) {
                 // const newHabitDaysArr = habitDaysArr
            const itemStartDay = new Date(habitDaysArr[0].dateDay).getDate() - 1;
    
    
    
            const habitDaysDisable = Array.from({ length: itemStartDay }, (el, i) => {
                return (
                    <li key={i} className="list-day block-empty"
    
                    ><CheckBox
                            status={0}
                            disable={"disabled"}
                            
                        /></li>
                )
            })
            const habitsDaysActive = habitDaysArr.map((el, i) => {
                return (
                    <li key={i} className="list-day block-empty"
                    dataId =  {el.dateDay}
                    onClick = {() => onChangeStatus(item.id, el.dateDay)}
                    ><CheckBox
                            status={el.status}
                            date={item.startDate}
                            
                            disable={""}
                            
                        /></li>
                )
            })
           
            function onDeleteHabit(event) {
                let idHabit = event.getAttribute('habit-id');
                newRequest.deleteResource(idHabit);
                props.renderAfterAdd();
            }

            const percent = (statusGood / ((statusRed + statusStop + statusNull + statusGood) - statusDisabled) * 100).toFixed(1);
    
    
            return (
                <div className="habits__row-name " key={item.id}>
                    <div className="habits__need block-empty name__habit">{item.count}</div>
                    <div className="habits__name block-empty name__habit">{item.nameHabit}</div>
                    <ul className="habits__list-days ">
                        {habitDaysDisable}
                        {habitsDaysActive}
           
                    </ul>
    
                    <div className="habits__percent block-empty">{percent}%</div>
                    <a onClick={(e) => onDeleteHabit(e.target)} className="habit__delete" habit-id={item.id}>Удалить</a>
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
    const habitRow = renderHabitsNew(props.dataBase, '2024', '02');

    return (
        <div className="habits__table-body">
            {habitRow}
        </div>
    )
}


export default TableHabits;