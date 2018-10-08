// This is part is to update the request state or status...
export default (reqName, index) => fetch(`/requests/${index}/${reqName}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-access-token': localStorage.getItem('adminToken'),
    },
}).then(requests => requests.json());
