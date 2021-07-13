import React from 'react';
import { Container } from 'reactstrap';

import PromoCarousel from './../../features/PromoCarousel/PromoCarousel';
import Lineup from './../../features/Lineup/LineupContainer';
import Concerts from '../../features/Concerts/Concerts';

const HomePage = () => (
  <div>
    <PromoCarousel />
    <Container>
      <h1>Who's on?</h1>
      <Lineup>
        <Concerts />
      </Lineup>
    </Container>
  </div>
);

export default HomePage;
