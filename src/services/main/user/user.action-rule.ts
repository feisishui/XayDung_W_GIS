import { AuthActionType } from "../main.action-types";
import {User, UserResponse } from "./user.model";
type Action =
  { type: AuthActionType.LOGOUT }
  | { type: AuthActionType.LOGIN_SUCCESS, user: UserResponse }
  | { type: AuthActionType.LOGIN_REQUEST, user: User }
  | { type: AuthActionType.LOGIN_FAILURE, error: string }

export default Action;