import {createAction, props} from '@ngrx/store';

export const SetToken = createAction('[Users] SetToken', props<{ token: string }>());
export const SetApiKey = createAction('[Users] SetApiKey', props<{ apiKey: string }>());
export const ResetToken = createAction('[Users] ResetToken');
