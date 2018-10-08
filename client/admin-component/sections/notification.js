import getAllRequest from '../middlewares/getAllRequest';

const crTag = (parent, tagName, notification, firstTr) => {
    const element = document.createElement(tagName);
    if (notification) parent.insertBefore(element, firstTr);
    else parent.append(element);
    return element;
};


const displayRequest = (id, event, padding, icon) => {
    const itemDist = document.getElementsByClassName('des');
    const board = document.getElementById('board');
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


export default (userImg, userName, request, id) => {
    const board = document.getElementById('board');
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
