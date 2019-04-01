import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repositories.module.scss';

const Repository = ({ title }) => (
  <div className={styles.repository}>
    <div className={styles.contents}>
      <div className={styles.title}>
        <Link to={`repositories/${title}`}>{title}</Link>
      </div>

      <div className={styles.body}>
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </div>
      <div className={styles.property}>
        <div className={styles.category}>
          <div>IT</div>
        </div>
        <div className={styles.date}>Updated 7days ago</div>
      </div>
    </div>

    <Link to={`repositories/${title}`}>
      <div className={styles.image}>이미지</div>
    </Link>
  </div>
);

const Repositories = ({
  user,
  url,
  Overview,
  Followers,
  Followings,
  children,
}) => {
  return (
    <div className={styles.repositories}>
      <div className={styles.repoCategory}>
        <div>Category</div>
        <ul>
          <li>
            <Link to="/">IT</Link>
          </li>
          <li>
            <Link to="/">LIFE</Link>
          </li>
          <li>
            <Link to="/">SPORTS</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className={styles.search}>
          <Link to={`/${user}/new`}>
            <MDBBtn color="primary">
              <MDBIcon icon="edit" className="mr-1" />
              NEW
            </MDBBtn>
          </Link>
          <input type="text" placeholder="Find a repository..." />
        </div>
        <Repository title="test1" />
        <Repository title="test2" />
        <Repository title="test3" />
      </div>
    </div>
  );
};

export default Repositories;
