



class JsonBin {


  _url = 'http://localhost:3333/data';

  getResource = async () => {
    try {
      let res = await fetch(this._url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      if (!res.ok) {
        throw new Error(`Could not fetch ${this._url}, status: ${res.status}`);
      }

      let response = await res.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  postResource = async (data) => {

    try {
      let res = await fetch(this._url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      })
      if (!res.ok) {
        throw new Error(`Could not fetch ${this._url}, status: ${res.status}`);
      }

    } catch (error) {
      console.log(error);
    }

  }

  deleteResource = async (id) => {
    try {
      let res = await fetch(`${this._url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },


      })
      if (!res.ok) {
        throw new Error(`Could not fetch ${this._url}, status: ${res.status}`);
      }

    } catch (error) {
      console.log(error);
    }
  }

  putResourse = async (data, id) => {
    try {
      let res = await fetch(`${this._url}/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      })
      if (!res.ok) {
        throw new Error(`Could not fetch ${this._url}, status: ${res.status}`);
      }

    } catch (error) {
      console.log(error);
    }
  }

}

export default JsonBin;