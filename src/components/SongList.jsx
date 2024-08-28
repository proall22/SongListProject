/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongsRequest, deleteSongRequest } from "../features/songsSlice";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { space, layout, color, typography, buttonStyle } from "styled-system";
import guitarMusic from "/music.jpg";
import { getRelativeTime } from "../utils/timeutils";

const SongList = () => {
	const [showAll, setShowAll] = useState(false);
	const dispatch = useDispatch();
	const { list, loading, error } = useSelector((state) => state.songs);
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
	if (error)
		return (
			<ErrorContainer>
				<h1>Sorry, Try Again Later</h1>
				<p>Error: {error}</p>
			</ErrorContainer>
		);

	return (
		<Container>
			<ImageContainer>
				<HeaderContainer className="heading">
					<Heading>Song List</Heading>
				</HeaderContainer>
				<div className="imageContainer">
					<img src={guitarMusic} className="logo guitar" alt="guitar Image" />
				</div>
			</ImageContainer>
			<SongListContainer>
				<StyledLink to="/add">Add New Song</StyledLink>
				<ListContainer>
					{list.slice(0, showAll ? list.length : 5).map((song) => (
						<SongItem key={song.id} css={songStyle}>
							<Lists>
								<SongTitle>
									{song.title} by {song.artist}
								</SongTitle>
								<p>Artist: {song.artist}</p>
								<p>Album: {song.album}</p>
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
										<p>
											Date Added: {new Date(song.date_added).toLocaleString()}
										</p>
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
	grid-template-columns: 2fr 2fr;
	grid-template-rows: auto;
	grid-gap: 10px;
	padding: 10px;
	margin: 5px;
	justify-items: center;
	@media (max-width: 600px) {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 20px;
	}
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
	background-color: #fff4f4;
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
		padding: 0;
		margin: 0;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	.logo {
		height: 6em;
		will-change: filter;
		transition: filter 300ms;
		border-radius: 30px;
		cursor: pointer;
	}

	.logo.guitar {
		width: 100px;
		border-radius: 50%;
	}
	.logo.guitar:hover {
		filter: drop-shadow(0 0 2em #62eafbaa);
	}
`;
const HeaderContainer = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	text-align: center;
	margin: auto;
`;
const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #c71a1acb;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Heading = styled.h1`
	${typography}
	color: ${(props) => props.theme.colors.dark};
	cursor: pointer;
	&:hover {
		filter: drop-shadow(0 0 2em #ffea3e);
		text-shadow: 0 1px 1px #aeaa3e;
	}
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
	text-align: center;
`;

const Actions = styled.div`
	${space}
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
@media (max-width: 600px) {
	display:inline-block;
}
`;
const TimeDisplayActual = styled.div`
	position: relative;
	top: 0px;
	left: 10%;
`;

const StyledLink = styled(Link)`
	${layout}
	${color}
  ${space}
  border: none;
	text-decoration: none;
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
