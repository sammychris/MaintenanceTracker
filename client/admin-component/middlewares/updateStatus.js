import checkingStatus from './checkingStatus';
import updateRequestRoute from './updateRequestRoute';
import getAllRequest from './getAllRequest';

const updateStatus = (reqName, status, eachAction, i) => {
    const trTag = document.getElementsByClassName('trTag');
    const totalReq = document.getElementById('total-request');
    const rejectReq = document.getElementById('rejected-request');
    const resolveReq = document.getElementById('resolved-request');
    const notify = document.getElementById('notify');
    const notifyTab = document.getElementById('notifyTab');

    const requestId = trTag[i].id;
    updateRequestRoute(`${reqName}`, requestId)
        .then((output) => {
            trTag[i].className = 'trTag';
            const requestIcon = document.querySelectorAll('.trTag td span');
            const reqType = output[status];
            console.log(reqType);
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
};

export default updateStatus;