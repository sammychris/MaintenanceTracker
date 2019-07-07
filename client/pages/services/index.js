import authHeader from '../helpers';

function LogOut() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//       // auto logout if 401 response returned from api
//         signOut();
//         location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }

function validateJson(res) {
  if (!res.ok) {
    LogOut();
    location.reload(true);
    return Promise.reject(res.statusText);
  }
  return res.json();
}

function LogIn(url, data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(url, requestOptions)
    .then(validateJson)
    .then((res) => {
      // login successful if there's a user in the response
      if (res) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }
      return res;
    });
}


function GetAllRequests(url) {
  const { _id } = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    method: 'GET',
    headers: { user: _id, ...authHeader() },
  };

  return fetch(url, requestOptions).then(validateJson);
}

export {
  LogIn,
  LogOut,
  GetAllRequests,
};
