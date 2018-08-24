const logOut = document.getElementById('log-out');

// if it eventually falls in this page? go back to user.
if (localStorage.getItem('userToken')) {
    location.assign('../contents/users.html');
}


// logging out the Admin
logOut.onclick = () => {
    if (confirm('Logout?')) localStorage.clear();
};
