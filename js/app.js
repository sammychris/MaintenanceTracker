const scriptTag = document.querySelector('script');
const currentPage = scriptTag.getAttribute('page');

switch (currentPage) {
	case 'admin' : require('./admin-component/admin'); break;
	case 'admin-login' : require('./admin-component/adminLogin'); break;
	case 'admin-requests' : require('./admin-component/adminRequests'); break;
	case 'user-login' : require('./user-component/login'); break;
	case 'user-requests' : require('./user-component/userHistoryReq'); break;
	case 'user-new-request' : require('./user-component/userNewReq'); break;
	case 'view-a-request' : require('./user-component/viewAreq'); break;
}
