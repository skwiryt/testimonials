import React from 'react';

const dictionary = {
  1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven'
}

const PriceInfo = ({day, price, workshops}) => (
  <article>
    <h2>Day {dictionary[day]}</h2>
    <p>Price: {price}$</p>
    <p>
      Workshops: {workshops.reverse().map((w, i, a) =>  i === a.length - 1 ? `${w.name} ` : `${w.name}, `)}
    </p>
  </article>
);

export default PriceInfo;

/*
<h2>Day </h2>
    <p>Price: 25$</p>
    <p>Workshops: "Rock Music Style", "How to make you voice grooowl", "Make your voice stronger", "History of Rock"</p>

*/