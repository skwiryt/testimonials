import React from 'react';

import PriceInfo from '../PriceInfo/PriceInfo';

const PriceInfos = ({concerts}) => (
  <section>
    {concerts.map(concert => (<PriceInfo key={concert._id} {...concert} />))}
  </section>
);

export default PriceInfos;