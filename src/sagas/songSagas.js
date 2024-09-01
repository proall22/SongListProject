import { call, put, takeEvery } from "redux-saga/effects";
import {
	fetchSongsSuccess,
	fetchSongsFailure,
	addSongSuccess,
	updateSongSuccess,
	deleteSongSuccess,
} from "../features/songsSlice";
const API_URL = "https://my-json-server-w73f.onrender.com/api/songs";
function* fetchSongs() {
	try {
		const response = yield call(fetch, API_URL);
		const data = yield response.json();
		data.reverse();
		yield put(fetchSongsSuccess(data));
	} catch (error) {
		yield put(fetchSongsFailure(error.toString()));
	}
}

function* addSong(action) {
	const { newSong } = action.payload;
	const response = yield call(fetch, API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newSong),
	});
	const data = yield response.json();
	yield put(addSongSuccess(data));
}

function* updateSong(action) {
	const { updatedSong } = action.payload;
	yield call(fetch, `${API_URL}${updatedSong.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedSong),
	});
	yield put(updateSongSuccess(updatedSong));
}

function* deleteSong(action) {
	const { songId } = action.payload;
	yield call(fetch, `${API_URL}${songId}`, {
		method: "DELETE",
	});
	yield put(deleteSongSuccess(songId));
}

export function* watchFetchSongs() {
	yield takeEvery("songs/fetchSongsRequest", fetchSongs);
	yield takeEvery("songs/addSongRequest", addSong);
	yield takeEvery("songs/updateSongRequest", updateSong);
	yield takeEvery("songs/deleteSongRequest", deleteSong);
}
