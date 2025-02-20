# Mobiiliohjelmointi-SWD4TN021

Repo kurssin Mobiiliohjelmointi SWD4TN021-3008 (kevät 2020) tehtäville. Kurssilla harjoitellaan React Nativen avulla mobiilisovellusten ohjelmointia.

## Tehtävä 1: Calculator

Laskimessa 2 tekstikenttää, joihin syötetyt numeroarvot voi ynnätä (+-näppäin) tai vähentää (--näppäin).

## Tehtävä 2: Number Guessing Game

Käyttäjän tehtävänä on arvata satunnainen luku yhden ja sadan väliltä. Jokaisen syötteen jälkeen ohjelma kertoo, onko syötetty luku pienempi vai suurempi kuin satunnaisluku. Jos käyttäjä arvaa oikein, tulee näytölle alert oikeasta arvauksesta ja arvausten lukumäärästä, ja ohjelma alkaa uudelleen alusta.

## Tehtävä 3: Calculator (jatkuu)

Tehtävä laajentaa tehtävää 1. Laskin hyödyntää FlatList-komponenttia laskuhistorian näyttämiseen.

## Tehtävä 4: Shopping List

Ohjelmassa on FlatList-tyyppinen ostoslista, johon käyttäjä voi syöttää tietoja tai tyhjentää sen.

## Tehtävä 5: Calculator (jatkuu)

Laskin ja laskuhistoria on eriytetty Stack Navigatorin avulla erillisille sivuille.

## Tehtävä 6: Number Guessing Game (jatkuu)

Ohjelma näyttää AsyncStoragen avulla parhaan arvaustuloksen.

## Tehtävä 7: Recipe Finder

Ohjelman avulla voi etsiä reseptejä Recipe Puppy API:sta. Ohjelma näyttää hakutuloksissa tuotekuvan ja tuotteen nimen, joka on linkki reseptiin.

## Tehtävä 8: Euro Converter

Ohjelma kääntää muita valuuttoja euroksi. Käyttäjä syöttää haluamansa rahamäärän ja valuutan, jonka haluaa muuttaa euroiksi.

## Tehtävä 9: Find Address

Kartta-laajennus näyttää oletusarvoisesti Helsingin kartalla, käyttäjä syöttää haluamansa osoitteen ja sovellus näyttää sen karttasijainnilla.

## Tehtävä 10: Restaurant Finder

Sovellus avautuu karttanäkymään, jossa näkyy käyttäjän nykyinen sijainti. Osoitteen syöttämällä käyttäjä näkee ravintolat 1,5 km säteellä annetusta osoitteesta.
_Google nearby -API antaa satunnaisesti hakuquota käytetty -virheviestin, eikä hae ravintoloita. Tässä tilanteessa uusi haku yleensä auttaa._

## Tehtävä 11: Find Address (jatkuu)

Karttalaajennus hakee nyt käynnistämisen jälkeen käyttäjän sijainnin ja näyttää sen kartalla. Muut toiminnot samat kuin tehtävässä 9 (huom. haettavia sijainteja ei enää tallenneta listana, vaan ainoastaan ensimmäinen hakutulosta vastaava sijainti tallennetaan).

## Tehtävä 12: Shopping List with DB

Hyödynnetään Expon SQLite-komponenttia ostoslistan tallentamiseen. Yksittäisiä listan tuotteita voi myös poistaa.

## Tehtävä 13: Shopping List with DB (jatkuu)

Ohjelman tyyliä on parannettu React Native Elementsin avulla.

## Tehtävä 14: My Places

Käyttäjä syöttää osoitteita, jotka tulevat näkyviin alle listaan. Kun käyttäjä painaa osoitetta, siirtyy sovellus karttanäkymään, jossa näkyy kyseinen osoite kartalla. Kun käyttäjä painaa osoitetta pitkään, se poistuu listalta.

Listan tallentamisessa hyödynnetty Expon SQLite-komponenttia, ulkonäön muotoilussa React Native Elements -komponenttia ja karttanäkymässä MapView-komponenttia ja MapQuest APIa.
