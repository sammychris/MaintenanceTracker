import React from 'react';

const SearchTag = () => {
  return (
    <div id="search">
      <div id="box">
        <span>Type:</span>
        <span className="item">Repair</span>
        <span className="item">Maintenance</span>
      </div>
    </div>
  );
};

class UserMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main-content">
        <SearchTag />
        <div id="requests">
          <div id="req-header" className="list">
            <div className="date">
              <i className="fas fa-calendar"></i>
              Date
            </div>
            <div className="desc">
              <i className="fas fa-info-circle"></i>
              Description
            </div>
            <div className="reqid">
              <i className="fas fa-passport"></i>
              Req Id
            </div>
            <div className="status">
              <i className="fas fa-map-marker-alt"></i>
              Status
            </div>
          </div>
          <div id="req-content">
            { !requests.length
              ? <img
                src="/images/loader.svg"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '40px',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              : <RequestList /* requests Components */
                requests={ showAllRequests }
                editReq={ this.editRequest }
                showRequest={ this.showRequest }
                deleteReq={ this.deleteReq }
                currentIndex={ currentIndex }
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UserMessages;
