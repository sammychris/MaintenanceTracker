import '../stylesheet/style.css';
import '../stylesheet/w3.css';
import '../fonts';

const display = document.getElementsByTagName('tbody')[0];

if (localStorage.length < 1) {
    // user most login before seen any page
    alert('sorry this user needs to login!');
    location.assign(location.origin);
}

// admin must loggout before logging in again.
if (localStorage.getItem('adminToken')) {
    location.assign('../admin/admin-requests.html');
}

const crTag = (parent, tagName) => {
    const element = document.createElement(tagName);
    parent.append(element);
    return element;
};

const RequestTag = (date, name, type, status) => {
    const tag = crTag(display, 'tr');
    crTag(tag, 'td').innerHTML = date;
    crTag(tag, 'td').innerHTML = name;
    crTag(tag, 'td').innerHTML = type;
    const tdAncore = crTag(tag, 'td');

    const a = crTag(tdAncore, 'a');
    a.href = 'modify-request.html';

    crTag(a, 'button').innerHTML = 'View';
    const statusTag = crTag(tag, 'td');
    statusTag.innerHTML = 'Pending';
    statusTag.style.color = 'grey';
};


fetch('/users/requests', {
    method: 'GET',
    headers: {
        id: localStorage.getItem('id'),
        'x-access-token': localStorage.getItem('userToken'),
    },
    mode: 'cors',
    cache: 'default',
})
    .then((response) => {
        response.json().then((result) => {
            const data = result.requests;
            console.log(data);
            data.forEach(obj => RequestTag(obj.date, obj.name, obj.type, obj.status));
            const button = document.getElementsByTagName('button');

            for (let i = 0; i < button.length; i++) {
                button[i].onclick = () => {
                    localStorage.setItem('requestId', i);
                };
            }
        });
    });
