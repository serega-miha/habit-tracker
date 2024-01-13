import './tableHabits.scss'

import CheckBox from '../checkBox/checkBox';
import { today, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';



const TableHabits = (props) => {
   

    // const today = new Date();
    // const countDaysOfMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
 

   

    
//функция изменения статуса привычки
    const onChangeStatus = (numDataBase, numDataBaseResults) => {
        const status = props.dataBase[numDataBase].results[numDataBaseResults].status;
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
        const dataBaseItem = props.dataBase[numDataBase];
        const habitList = dataBaseItem.results;
        
        // console.log(habitList); 
        const newHabitList = habitList.map((item) => {
            if (item.day === numDataBaseResults + 1){
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
            ...dataBaseItem,
            results: newHabitList
        }
        const newDataBase = props.dataBase.map((item, i) => {
            if (i === numDataBase){
                return newDataBaseItem
            } else {
                return item
            }
        })
        props.onChangeDataBase(newDataBase);

    }





    //рендерин привычек из базы данных
    function renderHabits(arr) {
        const habitRow = arr.map((item, y) => {
            const habitDaysArr = item.results;
            const habitDays = habitDaysArr.map((el, i) => {

                while (i <= countDaysOfMonth - 1){
                   
                    if (item.startDate.split("-")[2] > i){
                       
                        return (
                            <li key={i} className="list-day block-empty" 
                            onClick={() => onChangeStatus(y,i)}
                            ><CheckBox
                             status={0}
                             disable={"disabled"}
                             /></li>
                        )
                    } else { 
                        
                        
                        return (
                            <li key={i} className="list-day block-empty" 
                            onClick={() => onChangeStatus(y,i)}
                            ><CheckBox
                             status={el.status}
                             date={item.startDate}
                             disable={""}
                             /></li>
                        )
                    }
                }
            })
            return (
                <div className="habits__row-name" key={item.id}>
                    <div className="habits__need block-empty">{item.count}</div>
                    <div className="habits__name block-empty">{item.nameHabit}</div>
                    <ul className="habits__list-days ">
                        {habitDays}
                    </ul>

                    <div className="habits__percent block-empty">67%</div>
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