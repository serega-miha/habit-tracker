
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

        </main>
        <footer className='footer'>
          <h2>Footer</h2>
        </footer>
      </div>
    </Router>
  );
}

export default App;
