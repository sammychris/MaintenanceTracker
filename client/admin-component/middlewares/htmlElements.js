import RequestTag from './RequestTag';
import withOutNotification from './withOutNotification';
import masterEventsForAllRequests from './masterEventsForAllRequests';

// left section for admin page
export default (data, value) => {
    const notify = document.getElementById('notify');
    const notifyTab = document.getElementById('notifyTab');
    const totalReq = document.getElementById('total-request');

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
};
