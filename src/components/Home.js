import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./home.css";
import Body from "./Body";

function Home() {
	const [games, setGame] = useState([]);
	const [topics, setTopic] = useState([]);
	const [display, setDisplay] = useState(false);
	const [list, setList] = useState(true);
	const [value, setValue] = useState("");

	const getGameData = async () => {
		const url =
			"https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter";
		const response = await fetch(url);
		const result = await response.json();
		setGame(result);
	};

	const filter = (searchWord, games) => {
		return games.filter((game) => {
			const regex = new RegExp(searchWord, "gi");
			return (
				game.Group.match(regex) ||
				game.Level.match(regex) ||
				game.Topic.match(regex)
			);
		});
	};

	const displayMatch = (e) => {
		setValue(e.target.value);
		if (e.target.value === "") {
			setDisplay(false);
		} else {
            const matchSearch = filter(e.target.value, games);
            setTopic(matchSearch);
			setDisplay(true);
			setList(true);
		}
	};
	const displayTopic = (e) => {
		const matchSearch = filter(e.target.innerText, games);
		setTopic(matchSearch);
		setValue(e.target.innerText);
		setList(false);
    };
    const displayGroup = (e) => {
		const matchSearch = filter(e.target.value, games);
        setTopic(matchSearch);
        setList(false)
	};

	useEffect(() => {
		getGameData();
	});

	return (
		<div className="home">
			<h2>9ijakids Game List</h2>
			<div className="home-search">
				<div className="home-list">
					<div className="home-searchBar">
						<input
							type="search"
							onChange={displayMatch}
							className="search"
							placeholder="Search Games by Topic"
							value={value}
						/>
						<div className="home-searchBar--icon">
							<SearchIcon />
						</div>
					</div>
					{display ? (
						<ul className="topic-list">
							{topics.map((game) =>
								list ? <li onClick={displayTopic}>{game.Topic}</li> : " "
							)}
						</ul>
					) : (
						""
					)}
				</div>
				<div className="home-filter">
					<h3>Filter by:</h3>
					<select name="" onChange={displayGroup}>
						<option value="">Groups</option>
						<option value="Academic">Academic</option>
						<option value="Financial Literacy">Financial Literacy</option>
					</select>
					<select name="" onChange={displayGroup}>
						<option value="">Levels</option>
						<option value="key stage 1">Key Stage 1</option>
						<option value="key stage 2">Key Stage 2</option>
						<option value="Financial Literacy">Financial Literacy</option>
					</select>
				</div>
			</div>
			{display ? (
				<div className="body">
					{" "}
					{topics.map((topic) => (
						<Body
							title={topic.GameTitle}
							image={topic.GameImage}
							description={topic.GameDescription}
						/>
					))}
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default Home;
