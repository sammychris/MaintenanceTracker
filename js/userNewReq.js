const textField = document.getElementsByTagName('textarea')[0];
const logOut = document.getElementById('log-out');
const btnInput = document.getElementsByTagName('button');

const user = localStorage.getItem('user');
const request = {};

if(localStorage.length < 1) {
	alert('sorry this user needs to login!');
	location.assign("./../index.html");
}

// admin must loggout before logging in again.
if(localStorage.getItem('adminToken')){
	location.assign("../contents/admin.html")
}

// setting the repair and maintenance button along side the request...
for(let i = 0; i < btnInput.length; i++){
	btnInput[i].onclick = function(e){
		e.preventDefault();
		let text = textField.value.trim();
		if(text.length < 10) return alert('Should not be less the 10 character');
		request.type = this.value;
		request.description = text;

		postData(`/users/requests`, request )
	  		.then(result => {
	  			console.log(result);
	  			if(result.error){
	  				alert(result.error);
	  				localStorage.clear();
	  				return location.assign("./../index.html");
	  			}
	  			alert(result.message);
	  		})
	  		.catch(error => console.error(error));
			textField.value = '';

	}
}


// logging out the user
logOut.onclick = function(){
	 if (confirm('Logout?')){
		localStorage.clear();
	 }
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
	        "id": localStorage.getItem('id'),
	        "x-access-token": localStorage.getItem('userToken'),
	        // "Content-Type": "application/x-www-form-urlencoded",
	    },
        redirect: "follow", // manual, *follow, error
	    referrer: "no-referrer", // no-referrer, *client
	    body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
	.then(response => response.json()); // parses response to JSON
}
