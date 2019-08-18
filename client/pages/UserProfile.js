import React from 'react';


const mainStyle = {
  display: 'flex',
  height: '480px',
  fontSize: '16px',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 0 0',
  width: '490px',
  margin: 'auto',
};

const UserProfile = (props) => {
  const { user } = props;
  return (
    <div id="main-profile">
      <div style={ mainStyle }>
	    <div style={{ background: '#a3b7c6', borderRadius: '50%', padding: '50px 40px 0' }}>
	      <i style={{ fontSize: '150px', color: 'white' }} className="fas fa-user"></i>
	    </div>
	    <div style={{ fontWeight: 'bolder', fontSize: '35px', padding: '20px 0' }}>{user.name}</div>
	    <div style={{ textAlign: 'center', padding: '10px 0' }}>
	      I am a web developer who specialise in building app, full-stack application for both small and big business.

	    </div>
	    <div style={{ display: 'flex', fontSize: '16px', justifyContent: 'space-between', width: '100%', padding: '10px' }}>
		    <div>
		    	<i className="fas fa-map-marker-alt"></i>
		    	<span> Lagos, Nigeria</span>
		    </div>
		    <div>
		    	<i className="fas fa-envelope"></i>
		    	<span> {user.email}</span>
		    </div>
		    <div>
		      <i className="fas fa-calendar-alt"></i>
		      <span> Joined November 2019</span>
		    </div>
	    </div>
	    <div>Total Request Made: 40</div>
		<div>Number of Complaint: 15</div>
      </div>
    </div>
  );
};


export default UserProfile;
