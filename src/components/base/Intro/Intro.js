/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import icon_brain from './imgs/icon_brain.png';
import icon_idea from './imgs/icon_idea.png';
import icon_recommend from './imgs/icon_recommend.png';
import icon_save from './imgs/icon_save.png';
import icon_share from './imgs/icon_share.png';
import icon_together from './imgs/icon_together.png';
import secondImg from './imgs/secondImg.png';
import startImg from './imgs/startImg.jpg';
import triangle from './imgs/triangle.png';
import bgDesc from './imgs/bg_desc.png';
import bgStart from './imgs/bg_start.png';
import logo from './imgs/logo_horizontal.png';
import styles from './Intro.module.scss';

const scrollTop = () => {
  window.scrollTo(0, 0);
};

const Intro = () => {
  return (
    <div className="startAll">
      <div
        style={{
          backgroundImage: `url(${bgDesc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <div className={`${styles.section} ${styles.intro}`}>
          <img src={logo} alt="hello Idea" style={{ maxWidth: '90vw' }} />
          <div className={styles.desc}>
            <p className="projectInfor">
              This is a platform that helps you organize your ideas more easily
              and comfortably.
              <br />
              Write down your ideas, share them with others and shape them.
            </p>
          </div>
          <Link to="/auth/login">
            <MDBBtn className="btn btnstart">
              <span>Start</span>
            </MDBBtn>
          </Link>
        </div>
        <div className={styles.section}>
          <div style={{ textAlign: 'center', marginTop: '15vh' }}>
            <p style={{ color: '#4193ff', fontSize: '2.8em' }}>Our Services</p>
            <p style={{ fontSize: '5.5em' }}>What We Offer</p>
          </div>
          <div className={styles.list}>
            <div>
              <div className="list-icon">
                <img src={icon_brain} alt="" />
              </div>
              <div className={styles.content}>
                <h4 className="ml-3">Brain Storming</h4>
                <p>
                  You can freely record your ideas with brainstorming tools. It
                  can be expressed in a variety of ways.
                </p>
              </div>
            </div>
            <div>
              <div className="list-icon">
                <img src={icon_save} alt="" />
              </div>
              <div className={styles.content}>
                <h4 className="ml-3">Save Idea</h4>
                <p>
                  You can store your ideas in your personal repository. For
                  group users, the group repository is granted also.
                </p>
              </div>
            </div>
            <div>
              <div className="list-icon">
                <img src={icon_recommend} alt="" />
              </div>
              <div className={styles.content}>
                <h4 className="ml-3">Recommend Idea</h4>
                <p>
                  When you're writing an idea, <br />
                  We automatically recommend ideas related to the ideas you are
                  writing.
                </p>
              </div>
            </div>
            <div>
              <div className="list-icon">
                <img src={icon_share} alt="" />
              </div>
              <div className={styles.content}>
                <h4 className="ml-3">Share Idea</h4>
                <p>
                  You can share your ideas with other users for help and advice.
                  Follow users who have the same interests.
                </p>
              </div>
            </div>
            <div>
              <div className="list-icon">
                <img src={icon_together} alt="" />
              </div>
              <div className={styles.content}>
                <h4 className="ml-3">Think Together</h4>
                <p>
                  Create groups of people with the same interests and share your
                  views on the same topic.
                </p>
              </div>
            </div>
            <div>
              <div className="list-icon">
                <img src={icon_idea} alt="" />
              </div>
              <div className={styles.content}>
                <h4 className="ml-3">Expand Idea</h4>
                <p>
                  Extend your ideas with these services we offer.Then do you
                  want to start? Join Us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${bgStart})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <div
          className={styles.section}
          style={{ alignItems: 'initial', marginLeft: '40vw' }}
        >
          <div style={{ fontSize: '5.5em' }}>
            Share Your Idea
            <br />
            On Hello Idea
          </div>
          <div stlye={{ fontSize: '1.5em' }}>
            <p>
              Feel free to share your ideas with others. <br /> Helloidea
              provides you with a tool and that help you.
            </p>
            <p>
              You can help others by sharing your ideas. <br />
              You can share other people's ideas and develop them together.
              Communicate with people with similar ideas
              <br /> to shape your ideas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
