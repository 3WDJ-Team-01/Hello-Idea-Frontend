/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import ProgressIndicator from 'components/base/ProgressIndicator';
import styles from './New.module.scss';

const New = ({
  history,
  state,
  groups,
  userInfo,
  name,
  desc,
  handleChange,
  handleSubmit,
}) => {
  const type = history.location.pathname.split('/')[1];
  const targetId = parseInt(history.location.pathname.split('/')[2], 10);

  const Person = () => (
    <select
      name="author_id"
      className="browser-default custom-select"
      onChange={handleChange}
    >
      <option value={userInfo.user_id}>{userInfo.user_name}</option>
      {groups.map((group, i) => (
        <option key={i} value={`G${group.group_id}`}>
          {group.group_name}
        </option>
      ))}
    </select>
  );

  const Group = () => {
    const index = groups.findIndex(group => group.group_id === targetId);
    const group = groups[index];
    return (
      <select
        name="author_id"
        className="browser-default custom-select"
        onChange={handleChange}
      >
        <option value={`G${group.group_id}`}>{group.group_name}</option>
      </select>
    );
  };

  return (
    <div className={styles.new}>
      {state.create === 'pending' ? <ProgressIndicator /> : null}
      <div className={styles.title}>Create a new repository</div>
      <hr />
      <div className={styles.article}>
        <div className={styles.section}>
          <div className={styles.label}>
            <b>Owner</b>
          </div>
          {type === 'user' ? <Person /> : <Group />}
        </div>
        <span>/</span>
        <div className={styles.section}>
          <label>
            <div className={styles.label}>
              <b>Repository topic</b>
            </div>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </label>
        </div>
      </div>
      <div className={styles.article}>
        <div className={styles.section} style={{ width: '100%' }}>
          <label style={{ width: '100%' }}>
            <div className={styles.label}>
              <b>Description</b> (optinal)
            </div>
            <textarea
              name="desc"
              style={{ width: '100%' }}
              type="text"
              onChange={handleChange}
              value={desc}
            />
          </label>
        </div>
      </div>
      <hr />
      <div className={styles.article}>
        {name ? (
          <MDBBtn onClick={handleSubmit} color="primary">
            Create repository
          </MDBBtn>
        ) : (
          <MDBBtn disabled color="primary">
            Create repository
          </MDBBtn>
        )}
      </div>
    </div>
  );
};

export default New;
