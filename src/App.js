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

	const [p1Turn, setP1Turn] = useState(true);

	const [numCardsPlaced, setNumCardsPlaced] = useState(0);

	const [isWinner, setIsWinner] = useState(false);


	useEffect(() => {

	});

	return (
		<div>
			{!start ? <div className="Buttons">
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
			</div> : null}
			{!(firstPlayersCards.cards.length === 0 || secondPlayersCards.cards.length === 0 || isWinner) ? <div>


				{start && <div className="text">
					Player {p1Turn ? '1\'s' : '2\'s'} turn
				</div>}

				{!(numCardsPlaced === 0) ? <div className="text">
					Player {p1Turn ? '1' : '2'} must place down {numCardsPlaced} cards
			</div> : null}

				<div className="Buttons">

					<PlaceButton id="placeP1" numCardsPlaced={numCardsPlaced} setNumCardsPlaced={setNumCardsPlaced}
						gameDeck={gameDeck} setGameDeck={setGameDeck} playerCards={firstPlayersCards}
						setPlayerCards={setFirstPlayersCards} otherPlayerCards={secondPlayersCards}
						setOtherPlayerCards={setSecondPlayersCards} setP1Turn={setP1Turn} p1Turn={true} setValue={setValue}
						value={value} setIsWinner={setIsWinner} text="Place (P1)" />

					<PlaceButton id="placeP2" numCardsPlaced={numCardsPlaced} setNumCardsPlaced={setNumCardsPlaced}
						gameDeck={gameDeck} setGameDeck={setGameDeck} playerCards={secondPlayersCards}
						setPlayerCards={setSecondPlayersCards} otherPlayerCards={firstPlayersCards}
						setOtherPlayerCards={setFirstPlayersCards} setP1Turn={setP1Turn} p1Turn={false} setValue={setValue}
						value={value} setIsWinner={setIsWinner} text="Place (P2)" />

				</div>
				<div className="Buttons">
					<SlapButton setNumCardsPlaced={setNumCardsPlaced} gameDeck={gameDeck} setGameDeck={setGameDeck}
						playerCards={firstPlayersCards} setPlayerCards={setFirstPlayersCards} setP1Turn={setP1Turn}
						p1Turn={true} setValue={setValue} value={value} text="Slap (P1)" />

					<SlapButton setNumCardsPlaced={setNumCardsPlaced} gameDeck={gameDeck} setGameDeck={setGameDeck}
						playerCards={secondPlayersCards} setPlayerCards={setSecondPlayersCards} setP1Turn={setP1Turn}
						p1Turn={false} setValue={setValue} value={value} text="Slap (P2)" />
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
				<div className="text"> Player 1 has {firstPlayersCards.cards.length} Cards</div>
				<div className="text"> Player 2 has {secondPlayersCards.cards.length} Cards</div>
			</div> : <div className="text"> Player {firstPlayersCards.cards.length === 0 ? "Two" : "One"} wins! :)</div>}


		</div>


	);
}

export default App;


