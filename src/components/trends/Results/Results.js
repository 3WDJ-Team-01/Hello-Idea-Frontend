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
  Legend,
  // bar charts
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';
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

const Results = ({ keyword, attention, log, relate }) => {
  const attentionData = attention.map(item => {
    const data = {};
    const key = Object.keys(item)[0];

    data.date = key;
    data[keyword] = item[key];

    return data;
  });

  const logData = [];

  // const genderData = log.Search_gender
  Object.keys(log).map(item => {
    Object.keys(log[item]).map(key => {
      if (key === 'Male')
        logData.push({
          name: '남성',
          비율: log[item][key],
        });
      else if (key === 'Female')
        logData.push({
          name: '여성',
          비율: log[item][key],
        });
      else
        logData.push({
          name: key,
          비율: log[item][key],
        });
    });
  });

  return (
    <div className={styles.trendsResultAll}>
      <div className={styles.searchWord}>
        검색어
        <h4>{keyword}</h4>
      </div>
      <div className={styles.section}>
        <h5>관심도 변화</h5>
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
      </div>

      <div className={styles.section}>
        <h5>성별, 연령별 관심도</h5>
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
            <Bar dataKey="비율" fill="#3498db" label={{ position: 'top' }}>
              {logData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>

      <div className={`${styles.section} ${styles.relate}`}>
        <div className={styles.article}>
          <h5>관련 주제</h5>
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
              <div className={styles.null}>관련된 주제가 없습니다.</div>
            ) : null}
          </div>
        </div>
        <div className={styles.article}>
          <h5>관련 검색어</h5>
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
              <div className={styles.null}>관련된 검색어가 없습니다.</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
