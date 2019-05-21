import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import produce from 'immer';
import Footer from 'components/mindmap/Footer';
import * as groupActions from 'store/modules/group';

class FooterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputMessage: '',
    };
  }

  componentDidMount() {
    const { groupId, repositoryId, GroupActions } = this.props;
    GroupActions.peopleRequest(groupId);
    GroupActions.connectToWebsocket(repositoryId);
  }

  handleInputChange = e => {
    e.persist();
    this.setState(
      produce(draft => {
        draft.inputMessage = e.target.value;
      }),
    );
  };

  handleMessageSubmit = e => {
    const { inputMessage } = this.state;
    const { loggedUserId, GroupActions } = this.props;

    GroupActions.wsSend({
      user_id: loggedUserId,
      message: inputMessage,
    });
  };

  render() {
    const { handleInputChange, handleMessageSubmit } = this;
    const { inputMessage } = this.state;
    const { people } = this.props;
    const { type, zoom, chat, toggleChat, handleCanvasZoom } = this.props;

    return (
      <Footer
        inputMessage={inputMessage}
        people={people}
        type={type}
        zoom={zoom}
        chat={chat}
        toggleChat={toggleChat}
        handleCanvasZoom={handleCanvasZoom}
        handleInputChange={handleInputChange}
        handleMessageSubmit={handleMessageSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedUserId: state.auth.userInfo.user_id,
  people: state.group.people,
});
const mapDispatchToProps = dispatch => ({
  GroupActions: bindActionCreators(groupActions, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterContainer);
