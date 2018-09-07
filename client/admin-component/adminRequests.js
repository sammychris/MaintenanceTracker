const display = document.getElementsByTagName('tbody')[0];
const board = document.getElementById('board');
const trTag = document.getElementsByClassName('trTag');
const itemDist = document.getElementsByClassName('des');


// if it eventually falls in this page? go back to user.
if (localStorage.getItem('userToken')) {
    location.assign('../contents/users.html');
}


const crTag = (parent, tagName) => {
    const element = document.createElement(tagName);
    parent.append(element);
    return element;
};


const RequestTag = (date, name, type, description) => {
    const tag = crTag(display, 'tr');
    const newDescription = description.slice(0, 18);
    tag.className = 'trTag';
    crTag(tag, 'td').innerHTML = date;
    crTag(tag, 'td').innerHTML = name;
    crTag(tag, 'td').innerHTML = type;

    const descriptionSet = crTag(tag, 'td');
    descriptionSet.innerHTML = newDescription;

    const tdAnchor = crTag(tag, 'td');
    crTag(tdAnchor, 'a').className = 'accept';
    crTag(tdAnchor, 'a').className = 'reject';
    crTag(tdAnchor, 'a').className = 'greyresolve';
};

// This part is for the board... on hover
const displayRequest = (url, requests, index, event, padding) => fetch(url, requests)
    .then((response) => {
        response.json().then((result) => {
            const data = result.requests;
            itemDist[0].innerHTML = data[index].date;
            itemDist[1].innerHTML = data[index].name;
            itemDist[2].innerHTML = data[index].type;
            itemDist[3].innerHTML = data[index].description;
            board.style.display = 'block';
            board.style.top = `${event.clientY + padding}px`;
        });
    });


const getAllRequest = (url, dataInfo) => fetch(url, dataInfo)
    .then((response) => {
        response.json().then((result) => {
            const data = result.requests;
            data.forEach(obj => RequestTag(obj.date, obj.name, obj.type, obj.description));

            for (let i = 0; i < trTag.length; i++) {
                trTag[i].onmouseenter = (e) => {
                    if (e.clientY > 500) {
                        return displayRequest(url, dataInfo, i, e, -150);
                    }
                    return displayRequest(url, dataInfo, i, e, 70);
                };
                trTag[i].onmouseleave = () => {
                    board.style.display = 'none';
                };
            }
        });
    });

getAllRequest('/requests', {
    method: 'GET',
    headers: {
        id: localStorage.getItem('id'),
        'x-access-token': localStorage.getItem('adminToken'),
    },
    mode: 'cors',
    cache: 'default',
});
