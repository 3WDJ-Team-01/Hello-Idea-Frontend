/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import styles from './Header.module.scss';

const Header = ({
  url,
  menu,
  author,
  authorId,
  loggedUserId,
  isLiked,
  repositoryId,
  repositoryInfo,
  handleStar,
}) => {
  return (
    <div className={styles.repoHeader}>
      <div>
        <div className={styles.repoPath}>
          <div className={styles.title}>
            <span>
              <MDBIcon icon="folder-open" />
            </span>
            <span>
              <Link to={`/user/${repositoryInfo.user_id}`}>{author}</Link>
            </span>
            <span>/</span>
            <span>
              <Link
                to={`/user/${
                  repositoryInfo.user_id
                }/repositories/${repositoryId}`}
              >
                {repositoryInfo.project_topic}
              </Link>
            </span>
          </div>
          <div className={styles.options}>
            <div className={styles.watched}>
              <MDBIcon far icon="eye" className="mr-1" />
              {repositoryInfo.project_hits > 999
                ? `${parseInt(repositoryInfo.project_hits / 1000, 10)}K`
                : repositoryInfo.project_hits}
            </div>
            <div
              className={styles.star}
              onClick={handleStar}
              style={
                isLiked
                  ? {
                      backgroundColor: `black`,
                      color: `white`,
                    }
                  : {}
              }
            >
              <MDBIcon icon="star" className="mr-1" />
              {repositoryInfo.project_likes > 999
                ? `${parseInt(repositoryInfo.project_likes / 1000, 10)}K`
                : repositoryInfo.project_likes}
            </div>
          </div>
        </div>
        <div className={styles.userNavWrapper}>
          <div className={styles.userNav}>
            <Link
              to={`/user/${
                repositoryInfo.user_id
              }/repositories/${repositoryId}`}
              style={
                !menu
                  ? {
                      borderTop: `3px solid #4285f4`,
                      borderBottom: 'none',
                      backgroundColor: 'white',
                      fontWeight: 500,
                    }
                  : { border: 'none' }
              }
            >
              <div className={styles.MyPageOverview}>Overview</div>
            </Link>
            {authorId === loggedUserId ? (
              <Link
                to={`/user/${
                  repositoryInfo.user_id
                }/repositories/${repositoryId}/settings`}
                style={
                  menu === 'settings'
                    ? {
                        borderTop: `3px solid #4285f4`,
                        borderBottom: 'none',
                        backgroundColor: 'white',
                        fontWeight: 500,
                      }
                    : { border: 'none' }
                }
              >
                <div className={styles.MyPageRepositories}>Settings</div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
