export default () => fetch('/requests', {
    method: 'GET',
    headers: {
        id: localStorage.getItem('id'),
        'x-access-token': localStorage.getItem('adminToken'),
    },
    mode: 'cors',
    cache: 'default',
}).then(response => response.json());
