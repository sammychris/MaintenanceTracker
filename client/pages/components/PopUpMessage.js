import React from 'react';


const PopUpMessage = (props) => {
  const { message, success } = props;
  const style = {
    color: '#fff',
    position: 'fixed',
    zIndex: '10',
    bottom: '50px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    borderRadius: '2px',
    padding: '0px 30px',
    boxShadow: '0px 10px 10px 6px #00000030',
    background: success ? '#45c6ff' : '#df5146',
  };
  return (
    <div className="pop-up" style={style}>
      <p>{ message }</p>
    </div>
  );
};

export default PopUpMessage;
