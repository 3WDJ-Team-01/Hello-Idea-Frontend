/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { MDBBtn } from 'mdbreact';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import japanStrings from 'react-timeago/lib/language-strings/ja';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { ja } from 'data/locale';
import styles from './Request.module.scss';

// const formatter = buildFormatter(koreanStrings);
const formatter = buildFormatter(japanStrings);

const Request = ({ request, handleConsent, handleRefuse }) => {
  const { request_id, group, is_accepted, created_at } = request;
  const { group_id, group_name, group_img, group_intro, member_count } = group;

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <div className={styles.img}>
          <img src={group_img} alt={group_name} />
        </div>
        <div className={styles.activity}>
          <Link to={`/group/${group_id}`}>
            <b>{group_name}</b>
          </Link>
          <span>{ja.alert.inviteMe}</span>
          <div className={styles.date}>
            <TimeAgo date={created_at} formatter={formatter} />
          </div>
        </div>
        {is_accepted === 0 ? (
          <div className={styles.btns}>
            <MDBBtn
              color="primary"
              onClick={() => {
                handleConsent(request_id, group_id);
              }}
            >
              {ja.alert.accept}
            </MDBBtn>
            <MDBBtn
              outline
              color="primary"
              onClick={() => handleRefuse(request_id)}
            >
              {ja.alert.decline}
            </MDBBtn>
          </div>
        ) : is_accepted === 1 ? (
          <span className={styles.message}>{ja.alert.isAccept}</span>
        ) : (
          <span className={styles.message}>{ja.alert.isDecline}</span>
        )}
      </div>
      <div className={styles.detail}>
        <Detail
          thumbnail={group_img}
          path={`/group/${group_id}`}
          name={group_name}
          intro={group_intro}
        >
          <div>{`${member_count} members`}</div>
        </Detail>
      </div>
    </div>
  );
};

const Detail = ({ thumbnail, path, name, intro, children }) => {
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
};

export const HeaderRequest = ({ request }) => {
  const { group, created_at } = request;
  const { group_name, group_img } = group;

  return (
    <Link to="/alert/requests">
      <div className={styles.headerNotify}>
        <div className={styles.header}>
          <div className={styles.img}>
            <img src={group_img} alt={group_name} />
          </div>
          <div className={styles.activity}>
            <b>{group_name}</b>
            <span>에서 당신을 초대했습니다.</span>
            <div className={styles.date}>
              <TimeAgo date={created_at} formatter={formatter} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Request;
