import authHeader from '../helpers';


function logOut() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}


const postRequestOptions = (data) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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


function signUp(url, data) {
  return fetch(url, postRequestOptions(data))
    .then(validateJson)
    .then((res) => {
      alert(res.message);
      return res;
    });
}


function logIn(url, data) {
  return fetch(url, postRequestOptions(data))
    .then(validateJson)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }
      alert(res.message);
      return res;
    });
}


function getAllRequests(url) {
  const { _id } = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    method: 'GET',
    headers: { user: _id, ...authHeader() },
  };

  return fetch(url, requestOptions).then(validateJson);
}


function postRequest(url, data) {
  return fetch(url, postRequestOptions(data))
    .then(validateJson);
}

export {
  logIn,
  signUp,
  logOut,
  getAllRequests,
  postRequest,
};
