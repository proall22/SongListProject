import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
	name: "songs",
	initialState: {
		list: [],
		loading: false,
		error: null,
	},
	reducers: {
		fetchSongsRequest: (state) => {
			state.loading = true;
		},
		fetchSongsSuccess: (state, action) => {
			state.list = action.payload;
			state.loading = false;
		},
		fetchSongsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		addSongRequest: (state) => {
			state.loading = true;
		},
		addSongSuccess: (state, action) => {
			state.list.unshift(action.payload);
		},
		addSongFailure: (state, action) => {
			state.error = action.payload;
		},
		updateSongRequest: (state) => {
			state.loading = true;
		},
		updateSongSuccess: (state, action) => {
			const index = state.list.findIndex(
				(song) => song.id === action.payload.id
			);
			if (index !== -1) {
				state.list[index] = action.payload;
			}
		},
		updateSongFailure: (state, action) => {
			state.error = action.payload;
		},
		deleteSongRequest: (state) => {
			state.loading = false;
		},
		deleteSongSuccess: (state, action) => {
			state.list = state.list.filter((song) => song.id !== action.payload);
		},
		deleteSongFailure: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	fetchSongsRequest,
	fetchSongsSuccess,
	fetchSongsFailure,
	addSongRequest,
	addSongSuccess,
	addSongFailure,
	updateSongRequest,
	updateSongSuccess,
	updateSongFailure,
	deleteSongRequest,
	deleteSongSuccess,
	deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
