import React from 'react';
import '../styles/Button.css';

export default function({ title, onClick }) {
  return (
    <div className="button" onClick={onClick}>
      {title}
    </div>
  );
}
