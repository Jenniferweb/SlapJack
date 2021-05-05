

export default class Deck {
    static suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    static values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    constructor(cards) {
        this.cards = cards;
    }


    static createOriginalDeck() {
        var deck = [];

        for (var i = 0; i < Deck.suits.length; i++) {
            for (var x = 0; x < Deck.values.length; x++) {
                var weight = parseInt(Deck.values[x]);
                if (Deck.values[x] == "J")
                    weight = 11;
                if (Deck.values[x] == "Q")
                    weight = 12;
                if (Deck.values[x] == "K")
                    weight = 13;
                if (Deck.values[x] == "A")
                    weight = 1;
                var card = { Value: Deck.values[x], Suit: Deck.suits[i], Weight: weight };
                deck.push(card);
            }
        }
        return deck;
    }


    
    shuffle() {
        // for 1000 turns
        // switch the values of two random cards
        for (var i = 0; i < 1000; i++) {
            var location1 = Math.floor((Math.random() * this.cards.length));
            var location2 = Math.floor((Math.random() * this.cards.length));
            var tmp = this.cards[location1];

            this.cards[location1] = this.cards[location2];
            this.cards[location2] = tmp;
        }
    }
}



