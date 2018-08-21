const email = document.getElementById('user-name');
const password = document.getElementById('userpwd');
const login = document.getElementsByTagName('form')[0];

// user must loggout before logging in again.
if(localStorage.getItem('userToken')){
	location.assign("./contents/users");
}
// if it eventually falls in this page? go back to adminuser.
if(localStorage.getItem('adminToken')){
	location.assign("./admin/admin-dashboard");
} 


login.onsubmit = function(e){
	const user = { email: email.value, password: password.value };

	postData('/auth/login', user )
	    .then(result => {
	  		console.log(result);
	  		if(result.error) return alert(result.error);
	  		if(result.user.role) return alert('Admin is not allowed!');
			alert(result.message);
			localStorage.setItem('userToken', result.token);
			localStorage.setItem('id', result.id);
			localStorage.setItem('user', JSON.stringify(result.user));
			location.assign("./contents/users.html")
	  	})
		.catch(error => console.error(error));
}


function postData(url, data) {
	// Default options are marked with *
	return fetch(url, {
	    method: "POST", // *GET, POST, PUT, DELETE, etc.
	    mode: "cors", // no-cors, cors, *same-origin
	    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: "same-origin", // include, same-origin, *omit
	    headers: {
	        "Content-Type": "application/json; charset=utf-8",
	        // "Content-Type": "application/x-www-form-urlencoded",
	    },
        redirect: "follow", // manual, *follow, error
	    referrer: "no-referrer", // no-referrer, *client
	    body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
	.then(response => response.json()); // parses response to JSON
}