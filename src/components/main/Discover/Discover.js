import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Discover.module.scss';

const Item = () => (
  <div className={styles.friendRec}>
    <img src="images/user.png" alt="" />
    <div className={styles.friendname}>
      <Link to="/*">USERNAME</Link>
    </div>
    <div className={styles.friendinfor}>usermsg</div>
  </div>
);

const Discover = () => {
  return (
    <div className={styles.friendRecList}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Discover;
