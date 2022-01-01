import React from 'react';
import { Link } from 'react-router-dom';
import { TEXT } from '../constants/finalConstant';
import { ROUTE } from '../constants/route';

function Home() {
  return (
    <div className="container">
      <div className="showcase">
        <div className="tagline">
          <h1>{TEXT.estimatesMadeEasy}</h1>
          <h1>{TEXT.processMadeFun}</h1>
          <p>{TEXT.subTagline}</p>
        </div>
        <Link to={ROUTE.signup} className="link btn">
          {TEXT.startAGame}
        </Link>
      </div>
    </div>
  );
}

export default Home;
