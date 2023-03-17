import React from 'react';
import ReactDOM from 'react-dom';

// Define a component for the editable content
function Editable({ children }) {
  return <span contentEditable>{children}</span>;
}