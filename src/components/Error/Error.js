import { Alert } from 'antd';
import React from "react";

function Error({ error }) {
  return error ? (
      <Alert message="O, no, Error" type="success" />
  ) : null;
}

export default Error;