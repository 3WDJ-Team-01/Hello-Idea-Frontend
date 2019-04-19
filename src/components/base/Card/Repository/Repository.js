import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Repository = ({ value }) =>
  value ? (
    <div className={styles.repository}>
      <div className={styles.contents}>
        <div className={styles.title}>
          <Link to={`repositories/${value.project_id}`}>
            {value.project_topic}
          </Link>
        </div>

        <div className={styles.body}>{value.project_intro}</div>
        <div className={styles.property}>
          <div className={styles.category}>
            <div>
              <MDBIcon icon="star" /> {value.project_likes}
            </div>
            <div>
              <MDBIcon far icon="eye" /> {value.project_hits}
            </div>
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
