import './bodyBlock.scss'

import AddHabit from './addHabit/AddHabit';
import { useState,useEffect } from 'react';
import JsonBin from '../../service/request/JsonBin';
import BlockTable from './BlockTable';




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
        console.log(dataBaseItem);
        console.log(numDataBase);
        request.putResourse(dataBaseItem, numDataBase);
    }

    
    return (
        <div className="body-container">
            <ul className="list__month">
                <li className="item__month"><a className="link__month">Январь</a></li>
                <li className="item__month"><a className="link__month">Февраль</a></li>
                <li className="item__month"><a className="link__month">Март</a></li>
                <li className="item__month"><a className="link__month">Апрель</a></li>
                <li className="item__month"><a className="link__month">Май</a></li>
                <li className="item__month"><a className="link__month">Июнь</a></li>
                <li className="item__month"><a className="link__month">Июль</a></li>
                <li className="item__month"><a className="link__month">Август</a></li>
                <li className="item__month"><a className="link__month">Сентябрь</a></li>
                <li className="item__month"><a className="link__month">Октябрь</a></li>
                <li className="item__month"><a className="link__month">Ноябрь</a></li>
                <li className="item__month"><a className="link__month">Декабрь</a></li>

            </ul>
            <BlockTable
            dataBase={dataBase}
            onChangeDataBase={onDataBaseLoaded}
            onUpdateDataBaseLoaded={onUpdateDataBaseLoaded}
            renderAfterAdd={renderAfterAdd}
            />
            <AddHabit
            dataBase={dataBase}
            renderAfterAdd={renderAfterAdd}
            />
            <input type="text" name="name" autoComplete='off'/>
        </div>
    )
}


export default BodyBlock;