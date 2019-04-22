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
  const activity = info.User_log && info.User_feed && function() {};
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
                <PolarRadiusAxis />
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
        <div className={styles.activity}>
          <p>2019년 04월</p>
          <div className={styles.activityDate}>
            <div className={styles.verticlLine} />
            <div className={styles.activityList}>
              <ActivityGroup />
              <ActivityGroup />
              <ActivityGroup />
            </div>
          </div>
        </div>
        <div className={styles.activity}>
          <p>2019년 03월</p>
          <div className={styles.activityDate}>
            <div className={styles.verticlLine} />
            <div className={styles.activityList}>
              <ActivityGroup />
              <ActivityGroup />
              <ActivityGroup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ActivityGroup = () => (
  <div className={styles.activityGroup}>
    <div className={styles.activityCreated}>
      Created 10 ideas in 2 Repositories
    </div>
    <div className={styles.activities}>
      <Link to="/">USERNAME/capstone</Link> 8ideas <br />
      <Link to="/">1st GROUPUSER/free_topics</Link> 2ideas
    </div>
  </div>
);

export default Overview;
