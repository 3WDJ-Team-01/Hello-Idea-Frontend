import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Wall.module.scss';

const Item = () => (
  <div className={styles.together}>
    <div className={styles.feed}>
      <img src="images/user.png" alt="" />
      <div className={styles.usertime}>15:35 PM</div>
      <div className={styles.username}>
        <Link to="/*">USERNAME</Link>
      </div>

      <div className={styles.userinfor}>usermsg</div>
      <div className={styles.userhash}>
        <Link to="/*">#ddd</Link> <Link to="/*">#fff</Link>
        <Link to="/*">#ccc</Link>
        <Link to="/*">...</Link>
      </div>
    </div>
  </div>
);

const Wall = () => {
  return (
    <div className={styles.feedlist}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Wall;
