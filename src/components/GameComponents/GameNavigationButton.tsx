import React from 'react';
import { Button } from '@material-ui/core';

type GameNavigationButtonProps = {
  children?: JSX.Element;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const GameNavigationButton = (props: GameNavigationButtonProps) => {
  return (
    <>
      <Button
        onClick={props.onClick}
        color="secondary"
        title={props.text}
        aria-label={props.text}
      >
        <p>{props.text}</p>
        {props.children}
      </Button>
    </>
  );
};

export default GameNavigationButton;
