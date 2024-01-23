
import TableHeader from './tableName/TableHeader';
import TableHabits from './tableHabits/TableHabits';
import { useState } from 'react';
import AddHabit from './addHabit/AddHabit';

const BlockTable = (props) => {





    return (
        <div className="habits__table">
            <TableHeader
                selectedFullYear={props.selectedFullYear}
                selectedMonth={props.selectedMonth}
            />
            <TableHabits
                selectedFullYear={props.selectedFullYear}
                selectedMonth={props.selectedMonth}
                dataBase={props.dataBase}
                onChangeDataBase={props.onDataBaseLoaded}
                onUpdateDataBaseLoaded={props.onUpdateDataBaseLoaded}
                renderAfterAdd={props.renderAfterAdd}
            />
            <AddHabit
            dataBase={props.dataBase}
            renderAfterAdd={props.renderAfterAdd}
            />
        </div>
    )
}
export default BlockTable;