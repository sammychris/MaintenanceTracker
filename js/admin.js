const logOut = document.getElementById('log-out');

// if it eventually falls in this page? go back to user.
if(localStorage.getItem('userToken')){
	location.assign("./contents/user.html")
}


// logging out the Admin
logOut.onclick = function(){
	 if (confirm('Logout?')){
		localStorage.clear();
	 }
}