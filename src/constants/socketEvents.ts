export const enum SOCKET_EVENTS {
  joinGame = 'join-game',
  leaveGame = 'leave-game',
  startTimer = 'start-timer',
  nextTicket = 'next-ticket',
  skipTicket = 'skip-ticket',
  addComment = 'add-comment',
  setEstimate = 'set-estimate',
  timer = 'timer',
  timerStarted = 'timer-started',
  timerEnded = 'timer-ended',
  managerJoined = 'manager-joined',
  managerLeft = 'manager-left',
  gameError = 'game-error',
  currentTicket = 'current-ticket',
  tickets = 'tickets',
  playerEstimate = 'player-estimate',
  managerEstimate = 'manager-estimate',
  commentAdded = 'comment-added',
  endGame = 'end-game',
}
