import './bodyBlock.scss'
import TableHeader from './tableName/TableHeader';
import TableHabits from './tableHabits/TableHabits';
import AddHabit from './addHabit/AddHabit';
import YocReactDatePicker from './calendar/Calendar';



const BodyBlock = () => {
    return (
        <div className="body-container">
            <h2>Body</h2>
            <div className="habits__table">
                <TableHeader/>
                <TableHabits/>
            </div>
            <AddHabit/>
          
        </div>
    )
}


export default BodyBlock;