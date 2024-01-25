import './bodyBlock.scss'

import AddHabit from './addHabit/AddHabit';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import JsonBin from '../../service/request/JsonBin';
import BlockTable from './BlockTable';
import { monthsEng, monthRus, today } from '../../dataBase/daysMonths/daysAndMonths';





const BodyBlock = () => {
    const [dataBase, setDataBase] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('01')
    const [nameSelectedMonth, setNameSelectedMonth] = useState('January')
    const [selectedFullYear, setSelectedFullYear] = useState("2024")

    
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

    const updateMonth = (i, nameMonth) => {
        setSelectedMonth(i)
        setNameSelectedMonth(nameMonth)
    }

    const linkMonths = monthsEng.map((item, i) => {

        if (today.getMonth() + 1 === i){

        }
       
        return (
            <li
                className="item__month"
            >
                <NavLink
                    to={"/"+item}
                    // className="NavLink__month"
                    onClick = {() => updateMonth(i+1, item)}
                    className={({ isActive }) =>
                   isActive ? "NavLink__month active" : "NavLink__month"
                  }
                >
                    {monthRus[i]}
                </NavLink>
            </li>
        )
    })

    return (

        <div className="body-container">
            <ul className="list__month">
     
                    {linkMonths}
            </ul>
            {/* <Outlet/> */}
            <Routes>
                <Route path={'/'+nameSelectedMonth}
                    element={<BlockTable
                        selectedMonth={selectedMonth}
                        selectedFullYear={selectedFullYear}
                        dataBase={dataBase}
                        onChangeDataBase={onDataBaseLoaded}
                        onUpdateDataBaseLoaded={onUpdateDataBaseLoaded}
                        renderAfterAdd={renderAfterAdd}
                    />}
                >
                </Route>


            </Routes>

        </div>

    )
}


export default BodyBlock;