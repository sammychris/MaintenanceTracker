import updateStatus from './updateStatus';
import displayRequest from './displayRequest';

export default () => {
    const display = document.getElementsByTagName('tbody')[1];
    const trTag = document.getElementsByClassName('trTag');
    const action = document.getElementsByClassName('action');
    const loadingIcon = document.querySelector('.loadingRequest');
    const board = document.getElementById('board');

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
};
