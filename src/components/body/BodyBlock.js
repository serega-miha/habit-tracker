import './bodyBlock.scss'

import AddHabit from './addHabit/AddHabit';
import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import JsonBin from '../../service/request/JsonBin';
import BlockTable from './BlockTable';
import { monthsEng, monthRus, today } from '../../dataBase/daysMonths/daysAndMonths';

import Modal from '../Modal/Modal';


const BodyBlock = () => {
    const [dataBase, setDataBase] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('01')
    const [nameSelectedMonth, setNameSelectedMonth] = useState('January')
    const [selectedFullYear, setSelectedFullYear] = useState("2024")

    //создал для создания модального окна
    const [openModalCreate, setOpenModalCreate] = useState(false)
    function renderModalWindow(bool) {
        const modalCreateHabit = <Modal
            active={openModalCreate}
            setActive={setOpenModalCreate}
        >
            <AddHabit
                renderAfterAdd={renderAfterAdd}
                setOpenModalCreate={setOpenModalCreate}
            />
        </Modal>
        if (bool) {
            return modalCreateHabit
        } else {
            return null
        }
    }

    //сделал чтобы модальное окно исчезало из ДОМ дерева, когда его закрываешь!
    useEffect(() => {
        renderModalWindow(openModalCreate)
    }, [])


    const renderAfterAdd = () => {
        setCount(count + 1)
    }

    const request = new JsonBin();

    useEffect(() => {
        onRequest();
    }, [count])

    const onRequest = () => {
        request.getResource()
            .then(onDataBaseLoaded)
    }


    const onDataBaseLoaded = (dataBase) => {
        setDataBase(dataBase)
    }

    const onUpdateDataBaseLoaded = (dataBaseItem, numDataBase) => {
        request.putResourse(dataBaseItem, numDataBase);
    }

    const updateMonth = (i, nameMonth) => {
        setSelectedMonth(i)
        setNameSelectedMonth(nameMonth)
    }

    const linkMonths = monthsEng.map((item, i) => {
        if (today.getMonth() + 1 === i) {
        }
        return (
            <li
                className="item__month"
                key={i}
            >
                <NavLink
                    
                    to={"/" + item}
                    onClick={() => updateMonth(i + 1, item)}
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

            <Routes>
                <Route path={'/' + nameSelectedMonth}
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
            <div className="create-habit">
                <button className='my-btn' onClick={() => setOpenModalCreate(true)}>Создать</button>
                {renderModalWindow(openModalCreate)}
            </div>
        </div>

    )
}


export default BodyBlock;