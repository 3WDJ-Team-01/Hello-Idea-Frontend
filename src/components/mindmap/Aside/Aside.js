/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBIcon } from 'mdbreact';
import ProgressIndicator from 'components/base/ProgressIndicator';
import styles from './Aside.module.scss';

const Aside = ({
  isActivated,
  state,
  data,
  results,
  list,
  handleDragStart,
  handleDragEnd,
  uploadFile,
}) => {
  // Explore Action
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
                    }`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    #{idea.project_topic}
                  </a>
                ) : (
                  <a
                    href={`/group/${idea.group_id}/repositories/${
                      idea.project_id
                    }`}
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
  // Info Action
  const Info = () => (
    <div className={styles.recommendBoxList}>
      <div className={styles.section}>
        <div className={styles.keyword}>{data.idea_cont}</div>
        <p>
          <span>
            <b>소유자</b>
          </span>
          <span>{data.user_name}</span>
        </p>
        <p>
          <span>
            <b>주제</b>
          </span>
          <span>{data.project_topic}</span>
        </p>
        <p>
          <span>
            <b>URL</b>
          </span>
          <span>
            {data.user_id !== 0 ? (
              <a
                href={`/user/${data.user_id}/repositories/${data.project_id}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`${window.location.origin}/user/${data.user_id}/repositories/${
                  data.project_id
                }`}
              </a>
            ) : (
              <a
                href={`/group/${data.group_id}/repositories/${data.project_id}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`${window.location.origin}/group/${
                  data.group_id
                }/repositories/${data.project_id}`}
              </a>
            )}
          </span>
        </p>
      </div>
    </div>
  );
  // File Action
  const List = () => (
    <div className={styles.recommendBoxList}>
      <div className={styles.section}>
        <div className={styles.keyword}>{data.head}</div>
        <div className={styles.list}>
          <p>
            <span>
              <b>파일</b>
            </span>
            {list.map((item, i) => (
              <span key={i}>
                <a
                  href={item.idea_file}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.idea_file.split('/media.hello-idea.com/')[1]}
                </a>
              </span>
            ))}
          </p>
        </div>
        <div className={styles.btns}>
          <label htmlFor="file">
            <MDBIcon icon="file-upload" />
          </label>
          <input type="file" id="file" onChange={uploadFile} />
          <label htmlFor="camera">
            <MDBIcon icon="camera" />
          </label>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="camera"
            onChange={uploadFile}
          />
        </div>
      </div>
    </div>
  );
  const Loading = () => <ProgressIndicator mini />;
  const Failure = () => (
    <div className={styles.recommendBoxList}>결과가 없습니다</div>
  );
  if (results)
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
  if (list)
    return (
      <div className={styles.bodyRight}>
        {state === 'success' ? (
          <List />
        ) : state === 'pending' ? (
          <Loading />
        ) : (
          <Failure />
        )}
      </div>
    );
  return (
    <div className={styles.bodyRight}>
      {state === 'success' ? (
        <Info />
      ) : state === 'pending' ? (
        <Loading />
      ) : (
        <Failure />
      )}
    </div>
  );
};

export default Aside;
