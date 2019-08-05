/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-multi-assign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mindmapActions from 'store/modules/mindmap';
import Aside from 'components/mindmap/Aside';

class AsideContainer extends Component {
  handleDragStart = e => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.dropEffect = 'move';
    e.target.style.opacity = '1';
  };

  handleDragEnd = e => {
    e.target.style.opacity = '1';
  };

  render() {
    const { handleDragStart, handleDragEnd } = this;
    const { explore, file, info, uploadFile } = this.props;

    if (explore)
      return (
        <Aside
          type="explore"
          state={explore.state}
          results={explore.results}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      );
    if (file)
      return (
        <Aside
          type="file"
          uploadFile={uploadFile}
          state={file.state}
          data={file.targetNode}
          list={file.list}
        />
      );
    return <Aside type="info" state={info.state} data={info.data} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AsideContainer);
