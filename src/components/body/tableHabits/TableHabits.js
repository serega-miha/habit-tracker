import './tableHabits.scss'
import { days, months } from '../../../dataBase/daysMonths/daysAndMonths';
import { dataBaseOfHabits } from '../../../dataBase/daysMonths/dataBaseOfHabits';
import CheckBox from '../checkBox/checkBox';
import { useState } from 'react';



const TableHabits = () => {
    const [dataBase, setDataBase] = useState(dataBaseOfHabits)

    const onChangeStatus = (numDataBase, numDataBaseResults) => {
     
        const status = dataBase[numDataBase].results[numDataBaseResults].status;
        
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
        // const newArr = dataBase.map((item, i) => (
        //     i === numDataBase
        //     ? {...item, item.results[numDataBaseResults].status : newStatus}
        //     : item
        // ))
        // console.log(newArr);
        // console.log(dataBase);
    }

    function renderHabits(arr) {
        const habitRow = arr.map((item, y) => {
            const habitDaysArr = item.results;
            const habitDays = habitDaysArr.map((el, i) => {

                return (
                    <li key={i} className="list-day block-empty" 
                    onClick={() => onChangeStatus(y,i)}
                    ><CheckBox status={el.status}/></li>
                )
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







    const habitRow = renderHabits(dataBase)

    return (
        <div className="habits__table-body">
            {habitRow}
        </div>
    )
}


export default TableHabits;