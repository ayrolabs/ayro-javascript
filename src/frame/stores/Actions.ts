import {AnyAction} from 'redux';
import {AppStatus} from 'frame/enums/AppStatus';
import {UserStatus} from 'frame/enums/UserStatus';
import {Settings} from 'frame/models/Settings';
import {App} from 'frame/models/App';
import {Integration} from 'frame/models/Integration';
import {User} from 'frame/models/User';
import {Device} from 'frame/models/Device';
import {ChatMessage} from 'frame/models/ChatMessage';

export class Actions {

  public static readonly SHOW_BUTTON: string = 'SHOW_BUTTON';
  public static readonly HIDE_BUTTON: string = 'HIDE_BUTTON';
  public static readonly SHOW_CHAT: string = 'SHOW_CHAT';
  public static readonly HIDE_CHAT: string = 'HIDE_CHAT';

  public static readonly SET_APP_STATUS: string = 'SET_APP_STATUS';
  public static readonly SET_USER_STATUS: string = 'SET_USER_STATUS';
  public static readonly SET_SETTINGS: string = 'SET_SETTINGS';
  public static readonly SET_APP: string = 'SET_APP';
  public static readonly SET_INTEGRATION: string = 'SET_INTEGRATION';
  public static readonly SET_USER: string = 'SET_USER';
  public static readonly SET_DEVICE: string = 'SET_DEVICE';
  public static readonly SET_API_TOKEN: string = 'SET_API_TOKEN';
  public static readonly SET_CHAT_MESSAGES: string = 'SET_CHAT_MESSAGES';
  public static readonly ADD_CHAT_MESSAGE: string = 'ADD_CHAT_MESSAGE';
  public static readonly UPDATE_CHAT_MESSAGE: string = 'UPDATE_CHAT_MESSAGE';
  public static readonly REMOVE_CHAT_MESSAGE: string = 'REMOVE_CHAT_MESSAGE';
  public static readonly SET_LAST_UNREAD: string = 'SET_LAST_UNREAD';
  public static readonly UNSET_LAST_UNREAD: string = 'UNSET_LAST_UNREAD';

  public static showButton(): AnyAction {
    return {
      type: Actions.SHOW_BUTTON,
    };
  }

  public static hideButton(): AnyAction {
    return {
      type: Actions.HIDE_BUTTON,
    };
  }

  public static showChat(): AnyAction {
    return {
      type: Actions.SHOW_CHAT,
    };
  }

  public static hideChat(): AnyAction {
    return {
      type: Actions.HIDE_CHAT,
    };
  }

  public static setAppStatus(appStatus: AppStatus): AnyAction {
    return {
      type: Actions.SET_APP_STATUS,
      extraProps: {appStatus},
    };
  }

  public static setUserStatus(userStatus: UserStatus): AnyAction {
    return {
      type: Actions.SET_USER_STATUS,
      extraProps: {userStatus},
    };
  }

  public static setSettings(settings: Settings): AnyAction {
    return {
      type: Actions.SET_SETTINGS,
      extraProps: {settings},
    };
  }

  public static setApp(app: App): AnyAction {
    return {
      type: Actions.SET_APP,
      extraProps: {app},
    };
  }

  public static setIntegration(integration: Integration): AnyAction {
    return {
      type: Actions.SET_INTEGRATION,
      extraProps: {integration},
    };
  }

  public static setUser(user: User): AnyAction {
    return {
      type: Actions.SET_USER,
      extraProps: {user},
    };
  }

  public static setDevice(device: Device): AnyAction {
    return {
      type: Actions.SET_DEVICE,
      extraProps: {device},
    };
  }

  public static setApiToken(apiToken: string): AnyAction {
    return {
      type: Actions.SET_API_TOKEN,
      extraProps: {apiToken},
    };
  }

  public static setChatMessages(chatMessages: ChatMessage[]): AnyAction {
    return {
      type: Actions.SET_CHAT_MESSAGES,
      extraProps: {chatMessages},
    };
  }

  public static addChatMessage(chatMessage: ChatMessage): AnyAction {
    return {
      type: Actions.ADD_CHAT_MESSAGE,
      extraProps: {chatMessage},
    };
  }

  public static updateChatMessage(id: string, chatMessage: ChatMessage): AnyAction {
    return {
      type: Actions.UPDATE_CHAT_MESSAGE,
      extraProps: {id, chatMessage},
    };
  }

  public static removeChatMessage(chatMessage: ChatMessage): AnyAction {
    return {
      type: Actions.REMOVE_CHAT_MESSAGE,
      extraProps: {chatMessage},
    };
  }

  public static setLastUnread(chatMessage: ChatMessage): AnyAction {
    return {
      type: Actions.SET_LAST_UNREAD,
      extraProps: {chatMessage},
    };
  }

  public static unsetLastUnread(): AnyAction {
    return {
      type: Actions.UNSET_LAST_UNREAD,
    };
  }

  private constructor() {

  }
}
