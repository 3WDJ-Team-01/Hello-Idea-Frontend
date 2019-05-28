/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './Footer.module.scss';

const Footer = ({
  loggedUserId,
  inputMessage,
  chatList,
  participants,
  type,
  zoom,
  chat,
  toggleChat,
  handleCanvasZoom,
  handleInputChange,
  handleMessageSubmit,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') handleMessageSubmit();
  };

  if (type === 'group')
    return (
      <div className={styles.brainFooterWrapper}>
        <div className={styles.brainStatus}>
          {chat ? (
            <div className={styles.chat}>
              <div id="chat-list" className={styles.list}>
                {/* line */}
                {chatList.map((message, i) => (
                  <div
                    style={
                      message.user_id === loggedUserId
                        ? { flexDirection: 'row-reverse' }
                        : {}
                    }
                    key={i}
                    className={styles.line}
                  >
                    <div className={styles.user}>
                      <img src={message.user_img} alt={message.user_name} />
                    </div>
                    <div className={styles.message}>{message.chat_cont}</div>
                  </div>
                ))}
              </div>
              <div className={styles.send}>
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={onKeyPress}
                />
                <span className={styles.submit} onClick={handleMessageSubmit}>
                  전송
                </span>
              </div>
            </div>
          ) : null}

          <div className={styles.slider}>
            <input
              type="range"
              className="custom-range"
              id="customRange1"
              min={0.5}
              max={2.0}
              step={0.1}
              onChange={handleCanvasZoom}
              value={zoom}
            />
          </div>
        </div>
        <div className={styles.brainFooter}>
          <div className={styles.brainLeftFooter}>
            <MDBBtn color="deep-orange" onClick={toggleChat}>
              Group Chat
            </MDBBtn>
          </div>
          <div className={styles.brainRightFooter}>
            {participants.map((user, i) => (
              <div key={i}>
                <img src={user.user_img} alt={user.user_name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className={styles.brainFooterWrapper}>
      <div className={styles.brainStatus}>
        <div className={styles.slider}>
          <input
            type="range"
            className="custom-range"
            id="customRange1"
            min={0.5}
            max={2.0}
            step={0.1}
            onChange={handleCanvasZoom}
            value={zoom}
          />
        </div>
      </div>
      <div className={styles.brainFooter} />
    </div>
  );
};

export default Footer;
