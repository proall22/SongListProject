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
	const [artist, setArtist] = useState(existingSong ? existingSong.artist : "");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (existingSong) {
			dispatch(updateSongRequest({ updatedSong: { id: id, title, artist } }));
		} else {
			dispatch(addSongRequest({ newSong: { title, artist } }));
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
