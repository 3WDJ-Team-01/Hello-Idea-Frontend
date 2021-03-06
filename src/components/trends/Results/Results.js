/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  // line charts
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // bar charts
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';
import ProgressIndicator from 'components/base/ProgressIndicator';
import { injectIntl, FormattedMessage } from 'react-intl';
import styles from './Results.module.scss';

const COLORS = [
  '#3498db',
  '#8884d8',
  '#20bf6b',
  '#eb3b5a',
  '#f7b731',
  '#3867d6',
  '#8854d0',
  '#4b6584',
];

const Results = ({ state, keyword, attention, log, relate, intl }) => {
  const attentionData = attention.map(item => {
    const data = {};
    const key = Object.keys(item)[0];
    data.date = key;
    data[keyword] = item[key];

    return data;
  });
  console.log(attention);
  const logData = [];

  // const genderData = log.Search_gender
  Object.keys(log).map(item => {
    Object.keys(log[item]).map(key => {
      if (key === 'Male')
        logData.push({
          name: intl.formatMessage({ id: 'auth.male' }),
          ratio: log[item][key],
        });
      else if (key === 'Female')
        logData.push({
          name: intl.formatMessage({ id: 'auth.female' }),
          ratio: log[item][key],
        });
      else
        logData.push({
          name: key,
          ratio: log[item][key],
        });
    });
  });

  return (
    <div className={styles.trendsResultAll}>
      <div className={styles.searchWord}>
        <FormattedMessage id="trend.keyword" />
        <h4>{keyword}</h4>
      </div>
      <div className={styles.section}>
        <h5>{intl.formatMessage({ id: 'trend.attention' })}</h5>
        {state.attention === 'success' ? (
          <div className={styles.graph}>
            <LineChart
              width={1000}
              height={300}
              data={attentionData.reverse()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={keyword}
                stroke="#3498db"
                activeDot={{ r: 5 }}
                label
              />
            </LineChart>
          </div>
        ) : (
          <ProgressIndicator mini />
        )}
      </div>
      <div className={styles.section}>
        <h5>{intl.formatMessage({ id: 'trend.age' })}</h5>
        {state.log === 'success' ? (
          <div className={styles.graph}>
            <BarChart
              width={1000}
              height={300}
              data={logData}
              margin={{ top: 30, right: 30, left: 30, bottom: 5 }}
              barCategoryGap="30%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="ratio" fill="#3498db" label={{ position: 'top' }}>
                {logData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        ) : (
          <ProgressIndicator mini />
        )}
      </div>

      <div className={`${styles.section} ${styles.relate}`}>
        <div className={styles.article}>
          <h5>{intl.formatMessage({ id: 'trend.similarTopic' })}</h5>
          {state.relate === 'success' ? (
            <div className={styles.list}>
              {relate.related_topic.map((item, i) => (
                <Link
                  key={i}
                  to={
                    item.group_id > 0
                      ? `/group/${item.group_id}/repositories/${item.project_id}`
                      : `/user/${item.user_id}/repositories/${item.project_id}`
                  }
                  className={styles.item}
                >
                  <span className={styles.number}>{i + 1}</span>
                  <span className={styles.contents}>{item.project_topic}</span>
                </Link>
              ))}
              {relate.related_topic.length === 0 ? (
                <div className={styles.null}>
                  <FormattedMessage id="trend.similarTopic" />
                  <FormattedMessage id="trend.none" />
                </div>
              ) : null}
            </div>
          ) : (
            <ProgressIndicator mini />
          )}
        </div>
        <div className={styles.article}>
          <h5>{intl.formatMessage({ id: 'trend.similarKeyword' })}</h5>
          {state.relate === 'success' ? (
            <div className={styles.list}>
              {relate.related_search.map((item, i) => (
                <Link
                  key={i}
                  to={`/search/${item.keyword}`}
                  className={styles.item}
                >
                  <span className={styles.number}>{i + 1}</span>
                  <span className={styles.contents}>{item.keyword}</span>
                </Link>
              ))}
              {relate.related_search.length === 0 ? (
                <div className={styles.null}>
                  <FormattedMessage id="trend.similarKeyword" />
                  <FormattedMessage id="trend.none" />
                </div>
              ) : null}
            </div>
          ) : (
            <ProgressIndicator mini />
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Results);
