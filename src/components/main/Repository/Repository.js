import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Header = ({ userInfo }) => (
  <div className={styles.header}>
    <div>
      <select className="browser-default custom-select">
        <option value="Username">Username</option>
        <option value="Groupname_1">Groupname_1</option>
        <option value="Groupname_2">Groupname_2</option>
        <option value="Groupname_3">Groupname_3</option>
      </select>
      <span>/</span>
      <input type="text" className="form-control" placeholder="저장소 이름" />
    </div>
    <Link to={`${userInfo}/new`}>
      <MDBBtn color="primary">
        <MDBIcon icon="edit" className="mr-1" />
        NEW
      </MDBBtn>
    </Link>
  </div>
);

const List = ({ children }) => (
  <div className={styles.idealist}>
    <div>{children}</div>
  </div>
);

const Item = () => (
  <div className={styles.ideabox}>
    <div className={styles.ideaimg} />
    <div className={styles.ideahov}>
      <div className={styles.ideaopen}>
        <Link to="/user/repositories/repo/editor">open</Link>
      </div>
      <div className="ideamore">
        <Link to="/user/repositories/repo">more</Link>
      </div>
    </div>
  </div>
);

const Repository = ({ userInfo }) => {
  return (
    <div className={styles.repository}>
      <Header userInfo={userInfo} />
      <List>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <div className={styles.moreRepository}>
          <Link to="/USERNAME/repositories">
            <MDBIcon icon="folder-open" />
            See more repositories
          </Link>
        </div>
      </List>
    </div>
  );
};

export default Repository;
