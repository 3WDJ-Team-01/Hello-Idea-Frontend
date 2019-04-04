import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Repository = ({ value }) =>
  value ? (
    <div className={styles.repository}>
      <div className={styles.contents}>
        <div className={styles.title}>
          <Link to={`repositories/${value.title}`}>{value.title}</Link>
        </div>

        <div className={styles.body}>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </div>
        <div className={styles.property}>
          <div className={styles.category}>
            <div>IT</div>
          </div>
          <div className={styles.date}>Updated 7days ago</div>
        </div>
      </div>

      <Link to={`repositories/${value.title}`}>
        <div className={styles.image}>이미지</div>
      </Link>
    </div>
  ) : null;

export default Repository;
