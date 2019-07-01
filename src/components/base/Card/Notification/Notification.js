/* eslint-disable no-use-before-define */
import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import japanStrings from 'react-timeago/lib/language-strings/ja';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { ja } from 'data/locale';
import styles from './Notification.module.scss';

// const formatter = buildFormatter(koreanStrings);
const formatter = buildFormatter(japanStrings);

const Notification = ({ notify, loggedUserId }) => {
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
          {
            notification(notify_cont, loggedUserId, sendingUser, notifyData)
              .label
          }
          <div className={styles.date}>
            <TimeAgo date={created_at} formatter={formatter} />
          </div>
        </div>
      </div>
      <div className={styles.detail}>
        {
          notification(notify_cont, loggedUserId, sendingUser, notifyData)
            .component
        }
      </div>
    </div>
  );
};

const notification = (type, loggedUserId, sendingUser, notifyData) => {
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
            <span>{`${ja.alert.sir} ${ja.alert.followMe}`}</span>
          ) : (
            <span>
              {`${ja.alert.sir} `}
              <Link to={`/user/${target_id}`}>{notifyData.user_name}</Link>
              {`${ja.alert.follow}`}
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
        path:
          loggedUserId === notifyData.target_id
            ? `/user/${sendingUser.send_id}`
            : `/user/${target_id}`,
        string:
          loggedUserId === notifyData.target_id
            ? `${ja.alert.sir} ${ja.alert.followMe}`
            : `${ja.alert.sir} ${notifyData.user_name} ${ja.alert.follow}.`,
      };
    case 'create':
      return {
        label: (
          <span>
            {`${ja.alert.sir} `}
            <Link to={`/user/${user_id}/repositories/${target_id}`}>
              {project_topic}
            </Link>
            {`${ja.alert.create}`}
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
        path: `/user/${user_id}/repositories/${target_id}`,
        string: `${ja.alert.sir} ${project_topic} ${ja.alert.create}`,
      };
    case 'like':
      return {
        label: (
          <span>
            {`${ja.alert.sir} `}
            <Link to={`/user/${user_id}/repositories/${target_id}`}>
              {project_topic}
            </Link>
            {`${ja.alert.like}`}
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
        path: `/user/${user_id}/repositories/${target_id}`,
        string: `${ja.alert.sir} ${project_topic} ${ja.alert.create}`,
      };
    case 'fork':
      return {
        label: (
          <span>
            {`${ja.alert.sir} ${(
              <Link to={`/user/${user_id}/repositories/${target_id}`}>
                {project_topic}
              </Link>
            )}
            ${ja.alert.fork}`}
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
        path: `/user/${user_id}/repositories/${target_id}`,
        string: `${ja.alert.sir} ${project_topic} ${ja.alert.fork}`,
      };
    case 'comment':
      return {
        label: (
          <span>
            {`${ja.alert.sir} `}
            <Link to={`/user/${user_id}/repositories/${target_id}`}>
              {project_topic}
            </Link>
            {`${ja.alert.comment}`}
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
        path: `/user/${user_id}/repositories/${target_id}`,
        string: `${ja.alert.sir} ${project_topic} ${ja.alert.comment}`,
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

export const HeaderNotify = ({ notify, loggedUserId }) => {
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
    <Link
      to={notification(notify_cont, loggedUserId, sendingUser, notifyData).path}
    >
      <div className={styles.headerNotify}>
        <div className={styles.header}>
          <div className={styles.img}>
            <img src={send.user_img} alt={send.user_name} />
          </div>
          <div className={styles.activity}>
            <b>{send.user_name}</b>
            <span>
              {
                notification(notify_cont, loggedUserId, sendingUser, notifyData)
                  .string
              }
            </span>
            <div className={styles.date}>
              <TimeAgo date={created_at} formatter={formatter} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Notification;
