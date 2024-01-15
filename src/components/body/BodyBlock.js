import './bodyBlock.scss'
import TableHeader from './tableName/TableHeader';
import TableHabits from './tableHabits/TableHabits';
import AddHabit from './addHabit/AddHabit';
import { useState,useEffect } from 'react';
import JsonBin from '../../service/request/JsonBin';




const BodyBlock = () => {
    const [dataBase, setDataBase] = useState([]);
    const [count, setCount] = useState(0);
 
    const renderAfterAdd = () => {
        setCount(count + 1)
    }

    const request = new JsonBin();

    useEffect(() => {
        onRequest();
      
        // console.log(dataBase[0]); 
    }, [count])

    const onRequest = () => {
        request.getResource()
            .then(onDataBaseLoaded)
    }


    const onDataBaseLoaded = (dataBase) => {
        setDataBase(dataBase)
        // request.putResourse(dataBase, numDataBase);
    }

    const onUpdateDataBaseLoaded = (dataBaseItem, numDataBase) => {
        // console.log(dataBaseItem);
        // console.log(numDataBase);
        request.putResourse(dataBaseItem, numDataBase);
    }

    
    return (
        <div className="body-container">
            <h2>Body</h2>
            <div className="habits__table">
                <TableHeader/>
                <TableHabits
                dataBase={dataBase}
                onChangeDataBase={onDataBaseLoaded}
                onUpdateDataBaseLoaded={onUpdateDataBaseLoaded}
                renderAfterAdd={renderAfterAdd}
                />
            </div>
            <AddHabit
            dataBase={dataBase}
            renderAfterAdd={renderAfterAdd}
            />
            <input type="text" name="name" autoComplete='off'/>
        </div>
    )
}


export default BodyBlock;