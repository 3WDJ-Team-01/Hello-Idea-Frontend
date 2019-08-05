/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import { getTendencyColor } from 'tools/TendencyColor';
import { FormattedMessage } from 'react-intl';
import styles from './Discover.module.scss';

const Discover = ({ tendencyRepo }) => {
  return (
    <div className={styles.discover}>
      <FormattedMessage id="main.recommend" />
      <div className={styles.repoList}>
        {tendencyRepo.map((repository, i) => (
          <Item
            key={i}
            user_id={repository.user_id}
            group_id={repository.group_id}
            project_id={repository.project_id}
            project_topic={repository.project_topic}
            project_intro={repository.project_intro}
            project_hits={repository.project_hits}
            project_likes={repository.project_likes}
            project_tendency={repository.project_tendency}
          />
        ))}
      </div>
      <Link to="/explore">more...</Link>
    </div>
  );
};

const Item = ({
  user_id,
  group_id,
  project_id,
  project_topic,
  project_intro,
  project_hits,
  project_likes,
  project_tendency,
}) => (
  <div className={styles.repo}>
    <div className={styles.path}>
      <Link
        to={
          user_id !== 0
            ? `/user/${user_id}/repositories/${project_id}`
            : `/group/${user_id}/repositories/${project_id}`
        }
      >
        {project_topic}
      </Link>
    </div>
    <div className={styles.desc}>{project_intro}</div>
    <div className={styles.properties}>
      <span>
        <MDBIcon
          icon="circle"
          style={{ color: getTendencyColor(project_tendency) }}
        />
        {project_tendency}
      </span>
      <span>
        <MDBIcon icon="star" /> {project_likes}
      </span>
      <span>
        <MDBIcon far icon="eye" /> {project_hits}
      </span>
    </div>
  </div>
);

export default Discover;
