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
import './Intro.css';

const scrollTop = () => {
  window.scrollTo(0, 0);
};

const Intro = () => {
  return (
    <div className="startAll">
      <First />
      <Second />
      <Third />
      <div className="startScroll">
        <span onClick={scrollTop}>
          <img src={triangle} alt="triangle" />
        </span>
      </div>
    </div>
  );
};

const First = () => (
  <div className="startFirst">
    <div className="startFirstBox">
      <h1 className="mobileTitle">
        <span>H</span>ELLO&nbsp;
        <span>I</span>DEA
      </h1>
      <div className="firstImg col-lg-8">
        <img src={startImg} alt="first" />
      </div>
      <div className="fullscreen">
        <div className="startFirstContent col-lg-4">
          <h1>
            <span>H</span>ELLO <br />
            <span>I</span>DEA
          </h1>

          <div>
            <p className="projectInfor">
              This is a platform that helps you organize your
              <br />
              ideas more easily and comfortably.
              <br />
              Write down your ideas, share them with others, <br />
              and shape them. Click the Start button!
            </p>
            <p className="mobileProjectInfor">
              This is a platform that helps you organize
              <br />
              your ideas more easily and comfortably.
              <br />
              <br />
              Click the Start button!
            </p>
          </div>
          <div className="mobileBtn">
            <Link to="/auth/login">
              <MDBBtn className="btn btnstart" data-text="Start">
                <span>Start</span>
              </MDBBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Second = () => (
  <div className="startSecond">
    <div className="container">
      <div className="row align-items-center">
        <div className="secondImg col-lg-5">
          <img src={secondImg} alt="second" />
        </div>
        <div className="startFirstContent offset-lg-1 col-lg-5">
          <div className="title">
            <h2 className="mb-4">
              Share Your Idea
              <br />
              On Hello Idea
            </h2>
          </div>
          <div className="secondCon">
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
          <div className="mobileBtn">
            <Link to="/auth/login">
              <MDBBtn className="btn btnstart" data-text="Start">
                <span>Start</span>
              </MDBBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Third = () => (
  <div className="startThird">
    <div className="container">
      <div className="row">
        <div className="startThirdContent col-lg-12">
          <div className="section-title text-center">
            <p>Our Services</p>
            <h3>
              <span>What We Offer</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="startService">
            <div className="d-flex align-items-center mb-3">
              <img src={icon_brain} alt="" />
              <h4 className="ml-3">Brain Storming</h4>
            </div>
            <p>
              You can freely record your ideas with brainstorming tools. It can
              be expressed in a variety of ways.
            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="startService">
            <div className="d-flex align-items-center mb-3">
              <img src={icon_save} alt="" />
              <h4 className="ml-3">Save Idea</h4>
            </div>
            <p>
              You can store your ideas in your personal repository. For group
              users, the group repository is granted also.
            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="startService">
            <div className="d-flex align-items-center mb-3">
              <img src={icon_recommend} alt="" />
              <h4 className="ml-3">Recommend Idea</h4>
            </div>
            <p>
              When you're writing an idea, <br />
              We automatically recommend ideas related to the ideas you are
              writing.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="startService">
            <div className="d-flex align-items-center mb-3">
              <img src={icon_share} alt="" />
              <h4 className="ml-3">Share Idea</h4>
            </div>
            <p>
              You can share your ideas with other users for help and advice.
              Follow users who have the same interests.
            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="startService">
            <div className="d-flex align-items-center mb-3">
              <img src={icon_together} alt="" />
              <h4 className="ml-3">Think Together</h4>
            </div>
            <p>
              Create groups of people with the same interests and share your
              views on the same topic.
            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="startService">
            <div className="d-flex align-items-center mb-3">
              <img src={icon_idea} alt="" />
              <h4 className="ml-3">Expand Idea</h4>
            </div>
            <p>
              Extend your ideas with these services we offer.Then do you want to
              start? Join Us!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Intro;
