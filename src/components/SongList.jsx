/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongsRequest, deleteSongRequest } from "../features/songsSlice";
import { Link } from "react-router-dom";
// import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { space, layout, color, typography } from "styled-system";
import guitarImage from "/musicGuitar.jpg";
import guitarMusic from "/music.jpg";

const SongList = () => {
	const dispatch = useDispatch();
	const { list, loading, error } = useSelector((state) => state.songs);
	const [showMoreSong, setShowMoreSong] = useState(true);
	const recentSongs = list.slice(0, 3);
	const [showLess, setShowMore] = useState(list.slice(0, 3));
	const showLessMore = () => {
		setShowMoreSong(!showMoreSong);
		showMoreSong ? setShowMore(list) : setShowMore(recentSongs);
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
			<Heading>Songs</Heading>
			<SongListContainer>
				{showLess.map((song) => (
					<SongItem key={song.id}>
						<SongTitle>
							{song.title} by {song.artist}
						</SongTitle>
						<Actions>
							<StyledLink to={`/edit/${song.id}`}>Edit</StyledLink>
							<DeleteButton onClick={() => handleDelete(song.id)}>
								Delete
							</DeleteButton>
						</Actions>
					</SongItem>
				))}
			</SongListContainer>
			<section>
				<LinkSection>
					<StyledLink to="/add">Add New Song</StyledLink>

					<StyledLink>
						<div onClick={showLessMore}>Show All Songs</div>
					</StyledLink>
				</LinkSection>
			</section>
		</Container>
	);
};

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
		align-items: center;
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
	padding: 20px;
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
`;

const SongItem = styled.li`
	${layout}
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${(props) => props.theme.space[2]}px;
	background-color: ${(props) => props.theme.colors.white};
	border: 1px solid ${(props) => props.theme.colors.light};
	border-radius: ${(props) => props.theme.radii.small};
	margin-bottom: ${(props) => props.theme.space[2]}px;
`;

const SongTitle = styled.span`
	${typography}
	font-size: ${(props) => props.theme.fontSizes.medium};
	color: ${(props) => props.theme.colors.dark};
`;

const Actions = styled.div`
	display: flex;
	gap: ${(props) => props.theme.space[2]}px;
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
