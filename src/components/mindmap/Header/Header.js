/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuList,
  DropdownTrigger,
  DropdownWrapper,
} from 'components/base/Dropdown/Dropdown';
import {
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import { convertToImage } from 'tools/ImgConverter';
import styles from './Header.module.scss';

const Header = ({ repository, exportMindmap }) => {
  return (
    <div className={styles.brainHeader}>
      <div className={styles.brainLeftHeader}>
        <div className={styles.brainLogo}>
          <Link to="/*">
            <img
              src="https://s3.ap-northeast-2.amazonaws.com/static.hello-idea.com/icons/global/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className={styles.projectName}>ProjectName</div>
        <div className={styles.groupName}>GroupName</div>
      </div>
      <div className={styles.brainRightHeader}>
        <MDBDropdown>
          <MDBDropdownToggle color="primary">
            <div
              onClick={() => {
                convertToImage('#canvas', '#PNG', '#JPEG');
              }}
            >
              <MDBIcon icon="file-download" className="mr-3" />
              다운로드
            </div>
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem header>파일 형식</MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem>
              <a id="PNG" href="" download="테스트.png">
                <MDBIcon far icon="file-image" className="mr-3" />
                PNG
              </a>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <a id="JPEG" href="" download="테스트.png">
                <MDBIcon far icon="file-image" className="mr-3" />
                JPEG
              </a>
            </MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem>
              <div>
                <MDBIcon far icon="file-pdf" className="mr-3" />
                PDF
              </div>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    </div>
  );
};

export default Header;
