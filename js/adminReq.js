const display = document.getElementsByTagName('tbody')[0];

getAllRequest('http://localhost:8000/requests');

function getAllRequest(url){
	fetch(url).then(response => {
		response.json().then(result => {
			const data = result.requests;
			console.log(data);
			data.forEach(obj => RequestTag(obj.date,obj.name,obj.type));
		});
	});
}


function RequestTag(date,name,type,state){
	const tag = crTag(display, 'tr')
	crTag(tag,'td').innerHTML = date;
	crTag(tag,'td').innerHTML = name;
	crTag(tag,'td').innerHTML = type;
	const tdButton1 = crTag(tag,'td');
	const tdButton2 = crTag(tag, 'td');

	const button1 = crTag(tdButton1,'button');
	const button2 = crTag(tdButton1,'button');

	const iTag1 = crTag(button1, 'i');
	iTag1.className = 'material-icons';
	iTag1.innerHTML = 'arrow_forward';

	const iTag2 = crTag(button2, 'i');
	iTag2.className = 'material-icons';
	iTag2.innerHTML = 'close';

	crTag(tdButton2, 'button').innerHTML = "Resolve";


}

function crTag(parent,tagName){
	let element = document.createElement(tagName);
	parent.append(element);
	return element;
}