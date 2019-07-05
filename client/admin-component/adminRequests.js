import notificationPanel from './sections/notification';
import getAllRequest from './middlewares/getAllRequest';
import RequestTag from './middlewares/RequestTag';
import masterEventsForAllRequests from './middlewares/masterEventsForAllRequests';
import htmlElements from './middlewares/htmlElements';
import chatMessages from './sections/chat';

const display = document.getElementsByTagName('tbody')[1];
const trTag = document.getElementsByClassName('trTag');
const logOut = document.getElementsByClassName('log-out');
const accessing = document.getElementsByClassName('access');
const clickNotification = document.getElementById('notification-section');
const searchButton = document.getElementById('search');
const topMessage = document.getElementById('message-section');


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

function notifyingEvent() {
    const displayNotification = document.querySelector('.notification-container');
    const ul = document.getElementById('notification-panel');
    const li = document.getElementsByClassName('liHover');
    if (li[0]) refreshingElments(ul, li);
    setTimeout(() => {
        if (displayNotification.style.display === 'none') {
            displayNotification.style.display = 'block';
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
        }
    }, 100);
}


// looping through the left section elements..
for (let i = 0; i < accessing.length; i++) {
    accessing[i].onclick = () => {
        getAllRequest().then((result) => {
            const data = result.requests;
            const dashboard = document.querySelector('.dashboard-page');
            const chat = document.querySelector('.chat-page');
            const requestPage = document.querySelector('.all-requests-page');
            const tabs = document.querySelectorAll('.tabs');
            // const newestSection = document.querySelector('.newest-requests');
            // const newestSectionTable = document.querySelector('.newest-requests table');

            if (i === 0) {
                refreshingElments(display, trTag);
                dashboard.style.display = 'block';
                chat.style.display = 'none';
                requestPage.style.display = 'none';
                tabs[0].className = 'tabs active';
                tabs[1].className = 'tabs';
                tabs[2].className = 'tabs';
                tabs[3].className = 'tabs';
                tabs[4].className = 'tabs';
                tabs[5].className = 'tabs';
                topMessage.className = 'tabs';
                clickNotification.className = 'tabs';
                htmlElements(data, 'pending');
            } else if (i === 1) {
                notifyingEvent();
                tabs[1].className = 'tabs active';
                clickNotification.className = 'tabs active';
            } else if (i === 2) {
                refreshingElments(display, trTag);
                requestPage.style.display = 'block';
                chat.style.display = 'none';

                // newestSection.removeChild(newestSectionTable) // take note of this section
                dashboard.style.display = 'none';
                document.querySelector('#head-section h3').innerText = 'Unresolved Requests';
                display.style.height = `${370}px`;
                tabs[0].className = 'tabs';
                tabs[1].className = 'tabs';
                tabs[2].className = 'tabs active';
                tabs[3].className = 'tabs';
                tabs[4].className = 'tabs';
                tabs[5].className = 'tabs';
                topMessage.className = 'tabs';
                clickNotification.className = 'tabs';
                htmlElements(data, 'accepted');
            } else if (i === 3) {
                refreshingElments(display, trTag);
                requestPage.style.display = 'block';
                chat.style.display = 'none';

                // newestSection.removeChild(newestSectionTable) // take note of this section
                dashboard.style.display = 'none';
                document.querySelector('#head-section h3').innerText = 'Rejected Requests';
                display.style.height = `${370}px`;
                tabs[0].className = 'tabs';
                tabs[1].className = 'tabs';
                tabs[2].className = 'tabs';
                tabs[3].className = 'tabs active';
                tabs[4].className = 'tabs';
                tabs[5].className = 'tabs';
                clickNotification.className = 'tabs';
                topMessage.className = 'tabs';
                htmlElements(data, 'rejected');
            } else if (i === 4) {
                refreshingElments(display, trTag);
                requestPage.style.display = 'block';
                chat.style.display = 'none';

                // newestSection.removeChild(newestSectionTable) // take note of this section
                dashboard.style.display = 'none';
                document.querySelector('#head-section h3').innerText = 'Resolved Requests';
                tabs[0].className = 'tabs';
                tabs[1].className = 'tabs';
                tabs[2].className = 'tabs';
                tabs[3].className = 'tabs';
                tabs[4].className = 'tabs active';
                tabs[5].className = 'tabs';
                clickNotification.className = 'tabs';
                topMessage.className = 'tabs';
                htmlElements(data, 'resolved');
            } else if (i === 5) {
                refreshingElments(display, trTag);
                requestPage.style.display = 'block';
                chat.style.display = 'none';
                // newestSection.removeChild(newestSectionTable) // take note of this section
                dashboard.style.display = 'none';
                display.style.height = `${370}px`;
                tabs[0].className = 'tabs';
                tabs[1].className = 'tabs';
                tabs[2].className = 'tabs';
                tabs[3].className = 'tabs';
                tabs[4].className = 'tabs';
                tabs[5].className = 'tabs active';
                clickNotification.className = 'tabs';
                topMessage.className = 'tabs';
                htmlElements(data);
            }
        });
    };
} // left section ends here

window.onclick = () => {
    const displayNotification = document.querySelector('.notification-container');
    const board = document.getElementById('board');
    board.style.display = 'none';
    displayNotification.style.display = 'none';
    clickNotification.className = 'tabs';
    document.querySelectorAll('.active')[1].className = 'tabs';
};

clickNotification.onclick = () => {
    const tabs = document.querySelectorAll('.tabs');
    notifyingEvent();
    tabs[1].className = 'tabs active';
    clickNotification.className = 'active';
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
    const tabs = document.querySelectorAll('.tabs');
    document.querySelector('.all-requests-page').style.display = 'none';
    document.querySelector('.dashboard-page').style.display = 'none';
    document.querySelector('.chat-page').style.display = 'block';
    tabs[0].className = 'tabs';
    tabs[1].className = 'tabs';
    tabs[2].className = 'tabs';
    tabs[3].className = 'tabs';
    tabs[4].className = 'tabs';
    tabs[5].className = 'tabs';
    topMessage.className = 'tabs active';
    chatMessages();
};


getAllRequest().then((result) => {
    const data = result.requests;
    htmlElements(data, 'pending');
});

const es = new EventSource('/notifications');
es.addEventListener('myEvent', (event) => {
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

// chat.check()
