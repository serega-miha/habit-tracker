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
                    // style={({ isActive }) => ({ backgroundColor: isActive ? "black" : "none" })}
                >
                    {monthRus[i]}
                </NavLink>
            </li>
        )
    })

    return (

        <div className="body-container">
            <ul className="list__month">
                {/* <li className="item__month"><NavLink to="/January" data-number="1" className="NavLink__month">Январь</NavLink></li>
                <li className="item__month"><NavLink to="/February" data-number="2" className="NavLink__month">Февраль</NavLink></li>
                <li className="item__month"><NavLink to="/March" data-number="3" className="NavLink__month">Март</NavLink></li>
                <li className="item__month"><NavLink to="/April" data-number="4" className="NavLink__month">Апрель</NavLink></li>
                <li className="item__month"><NavLink to="/May" data-number="5" className="NavLink__month">Май</NavLink></li>
                <li className="item__month"><NavLink to="/June" data-number="6" className="NavLink__month">Июнь</NavLink></li>
                <li className="item__month"><NavLink to="/July" data-number="7" className="NavLink__month">Июль</NavLink></li>
                <li className="item__month"><NavLink to="/August" data-number="8" className="NavLink__month">Август</NavLink></li>
                <li className="item__month"><NavLink to="/September" data-number="9" className="NavLink__month">Сентябрь</NavLink></li>
                <li className="item__month"><NavLink to="/October" data-number="10" className="NavLink__month">Октябрь</NavLink></li>
                <li className="item__month"><NavLink to="/November" data-number="11" className="NavLink__month">Ноябрь</NavLink></li>
                <li className="item__month"><NavLink to="/December" data-number="12" className="NavLink__month">Декабрь</NavLink></li> */}
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