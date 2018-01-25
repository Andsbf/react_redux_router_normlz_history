export const HttpJSON = {
  parseJSON(response) {
    return new Promise((resolve, reject) => {
      return response
        .json()
        .then((json) => {
          return resolve({
            status: response.status,
            ok: response.ok,
            json,
          })
        })
    })
  },

  handleResponse(response) {
    if (response.ok) {
      return {ok: true, data: response.json};
    }

    return {
      ok: false,
      error: {
        type: 'ServerError',
        messages: response.json,
      }
    };
  },

  serverUnreachable() {
    return {
      ok: false,
      error: {
        type: 'NetworkError'
      }
    }
  },
  GET(path, { accessToken }) {

    const myInit = {
      method: 'GET',
      headers: Object.assign({},this.headers, { "auth-token": accessToken }),
    };

    const url = 'http://'  + process.env.REACT_APP_API_ADDRESS + path;

    return fetch(url, myInit)
      .then(this.parseJSON)
      .then(this.handleResponse)
      .catch( this.serverUnreachable)
  },

  POST(path, body, { accessToken }) {
    let header = this.headers;

    if (accessToken) {
      header = Object.assign({},this.headers, {
        "auth-token": accessToken,
        "Content-Type":"application/json",
      })
    }

    const myInit = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body)
    };

    const url = 'http://'  + process.env.REACT_APP_API_ADDRESS + path;

    return fetch(url, myInit)
      .then(this.parseJSON)
      .then(this.handleResponse)
      .catch( this.serverUnreachable)
  },

  PUT(path, body, { accessToken }) {
    let header = this.headers;

    if (accessToken) {
      header = Object.assign({},this.headers, {
        "auth-token": accessToken,
        "Content-Type":"application/json",
      })
    }

    const myInit = {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(body)
    };

    const url = 'http://'  + process.env.REACT_APP_API_ADDRESS + path;

    return fetch(url, myInit)
      .then(this.parseJSON)
      .then(this.handleResponse)
      .catch( this.serverUnreachable)

  }
}
