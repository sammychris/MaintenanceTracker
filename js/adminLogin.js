const email = document.getElementById('admin-name');
const password = document.getElementById('adminpwd');
const login = document.getElementsByTagName('form')[0];

// admin must loggout before logging in again.
if(localStorage.getItem('adminToken')){
	location.assign("../contents/admin.html")
}
// if it eventually falls in this page? go back to user.
if(localStorage.getItem('userToken')){
	location.assign("./contents/user.html")
}


login.onsubmit = function(e){
	const admin = { email: email.value, password: password.value, admin: true };

	postData('/auth/login', admin )
	    .then(result => {
	  		console.log(result);
	  		if(result.error) return alert(result.error);
			if(result.user.role) {
				alert(result.message);
				localStorage.setItem('adminToken', result.token);
				localStorage.setItem('id', result.id);
				localStorage.setItem('admin', JSON.stringify(result.user));
				location.assign("../contents/admin.html");
			}else {
				alert('This user is not an admin');
			}
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