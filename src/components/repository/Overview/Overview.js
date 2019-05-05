/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { getTendencyColor } from 'tools/TendencyColor';
import styles from './Overview.module.scss';

const Overview = ({
  repositoryId,
  repositoryInfo,
  repositoryCategory,
  similarRepository,
}) => {
  return (
    <div className={styles.repositoryWrapper}>
      <div className={styles.info}>
        <div className={styles.intro}>
          <div>{repositoryInfo.project_intro}</div>
        </div>
        <div className={styles.tendency}>
          {Object.keys(repositoryCategory).map((category, i) => {
            if (repositoryCategory[category] > 5)
              return (
                <div key={i} className={styles.category}>
                  <MDBIcon
                    icon="circle"
                    style={{
                      color: getTendencyColor(category),
                    }}
                  />
                  <span className={styles.label}>{category}</span>
                  <span className={styles.ratio}>
                    {`${repositoryCategory[category]}%`}
                  </span>
                </div>
              );
          })}
        </div>
      </div>
      <div className={styles.repoScreen}>
        <img
          src={repositoryInfo.project_img}
          alt={repositoryInfo.project_topic}
        />
        <Link to={`${repositoryId}/editor`}>
          <MDBBtn color="primary">open viewer</MDBBtn>
        </Link>
      </div>
      <div className={styles.similarRepo}>
        <span>Similar Sketch</span>
        <List>
          {similarRepository &&
            similarRepository.map((repository, i) => {
              return (
                <Item
                  key={i}
                  path={
                    repository.group_id === 0
                      ? `/user/${repository.user_id}/repositories/${
                          repository.project_id
                        }`
                      : `/group/${repository.group_id}/repositories/${
                          repository.project_id
                        }`
                  }
                  repository={repository}
                />
              );
            })}
        </List>
      </div>
    </div>
  );
};

const List = ({ children }) => (
  <div className={styles.idealist}>
    <div>{children}</div>
  </div>
);

const Item = ({ path, repository }) => (
  <div className={styles.ideabox}>
    <div className={styles.ideaimg}>
      <img src={repository.project_img} alt={repository.project_topic} />
    </div>
    <div className={styles.ideahov}>
      <div className={styles.idealabel}>
        <div className={styles.title}>{repository.project_topic}</div>
        <div className={styles.options}>
          <Link className={styles.box} to={`${path}/editor`}>
            open
          </Link>
          <Link to={`${path}`}>more+</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Overview;
