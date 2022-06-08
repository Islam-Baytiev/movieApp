
import { Spin } from 'antd';
import './Spinner.scss'
import React from 'react';

function Spinner({ isLoading }) {
  return isLoading ? (
      <div className="example">
        <Spin size="large" />
      </div>
  ) : null;
}
export default Spinner;