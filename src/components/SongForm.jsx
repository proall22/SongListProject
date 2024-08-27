/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSongRequest, updateSongRequest } from "../features/songsSlice";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { space, layout, color, typography } from "styled-system";

const SongForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { list } = useSelector((state) => state.songs);

	// Find existing song if editing
	const existingSong = list.find((song) => song.id === id);
	const [title, setTitle] = useState(existingSong ? existingSong.title : "");
	const [album, setAlbum] = useState(existingSong ? existingSong.album : "");
	const [genre, setGenre] = useState(existingSong ? existingSong.genre : "");
	const [release_date, setReleaseDate] = useState(
		existingSong ? existingSong.release_date : ""
	);
	const [duration, setDuration] = useState(
		existingSong ? existingSong.duration : ""
	);
	const [language, setLanguage] = useState(
		existingSong ? existingSong.language : ""
	);
	const [mood, setMood] = useState(existingSong ? existingSong.mood : "");
	const [artist, setArtist] = useState(existingSong ? existingSong.artist : "");
	const [track_number, setTrackNumber] = useState(
		existingSong ? existingSong.track_number : ""
	);
	const [popularity, setPopularity] = useState(
		existingSong ? existingSong.popularity : ""
	);
	const [description, setDescription] = useState(
		existingSong ? existingSong.description : ""
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const date = new Date().toISOString();
		if (existingSong) {
			dispatch(
				updateSongRequest({
					updatedSong: {
						id: id,
						title,
						artist,
						album,
						genre,
						release_date,
						duration,
						description,
						track_number,
						popularity,
						language,
						mood,
						date_added: date,
					},
				})
			);
		} else {
			dispatch(
				addSongRequest({
					newSong: {
						title,
						artist,
						album,
						genre,
						release_date,
						duration,
						description,
						track_number,
						popularity,
						language,
						mood,
						date_added: date,
					},
				})
			);
		}
		navigate("/");
	};

	return (
		<FormContainer onSubmit={handleSubmit}>
			<FormTitle>{existingSong ? "Edit Song" : "Add Song"}</FormTitle>
			<Input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Artist"
				value={artist}
				onChange={(e) => setArtist(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Album"
				value={album}
				onChange={(e) => setAlbum(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="genre"
				value={genre}
				onChange={(e) => setGenre(e.target.value)}
				required
			/>
			<Input
				type="date"
				placeholder="Release Date"
				value={release_date}
				onChange={(e) => setReleaseDate(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Duration"
				value={duration}
				onChange={(e) => setDuration(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Input
				type="number"
				placeholder="Track Number"
				value={track_number}
				onChange={(e) => setTrackNumber(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Popularity"
				value={popularity}
				onChange={(e) => setPopularity(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Language"
				value={language}
				onChange={(e) => setLanguage(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Mood"
				value={mood}
				onChange={(e) => setMood(e.target.value)}
				required
			/>
			<SubmitButton type="submit">
				{existingSong ? "Update" : "Add"} Song
			</SubmitButton>
		</FormContainer>
	);
};

const FormContainer = styled.form`
	${layout}
	${space}
  ${color}
  display: flex;
	flex-direction: column;
	gap: ${(props) => props.theme.space[3]}px;
	padding: ${(props) => props.theme.space[4]}px;
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radii.medium};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
	${typography}
	font-size: ${(props) => props.theme.fontSizes.large};
	color: ${(props) => props.theme.colors.dark};
`;

const Input = styled.input`
	${space}
	${layout}
  padding: ${(props) => props.theme.space[2]}px;
	border: 1px solid ${(props) => props.theme.colors.light};
	border-radius: ${(props) => props.theme.radii.small};
`;

const SubmitButton = styled.button`
	${space}
	${layout}
  ${color}
  padding: ${(props) => props.theme.space[2]}px ${(props) =>
		props.theme.space[3]}px;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.white};
	border: none;
	border-radius: ${(props) => props.theme.radii.small};
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.colors.dark};
	}
`;

export default SongForm;
