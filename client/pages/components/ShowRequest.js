import React from 'react';
// import { postRequest, updateRequest } from '../services';

const request = {
  background: '#fff',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '#00000040 0px 0px 20px 7px',
  zIndex: '5',
  padding: '20px 50px',
  maxWidth: '550px',
  width: '80%',
};

const box = {
  height: '100vh',
  width: '100vw',
  background: 'rgba(99, 98, 98, 0.07)',
  position: 'fixed',
  overflow: 'hidden',
  zIndex: '5',
  top: '0',
};

const spanSty = (colorChoice) => {
  return {
    bold: { fontWeight: 'bolder', display: 'block' },
    options: {
      marginRight: '10px', color: colorChoice, cursor: 'pointer',
    },
  };
};

const firstSection = {
  display: 'flex',
  justifyContent: 'space-between',
};

class ShowRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      description: '',
    };
  }

  render() {
    return (
      <div>
        <div id="box" style={box} onClick={ this.props.showRequest }>
        </div>
        <div style={request}>
          <div style={firstSection}>
            <p><span style={ spanSty().bold }>Date</span> 20/05/2019</p>
            <p><span style={ spanSty().bold }>Type</span> Maintenance</p>
            <p><span style={ spanSty().bold }>Request id</span> 45747584</p>
          </div>
          <div>
            <span style={ spanSty().bold }>Description</span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <p>
            <span style={ spanSty('#9f98a5').options } onClick>Edit</span>
            <span style={ spanSty('#d65248').options } onClick>Delete</span>
            <span style={ spanSty('blue').options } onClick>Reply</span>
          </p>
        </div>
      </div>
    );
  }
}


export default ShowRequest;
