import Button from './Button';

export default function PlaceButton({ numCardsPlaced, setNumCardsPlaced, gameDeck, setGameDeck, playerCards, setPlayerCards,
    otherPlayerCards, setOtherPlayerCards, setValue, setP1Turn, p1Turn, value, setIsWinner, text }) {

    return (
        <Button onClick={() => {
            if (playerCards.cards.length === 0) {
                console.log("player", (p1Turn ? "One" : "Two"), "wins");
                setIsWinner(true);
                return
            }

            var justPlacedFaceCard = false;
            var card = playerCards.cards.splice(-1, 1)[0];
            if (card.Value === "J") {
                setP1Turn(!p1Turn);
                setNumCardsPlaced(1);
                justPlacedFaceCard = true;
                //hide all buttons except for slap and placep1 until placep1 has been pressed once
            }
            else if (card.Value === "Q") {
                setP1Turn(!p1Turn);
                setNumCardsPlaced(2);
                justPlacedFaceCard = true;
            }
            else if (card.Value === "K") {
                setP1Turn(!p1Turn);
                setNumCardsPlaced(3);
                justPlacedFaceCard = true;
            }
            else if (card.Value === "A") {
                setP1Turn(!p1Turn);
                setNumCardsPlaced(4);
                justPlacedFaceCard = true;
            }

            gameDeck.cards.push(card);
            setGameDeck(gameDeck);
            setPlayerCards(playerCards);
            console.log("player's cards: ", playerCards);

            if (justPlacedFaceCard === false) {
                if (numCardsPlaced === 0) {
                    setP1Turn(!p1Turn);
                }
                else {
                    if (numCardsPlaced - 1 === 0) {
                        otherPlayerCards.cards = gameDeck.cards.concat(otherPlayerCards.cards);
                        gameDeck.cards = [];
                        setGameDeck(gameDeck);
                        setOtherPlayerCards(otherPlayerCards);
                        setP1Turn(!p1Turn);
                    }
                    setNumCardsPlaced(numCardsPlaced - 1)
                }
            }

            setValue(value + 1); //force rerender

        }} text={text} />
    );
}

