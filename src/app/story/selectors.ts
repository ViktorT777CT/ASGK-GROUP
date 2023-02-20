import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectToken = createFeatureSelector('token');

export const selectTokenValue = createSelector(
  selectToken,
  (token) => {
    // @ts-ignore
    return token.token;
  }
);

export const selectTokenApiKey = createSelector(
  selectToken,
  (token) => {
    // @ts-ignore
    return token.apiKey;
  }
);
