
import TableHeader from './tableName/TableHeader';
import TableHabits from './tableHabits/TableHabits';

const BlockTable = (props) => {


    return (
        <div className="habits__table">
                <TableHeader/>
                <TableHabits
                dataBase={props.dataBase}
                onChangeDataBase={props.onDataBaseLoaded}
                onUpdateDataBaseLoaded={props.onUpdateDataBaseLoaded}
                renderAfterAdd={props.renderAfterAdd}
                />
            </div>
    )
}
export default BlockTable;