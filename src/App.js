
import { Component, useState } from 'react';
import './App.scss';
import BodyBlock from './components/body/BodyBlock';
import BodyMind from './components/bodyMind/BodyMind';
import HeaderBlock from './components/header/HeaderBlock';
import JsonBin from './service/request/JsonBin';
import { dataBaseOfHabits } from './dataBase/daysMonths/dataBaseOfHabits';
import { dataBaseOfHabitsOne } from './dataBase/daysMonths/dataBaseOfHabits';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyProfile from './components/bodyMind/MyProfile';
import YuorProfile from './components/bodyMind/YuorProfile';
import Pages404 from './components/pages/404';
import BlockTable from './components/body/BlockTable';
import Modal from './components/Modal/Modal';

function App() {

  const [modalActive, setModalActive] = useState(true)
  // const [dataBase, setDataBase] = useState(dataBaseOfHabits.data)

  // let request = new JsonBin();



  // function onRequest() {
  //   request.getResource()
  //     .then(data => console.log(data))
  // }

  // // onRequest();


  // const onAdd = () => {
  //   const dataItem = dataBaseOfHabitsOne;
  //   const newData = dataBase.push(dataItem)

  //   setDataBase(newData);
  //   // console.log(dataBase);
  // }


  return (
    <Router>
      <div className="App">
        <header className="header">
          <HeaderBlock />
        </header>
        <main className='body'>
          <Routes>
            <Route path="/" element={<BodyBlock />}>
              <Route path="/:month" element={<BlockTable />} />
            </Route>
            <Route path="/mind" element={<BodyMind />}>
              <Route path="me" element={<MyProfile />} />
              <Route path="you" element={<YuorProfile />} />
            </Route>
            <Route path="*" element={<Pages404 />} />


          </Routes>
          <button onClick={() => setModalActive(true)}>open modal window</button>
          <Modal active={modalActive} setActive={setModalActive}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi reprehenderit harum omnis, modi fugiat quasi. Voluptates est saepe voluptas, neque dolore accusamus ipsam repellat aspernatur veritatis omnis facere aliquid reprehenderit?</p>
            <h3>12313213</h3>
          </Modal>
        </main>
        <footer className='footer'>
          <h2>Footer</h2>
        </footer>
      </div>
    </Router>
  );
}

export default App;
