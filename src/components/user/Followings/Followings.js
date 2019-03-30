import React from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './Followings.module.scss';

const Followings = ({
  user,
  url,
  Overview,
  Repositories,
  Followers,
  children,
}) => {
  return (
    <>
      <div className={styles.userHeader}>
        <Link to="/Modify">
          <button type="button" className="btn btn-primary">
            EDIT
          </button>
        </Link>

        <div className={styles.userProfileImg}>img</div>
        <div className={styles.userProfileName}>
          <Link to="*/">
            <h5>UserName</h5>
          </Link>
        </div>
        <div className={styles.userDescription}>userDescription</div>
        <div className={styles.backgroundImg}>img</div>
      </div>

      <div className={styles.myPageAll}>
        {/* Choose one */}
        <div className={styles.myPageChoose}>
          <div className={styles.MyPageOverview}>
            <Link to={`${url}/Overview`}>Overview</Link>
          </div>
          <div className={styles.MyPageRepositories}>
            <Link to={`${url}/Repositories`}>Repositories</Link>
          </div>
          <div className={styles.MyPageFollowers}>
            <Link to={`${url}/Followers`}>Followers</Link>
          </div>
          <div className={styles.MyPageFollowing}>
            <Link to={`${url}/Followings`}>Followings</Link>
          </div>
        </div>

        <Route path={`${url}`} exact component={Overview} />
        <Route path={`${url}/Repositories`} component={Repositories} />
        <Route path={`${url}/Followers`} component={Followers} />
        <Route path={`${url}/Followings`} component={Followings} />
      </div>
    </>
  );
};

export default Followings;
