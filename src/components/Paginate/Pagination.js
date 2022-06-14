import { Pagination } from 'antd';
import React from 'react';
import "./paginate.scss"
const Paginate = () => <Pagination defaultCurrent={1} total={50} />;

export default Paginate;