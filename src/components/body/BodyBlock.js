import './bodyBlock.scss'
import TableHeader from './tableName/TableHeader';
import TableHabits from './tableHabits/TableHabits';
import CheckBox from './checkBox/checkBox';


const BodyBlock = () => {
    return (
        <div className="body-container">
            <h2>Body</h2>
            <div className="habits__table">
                <TableHeader/>
                <TableHabits/>
            </div>
          

        </div>
    )
}


export default BodyBlock;