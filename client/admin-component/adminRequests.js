const display = document.getElementsByTagName('tbody')[1];
const board = document.getElementById('board');
const trTag = document.getElementsByClassName('trTag');
const itemDist = document.getElementsByClassName('des');
const logOut = document.getElementsByClassName('log-out');
const totalReq = document.getElementById('total-request');
const rejectReq = document.getElementById('rejected-request');
const resolveReq = document.getElementById('resolved-request');
const accessing = document.getElementsByClassName('access');
const notify = document.getElementById('notify');
const notifyTab = document.getElementById('notifyTab');
const clickNotification = document.getElementById('notification-section');
const displayNotification = document.querySelector('.notification-container');
const searchButton = document.getElementById('search');
let notificate = false;
let windowClick = false;


// if it eventually falls in this page? go back to user.
if (localStorage.getItem('userToken')) {
    location.assign('../contents/users.html');
}

for (let i = 0; i < logOut.length; i++) {
    logOut[i].onclick = () => {
        if (confirm('Logout?')) {
            localStorage.clear();
            location.assign(`${location.origin}/admin`);
        }
    };
}


const getAllRequest = () => fetch('/requests', {
    method: 'GET',
    headers: {
        id: localStorage.getItem('id'),
        'x-access-token': localStorage.getItem('adminToken'),
    },
    mode: 'cors',
    cache: 'default',
}).then(response => response.json());


function checkingStatus(status, accept, reject, resolve, trIcon, tr) {
    switch (status.toLowerCase()) { // accepted, rejected, resolve and default
    case 'accepted':
        accept.className = 'accepted';
        accept.title = 'Accepted';
        reject.className = 'cannot-icon';
        resolve.className = 'resolving';
        trIcon.className = 'processing-icon';
        break;
    case 'rejected':
        accept.style.display = 'none';
        resolve.style.display = 'none';
        reject.title = 'Rejected';
        reject.innerText = 'Rejected';
        reject.className = 'rejected';
        trIcon.className = 'finished-icon';
        break;
    case 'resolved':
        accept.style.display = 'none';
        reject.style.display = 'none';
        resolve.innerText = 'Resolved';
        resolve.className = 'resolved';
        trIcon.className = 'finished-icon';
        break;
    default:
        accept.className = 'accept';
        accept.title = 'Accept';
        reject.className = 'reject-icon';
        reject.title = 'Reject';
        resolve.className = 'greyresolve';
        resolve.title = 'Accept or Reject!';
        trIcon.className = 'pending-icon';
        tr.setAttribute('class', 'trTag pendingState');
        break;
    }
}


const crTag = (parent, tagName, notification, firstTr) => {
    const element = document.createElement(tagName);
    if (notification) parent.insertBefore(element, firstTr);
    else parent.append(element);
    return element;
};


const RequestTag = (date, name, type, description, status, id, value) => {
    let tag;

    if (value) { // Creating the tr tag
        const firstTrTag = display.firstElementChild;
        tag = crTag(display, 'tr', value, firstTrTag);
    } else tag = crTag(display, 'tr');

    const td1 = crTag(tag, 'td');
    const requestIcon = crTag(td1, 'span');
    const newDescription = description.slice(0, 18);
    tag.className = 'trTag';
    tag.id = id;
    td1.style.width = '30px';
    crTag(tag, 'td').innerHTML = date;
    crTag(tag, 'td').innerHTML = name;
    crTag(tag, 'td').innerHTML = type;

    const descriptionSet = crTag(tag, 'td');
    descriptionSet.innerHTML = newDescription;

    const tdAnchor = crTag(tag, 'td');
    tdAnchor.className = 'action';

    const acceptTag = crTag(tdAnchor, 'a');
    const rejectTag = crTag(tdAnchor, 'a');
    const resolveTag = crTag(tdAnchor, 'a');

    checkingStatus(status, acceptTag, rejectTag, resolveTag, requestIcon, tag);
};


// This is part is to update the request state or status...
function updateRequestRoute(reqName, index) {
    return fetch(`/requests/${index}/${reqName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': localStorage.getItem('adminToken'),
        },
    }).then(requests => requests.json());
}

// This part is for the board... on hover
const displayRequest = (id, event, padding, icon) => {
    getAllRequest().then((result) => {
        const data = result.requests.find(a => a.id === id);
        itemDist[0].innerHTML = data.date;
        itemDist[1].innerHTML = data.name;
        itemDist[2].innerHTML = data.type;
        itemDist[3].innerHTML = data.description;
        board.style.display = 'block';
        board.style.top = `${event.clientY + padding}px`;
        icon.style.display = 'none';
    });
};


const notificationPanel = (userImg, userName, request, id) => {
    const loadingIcon = document.querySelector('.loadingRequest');
    const parent = document.getElementById('notification-panel');
    const li = crTag(parent, 'li');
    li.id = id;
    li.className = 'liHover';

    crTag(li, 'span').setAttribute('class', 'icons pending-icon');
    const div = crTag(li, 'div');
    const userIcon = crTag(div, 'img');
    const pTag = crTag(div, 'p');
    const spTag1 = crTag(pTag, 'span');
    const spTag2 = crTag(pTag, 'span');
    userIcon.className = 'user-icon';
    userIcon.src = userImg || '../img/proPic.png';
    pTag.className = 'usercontents';
    spTag1.innerHTML = `${userName}`;
    spTag1.style.color = '#444';
    spTag1.style.fontWeight = 'bold';
    spTag1.style.fontSize = '11px';
    spTag2.innerHTML = ` --- sent ${request} request`;
    spTag2.style.fontStyle = 'italic';
    spTag2.style.fontSize = '11px';

    li.onmouseenter = (e) => {
        loadingIcon.style.display = 'block';
        loadingIcon.style.top = `${event.clientY - 20}px`;
        loadingIcon.style.left = `${event.clientX + 30}px`;
        displayRequest(li.id, e, 70, loadingIcon);
    };

    li.onmouseleave = () => {
        loadingIcon.style.display = 'none';
        board.style.display = 'none';
    };
};


function refreshingElments(parent, children) {
    while (children[0]) {
        parent.removeChild(children[0]);
    }
}

function updateStatus(reqName, status, eachAction, i) {
    const requestId = trTag[i].id;
    updateRequestRoute(`${reqName}`, requestId)
        .then((output) => {
            trTag[i].className = 'trTag';
            const requestIcon = document.querySelectorAll('.trTag td span');
            const reqType = output[status];
            checkingStatus(
                reqType.status,
                eachAction[0],
                eachAction[1],
                eachAction[2],
                requestIcon[i],
                trTag[i],
            );
            if (status === 'accepted') {
                document.getElementsByClassName('resolving')[0].onclick = () => {
                    updateStatus('resolve', 'resolved', eachAction, i);
                };
            }
            const message = `${status[0].toUpperCase() + status.slice(1)}!`;
            console.log(message);
            getAllRequest().then((result) => {
                const data = result.requests;
                const notifications = data.filter(a => a.status.toLowerCase() === 'pending');
                if (notifications.length) notify.innerHTML = notifications.length;
                else notify.style.display = 'none';
                notifyTab.innerHTML = notifications.length;
                totalReq.innerHTML = data.length;
                rejectReq.innerHTML = data.filter(a => a.status.toLowerCase() === 'rejected').length;
                resolveReq.innerHTML = data.filter(a => a.status.toLowerCase() === 'resolved').length;
            });
        });
}


function masterEventsForAllRequests() {
    const action = document.getElementsByClassName('action');
    const loadingIcon = document.querySelector('.loadingRequest');

    window.onclick = () => {
        board.style.display = 'none';
        if (windowClick && notificate) {
            displayNotification.style.display = 'none';
            windowClick = false;
        }
    };
    display.onmouseleave = () => { board.style.display = 'none'; };

    for (let i = 0; i < trTag.length; i++) {
        const eachAction = action[i].childNodes;
        let timing;
        trTag[i].onmouseenter = (e) => {
            loadingIcon.style.display = 'block';
            loadingIcon.style.top = `${event.clientY - 20}px`;
            loadingIcon.style.left = `${event.clientX + 30}px`;
            timing = setTimeout(() => {
                if (e.clientY > 500) {
                    return displayRequest(trTag[i].id, e, -200, loadingIcon);
                }
                return displayRequest(trTag[i].id, e, 70, loadingIcon);
            }, 1000);
        };
        trTag[i].onmouseleave = () => {
            board.style.display = 'none';
            loadingIcon.style.display = 'none';
            clearTimeout(timing);
        };

        for (let x = 0; x < eachAction.length; x++) {
            if (eachAction[x].className === 'accept') {
                eachAction[x].onclick = () => {
                    updateStatus('approve', 'accepted', eachAction, i);
                };
            } else if (eachAction[x].className === 'reject-icon') {
                eachAction[x].onclick = () => {
                    updateStatus('disapprove', 'rejected', eachAction, i);
                };
            } else if (eachAction[x].className === 'resolving') {
                eachAction[x].onclick = () => {
                    updateStatus('resolve', 'resolved', eachAction, i);
                };
            }
        }
    }
}


function withOutNotification(data, value) {
    data = data.sort((a, b) => b.sorting - a.sorting);
    totalReq.innerHTML = data.length;
    const notifications = data.filter(a => a.status.toLowerCase() === 'pending');
    notifyTab.innerHTML = notifications.length;
    rejectReq.innerHTML = data.filter(a => a.status.toLowerCase() === 'rejected').length;
    resolveReq.innerHTML = data.filter(a => a.status.toLowerCase() === 'resolved').length;

    if (notifications.length) notify.innerHTML = notifications.length;
    else notify.style.display = 'none';

    if (value) {
        data.forEach((obj) => {
            if (obj.status.toLowerCase() === value) {
                RequestTag(obj.date, obj.name, obj.type, obj.description, obj.status, obj.id);
            }
        });
        return masterEventsForAllRequests(); // added more functionality the requests;
    }
    data.forEach((obj) => {
        RequestTag(obj.date, obj.name, obj.type, obj.description, obj.status, obj.id);
    });
    return masterEventsForAllRequests(); // added more functionality the requests;
}


// left section for admin page
function htmlElements(data, value) {
    if (value === 'notification') {
        totalReq.innerHTML++;
        notify.innerHTML = Number(notifyTab.innerHTML) + 1;
        notify.style.display = 'inline-block';
        notifyTab.innerHTML++;
        RequestTag(
            data.date,
            data.name,
            data.type,
            data.description,
            data.status,
            data.id,
            value,
        );
        return masterEventsForAllRequests();
    }
    return withOutNotification(data, value);
}


// looping through the left section elements..
for (let i = 0; i < accessing.length; i++) {
    accessing[i].onclick = () => {
        refreshingElments(display, trTag);
        getAllRequest().then((result) => {
            const data = result.requests;
            if (i === 1) htmlElements(data, 'rejected');
            else if (i === 2) htmlElements(data, 'resolved');
            else htmlElements(data);
        });
    };
} // left section ends here

clickNotification.onclick = () => {
    const ul = document.getElementById('notification-panel');
    const li = document.getElementsByTagName('li');
    if (li[0]) refreshingElments(ul, li);
    setTimeout(() => {
        if (!windowClick && !notificate) {
            displayNotification.style.display = 'block';
            windowClick = true;
            notificate = true;
            getAllRequest().then((result) => {
                const data = result.requests;
                data.sort((a, b) => b.sorting - a.sorting).filter((a) => {
                    if (a.status.toLowerCase() === 'pending') {
                        return notificationPanel(a.userPic, a.name, a.type, a.id);
                    }
                    return false;
                });
            });
        } else {
            displayNotification.style.display = 'none';
            notificate = false;
        }
    }, 100);
};


// search option for repair or maintenance request
searchButton.onclick = () => {
    const searchOption = document.querySelectorAll('select option');
    refreshingElments(display, trTag); // to remove old tags
    for (let i = 0; i < searchOption.length; i++) {
        if (searchOption[i].selected) {
            getAllRequest().then((result) => {
                const data = result.requests;
                data.forEach((a) => {
                    if (a.type.toLowerCase() === searchOption[i].value) {
                        RequestTag(a.date, a.name, a.type, a.description, a.status, a.id);
                    } else if (searchOption[i].value === 'all') {
                        RequestTag(a.date, a.name, a.type, a.description, a.status, a.id);
                    }
                });
                return masterEventsForAllRequests(); // added more functionality the requests;
            });
        }
    }
};


getAllRequest().then((result) => {
    const data = result.requests;
    htmlElements(data);
});

const es = new EventSource('/notifications');
es.addEventListener('myEvent', (event) => {
    console.log(event.data);
    htmlElements(JSON.parse(event.data), 'notification');
});
