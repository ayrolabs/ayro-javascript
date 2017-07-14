import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import Actions from '../stores/Actions';
import Classes from '../utils/Classes';
import ChatzService from '../services/ChatzService';

import Settings from '../models/Settings';
import ChatMessage from '../models/ChatMessage';

import Conversation from './Conversation';

interface IProperties {
  settings: Settings;
  chatOpened: boolean;
  closeChat: () => void;
  addChatMessage: (message: ChatMessage) => void;
  updateChatMessage: (id: string, message: ChatMessage) => void;
}

interface IState {
  message: string;
}

class Chatbox extends React.Component<IProperties, IState> {

  constructor(props: IProperties) {
    super(props);
    this.state = {message: ''};
    this.closeChat = this.closeChat.bind(this);
    this.onMessageChanged = this.onMessageChanged.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  public render() {
    return (
      <div className={this.chatboxClasses()}>
        <div className="chatz-header" onClick={this.closeChat}>
          {this.props.settings.chatbox.title}
          <div className="chatz-close">
            <i className="fa fa-times"/>
          </div>
        </div>
        <Conversation/>
        <div className="chatz-footer">
          <div className="chatz-input">
            <input type="text" name="message" placeholder={this.props.settings.chatbox.message_placeholder} value={this.state.message} onChange={this.onMessageChanged}/>
          </div>
          <div className="chatz-send" onClick={this.postMessage}>
            <i className="fa fa-paper-plane"/>
          </div>
        </div>
      </div>
    );
  }

  private closeChat() {
    this.props.closeChat();
  }

  private onMessageChanged(event: any) {
    this.setState({message: event.target.value});
  }

  private postMessage() {
    if (this.state.message.length > 0) {
      const now = new Date();
      const chatMessage = new ChatMessage({
        id: String(now.getTime()),
        direction: ChatMessage.DIRECTION_OUTGOING,
        status: ChatMessage.STATUS_SENDING,
        text: this.state.message,
        date: now,
      });
      this.props.addChatMessage(chatMessage);
      ChatzService.postMessage(chatMessage.text).then((postedMessage: ChatMessage) => {
        this.props.updateChatMessage(chatMessage.id, postedMessage);
        this.setState({message: ''});
      });
    }
  }

  private chatboxClasses(): string {
    return Classes.get({
      'chatz-chatbox': true,
      'chatz-show': this.props.chatOpened,
      'chatz-hide': !this.props.chatOpened,
    });
  }
}

function mapStateToProps(state: any): any {
  return {
    settings: state.settings,
    chatOpened: state.chatOpened,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    closeChat: () => {
      dispatch(Actions.closeChat());
    },
    addChatMessage: (chatMessage: ChatMessage) => {
      dispatch(Actions.addChatMessage(chatMessage));
    },
    updateChatMessage: (id: string, chatMessage: ChatMessage) => {
      dispatch(Actions.updateChatMessage(id, chatMessage));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
