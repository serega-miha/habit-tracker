
import './App.scss';
 import HeaderBlock from './components/header/HeaderBlock';


function App() {
  return (
    <div className="App">
      <header className="header">
          <HeaderBlock/>
      </header>
      <main className='body'>
        <h2>Body</h2>
      </main>
      <footer className='footer'>
        <h2>Footer</h2>
      </footer>
    </div>
  );
}

export default App;
