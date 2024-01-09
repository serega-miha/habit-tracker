
import './App.scss';
import BodyBlock from './components/body/BodyBlock';
 import HeaderBlock from './components/header/HeaderBlock';


function App() {
  return (
    <div className="App">
      <header className="header">
          <HeaderBlock/>
      </header>
      <main className='body'>
          <BodyBlock/>
      </main>
      <footer className='footer'>
        <h2>Footer</h2>
      </footer>
    </div>
  );
}

export default App;
