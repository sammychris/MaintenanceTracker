import RequestTag from './RequestTag';
import masterEventsForAllRequests from './masterEventsForAllRequests';

export default(data, value) => {
    const rejectReq = document.getElementById('rejected-request');
    const resolveReq = document.getElementById('resolved-request');
    const totalReq = document.getElementById('total-request');
    const notifyTab = document.getElementById('notifyTab');
    const notify = document.getElementById('notify');

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
};
