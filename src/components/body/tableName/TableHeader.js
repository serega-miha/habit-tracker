import './tableHeader.scss'
import { days, today } from '../../../dataBase/daysMonths/daysAndMonths';



const TableHeader = (props) => {


    //количество дней в месяце
    const countDaysOfMonth = 32 - new Date(props.selectedFullYear, props.selectedMonth - 1, 32).getDate();

    //первый день в месяце
    const firstDayofMonth = new Date(props.selectedFullYear, props.selectedMonth - 1, 1).getDay();


    //создаем массив с днями и числами
    const createArr = (firstDay, daysOfMonth) => {
        let i = firstDay - 1;
        let y = 1;
        let arr = [];
        for (y = 1; y <= daysOfMonth; y++) {
            if (i === 7) {
                i = 0
            }
            arr.push([days[i], y])
            i++
        }
        return arr;
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            //это сделано для выделения сегодня стилями
            if (today.getDate() === i + 1 && today.getMonth() === props.selectedMonth - 1){
                return (
                    <li key={i} className="list-day block-empty block-empty__active">{item[0]} {item[1]}</li>
                )
            } else {
            return (
                <li key={i} className="list-day block-empty">{item[0]} {item[1]}</li>
            )
            }
        })
        return (
            <ul className="habits__list-days ">
                {items}
            </ul>

        )
    }

    // let data = dataBaseOfHabits[0].results;
    // console.log(data[2].status);




    const itemsDays = renderItems(createArr(firstDayofMonth, countDaysOfMonth))
    


    return (
        <div className="habits__table-header">
            <div className="habits__row-name">
                <div className="habits__need block-empty">#</div>
                <div className="habits__name block-empty">Название привычки</div>
                {itemsDays}
                <div className="habits__percent block-empty">% исполнения</div>
                <div className="habits__percent ">удалить</div>
            </div>
            
        </div>
    )
}


export default TableHeader;