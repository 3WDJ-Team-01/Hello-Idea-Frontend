import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import japanStrings from 'react-timeago/lib/language-strings/ja';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import styles from './Repository.module.scss';

const formatter = localStorage.getItem('lang') === 'ko' ? buildFormatter(koreanStrings) : buildFormatter(japanStrings);

const Repository = ({ author, value, isGroup = false }) =>
  author && value ? (
    <div className={styles.repository}>
      <div className={styles.contents}>
        <div className={styles.title}>
          <Link
            to={`/${isGroup ? 'group' : 'user'}/${author}/repositories/${
              value.project_id
            }`}
          >
            {value.project_topic}
          </Link>
        </div>

        <div className={styles.body}>{value.project_intro}</div>
        <div className={styles.property}>
          <div className={styles.category}>
            <div>
              <MDBIcon icon="star" /> {value.project_likes}
            </div>
            <div>
              <MDBIcon far icon="eye" /> {value.project_hits}
            </div>
          </div>
          <div className={styles.date}>
            <TimeAgo date={value.updated_at} formatter={formatter} />
          </div>
        </div>
      </div>

      <Link
        to={`/${isGroup ? 'group' : 'user'}/${author}/repositories/${
          value.project_id
        }`}
      >
        <div className={styles.image}>
          <img src={value.project_img} alt={value.project_name} />
        </div>
      </Link>
    </div>
  ) : null;

export default Repository;
