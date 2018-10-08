
export default (status, accept, reject, resolve, trIcon, tr) => {
    switch (status.toLowerCase()) { // accepted, rejected, resolve and default
    case 'accepted':
        accept.className = 'accepted';
        accept.title = 'Accepted';
        reject.className = 'cannot-icon';
        resolve.className = 'resolving';
        trIcon.className = 'processing-icon';
        break;
    case 'rejected':
        accept.style.display = 'none';
        resolve.style.display = 'none';
        reject.title = 'Rejected';
        reject.innerText = 'Rejected';
        reject.className = 'rejected';
        trIcon.className = 'finished-icon';
        break;
    case 'resolved':
        accept.style.display = 'none';
        reject.style.display = 'none';
        resolve.innerText = 'Resolved';
        resolve.className = 'resolved';
        trIcon.className = 'finished-icon';
        break;
    default:
        accept.className = 'accept';
        accept.title = 'Accept';
        reject.className = 'reject-icon';
        reject.title = 'Reject';
        resolve.className = 'greyresolve';
        resolve.title = 'Accept or Reject!';
        trIcon.className = 'pending-icon';
        tr.setAttribute('class', 'trTag pendingState');
        break;
    }
};
