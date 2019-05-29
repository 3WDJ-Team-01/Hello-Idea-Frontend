/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';
import ProgressIndicator from 'components/base/ProgressIndicator';
import styles from './New.module.scss';

export const New = ({ state, name, handleSubmit, children }) => (
  <div className={styles.new}>
    {state.create === 'pending' ? <ProgressIndicator /> : null}
    <div className={styles.title}>Create a new repository</div>
    <hr />
    {children}
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

export const Info = ({ handleChange, name, children }) => (
  <div className={styles.article}>
    <div className={styles.section}>
      <div className={styles.label}>
        <b>Owner</b>
      </div>
      {children}
    </div>
    <span>/</span>
    <div className={styles.section}>
      <label>
        <div className={styles.label}>
          <b>Repository topic</b>
        </div>
        <input type="text" name="name" onChange={handleChange} value={name} />
      </label>
    </div>
  </div>
);

export const Desc = ({ desc, handleChange }) => (
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
);

export const Deadline = ({
  date,
  datePicker,
  toggleDatePicker,
  handleDateChange,
  handleDateSave,
}) => {
  return (
    <div className={styles.article}>
      <div className={styles.section} style={{ width: '100%' }}>
        <label style={{ width: '100%' }}>
          <div className={styles.label}>
            <b>Deadline</b> (optinal)
          </div>
          <div>
            <input
              type="text"
              readOnly
              value={date.format('llll')}
              onClick={toggleDatePicker}
            />
          </div>
        </label>
        {datePicker ? (
          <div className={styles.datePicker}>
            <InputMoment
              prevMonthIcon="icon ion-ios-arrow-back"
              nextMonthIcon="icon ion-ios-arrow-forward"
              moment={date}
              minStep={5}
              onChange={handleDateChange}
              onSave={handleDateSave}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const Person = ({ userInfo, groups, handleChange }) => (
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

export const Group = ({ groups, targetId, handleChange }) => {
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
