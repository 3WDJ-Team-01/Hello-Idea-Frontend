/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  // RaderChart
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  // AreaChart
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import styles from './Overview.module.scss';

const Overview = ({ loggedUser, info }) => {
  // DataSET
  const tendency =
    info.User_tendency &&
    Object.keys(info.User_tendency).map(key => {
      const obj = {
        subject: key,
      };
      obj[info.User_detail.user_name] = info.User_tendency[key];
      return obj;
    });
  const log =
    info.User_log &&
    Object.keys(info.User_log).map(key => {
      const date = key.split('/').splice(0, 2);
      const obj = {
        date: `${date[0]}월 ${date[1]}일`,
        project: info.User_log[key].project_count,
        idea: info.User_log[key].idea_count,
      };
      return obj;
    });
  const activity =
    info.User_feed &&
    Object.keys(info.User_feed).map(key => {
      const date = key.split('/');
      const obj = {
        repositories: info.User_feed[key],
      };

      if (info.User_feed[key][0]) {
        obj.date = `${date[2]}년 ${date[0]}월 ${date[1]}일`;

        return obj;
      }
    });
  return (
    <>
      <div className={styles.section}>
        <span>statistics</span>
        {info.User_detail ? (
          <div className={styles.myPageGraph}>
            <div className={styles.graph}>
              <RadarChart
                width={300}
                height={300}
                outerRadius={90}
                data={tendency}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} />
                <Tooltip
                  labelStyle={{ fontSize: '1rem', fontWeight: 500 }}
                  itemStyle={{ padding: 0 }}
                />
                <Radar
                  dataKey={info.User_detail.user_name}
                  stroke="#3498db"
                  fill="#3498db"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </div>
            <div className={styles.graph}>
              <AreaChart
                width={700}
                height={250}
                data={log.reverse()}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  labelStyle={{ fontSize: '1rem', fontWeight: 500 }}
                  itemStyle={{ padding: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="project"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="idea"
                  stroke="#3498db"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </div>
          </div>
        ) : (
          <div className={styles.myPageGraph} />
        )}
      </div>
      <div className={styles.section}>
        <span>recently activity</span>
        {activity.map(
          (item, i) =>
            item && (
              <ActivityGroup
                key={i}
                date={item.date}
                repositories={item.repositories}
              />
            ),
        )}
      </div>
    </>
  );
};

const ActivityGroup = ({ date, repositories }) => (
  <div className={styles.activity}>
    <p>{date}</p>
    <div className={styles.activityDate}>
      <div className={styles.activityList}>
        <div className={styles.activityGroup}>
          <div className={styles.activities}>
            {repositories &&
              repositories.map((item, i) => (
                <div key={i}>
                  <Link
                    to={`/user/${item.user_id}/repositories/${item.project_id}`}
                  >
                    {item.project_topic}
                  </Link>
                  {`에 관하여 `}
                  <span>{item.idea_count}개의 아이디어</span>
                  {`를 생성했습니다.`}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Overview;
