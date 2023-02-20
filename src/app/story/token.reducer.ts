import { createReducer, on } from '@ngrx/store';
import {ResetToken, SetApiKey, SetToken} from "./actions";

const initialState = {
  token: '',
  apiKey: '',
};

export const tokenReducer = createReducer(
  initialState,
  on(SetToken,  (state, {token}) => ({...state, token: token})),
  on(SetApiKey,  (state, {apiKey}) => ({...state, apiKey: apiKey})),
  on(ResetToken, () => initialState)
);

