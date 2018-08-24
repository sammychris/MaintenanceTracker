const textField = document.getElementsByTagName('textarea')[0];
const logOut = document.getElementById('log-out');
const btnInput = document.getElementsByTagName('button');

const request = {};

if (localStorage.length < 1) {
    alert('sorry this user needs to login!');
    location.assign(location.origin);
}

// admin must loggout before logging in again.
if (localStorage.getItem('adminToken')) {
    location.assign('../admin/admin-requests');
}

const postData = (url, data) => fetch(url, { // Default options are marked with *
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        id: localStorage.getItem('id'),
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
})
    .then(response => response.json()); // parses response to JSON


// setting the repair and maintenance button along side the request...
for (let i = 0; i < btnInput.length; i++) {
    btnInput[i].onclick = (e) => {
        e.preventDefault();
        const text = textField.value.trim();
        if (text.length < 10) return alert('Should not be less the 10 character');
        request.type = this.value;
        request.description = text;

        return postData('/users/requests', request)
            .then((result) => {
                console.log(result);
                if (result.error) {
                    alert(result.error);
                    localStorage.clear();
                    return location.assign('./../');
                }
                return alert(result.message);
            })
            .catch(error => console.error(error));
        textField.value = '';
    };
}


// logging out the user
logOut.onclick = () => {
    if (confirm('Logout?')) localStorage.clear();
};
