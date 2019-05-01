/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ProgressIndicator from 'components/base/ProgressIndicator';
import styles from './Aside.module.scss';

const Aside = ({ state, results, handleDragStart, handleDragEnd }) => {
  const Results = () => (
    <div className={styles.recommendBoxList}>
      {results.map((node, i) => (
        <div key={i} className={styles.section}>
          <div className={styles.keyword}>{node.keyword}</div>
          {node.Idea.map((idea, index) => (
            <div
              id={idea.idea_id}
              key={index}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className={styles.recommendBox}
            >
              <div className={styles.recommendIdea}>{idea.idea_cont}</div>
              <div className={styles.recommendHash}>
                {idea.user_id !== 0 ? (
                  <a
                    href={`/user/${idea.user_id}/repositories/${
                      idea.project_id
                    }/`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    #{idea.project_topic}
                  </a>
                ) : (
                  <a
                    href={`/group/${idea.group_id}/repositories/${
                      idea.project_id
                    }/`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    #{idea.project_topic}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  const Loading = () => <ProgressIndicator mini />;
  const Failure = () => (
    <div className={styles.recommendBoxList}>결과가 없습니다</div>
  );

  return (
    <div className={styles.bodyRight}>
      {results.length > 0 && state === 'success' ? (
        <Results />
      ) : state === 'pending' ? (
        <Loading />
      ) : (
        <Failure />
      )}
    </div>
  );
};

export default Aside;
