import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.scss';

const Item = ({
  user_id,
  group_id,
  project_img,
  project_id,
  project_topic,
}) => {
  const userpath = group_id === 0 ? `/user/${user_id}` : `/group/${user_id}`;

  return (
    <div className={styles.item}>
      <div className={styles.ideaimg}>
        <img src={project_img} alt={project_topic} />
      </div>
      <div className={styles.ideahov}>
        <div className={styles.idealabel}>
          <div className={styles.title}>{project_topic}</div>
          <div className={styles.options}>
            <Link
              className={styles.box}
              to={`${userpath}/repositories/${project_id}/editor`}
            >
              open
            </Link>
            <Link to={`${userpath}/repositories/${project_id}`}>more+</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
