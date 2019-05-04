/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import styles from './Notification.module.scss';

const formatter = buildFormatter(koreanStrings);
const loggedUserId = JSON.parse(localStorage.getItem('userInfo')).user_id;

const Notification = ({ notify }) => {
  const { notify_cont, created_at, send_id, send, target_id, target } = notify;
  const sendingUser = {
    send_id,
    ...send,
  };
  const notifyData = {
    target_id,
    ...target,
  };
  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <div className={styles.img}>
          <img src={send.user_img} alt={send.user_name} />
        </div>
        <div className={styles.activity}>
          <Link to={`/user/${send_id}`}>
            <b>{send.user_name}</b>
          </Link>
          {notification(notify_cont, sendingUser, notifyData).label}
        </div>
        <div className={styles.date}>
          <TimeAgo date={created_at} formatter={formatter} />
        </div>
      </div>
      <div className={styles.detail}>
        {notification(notify_cont, sendingUser, notifyData).component}
      </div>
    </div>
  );
};

const notification = (type, sendingUser, notifyData) => {
  const {
    target_id,
    // user follow
    user_img,
    user_name,
    user_intro,
    follower,
    project_count,
    // repositories
    user_id,
    group_id,
    project_topic,
    project_intro,
    project_likes,
    project_hits,
  } = notifyData;
  switch (type) {
    case 'follow':
      return {
        label:
          loggedUserId === notifyData.target_id ? (
            <span>님이 당신을 팔로우하고 있습니다.</span>
          ) : (
            <span>
              님이 <Link to={`/user/${target_id}`}>{notifyData.user_name}</Link>
              을 팔로우하고 있습니다.
            </span>
          ),
        component:
          loggedUserId === notifyData.target_id ? (
            <Detail
              thumbnail={sendingUser.user_img}
              path={`/user/${sendingUser.send_id}`}
              name={sendingUser.user_name}
              intro={sendingUser.user_intro}
            >
              <div>{`${sendingUser.project_count} repositories`}</div>
              <div>{`${sendingUser.follower} followers`}</div>
            </Detail>
          ) : (
            <Detail
              thumbnail={user_img}
              path={`/user/${target_id}`}
              name={user_name}
              intro={user_intro}
            >
              <div>{`${project_count} repositories`}</div>
              <div>{`${follower} followers`}</div>
            </Detail>
          ),
      };
    case 'create':
      return {
        label: (
          <span>
            님이{' '}
            <Link to={`/user/${user_id}/repositories/${target_id}`}>
              {project_topic}
            </Link>
            주제로 생각하고 있습니다.
          </span>
        ),
        component: (
          <Detail
            path={`/user/${user_id}/repositories/${target_id}`}
            name={project_topic}
            intro={project_intro}
          >
            <div>{`${project_likes} likes`}</div>
            <div>{`${project_hits} hits`}</div>
          </Detail>
        ),
      };
    case 'like':
      return {
        label: (
          <span>
            님이{' '}
            <Link to={`/user/${user_id}/repositories/${target_id}`}>
              {project_topic}
            </Link>
            주제를 좋아합니다.
          </span>
        ),
        component: (
          <Detail
            path={`/user/${user_id}/repositories/${target_id}`}
            name={project_topic}
            intro={project_intro}
          >
            <div>{`${project_likes} likes`}</div>
            <div>{`${project_hits} hits`}</div>
          </Detail>
        ),
      };
    case 'fork':
      return {
        label: (
          <span>
            님이{' '}
            <Link to={`/user/${user_id}/repositories/${target_id}`}>
              {project_topic}
            </Link>
            에서 당신의 생각을 참조하였습니다.
          </span>
        ),
        component: (
          <Detail
            path={`/user/${user_id}/repositories/${target_id}`}
            name={project_topic}
            intro={project_intro}
          >
            <div>{`${project_likes} likes`}</div>
            <div>{`${project_hits} hits`}</div>
          </Detail>
        ),
      };
    default:
      return null;
  }
};

const Detail = ({ thumbnail, path, name, intro, children }) => {
  if (thumbnail)
    return (
      <>
        <Link to={path}>
          <div className={styles.thumbnail}>
            <img src={thumbnail} alt={name} />
          </div>
        </Link>
        <div className={styles.contents}>
          <Link to={path}>
            <div className={styles.name}>{name}</div>
          </Link>
          <div className={styles.intro}>{intro}</div>
          <div className={styles.option}>{children}</div>
        </div>
      </>
    );
  return (
    <div className={styles.contents}>
      <Link to={path}>
        <div className={styles.name}>{name}</div>
      </Link>
      <div className={styles.intro}>{intro}</div>
      <div className={styles.option}>{children}</div>
    </div>
  );
};

export default Notification;
