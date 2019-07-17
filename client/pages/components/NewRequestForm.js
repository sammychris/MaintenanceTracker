import React from 'react';
import { postRequest } from '../services';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '#00000040 0px 0px 20px 7px',
  zIndex: '5',
};

const box = {
  height: '100vh',
  width: '100vw',
  background: '#0000003d',
  position: 'absolute',
  overflow: 'hidden',
};

class NewRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { _id } = JSON.parse(localStorage.getItem('user'));
    const { type, description } = this.state;
    postRequest('/user/requests', { type, description, user: _id })
      .then((res) => {
        console.log(res);
      });
    this.props.makeNewReq();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <div id="box" style={box} onClick={this.props.makeNewReq}>
        </div>
        <div id="form-holder" style={style}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>What's the type of Request</div>
              <div>
                <select name="type" onChange={this.handleChange} required>
                  <option value="">Selete an Option</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="repair">Repair</option>
                </select>
              </div>
            </label>
            <label>
              <div>Describe your request</div>
              <div>
                <textarea name="description" onChange={this.handleChange} required></textarea>
              </div>
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewRequestForm;
