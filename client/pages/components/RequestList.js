import React from 'react';

const dateStyle = { fontSize: '12px' };

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
    requests, editReq, deleteReq, showRequest,
  } = props;

  return requests.map((item, index) => {
    const {
      status, date, description, reqId, _id, type,
    } = item;

    const dateStr = new Date(date).toDateString();
    return (
      <div className="reqs" key={ index } style={ liColor[status] } onClick={ showRequest} >
        <div className="date" style={ dateStyle }>{ dateStr }</div>
        <div className="desc">{ description }</div>
        <div className="reqid">{ reqId }</div>
        <div className="statusOption">
          <div className="status">
            <div className="text" style={ color[status] }>{ status}</div>
            <div className="time">{ statusOption[status] }</div>
          </div>
          <div className="options">
            { status === 'pending'
              ? <div className="edit" onClick={editReq(_id, type, description)}><i className="far fa-edit"></i></div> : ''
            }
            { statusOp.includes(status)
              ? <div className="del" onClick={deleteReq(_id)}><i className="far fa-trash-alt"></i></div> : ''
            }
          </div>
        </div>
      </div>
    );
  });
};

export default RequestList;
