



class JsonBin {
  // let req = new XMLHttpRequest();

  // req.onreadystatechange = () => {
  //   if (req.readyState == XMLHttpRequest.DONE) {
  //     console.log(req.responseText);
  //   }
  // };

  // req.open("GET", "https://api.jsonbin.io/v3/b/659fc232266cfc3fde75bcbc/latest", true);
  // req.setRequestHeader("$2a$10$QXNG1O.EnvKerT5zZPYqouYj8do8BsdGNl667HTPOhKHe7TvdhNoO", "$2a$10$Tjj9B4pFVAxUguaKWFRZnegst5bNucdxoJJDABU5l5qXljUwl8/3m");
  // req.send();


  // _url = 'https://api.jsonbin.io/v3/b/659fc232266cfc3fde75bcbc/latest';
  // _masterKey = "$2a$10$QXNG1O.EnvKerT5zZPYqouYj8do8BsdGNl667HTPOhKHe7TvdhNoO";
  // _accesKey = "$2a$10$Tjj9B4pFVAxUguaKWFRZnegst5bNucdxoJJDABU5l5qXljUwl8/3m";
  // _idBin = "659fc232266cfc3fde75bcbc";



  // fetch(_url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //         'X-Master-Key': _masterKey,
  //         'X-Access-Key': _accesKey
  //       },

  //     }).then(data => {
  //       return data.json();
  //     }).then(data => {
  //       console.log(data.record.dataBaseOfHabits
  //         );
  //     })

 _url = 'http://localhost:3001/data';

  getResource = async (url) => {
    let res = await fetch(this._url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    let response = await res.json();
    return response;
  }



  // console.log(getResource());
  // .then(data => {
  //   return data.json();
  // }).then(data => {
  //   console.log(data.record.dataBaseOfHabits
  //     );
  // })


}

export default JsonBin;