import Button from './Button';

export default function PlaceButton({ gameDeck, setGameDeck, playerCards, setPlayerCards, setValue, setP1Turn, p1Turn, value, text }) {

    return (
        <Button onClick={() => {
            if (playerCards.cards.length === 0) {
                console.log("player", (p1Turn ? "One" : "Two"), "wins");
            }

            var card = playerCards.cards.splice(-1, 1)[0];

            gameDeck.cards.push(card);
            setGameDeck(gameDeck);
            setPlayerCards(playerCards);
            console.log("player's cards: ", playerCards);
            setP1Turn(!p1Turn);

            setValue(value + 1); //force rerender
        }} text={text} />
    );
}

