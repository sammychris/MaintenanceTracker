import authHeader from '../helpers';


function logOut() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}


const postRequestOptions = (data) => { // post Options
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  };
};


function validateJson(res) {
  console.log(res);
  // if (!res.ok) {
  //   logOut();
  //   location.reload(true);
  //   return Promise.reject(res.statusText);
  // }
  return res.json();
}


function signUp(url, data) { // Sign Up A User
  return fetch(url, postRequestOptions(data))
    .then(validateJson)
    .then((res) => {
      alert(res.message);
      return res;
    });
}


function logIn(url, data) { // Login A User
  return fetch(url, postRequestOptions(data))
    .then(validateJson)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }
      return res;
    });
}


function getAllRequests(url) { // Get All Requests
  const { _id } = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    method: 'GET',
    headers: { user: _id, ...authHeader() },
  };

  return fetch(url, requestOptions).then(validateJson);
}


function postRequest(url, data) { // Post A Request
  return fetch(url, postRequestOptions(data))
    .then(validateJson);
}

function updateRequest(url, data) { // Update A Request
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  };
  return fetch(url, requestOptions)
    .then(validateJson);
}

function deleteRequest(url) { // Update A Request
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  };
  return fetch(url, requestOptions)
    .then(validateJson);
}

export {
  logIn,
  signUp,
  logOut,
  getAllRequests,
  postRequest,
  updateRequest,
  deleteRequest,
};
