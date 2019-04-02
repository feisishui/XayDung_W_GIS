import EAction from './main.action-rule';
import { LoadingActionType, AlertActionType } from './main.action-types';
import MSG from '../../constants/MSG';
export * from './user/user.action';

export const loading = {
  loadingReady, loadingFinish,
  loadingPage
};

function loadingReady(): EAction {
  return { type: LoadingActionType.LOAD }
};
function loadingFinish(): EAction {
  return { type: LoadingActionType.ENDLOAD }
};
function loadingPage(isShow: boolean): EAction {
  if (isShow) {
    return { type: LoadingActionType.LOADINGPAGE_DISPLAY };
  } else {
    return { type: LoadingActionType.LOADINGPAGE_HIDE };
  }
};

export const alertActions = {
  success,
  error,
  clear,
  info
};

function success(message?: string): EAction {
  return {
    type: AlertActionType.SUCCESS, message: message || MSG.THANH_CONG
  };
}

function error(message?: string): EAction {
  return {
    type: AlertActionType.ERROR, message: message || MSG.THAT_BAI
  };
}

function clear(): EAction {
  return { type: AlertActionType.CLEAR };
}

function info(message?: string): EAction {
  return { type: AlertActionType.INFO, message: message || '' };
}