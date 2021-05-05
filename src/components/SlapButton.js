import Button from './Button';

export default function SlapButton({ gameDeck, setGameDeck, playerCards, setPlayerCards, setValue, setP1Turn, p1Turn, value, text }) {

    return (
        <Button onClick={() => {
            if (gameDeck.cards.length < 2) {
                //place player's card on bottom of gamedeck
                var card = playerCards.cards.splice(-1, 1)[0];
                gameDeck.cards.unshift(card);
                setGameDeck(gameDeck);
                setPlayerCards(playerCards);
                console.log('faulty slap1');
                setValue(value + 1);
            }

            else if ((gameDeck.cards[gameDeck.cards.length - 1].Weight + gameDeck.cards[gameDeck.cards.length - 2].Weight === 10)
                || (gameDeck.cards[gameDeck.cards.length - 1].Value === gameDeck.cards[gameDeck.cards.length - 2].Value)
                || ((gameDeck.cards.length >= 3) && gameDeck.cards[gameDeck.cards.length - 1].Value === gameDeck.cards[gameDeck.cards.length - 3].Value)) {

                playerCards.cards = playerCards.cards.concat(gameDeck.cards);
                gameDeck.cards = [];
                setGameDeck(gameDeck);
                setPlayerCards(playerCards);
                console.log('good slap');
                setP1Turn(p1Turn);
                setValue(value + 1);
            }

            else {
                //place player's card on bottom of gamedeck
                var card = playerCards.cards.splice(-1, 1)[0];
                gameDeck.cards.unshift(card);
                setGameDeck(gameDeck);
                setPlayerCards(playerCards);
                console.log('faulty slap2');
                setValue(value + 1);
            }
        }} text={text} />
    );
}

