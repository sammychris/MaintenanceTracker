const textField = document.getElementsByTagName('textarea')[0];

const btnInput = document.getElementsByTagName('input');
const data = {};

for(let i = 0; i < btnInput.length; i++){
	btnInput[i].onclick = function(){
		let text = textField.value.trim();
		if(text.length < 10) return alert('Should not be less the 10 character');
		data.type = this.value;
		data.description = text;

		postData(`http://localhost:8000/users/requests`, data )
	  		.then(data => console.log(data)) // JSON from `response.json()` call
	  		.catch(error => console.error(error));

		textField.value = '';
	}
}



function postData(url = ``, data) {
	// Default options are marked with *
	return fetch(url, {
	    method: "POST", // *GET, POST, PUT, DELETE, etc.
	    mode: "cors", // no-cors, cors, *same-origin
	    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	    credentials: "same-origin", // include, same-origin, *omit
	    headers: {
	        "Content-Type": "application/json; charset=utf-8",
	        "id":1
	        // "Content-Type": "application/x-www-form-urlencoded",
	    },
        redirect: "follow", // manual, *follow, error
	    referrer: "no-referrer", // no-referrer, *client
	    body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
	.then(response => response.json()); // parses response to JSON
}
