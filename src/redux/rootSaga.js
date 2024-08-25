import { all } from "redux-saga/effects";
import { watchFetchSongs } from "../sagas/songSagas";

export default function* rootSaga() {
	yield all([watchFetchSongs()]);
}
