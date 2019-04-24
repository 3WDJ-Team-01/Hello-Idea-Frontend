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

const ComponentFromType = (type, value, i) => {
  if (type === 'Repositories')
    return value.user_id === 0 ? (
      <Repository key={i} isGroup author={value.group_id} value={value} />
    ) : (
      <Repository key={i} author={value.user_id} value={value} />
    );
  else return <User key={i} value={value} />;
};

const Results = ({ type, results }) => {
  return (
    <div className={styles.Results}>
      <div className={styles.ResultsHeader}>
        {`${results[type].length} ${type} results`}
      </div>
      {results[type].map((value, i) => ComponentFromType(type, value, i))}
    </div>
  );
};

export default Results;
