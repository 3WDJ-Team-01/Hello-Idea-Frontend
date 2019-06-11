/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBIcon, MDBBtn } from 'mdbreact';
import ProgressIndicator from 'components/base/ProgressIndicator';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import styles from './Comment.module.scss';

const formatter = buildFormatter(koreanStrings);

const Comment = ({
  comment,
  target,
  repositoryInfo,
  toggleComment,
  handleChange,
  handleSubmit,
}) => {
  const { project_topic } = repositoryInfo;
  const { head, feedbacks } = target;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.label}>의견 보내기</div>
        <div className={styles.info}>
          <span>{project_topic}</span>
          <MDBIcon icon="chevron-right" />
          <span>{head}</span>
        </div>
        <div className={styles.list}>
          {feedbacks.map(
            ({ created_at, feedback, user_id, user_img, user_name }, i) => (
              <div key={i}>
                <div className={styles.userImg}>
                  <img src={user_img} alt={user_name} />
                </div>
                <div className={styles.feedback}>
                  <span className={styles.userName}>{user_name}</span>{' '}
                  <span className={styles.contents}>{feedback}</span>
                  <div className={styles.time}>
                    <TimeAgo date={created_at} formatter={formatter} />
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
        <div className={styles.text}>
          <textarea value={comment} onChange={handleChange} />
        </div>
        <div className={styles.btns}>
          <MDBBtn color="mdb-color" onClick={toggleComment}>
            닫기
          </MDBBtn>
          <MDBBtn color="primary" onClick={handleSubmit}>
            제출
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default Comment;
