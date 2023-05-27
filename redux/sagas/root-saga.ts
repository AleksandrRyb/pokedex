import { all } from 'redux-saga/effects';

export function* rootSaga() {
  try {
    yield all([]);
  } catch (error) {
    console.log(`Redux related error: ${error}`);
  }
}
