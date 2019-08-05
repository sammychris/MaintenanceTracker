import React from 'react';
import { postRequest, updateRequest } from '../services';

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
  background: 'rgba(99, 98, 98, 0.07)',
  position: 'fixed',
  overflow: 'hidden',
  zIndex: '5',
  top: '0',
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
    this.control = this.control.bind(this);
  }

  control() {
    const { type, description } = this.state;
    const update = () => {
      const { id } = this.props.currentReq;
      return updateRequest(`/user/requests/${id}`, { type, description });
    };
    const create = () => {
      const { _id } = JSON.parse(localStorage.getItem('user'));
      return postRequest('/user/requests', { type, description, user: _id });
    };
    return this.props.updateReq ? update() : create();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { notification, showReqForm, refreshRequests } = this.props;
    this.control()
      .then((res) => {
        notification(res.message, res.success); // handle the notification message...
      });
    showReqForm(); // This turns Off the show request form...
    refreshRequests(); // This refreshes the requests after the update
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { updateReq, currentReq } = this.props;
    const { type, description } = currentReq;
    const message = updateReq ? 'Save' : 'Send';
    return (
      <div>
        <div id="box" style={box} onClick={this.props.showReqForm}>
        </div>
        <div id="form-holder" style={style}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>What's the type of Request</div>
              <div>
                <select name="type" onChange={this.handleChange} required defaultValue={ updateReq && type }>
                  <option value="">Selete an Option</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="repair">Repair</option>
                </select>
              </div>
            </label>
            <label>
              <div>Describe your request</div>
              <div>
                <textarea
                  placeholder="Write your request here"
                  name="description"
                  onChange={this.handleChange}
                  defaultValue={ updateReq ? description : '' }
                  required
                />
              </div>
            </label>
            <button type="submit">{ message }</button>
          </form>
        </div>
      </div>
    );
  }
}


export default NewRequestForm;
