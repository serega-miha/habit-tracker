
import { Component, useState } from 'react';
import './App.scss';
import BodyBlock from './components/body/BodyBlock';
import HeaderBlock from './components/header/HeaderBlock';
import JsonBin from './service/request/JsonBin';
import { dataBaseOfHabits } from './dataBase/daysMonths/dataBaseOfHabits';
import { dataBaseOfHabitsOne } from './dataBase/daysMonths/dataBaseOfHabits';


function App() {
  const [dataBase, setDataBase] = useState(dataBaseOfHabits.data)

  let request = new JsonBin();



  function onRequest() {
    request.getResource()
      .then(data => console.log(data))
  }

  // onRequest();


  const onAdd = () => {
    const dataItem = dataBaseOfHabitsOne;
    const newData = dataBase.push(dataItem)

    setDataBase(newData);
    // console.log(dataBase);
  }
  // console.log(dataBase);

  // fetch('https://jsonplaceholder.typicode.com/todos')
  //   .then(response => response.json())
  //   .then(data => console.log(data))


//   const _url = 'https://api.jsonbin.io/v3/b/659fc232266cfc3fde75bcbc/latest';
// const  _masterKey = "$2a$10$QXNG1O.EnvKerT5zZPYqouYj8do8BsdGNl667HTPOhKHe7TvdhNoO";
// const _accesKey = "$2a$10$Tjj9B4pFVAxUguaKWFRZnegst5bNucdxoJJDABU5l5qXljUwl8/3m";
// const _idBin = "659fc232266cfc3fde75bcbc";

// let req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//   if (req.readyState == XMLHttpRequest.DONE) {
//     console.log(req.responseText);
//   }
// };

// req.open("PUT", `https://api.jsonbin.io/v3/b/${_idBin}`, true);
// req.setRequestHeader("Content-Type", "application/json");
// req.setRequestHeader(_masterKey, _accesKey);
// req.send('{"sample": "Hello World!!!!!!"}');

  // fetch(_url, {
  //   method: 'PUT',
  //   body: JSON.stringify({dataBaseOfHabitsOne}),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //     'X-Master-Key': _masterKey,
  //     'X-Access-Key': _accesKey
  //   }
  // })
  //   .then(response => response.json())
  //   .then(json => console.log(json))



  //   let reqQ = new XMLHttpRequest();

  // reqQ.onreadystatechange = () => {
  //   if (reqQ.readyState == XMLHttpRequest.DONE) {
  //     console.log(reqQ.responseText);
  //   }
  // };

  // reqQ.open("GET", "https://api.jsonbin.io/v3/b/659fc232266cfc3fde75bcbc/latest", true);
  // reqQ.setRequestHeader("$2a$10$QXNG1O.EnvKerT5zZPYqouYj8do8BsdGNl667HTPOhKHe7TvdhNoO", "$2a$10$Tjj9B4pFVAxUguaKWFRZnegst5bNucdxoJJDABU5l5qXljUwl8/3m");
  // reqQ.send();



  // fetch(' http://localhost:3001/data')
  // .then((response) => {
  //   return response.json();
  // }) 
  // .then((data) => {
  //   console.log(data);
  // });

//   const object = {dataBaseOfHabitsOne};
 

// const request2 = new Request(' http://localhost:3001/data', {
//   method: 'POST',
//   body: JSON.stringify(object.dataBaseOfHabitsOne),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// const response2 =fetch(request2);


  return (
    <div className="App">
      <header className="header">
        <HeaderBlock />
      </header>
      <main className='body'>
        <BodyBlock />
        <button onClick={() => onAdd()}>add</button>
      </main>
      <footer className='footer'>
        <h2>Footer</h2>
      </footer>
    </div>
  );
}

// class App extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: []
//     };
//   }

//   componentDidMount(){
//     let url = 'http://http://localhost:3000/posts'
//     fetch(url)
//       .then(resp => resp.json())
//       .then(data => {
//         let posts = data.map((post, index) => {
//           return (
//             <div key={index}>
//               <h3>{post.title}</h3>
//               <p>Tags: {post.tags}</p>
//             </div>
//           )
//         })
//         this.setState({posts: posts})
//       })
//   }

//   render () {
//     return (
//       <div className="app">
//         {this.state.posts}
//       </div>
//     )
//   }

// }

export default App;
