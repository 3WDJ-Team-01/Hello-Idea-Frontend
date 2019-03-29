import React from 'react';
import { Link } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import styles from './Repository.module.scss';

const Header = () => (
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
    <Link to="/BrainStorming">
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
        <Link to="/*" className={styles.hovlink}>
          open
        </Link>
      </div>
      <div className="ideamore">
        <Link to="/*" className={styles.hovlink}>
          more
        </Link>
      </div>
    </div>
  </div>
);

const Repository = () => {
  return (
    <>
      <Header />
      <List>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </List>
    </>
  );
};

export default Repository;
