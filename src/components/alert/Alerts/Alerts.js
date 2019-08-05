/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Notification from 'components/base/Card/Notification';
import Request from 'components/base/Card/Request';
import styles from './Alerts.module.scss';

const ComponentFromType = (
  type,
  value,
  loggedUserId,
  i,
  handleConsent,
  handleRefuse,
) => {
  if (type === 'notifications')
    return <Notification key={i} notify={value} loggedUserId={loggedUserId} />;
  return (
    <Request
      key={i}
      request={value}
      handleConsent={handleConsent}
      handleRefuse={handleRefuse}
    />
  );
};

const Alerts = ({
  type,
  alerts,
  loggedUserId,
  handleConsent,
  handleRefuse,
}) => {
  return (
    <div className={styles.Results}>
      <div className={styles.ResultsHeader}>
        {`${alerts[type].length} ${type}`}
      </div>
      {alerts[type].map((value, i) =>
        ComponentFromType(
          type,
          value,
          loggedUserId,
          i,
          handleConsent,
          handleRefuse,
        ),
      )}
    </div>
  );
};

export default Alerts;
