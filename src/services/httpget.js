const uri = "https://accounts.stage.satoshkin.com"
// const uri = "http://dimadudin.com:1488"

export function getData (url, params) {
  //dev hack
  let headers = {};
  headers['Content-Type'] = 'application/json'
  if (params) {
    for (let i = 0; i < params.length; i++) {
      headers[Object.keys (params[i])] = params[i][Object.keys (params[i])];
    }
  }
  headers['Authorization'] = localStorage.getItem ('id_token');

  return fetch (url, {
    method: 'get',
    headers: headers,
  })
  .then (response => {
    if (window.location.hostname === 'localhost') {
      return {isAuthenticated: false}
    }
    if (response.status == 200) return response.json() 
    else return {success: false}
  }, (error) => {
    // promise was rejected, handle error
    console.log(error);
  })
}

export function putData (url, body) {
  //dev hack
  if (window.location.hostname === 'localhost') {
    url = uri + url;
  }
  return fetch (url, {
    method: 'put',
    headers: {
      Authorization: localStorage.getItem ('id_token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (body),
  }).then (data => {
    return data.json();
  });
}

export function postData (url, body) {
  //dev hack
  if (window.location.hostname === 'localhost') {
    url = uri + url;
  }
  return fetch (url, {
    method: 'post',
    headers: {
      Authorization: localStorage.getItem ('id_token'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (body),
  }).then (data => {
    return data.json();
  });
}

export function deleteData (url, body) {
  console.log (body);
  //dev hack
  if (window.location.hostname === 'localhost') {
    url = uri + url;
  }
  return fetch (url, {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.getItem ('id_token'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (body),
  }).then (data => {
    return data.json();
  });
}
