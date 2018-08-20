const userName = document.getElementById('username');
const dateCreated = document.getElementById('date');
const requestType = document.getElementsByName('typeOfRequest');
const desRequest = document.getElementById('description'); 
const statusReq = document.getElementById('status');
const modify = document.getElementsByTagName('button')[0];
const divType = document.getElementById('repairmaintain');

const requestId = localStorage.getItem('requestId');
let update = false;


if(localStorage.length < 1) {
	// user most login before seen any page
	alert('sorry this user needs to login!');
	location.assign("./../index.html");
}

// admin must loggout before logging in again.
if(localStorage.getItem('adminToken')){
	location.assign("../contents/admin.html")
}


fetch(`/users/requests/${requestId}`,{
	method: 'GET',
    headers: {
    	"id": localStorage.getItem('id'),
		"x-access-token": localStorage.getItem('userToken'),
	},
    mode: 'cors',
    cache: 'default'
})
.then(response => {
	response.json().then(result => {
		const { name, date, type, status, description } = result.request;
		console.log(result)
		inputValue(dateCreated,'Date created:', date);		 // datecreated the request...
		inputValue(userName,'Name:', name);			 		// username...
		inputValue(desRequest,'', description);
		inputValue(statusReq,'', status);
		

		if(type.toLowerCase() === requestType[1].value){
			requestType[1].checked = true;
		}
		if(status == 'Accepted'){
			statusReq.style.color = 'green';
		}
	});
});

modify.onclick = function(e){
	const request = {};
	e.preventDefault();
	if(update){

		if(requestType[0].checked){ 
			request.type = requestType[0].value;
		}
		else{
			request.type = requestType[1].value;
		}
		request.description = desRequest.value;

		postData(`/users/requests/${requestId}`, request )
			.then(result => {
			  	console.log(result);
			  	alert(result.message);
			  	requestType[0].disabled = true;
				requestType[1].disabled = true;
				desRequest.style.color = '#F0300EFF';
				desRequest.readOnly = true;
				divType.style.color = 'grey';
				modify.innerHTML = 'Modify';
				update = false;
				return;
			})
			.catch(error => console.error(error));	
	};
	requestType[0].disabled = false;
	requestType[1].disabled = false;
	desRequest.style.color = 'black';
	desRequest.readOnly = false;
	divType.style.color = 'black';
	modify.innerHTML = 'Save';
	update = true;
};



function postData(url, data) {
	// Default options are marked with *
	return fetch(url, {
	    method: "PUT", // *GET, POST, PUT, DELETE, etc.
	    mode: "cors", // no-cors, cors, *same-origin
	    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: "same-origin", // include, same-origin, *omit
	    headers: {
	        "Content-Type": "application/json; charset=utf-8",
	        "id": localStorage.getItem('id'),
	        "x-access-token": localStorage.getItem('token'),
	        // "Content-Type": "application/x-www-form-urlencoded",
	    },
        redirect: "follow", // manual, *follow, error
	    referrer: "no-referrer", // no-referrer, *client
	    body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
	.then(response => response.json()); // parses response to JSON
}

function inputValue(inputName,text,data){
	inputName.value = `${text} ${data}`;
	inputName.innerHTML = `${text} ${data}`;
}
