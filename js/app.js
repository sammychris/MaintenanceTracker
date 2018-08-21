const scriptTag = document.querySelector('script');
const currentPage = scriptTag.getAttribute('page');

switch (currentPage) {
	case 'admin' : import 'admin-component/admin'; break;
	case 'admin-login' : import 'admin-component/adminLogin'; break;
	case 'admin-requests' : import 'admin-component/adminRequests'; break;
	case 'user-login' : import 'admin-component/login'; break;
	case 'user-requests' : import 'user-component/userHistoryReq'; break;
	case 'user-new-request' : import 'user-component/userNewReq'; break;
	case 'view-a-request' : import 'user-component/viewAreq'; break;
}
