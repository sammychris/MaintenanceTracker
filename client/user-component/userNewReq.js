const textField = document.getElementById('message');
const logOut = document.getElementById('log-out');
const form = document.querySelector('form');
const loadingImgId = document.getElementById('loading');
const promtMessage = document.getElementById('prompt');
const upload = document.getElementById('fileSelect');
const fileElem = document.getElementById('fileElem');
const profileImg = document.getElementById('profileImg');

const request = {};


if (localStorage.length < 1) {
    alert('sorry this user needs to login!');
    location.assign(location.origin);
}

// admin must loggout before logging in again.
if (localStorage.getItem('adminToken')) {
    location.assign('../admin/requests.html');
}


const getUserProfile = (url) => {
    fetch(url, {
        method: 'GET',
        headers: {
            id: localStorage.getItem('id'),
            'x-access-token': localStorage.getItem('userToken'),
        },
        mode: 'cors',
        cache: 'default',
    }).then(response => response.json())
        .then((user) => {
            const { profilePicSrc } = user;
            if (profilePicSrc) {
                profileImg.src = profilePicSrc;
            } else {
                console.log(profilePicSrc);
                profileImg.src = '../img/proPic.png';
            }
            return console.log(user);
        });
};

const postData = (url, data) => fetch(url, { // Default options are marked with *
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        id: localStorage.getItem('id'),
        'x-access-token': localStorage.getItem('userToken'),
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
})
    .then(response => response.json()); // parses response to JSON


const promptMessTimeOut = (message) => {
    promtMessage.style.display = 'block';
    promtMessage.innerHTML = message;
    return setTimeout(() => {
        promtMessage.style.display = 'none';
    }, 10000);
};


const loadsApiTwoSeconds = (url) => {
    setTimeout(() => {
        postData(url, request)
            .then((result) => {
                console.log(result);
                if (result.error) {
                    promptMessTimeOut(result.error);
                    localStorage.clear();
                    return location.assign('./../');
                }
                textField.value = '';
                loadingImgId.style.display = 'none';
                return promptMessTimeOut(result.message);
            })
            .catch(error => console.error(error));
    }, 2000);
};
// setting the repair and maintenance button along side the request...
form.onsubmit = (e) => {
    e.preventDefault();
    const text = textField.value.trim();
    promtMessage.style.display = 'none';

    if (text.length < 20) return promptMessTimeOut('Description is too short!');
    loadingImgId.style.display = 'block';
    request.type = e.target.value;
    request.description = text;
    return loadsApiTwoSeconds('/users/requests');
};

upload.addEventListener('click', (e) => {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);


fileElem.onchange = (e) => {
    const { files } = e.target;
    const formData = new FormData();

    if (!files.length) {
        console.log('no file path specified!');
    } else if (files.length > 1) {
        alert('This is not allowed!');
    } else {
        formData.append('avatar', files[0]);
        fetch('/users/profile/upload', {
            method: 'PUT',
            headers: {
                id: localStorage.getItem('id'),
            },
            body: formData,
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                console.log('Success:', JSON.stringify(response));
                return getUserProfile('/users/profile');
            });
    }
};

getUserProfile('/users/profile');

// logging out the user
logOut.onclick = () => {
    if (confirm('Logout?')) localStorage.clear();
};
