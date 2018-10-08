import checkingStatus from './checkingStatus';

const crTag = (parent, tagName, notification, firstTr) => {
    const element = document.createElement(tagName);
    if (notification) parent.insertBefore(element, firstTr);
    else parent.append(element);
    return element;
};

export default (date, name, type, description, status, id, value) => {
    let tag;
    const display = document.getElementsByTagName('tbody')[1];

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
