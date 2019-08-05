/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MDBBtn } from 'mdbreact';
import { ChromePicker } from 'react-color';
import Cropper from 'react-easy-crop';
import styles from './Modify.module.scss';

const Modify = ({
  cropper,
  modify,
  displayColorPicker,
  onCropChange,
  onCropComplete,
  onZoomChange,
  showCroppedImage,
  handleChange,
  handleClick,
  handleClose,
  handleUpdate,
}) => {
  return (
    <div className={styles.modify}>
      <Profile
        cropper={cropper}
        modify={modify}
        displayColorPicker={displayColorPicker}
        handleChange={handleChange}
        handleClick={handleClick}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
        showCroppedImage={showCroppedImage}
      />
      <Account />
    </div>
  );
};

const Profile = ({
  cropper,
  modify,
  displayColorPicker,
  handleChange,
  handleClick,
  handleClose,
  handleUpdate,
  onCropChange,
  onCropComplete,
  onZoomChange,
  showCroppedImage,
}) => (
  <div className={styles.section}>
    <div className={styles.title}>Public profille</div>
    <hr />
    <div className={styles.paragraphWrapper}>
      <div className={styles.paragraph}>
        <div className={styles.item}>
          <label>
            <div>Name</div>
            <input
              type="text"
              name="name"
              value={modify.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.item}>
          <label>
            <div>bio</div>
            <textarea
              type="text"
              name="bio"
              value={modify.bio}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.item}>
          <div>Profile header color</div>
          <MDBBtn onClick={handleClick}>Pick Color</MDBBtn>
          {displayColorPicker && (
            <ColorPickerWrapper handleClose={handleClose}>
              <ChromePicker
                color={modify.bgColor}
                onChangeComplete={handleChange}
              />
            </ColorPickerWrapper>
          )}
        </div>
      </div>
      <div className={styles.paragraph}>
        <div className={styles.item}>
          <FileInput
            label="Profile picture"
            name="imgSrc"
            handleChange={handleChange}
          />
          {cropper.imgSrc && (
            <CropperWrapper
              showCroppedImage={showCroppedImage}
              cropper={cropper}
              handleChange={handleChange}
            >
              <Cropper
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '225px',
                    position: 'relative',
                  },
                }}
                image={cropper.imgSrc}
                crop={cropper.crop}
                zoom={cropper.zoom}
                aspect={cropper.aspect}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
              />
            </CropperWrapper>
          )}
        </div>
      </div>
    </div>
    <div className={styles.submit}>
      <MDBBtn onClick={handleUpdate}>update profile</MDBBtn>
    </div>
  </div>
);

const Account = () => (
  <>
    <div className={styles.section}>
      <div className={styles.title}>Change password</div>
      <hr />
      <div className={styles.item}>
        <label>
          <div>Old Password</div>
          <input type="password" />
        </label>
      </div>

      <div className={styles.item}>
        <label>
          <div>New Password</div>
          <input type="password" />
        </label>
      </div>

      <div className={styles.item}>
        <label>
          <div>Confirm New Password</div>
          <input type="password" />
        </label>
      </div>
      <div className={styles.submit}>
        <MDBBtn>Update password</MDBBtn>
      </div>
    </div>
    <div className={styles.section}>
      <div className={`${styles.title} ${styles.caution}`}>Delete Account</div>
      <hr />
      <MDBBtn className={styles.caution}>Delete Your Account</MDBBtn>
    </div>
  </>
);

const FileInput = ({ label, name, handleChange }) => (
  <label style={{ width: '100%' }}>
    <div>{label}</div>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroupFileAddon01">
          Upload
        </span>
      </div>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="inputGroupFile01"
          aria-describedby="inputGroupFileAddon01"
          name={name}
          onChange={handleChange}
        />
        <label className="custom-file-label" htmlFor="inputGroupFile01">
          Choose file
        </label>
      </div>
    </div>
  </label>
);

const ColorPickerWrapper = ({ handleClose, children }) => (
  <div className={styles.colorPicker}>
    <div className={styles.cover} onClick={handleClose} />
    {children}
  </div>
);

const CropperWrapper = ({
  showCroppedImage,
  cropper,
  handleChange,
  children,
}) => (
  <div className={styles.cropper}>
    {children}
    <div className={styles.controls}>
      <input
        type="range"
        className="custom-range"
        id="customRange1"
        min={1.0}
        max={3.0}
        step={0.5}
        name="range"
        onChange={handleChange}
        value={cropper.zoom}
      />
      <MDBBtn color="primary" onClick={showCroppedImage}>
        SET IMG
      </MDBBtn>
    </div>
  </div>
);

export default Modify;
