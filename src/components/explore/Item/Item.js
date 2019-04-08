import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import styles from './Item.module.scss';

const Item = () => {
  return (
    <div className={styles.item}>
      <div className="recommendUserImg" />
      <div className="recommendUserTitle">dffsd</div>
      <div className="recommendUserHash">
        <Link to="/*">#aaa </Link>
        <Link to="/*">#bbb </Link>
        <Link to="/*">#ccc </Link>
      </div>
      <MDBBtn color="primary">go</MDBBtn>
    </div>
  );
};

export default Item;
