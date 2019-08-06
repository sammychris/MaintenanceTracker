import React from 'react';

const color = {
  approved: { color: '#2D71CA', background: '#F2F3F8' },
  resolved: { color: '#27873F' },
  rejected: { color: 'red' },
};

const liColor = {
  approved: { fontWeight: 'normal' },
  rejected: { background: '#FAE5E4', fontWeight: 'normal' },
  resolved: { background: '#e6ecf0', fontWeight: 'normal' },
};

const statusOption = {
  pending: 'Still in review',
  approved: '3days to resolve',
  resolved: 'Finally resolved',
  rejected: 'Failed',
};


const RequestList = (props) => {
  const statusOp = ['rejected', 'pending', 'resolved'];
  const {
    requests, editReq, deleteReq, showRequest, currentIndex,
  } = props;

  return requests.map((item, index) => {
    const {
      status, date, description, reqId, _id, type,
    } = item;

    const dateStr = new Date(date).toDateString();
    if (currentIndex === index) {
      return (
        <div className="clicked-req" key={ index }>
          <div className="close" title="close" onClick={ showRequest()}>
            <i className="fas fa-times"></i>
          </div>
          <div className="header">
            <div>{ dateStr }</div>
            <div>
              <span className="status" >{ status}</span>
              <span className="time"> still in review</span>
            </div>
          </div>
          <div className="request">
            <span className="description">Your request</span>
            { description }
          </div>
          <div className="footer">
            <div className="left">
              <span><span className="type">Request Type:</span> { type }</span>
              <span><span className="id">Request Id:</span> { reqId }</span>
            </div>
            <div className="options">
              <span style={{ color: 'blue', cursor: 'pointer' }} >Reply</span>
              { status === 'pending'
                ? <div className="edit" onClick={editReq(_id, type, description)} title="edit">
                  <i className="far fa-edit"></i></div> : ''
              }
              { statusOp.includes(status)
                ? <div className="del" onClick={deleteReq(_id)} title="delete">
                  <i className="far fa-trash-alt"></i></div> : ''
              }
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="reqs" key={ index } style={ liColor[status] } onClick={ showRequest(index)} title="view request">
        <div className="date" >{ dateStr }</div>
        <div className="desc">{ `${description.slice(0, 25)}...` }</div>
        <div className="reqid">{ reqId }</div>
        <div className="statusOption">
          <div className="status">
            <div className="text" style={ color[status] }>{ status}</div>
            <div className="time">{ statusOption[status] }</div>
          </div>
          <div className="options">
            { status === 'pending'
              ? <div className="edit" onClick={editReq(_id, type, description)} title="edit">
                <i className="far fa-edit"></i></div> : ''
            }
            { statusOp.includes(status)
              ? <div className="del" onClick={deleteReq(_id)} title="delete">
                <i className="far fa-trash-alt"></i></div> : ''
            }
          </div>
        </div>
      </div>
    );
  });
};

export default RequestList;
