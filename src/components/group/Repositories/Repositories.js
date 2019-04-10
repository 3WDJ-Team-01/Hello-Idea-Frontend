import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Repository from 'components/base/Card/Repository';
import styles from './Repositories.module.scss';

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
        <Repository title="test1" value={{ title: 'test1' }} />
        <Repository title="test2" value={{ title: 'test1' }} />
        <Repository title="test3" value={{ title: 'test1' }} />
      </div>
    </div>
  );
};

export default Repositories;
