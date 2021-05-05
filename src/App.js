import './App.css';
import Button from './components/Button';
import SlapButton from './components/SlapButton';
import Deck from './classes/Deck';
import { useState, useEffect } from 'react';
import PlaceButton from './components/PlaceButton';



function App() {
	const [value, setValue] = useState(0); //for force rerendering

	const [gameDeck, setGameDeck] = useState(new Deck([]));
	console.log("-------------------------------------------")
	console.log("game deck: ", gameDeck);
	const [firstPlayersCards, setFirstPlayersCards] = useState(new Deck([]));
	console.log("fpc: ", firstPlayersCards);
	const [secondPlayersCards, setSecondPlayersCards] = useState(new Deck([]));
	console.log("spc: ", secondPlayersCards);

	const [start, setStart] = useState(false);
	const [p1Slap, setP1Slap] = useState(true);
	const [p2Slap, setP2Slap] = useState(true);

	const [p1Turn, setP1Turn] = useState(true);

	const [numPlaceP1, setNumPlaceP1] = useState(0);
	const [numPlaceP2, setNumPlaceP2] = useState(0);

	const [faceCard, setFaceCard] = useState(' ');


	useEffect(() => {

	});

	return (
		<div>
			<div className="Buttons">
				<Button onClick={() => {
					var originalDeck = new Deck(Deck.createOriginalDeck());
					originalDeck.shuffle();
					console.log("original deck: ", originalDeck);
					var firstPlayersCards = [];
					var secondPlayersCards = [];
					for (var i = 0; i < 52; i++) {
						var card = originalDeck.cards[i];
						if (i % 2 == 1) {
							firstPlayersCards.push(card);
						}
						else {
							secondPlayersCards.push(card);
						}
					}
					setFirstPlayersCards(new Deck(firstPlayersCards));
					setSecondPlayersCards(new Deck(secondPlayersCards));
					setStart(true);
				}} text='Start' isDisabled={start} />
			</div>

			{ start && <div className="text">
				Player {p1Turn ? '1\'s' : '2\'s'} turn
			</div>}

			{!(faceCard === ' ') ? <div className="text">
				Player {p1Turn ? '1' : '2'} must place down {(faceCard === 'J') ? '1' : (faceCard === 'Q') ? '2' :
					(faceCard === 'K') ? '3' : (faceCard === 'A') ? '4' : null}
				{faceCard === 'Q' || faceCard === 'K' || faceCard === 'A' ? ' cards' : ' card'}
			</div> : null}

			<div className="Buttons">

				<Button id="placeP1" onClick={() => {
					if (firstPlayersCards.cards.length === 0) {
						console.log('player 2 wins');
						return
					}

					var card = firstPlayersCards.cards.splice(-1, 1)[0];
					if (card.Value === "J") {
						setFaceCard('J');
						setP1Turn(false);
						//hide all buttons except for slap and placep1 until placep1 has been pressed once
					}
					else if (card.Value === "Q") {
						setFaceCard('Q');
						setP1Turn(false);
					}
					else if (card.Value === "K") {
						setFaceCard('K');
						setP1Turn(false);
					}
					else if (card.Value === "A") {
						setFaceCard('A');
						setP1Turn(false);
					}

					gameDeck.cards.push(card);
					setGameDeck(gameDeck);

					setFirstPlayersCards(firstPlayersCards);
					console.log("fpc: ", firstPlayersCards);
					setP1Turn(false);

					setValue(value + 1);

				}} text='Place (P1)' isDisabled={!p1Turn} />

				<Button id="placeP2" onClick={() => {
					if (secondPlayersCards.cards.length === 0) {
						console.log('player 2 wins');
					}

					var card = secondPlayersCards.cards.splice(-1, 1)[0];

					gameDeck.cards.push(card);
					setGameDeck(gameDeck);
					setSecondPlayersCards(secondPlayersCards);
					console.log("spc: ", secondPlayersCards);
					setP1Turn(true);

					setValue(value + 1); //force rerender

				}} text='Place (P2)' isDisabled={p1Turn} />

				<PlaceButton id="placeP1" gameDeck={gameDeck} setGameDeck={setGameDeck} playerCards={firstPlayersCards}
					setPlayerCards={setFirstPlayersCards} setP1Turn={setP1Turn} p1Turn={true} setValue={setValue}
					value={value} text="Place (P1)" />

				<PlaceButton id="placeP2" gameDeck={gameDeck} setGameDeck={setGameDeck} playerCards={secondPlayersCards}
					setPlayerCards={setSecondPlayersCards} setP1Turn={setP1Turn} p1Turn={false} setValue={setValue}
					value={value} text="Place (P2)" />

			</div>
			<div className="Buttons">
				<SlapButton gameDeck={gameDeck} setGameDeck={setGameDeck} playerCards={firstPlayersCards}
					setPlayerCards={setFirstPlayersCards} setP1Turn={setP1Turn} p1Turn={true} setValue={setValue}
					value={value} text="Slap (P1)" />

				<SlapButton gameDeck={gameDeck} setGameDeck={setGameDeck} playerCards={secondPlayersCards}
					setPlayerCards={setSecondPlayersCards} setP1Turn={setP1Turn} p1Turn={false} setValue={setValue}
					value={value} text="Slap (P2)" />
			</div>
			<div className="text">
				Top 3 Cards
			</div>
			<div className="deck">
				{gameDeck?.cards[gameDeck.cards.length - 1]?.Value || "empty"}
			</div>
			<div className="deck">
				{gameDeck?.cards[gameDeck.cards.length - 2]?.Value || "empty"}
			</div>
			<div className="deck">
				{gameDeck?.cards[gameDeck.cards.length - 3]?.Value || "empty"}
			</div>
			<div className="text">
				Cards in Deck: {gameDeck.cards.length}
			</div>

		</div>


	);
}

export default App;


