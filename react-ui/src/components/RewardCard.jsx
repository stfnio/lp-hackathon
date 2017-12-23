import React from 'react';
import { Link } from 'react-router-dom';

export default ({ reward }) => {
  return <Link to={`rewards/${reward._id}`}>{reward.title}</Link>;
};
