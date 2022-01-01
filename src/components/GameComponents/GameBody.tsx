import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  CommentOutlined,
  NavigateNext,
  SkipNextRounded,
} from '@material-ui/icons';
import { gameStyle } from '../../styles/game.style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CONSTANT, LABEL } from '../../constants/constant';
import PlayersEstimateList from './PlayersEstimateList';
import { RoleTypes } from '../../constants/pokerboardTypes';
import { TimerStatus } from '../../redux/interfacesAndTypes';
import {
  checkIsLastTicket,
  isGameEnded,
  isManager,
} from '../../utils/gamepage.helper';
import SubmitManagerEstimate from './SubmitManagerEstimate';
import { SocketContext } from '../../context/socket';
import { SOCKET_EVENTS } from '../../constants/socketEvents';
import GameNavigationButton from './GameNavigationButton';
import { TEXT } from '../../constants/finalConstant';
import TicketDetailComponent from './TicketDetailComponent';

type GameBodyPropType = {};

const GameBody = ({}: GameBodyPropType) => {
  const classes = gameStyle();
  const { gameDetail } = useSelector((state: RootState) => state.currentGame);
  const { data } = useSelector((state: RootState) => state.pokerboardDetail);
  const lastCommentRef = React.useRef<HTMLDivElement>(null);
  const socket = useContext(SocketContext);
  const [inputComment, setInputComment] = useState('');

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView();
    }
  }, [gameDetail?.currentTicketComments]);

  const handleOnSkipCard: React.MouseEventHandler<HTMLButtonElement> = (_) => {
    socket.emit(SOCKET_EVENTS.skipTicket);
  };

  const handleOnNextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    socket.emit(SOCKET_EVENTS.nextTicket);
  };

  const handleEndGameClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    socket.emit(SOCKET_EVENTS.endGame);
  };

  return (
    <>
      <Grid container className={`${classes.centerComponent}`}>
        {gameDetail && (
          <Card className={`${classes.currentTicket}`}>
            <CardActions className={classes.buttonsContainer}>
              {gameDetail.userRole === RoleTypes.MANAGER &&
                gameDetail.timerStatus === TimerStatus.notStarted &&
                !checkIsLastTicket(gameDetail.currentTicket, data?.tickets) && (
                  <GameNavigationButton
                    text={TEXT.skipCard}
                    onClick={handleOnSkipCard}
                  >
                    <SkipNextRounded />
                  </GameNavigationButton>
                )}
              {gameDetail.userRole === RoleTypes.MANAGER &&
                gameDetail.timerStatus === TimerStatus.ended &&
                Boolean(gameDetail.currentTicket.estimate) &&
                !checkIsLastTicket(gameDetail.currentTicket, data?.tickets) && (
                  <GameNavigationButton
                    text={TEXT.nextCard}
                    onClick={handleOnNextClick}
                  >
                    <NavigateNext />
                  </GameNavigationButton>
                )}
              {isManager(gameDetail) &&
                (gameDetail.timerStatus === TimerStatus.notStarted ||
                  (gameDetail.timerStatus === TimerStatus.ended &&
                    Boolean(gameDetail.currentTicket.estimate))) && (
                  <GameNavigationButton
                    text={TEXT.endGame}
                    onClick={handleEndGameClick}
                  ></GameNavigationButton>
                )}
            </CardActions>
            <CardContent>
              <Typography variant="h4" className={`${classes.centerComponent}`}>
                ID: {gameDetail.currentTicket.id}
              </Typography>
              <TicketDetailComponent
                title={CONSTANT.ticketSummary}
                description={gameDetail.currentTicket.summary}
              />
              <TicketDetailComponent
                title={CONSTANT.ticketDescription}
                description={gameDetail.currentTicket.description}
              />

              {gameDetail.currentTicket.estimate && (
                <>
                  <TicketDetailComponent
                    title={CONSTANT.estimate}
                    description={gameDetail.currentTicket.estimate}
                  />
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Grid>
      <Grid container className={`${classes.centerComponent} ${classes.m10}`}>
        <Grid item xs={5} className={`${classes.border} `}>
          <Card className={`${classes.commentsContainer}`}>
            <CardHeader title={CONSTANT.comments}></CardHeader>
            <CardContent className={`${classes.commentsSection}`}>
              {gameDetail && gameDetail.currentTicketComments.length > 0 ? (
                gameDetail.currentTicketComments.map((comment, i) => {
                  let isLastMessage =
                    gameDetail.currentTicketComments.length - 1 === i;
                  return (
                    <Card
                      key={i}
                      innerRef={isLastMessage ? lastCommentRef : null}
                      className={`${classes.comment}`}
                    >
                      <CardContent>{comment}</CardContent>
                    </Card>
                  );
                })
              ) : (
                <>No Comments to show</>
              )}
            </CardContent>
            {isManager(gameDetail) &&
              !isGameEnded(data?.status) &&
              gameDetail?.timerStatus === TimerStatus.ended && (
                <CardContent>
                  <TextField
                    className={``}
                    onChange={(e) => {
                      setInputComment(e.target.value);
                    }}
                    value={inputComment}
                    InputProps={{
                      placeholder: `${LABEL.addComment}`,
                      endAdornment: (
                        <InputAdornment position="start">
                          <CommentOutlined />
                        </InputAdornment>
                      ),
                    }}
                    onKeyDownCapture={(e) => {
                      if (e.key == CONSTANT.enter) {
                        socket.emit(SOCKET_EVENTS.addComment, inputComment);
                        setInputComment('');
                      }
                    }}
                  />
                </CardContent>
              )}
          </Card>
        </Grid>
        <Grid item xs={4} className={`${classes.border}`}>
          <Card>
            <CardHeader title={`${LABEL.playerEstimated}`} />
            <CardContent className={`${classes.playersEstimateContainer}`}>
              <PlayersEstimateList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isManager(gameDetail) &&
        !isGameEnded(data?.status) &&
        gameDetail?.timerStatus === TimerStatus.ended && (
          <SubmitManagerEstimate />
        )}
    </>
  );
};

export default GameBody;
