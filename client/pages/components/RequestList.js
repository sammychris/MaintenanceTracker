import React from 'react';

const RequestList = (props) => {
  const color = {
    approved: { color: '#2D71CA', background: '#F2F3F8' },
    resolved: { color: '#27873F', background: '#EEF5F0' },
    rejected: { color: 'red', background: '#FAE5E4' },
  };

  const statusOption = {
    pending: 'Still in review',
    approved: '3days to resolve',
    resolved: 'Finally resolved',
    rejected: 'Failed',
  };

  const Options = (v) => {
    let Edit = '';
    let Del = '';
    if (v === 'pending') Edit = <div className="edit">Edit</div>;
    if (v === 'rejected' || v === 'pending' || v === 'resolved') Del = <div className="del">Delete</div>;
    return (
      <div className="options">
        { Edit }
        { Del }
      </div>
    );
  };

  const dateStyle = { fontSize: '12px' };

  return props.requests.map((item, index) => {
    const date = new Date(item.date).toDateString();
    return (
      <div className="reqs" key={index}>
        <div className="date" style={dateStyle}>{date}</div>
        <div className="desc">{item.description}</div>
        <div className="reqid">{item.reqId}</div>
        <div className="status">
          <div className="text" style={color[item.status]}>{item.status}</div>
          <div className="time">{statusOption[item.status]}</div>
          { Options(item.status) }
        </div>
      </div>
    );
  });
};

export default RequestList;
