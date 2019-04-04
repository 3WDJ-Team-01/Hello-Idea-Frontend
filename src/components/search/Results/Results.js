/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import Repository from 'components/base/Card/Repository';
import User from 'components/base/Card/User';
import styles from './Results.module.scss';

const ComponentFromType = (type, value) => {
  if (type === 'repositories') return <Repository value={value} />;
  else if (type === 'users') return <User />;
  else if (type === 'groups') return <User />;
};

const Results = ({ type }) => {
  return (
    <div className={styles.Results}>
      <div className={styles.ResultsHeader}>
        {`${123123123} ${type} results`}
      </div>
      {ComponentFromType(type, { title: 'test1' })}
      {ComponentFromType(type, { title: 'test2' })}
      {ComponentFromType(type, { title: 'test3' })}
      {ComponentFromType(type, { title: 'test4' })}
    </div>
  );
};

export default Results;
