import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import produce from 'immer';
import Footer from 'components/mindmap/Footer';
import * as mindmapActions from 'store/modules/mindmap';
import * as groupActions from 'store/modules/group';

class FooterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputMessage: '',
    };
  }

  componentDidMount() {
    const {
      history,
      loggedUserId,
      groupId,
      repositoryId,
      GroupActions,
      MindmapActions,
    } = this.props;

    GroupActions.peopleRequest(groupId).then(() => {
      const { people } = this.props;
      const isMember = people.findIndex(
        member => member.user_id === loggedUserId,
      );
      if (isMember < 0) history.replace('viewer');
    });
    GroupActions.connectToWebsocket(repositoryId);
    MindmapActions.connectToWebsocket(repositoryId, loggedUserId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { chat } = this.props;
    const chatRoom = document.querySelector('#chat-list');

    if (chat) chatRoom.scrollTop = chatRoom.scrollHeight;
  }

  componentWillUnmount() {
    const { GroupActions, MindmapActions } = this.props;
    GroupActions.wsClose();
    MindmapActions.wsClose();
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
    this.setState(
      produce(draft => {
        draft.inputMessage = '';
      }),
    );
  };

  render() {
    const { handleInputChange, handleMessageSubmit } = this;
    const { inputMessage } = this.state;
    const { chatList, loggedUserId, participants } = this.props;
    const { type, zoom, chat, toggleChat, handleCanvasZoom } = this.props;

    return (
      <Footer
        loggedUserId={loggedUserId}
        inputMessage={inputMessage}
        participants={participants}
        chatList={chatList}
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
  chatList: state.group.messages,
  participants: state.mindmap.participants,
});
const mapDispatchToProps = dispatch => ({
  MindmapActions: bindActionCreators(mindmapActions, dispatch),
  GroupActions: bindActionCreators(groupActions, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterContainer);
