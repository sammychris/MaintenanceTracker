import UsersAndChats from '../middlewares/getChatMessages';


const crTag = (parent, tagName, notification, firstTr) => {
    const element = document.createElement(tagName);
    if (notification) parent.insertBefore(element, firstTr);
    else parent.append(element);
    return element;
};

const leftChatSection = (personName, shortMessage) => {
    const ulTag = document.querySelector('.chat-section .chat-left ul');
    const liTag = crTag(ulTag, 'li');
    const divTag1 = crTag(liTag, 'div');
    const divTag2 = crTag(liTag, 'div');

    // creating elements from divTag1 ...
    const imgTag = crTag(divTag1, 'img');
    const spanTag = crTag(divTag1, 'span');
    // creating elments from divTag2...
    crTag(divTag2, 'h6').innerText = personName;
    crTag(divTag2, 'p').innerText = shortMessage;
    // editing all elements...
    divTag1.className = 'user-chatbox';
    divTag2.className = 'user-messages';
    imgTag.src = '../img/proPic.png';
    imgTag.style.width = '70%';
    imgTag.style.borderRadius = '50%';
    spanTag.className = 'status online pos';
};

export default () => {
    UsersAndChats().then((result) => {
        const { users } = result;
        users.reverse().forEach((a) => {
        	console.log(a.chat[a.chat.lenth - 1]);
            // const chat = a.chat.messages;
            leftChatSection(a.name, chat[chat.length - 1].user);
        });
        console.log(users);
    });
};
