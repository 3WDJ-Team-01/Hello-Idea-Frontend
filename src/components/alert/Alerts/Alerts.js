/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Notification from 'components/base/Card/Notification';
import styles from './Alerts.module.scss';

const ComponentFromType = (type, value, loggedUserId, i) => {
  if (type === 'Notifications')
    return <Notification key={i} notify={value} loggedUserId={loggedUserId} />;
  return null;
};

const Alerts = ({ type, alerts, loggedUserId }) => {
  return (
    <div className={styles.Results}>
      <div className={styles.ResultsHeader}>
        {`${alerts[type].length} ${type}`}
      </div>
      {alerts[type].map((value, i) =>
        ComponentFromType(type, value, loggedUserId, i),
      )}
    </div>
  );
};

export default Alerts;
