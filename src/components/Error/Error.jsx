import { Alert } from 'antd';
import React from 'react';

function Error({ error }) {
  return error ? <Alert message="Произошла ошибка, повторите запрос" type="success" /> : null;
}

export default Error;
