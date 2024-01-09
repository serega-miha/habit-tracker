import './tableHeader.scss'
import { days, months } from '../../../dataBase/daysMonths/daysAndMonths';


const TableHeader = () => {

    const today = new Date();
   
    //количество дней в месяце
    const countDaysOfMonth = 32 - new Date(2024, 0, 32).getDate();

    //первый день в месяце
    const firstDayofMonth = new Date(today.getFullYear(),today.getMonth(),1).getDay();
   

    // let i;
    // let y;
    // for (i = 0; i <= days.length; i++) {
    //     y++;
    //     while (y === countDaysOfMonth){

    //     }
        
    // }

    return (
        <div className="habits__table-header">
            <div className="habits__row-name">
                <div className="habits__need block-empty">Количество в неделю</div>
                <div className="habits__name block-empty">Название привычки</div>
                <ul className="habits__list-days ">
                    <div className="li list-day block-empty">09 ПН</div>
                    <div className="li list-day block-empty">10 ВТ</div>
                    

                </ul>
                <div className="habits__percent block-empty">% исполнения</div>
            </div>
        </div>
    )
}


export default TableHeader;