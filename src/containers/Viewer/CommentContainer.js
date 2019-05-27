import React, { Component } from 'react';
import axios from 'axios';
import produce from 'immer';
import { connect } from 'react-redux';
import Comment from 'components/mindmap/Comment';

class CommentContainer extends Component {
  constructor(props) {
    super(props);
    const { target } = props;

    this.state = {
      target,
      comment: '',
    };
  }

  handleChange = e => {
    e.persist();

    this.setState(
      produce(draft => {
        draft.comment = e.target.value;
      }),
    );
  };

  handleSubmit = () => {
    const { loggedUserId, toggleComment } = this.props;
    const { target, comment } = this.state;

    axios
      .post('/api/idea/feedback/create/', {
        idea_id: target.id,
        user_id: loggedUserId,
        feedback: comment,
      })
      .then(() => {
        toggleComment();
      });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { repositoryInfo, nodeList, toggleComment } = this.props;
    const { target, comment } = this.state;
    return (
      <Comment
        comment={comment}
        target={target}
        repositoryInfo={repositoryInfo}
        toggleComment={toggleComment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedUserId: state.auth.userInfo.user_id,
  repositoryInfo: state.repository.info,
  nodeList: state.mindmap.nodes,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentContainer);
