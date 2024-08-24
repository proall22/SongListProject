/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongsRequest, deleteSongRequest } from "../features/songsSlice";
import { Link, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { space, layout, color, typography, buttonStyle } from "styled-system";
import guitarImage from "/musicGuitar.jpg";
import guitarMusic from "/music.jpg";
import { getRelativeTime } from "../utils/timeutils";

const SongList = () => {
	const [showAll, setShowAll] = useState(false);
	const dispatch = useDispatch();
	const { list, loading, error } = useSelector((state) => state.songs);
	const { id } = useParams();
	const existingSong = list.find((song) => song.id === id);
	const handleToggle = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		dispatch(fetchSongsRequest());
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteSongRequest({ songId: id }));
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<Container>
			<ImageContainer>
				<div className="imageContainer">
					<img src={guitarImage} className="logo" alt="guitar Image" />
					<img src={guitarMusic} className="logo guitar" alt="guitar Image" />
				</div>
			</ImageContainer>
			<SongListContainer>
				<Heading>Song List</Heading>
				<StyledLink to="/add">Add New Song</StyledLink>
				<ListContainer>
					{list.slice(0, showAll ? list.length : 5).map((song) => (
						<SongItem key={song.id} css={songStyle}>
							<Lists>
								<SongTitle>
									{song.title} by {song.artist}
								</SongTitle>
								<p>Artist: {song.album}</p>
								<p>Album: {song.artist}</p>
								<p>Genre: {song.genre}</p>
								<p>
									Release Date:{" "}
									{new Date(song.release_date).toLocaleDateString()}
								</p>
								<p>Duration: {song.duration}</p>
								<p>Description: {song.description}</p>
								<p>Track Number: {song.track_number}</p>
								<p>Popularity: {song.popularity}</p>
								<p>Language: {song.language}</p>
								<p>Mood: {song.mood}</p>
								<TimeDisplay>
									<span>
										{existingSong
											? "Date Updated:"(
													new Date(song.date_updated).toLocaleString()
											  )
											: "Dated Added:"}
										{new Date(song.date_added).toLocaleString()}
									</span>
									<TimeDisplayActual>
										<p> {getRelativeTime(song.date_added)}</p>
									</TimeDisplayActual>
								</TimeDisplay>
							</Lists>
							<Actions>
								<StyledLink to={`/edit/${song.id}`}>Edit</StyledLink>
								<DeleteButton
									onClick={() => handleDelete(song.id)}
									css={buttonStyle}
								>
									Delete
								</DeleteButton>
							</Actions>
						</SongItem>
					))}
				</ListContainer>
			</SongListContainer>
			<section>
				<LinkSection>
					<ToggleButton onClick={handleToggle}>
						{showAll ? "Show Less" : "Show All"}
					</ToggleButton>
					<StyledLink to="/add">Add New Song</StyledLink>
				</LinkSection>
			</section>
		</Container>
	);
};

const ListContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 10px;
	margin-top: 20px;
`;
const Lists = styled.div`
	padding: 30px;
`;

const ToggleButton = styled.button`
	margin: 20px;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background-color: #007bff;
	color: white;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`;

const songStyle = css`
	background-color: #f4f4f4;
	margin: 10px;
	padding: 15px;
	border-radius: 10px;
	width: 100%;
	max-width: 600px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transition: transform 0.3s;
	&:hover {
		transform: translateY(-5px);
	}
	@media (max-width: 600px) {
		max-width: 100%;
		margin: 5px;
		padding: 10px;
	}
`;

const ImageContainer = styled.div`
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
		border-radius: 30px;
	}
	.imageContainer {
		display: flex;
		justify-content: space-between;
	}
	.logo.guitar {
		width: 100px;
		border-radius: 50%;
	}
	.logo.guitar:hover {
		filter: drop-shadow(0 0 2em #61dafbaa);
	}

	@keyframes logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.colors.background};
`;

const Heading = styled.h1`
	${typography}
	color: ${(props) => props.theme.colors.dark};
`;

const SongListContainer = styled.ul`
	${space}
	list-style-type: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SongItem = styled.li`
	${layout}
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: ${(props) => props.theme.space[2]}px;
	background-color: ${(props) => props.theme.colors.white};
	border: 1px solid ${(props) => props.theme.colors.light};
	border-radius: ${(props) => props.theme.radii.small};
	margin-bottom: ${(props) => props.theme.space[2]}px;
`;

const SongTitle = styled.h1`
	${typography}
	font-size: ${(props) => props.theme.fontSizes.medium};
	color: ${(props) => props.theme.colors.dark};
`;

const Actions = styled.div`
	display: flex;
	gap: ${(props) => props.theme.space[2]}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const TimeDisplay = styled.span`
display: flex;
align:items: center;
justify:content: space-between;
position: relative;
`;
const TimeDisplayActual = styled.div`
	position: relative;
	top: 10px;
	left: 20%;
`;

const StyledLink = styled(Link)`
	${typography}
	color: ${(props) => props.theme.colors.primary};
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;
const LinkSection = styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const DeleteButton = styled.button`
	${layout}
	${color}
  ${space}
  border: none;
	background-color: ${(props) => props.theme.colors.secondary};
	color: ${(props) => props.theme.colors.white};
	padding: ${(props) => props.theme.space[2]}px
		${(props) => props.theme.space[3]}px;
	border-radius: ${(props) => props.theme.radii.small};
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.colors.dark};
	}
`;

export default SongList;
