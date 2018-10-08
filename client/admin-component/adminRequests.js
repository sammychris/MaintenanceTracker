import notificationPanel from './sections/notification';
import getAllRequest from './middlewares/getAllRequest';
import RequestTag from './middlewares/RequestTag';
import masterEventsForAllRequests from './middlewares/masterEventsForAllRequests';
import htmlElements from './middlewares/htmlElements';

const display = document.getElementsByTagName('tbody')[1];
const trTag = document.getElementsByClassName('trTag');
const logOut = document.getElementsByClassName('log-out');
const accessing = document.getElementsByClassName('access');
const clickNotification = document.getElementById('notification-section');
const searchButton = document.getElementById('search');
const topMessage = document.getElementById('message-section');


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


function refreshingElments(parent, children) {
    while (children[0]) {
        parent.removeChild(children[0]);
    }
}


// looping through the left section elements..
for (let i = 0; i < accessing.length; i++) {
    accessing[i].onclick = () => {
        refreshingElments(display, trTag);
        getAllRequest().then((result) => {
            const data = result.requests;
            if (i === 3) {
                document.querySelector('.all-requests-page').style.display = 'block';
                document.querySelector('.chat-page').style.display = 'none';
                htmlElements(data, 'rejected');
            } else if (i === 4) {
                document.querySelector('.all-requests-page').style.display = 'block';
                document.querySelector('.chat-page').style.display = 'none';
                htmlElements(data, 'resolved');
            } else if (i === 5) {
                document.querySelector('.all-requests-page').style.display = 'block';
                document.querySelector('.chat-page').style.display = 'none';
                htmlElements(data);
            }
        });
    };
} // left section ends here

window.onclick = () => {
    const displayNotification = document.querySelector('.notification-container');
    const board = document.getElementById('board');
    board.style.display = 'none';
    if (windowClick && notificate) {
        displayNotification.style.display = 'none';
        windowClick = false;
    }
};

clickNotification.onclick = () => {
    const displayNotification = document.querySelector('.notification-container');
    const ul = document.getElementById('notification-panel');
    const li = document.querySelectorAll('.liHover');
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


topMessage.onclick = () => {
    document.querySelector('.all-requests-page').style.display = 'none';
    document.querySelector('.dashboard-page').style.display = 'none';
    document.querySelector('.chat-page').style.display = 'block';
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

// document.getElementById('testing').onclick = (e) => {
//     e.preventDefault();
//     const parent = document.querySelectorAll('.grid-item')[1];
//     const child = document.querySelector('.user-table');
//     parent.removeChild(child);
//     console.log(child);
//     const samuel = 'The boy is amazing!';
//     require('./testing.js')(samuel);
// };
