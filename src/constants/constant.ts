export const ROUTE = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  notFound: '/notfound',
  verify: '/user/verify',
  verifyWithQueryParam: '/user/verify?token=',
  dashboard: '/user/dashboard',
  usersSignup: '/user/signup',
  usersLogin: '/user/login',
  usersLogout: '/user/logout',
  myProfile: '/user/myprofile',
  createGroup: '/create-group',
  createPokerboard: '/create-pokerboard',
  pokerboard: '/pokerboard/:id',
  importTicket: '/pokerboard/:id/import-tickets',
  acceptInvite: '/poker-board/invite',
  acceptInviteWithQueryParam: '/poker-board/verify?pokerBoardId=',
  pokerboardOnly: '/pokerboard/',
  importTicketsOnly: '/import-tickets',
  gamePage: '/pokerboard/:id/game',
  gamePageOnly: '/game',
  groupPage: '/groups',
  tickets: '/tickets',
  report: '/report',
  // reports: '/user/reports/tickets',
};

export const API_ROUTE = {
  myProfile: '/user',
  search: '/user/search',
  createGroup: '/user/group',
  searchGroup: '/user/group',
  createPokerboard: '/poker-board',
  getPokerboard: '/poker-board',
  tickets: '/tickets',
  pokerboardPlayers: '/players',
  importTickets: '/poker-board/import-tickets?ticketsInput=',
  importBy: '&importBy=',
  startAt: '&startAt=',
  pokerboard: '/poker-board',
  user: '/user',
  groups: '/user/groups',
  userTickets: '/user/tickets',
  users: '/users',
};

export const ERROR = {
  firstNameShouldHaveLessThanFiftyCharacters:
    'First Name should have 1-50 characters',
  lastNameShouldHaveLessThanFiftyCharacters:
    'Last Name should have upto 50 characters',
  usernameShouldHaveFourToThirtyCharacters:
    'User Name should have 4-30 characters',
  passswordShouldHaveMoreThanFiveCharacters:
    'Password should have more than 5 characters',
  passwordsDoNotMatch: 'Passwords do no match',
  errorEmail: 'Error: Account already exists',
  errorUsername: 'Error: Username already exist',
  emailAlreadyRegisteredWithAnAccount:
    'Email already registered with an account',
  usernameAlreadyExists: 'Username already exist',
  errorInvalidEmail: 'Error: Please enter a valid email address',
  invalidEmail: 'Invalid email format eg: abc@gmail.com',
  errorInvalidToken: 'Error: jwt malformed',
  invalidToken: 'Invalid token',
  errorTokenExpired: 'Error: jwt expired',
  tokenExpired: 'Token expired',
  errorInvalidEmailPassword: 'Error: Invalid email or password',
  invalidEmailPassword: 'Invalid email or password',
  somethingWentWrong: 'Something went wrong. Please Try again.',
  verifyYourEmail: 'Your account is not verified. Kindly verify your account',
  errorVerifyYourEmail:
    'Error: Your account is not verified. Kindly verify your account',
  sessionExpired: 'Session expired!! You are not authorized To view this page',
  updateDetailsFailed: 'Update user details failed',
  usernameShouldBeAlphaNumeric: 'Username should be alphanumeric',
  memberShouldAtLeastBeTwo: 'At least 2 members should be there including you',
  groupNameShouldBeFourAndThirty: 'Group name should be between 4 and 30',
  groupShouldBeAlphaNumeric: 'Group should be alphanumeric',
  pokerboardNameCharactersError: 'Should contain 4-30 characters',
  required: 'This field is required',
  accessDenied: 'Access Denied',
};

export const SUCCESS_MESSAGE = {
  detailsUpdatedSuccessfully: 'Updated details successfully',
  groupCreatedSuccessfully: 'Group created successfully',
  pokerboardCreatedSuccessfully: 'Pokerboard created successfully',
  updatedSuccessfully: 'Updated Successfully',
};

export const LABEL = {
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'User Name',
  email: 'Email Address',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  name: 'Name',
  cardsEstimate: 'Cards Estimated',
  groupName: 'Group Name',
  addMembers: 'Add Members',
  boardName: 'Board Name',
  deckType: 'Deck Type',
  status: 'Status',
  createdBy: 'Created By',
  totalGroups: 'Total Groups',
  totalMember: 'Total Members',
  users: 'Users',
  groups: 'Groups',
  tickets: 'Tickets',
  importTickets: 'Import Tickets',
  importBy: 'Import By',
  summary: 'Summary',
  id: 'Id',
  saveChanges: 'Save Changes',
  estimate: 'Estimate',
  notEstimated: 'Not Estimated',
  gamePage: 'Game Page',
  addComment: 'Add a Comment',
  skipCard: 'Skip Card',
  playerEstimated: 'Player Estimated',
  nextTicket: 'Next Ticket',
  gotoGame: 'Goto Game',
  resumeGame: 'Resume Game',
  gameEnded: 'Game Ended',
  sortBy: 'Sort By Estimated Date',
  filter: 'Ticket Type',
};

export const CONSTANT = {
  pokerPlaner: 'Poker Planer',
  signUp: 'Sign Up',
  signIn: 'Sign In',
  dashboard: 'Dashboard',
  profile: 'Profile',
  logout: 'Logout',
  alreadyHaveAnAccountSignin: 'Already have an account? Sign in',
  estimatesMadeEasy: 'Estimates made easy',
  processMadeFun: 'Process made fun',
  subTagline:
    'Poker Planer is the secure, fun way for agile teams to guide sprint planning and build accurate consensus estimates.',
  startAGame: 'Start a Game',
  dontHaveAnAccountSignup: "Don't have an account? Sign Up",
  auth: 'auth',
  resendEmail: 'Re-send Email',
  email: 'email',
  bearer: 'Bearer ',
  pageNotFound: '404 Page Not Found',
  copyRights: 'copyrights © Poker Planer 2021',
  token: 'token',
  emailVerificationLinkSent:
    'An email verification link is sent at the provided email address',
  emailVerified: 'Email verified',
  addMemberToGroupTitle: 'Add Members to group',
  createGroup: 'Create Group',
  createPokerboard: 'Create Pokerboard',
  goto: 'Goto',
  serial: 'SERIAL',
  even: 'EVEN',
  odd: 'ODD',
  fibonacci: 'FIBONACCI',
  goToHome: 'Go to home',
  id: 'ID',
  jql: 'JQL',
  sprint: 'SPRINT',
  import: 'Import',
  prev: 'Prev',
  next: 'Next',
  limit: 5,
  one: 1,
  select: 'SELECT',
  remove: 'REMOVE',
  ticketId: 'Id: ',
  ticketType: 'Type: ',
  ticketSummary: 'Summary: ',
  ticketDescription: 'Description: ',
  save: 'Save',
  pokerBoardId: 'pokerBoardId',
  savedPokerboards: 'Saved Pokerboards',
  groups: 'Groups',
  viewDetails: 'View Details',
  pokerboardId: 'Id: ',
  pokerboardName: 'Name: ',
  manager: 'Manager: ',
  managerId: 'Manager-Id: ',
  deckType: 'Deck-Type: ',
  status: 'Status: ',
  enter: 'Enter',
  estimate: 'Estimate',
  comments: 'Comments',
  gotoPokerboard: 'Goto Pokerboard',
  start: 'Start',
  ongoing: 'Ongoing',
  waitingToStart: 'Waiting to start',
  estimateTheTicket: 'Estimate the ticket',
  playersAreEstimating: 'Players are estimating',
  managerIsEstimating: 'Manager is Estimating',
  managerIsUpdating: 'Manager is updating Estimate',
  endGame: 'Game Ended',
  timerEnded: 'Timer Ended',
  noTicketToShow: 'No ticket to show',
  waitingForManagerToJoin: 'Waiting for manager to join',
  gameHasBeenEndedMyByManager: 'Game has been ended by manager',
  gotoPokerboardDetailPage: 'Goto Pokerboard Detail Page',
  noOneHasEstimatedYet: 'No one has estimated yet',
  submitYourEstimate: 'Submit your Estimate',
  tickets: 'Tickets',
  ascending: 'ASC',
  descending: 'DESC',
  task: 'Task',
  bug: 'Bug',
  story: 'Story',
  apply: 'Apply',
  newestFirst: 'Newest First',
  oldestFirst: 'Oldest First',
  none: 'None',
  all: 'All',
};

export const API_URL = {
  baseUrl: 'http://localhost:5000',
};

export const API_METHOD = {
  post: 'post',
  put: 'put',
};

export const API_HEADER = {
  applicationJson: 'application/json',
};

export const REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const AUTH_ACTIONS = {
  loginUser: 'LOGIN_USER',
  logoutUser: 'LOGOUT_USER',
};

export const enum UserAction {
  FETCH = 'FETCH_USER_DATA',
  SET = 'SET_USER_DATA',
  GET = 'GET_USER_DATA',
}

export const enum SearchUserAction {
  SET_OPTIONS = 'GET_SEARCH_OPTIONS_FOR_USER',
  SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS_FOR_SEARCH_USER',
  SET_SEARCH_USER_ERROR = 'SET_SEARCH_USER_ERROR',
}

export const enum PokerboardAction {
  SET_LOADING_TRUE = 'POKERBOARD_SET_LOADING_TRUE',
  SET_LOADING_FALSE = 'POKERBOARD_SET_LOADING_FALSE',
  SET_POKERBOARD_DATA = 'POKERBOARD_SET_DATA',
  SET_POKERBOARD_ERROR = 'POKERBOARD_SET_ERROR',
  SET_POKERBOARD_TICKET = 'POKERBOARD_SET_TICKET',
  ADD_ESTIMATE_TO_TICKET = 'ADD_ESTIMATE_TO_TICKET',
  SET_STATUS_OF_POKERBOARD = 'SET_STATUS_OF_POKERBOARD',
}

export const enum ErrorIncludes {
  USERNAME = 'username',
  GROUP_NAME = 'group name',
}

export const enum SearchGroupAction {
  SET_OPTIONS = 'GET_SEARCH_OPTIONS_FOR_GROUP',
  SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS_FOR_SEARCH_GROUP',
  SET_SEARCH_GROUP_ERROR = 'SET_SEARCH_GROUP_ERROR',
}

export const enum TicketAction {
  SET_SELECTED_TICKETS = 'SET_SELECTED_TICKETS',
  SET_TICKET_OPTIONS = 'SET_TICKET_OPTIONS',
}

export const enum GameAction {
  SET_ERROR = 'SET_GAME_ERROR',
  SET_CURRENT_TICKET = 'SET_CURRENT_TICKET',
  SET_CURRENT_TICKET_COMMENTS = 'SET_CURRENT_TICKETS_COMMENTS',
  ADD_COMMENT_TO_CURRENT_TICKET = 'ADD_COMMENT_TO_CURRENT_TICKET',
  SET_GAME_INFO = 'SET_GAME_INFO',
  START_TIMER = 'START_GAME_TIMER',
  SET_TIMER = 'SET_GAME_TIMER',
  RESET_TIMER = 'RESET_GAME_TIMER',
  END_TIMER = 'END_TIMER',
  ADD_PLAYER_ESTIMATE_TO_CURRENT_TICKET = 'ADD_PLAYER_ESTIMATE_TO_CURRENT_TICKET',
  SET_PLAYERS_ESTIMATE_LIST = 'SET_CURRENT_TICKET_PLAYER_ESTIMATE_LIST',
  SET_MANAGER_PRESENT = 'SET_MANAGER_PRESENT_IN_GAME',
  SET_ESTIMATE_FOR_CURRENT_TICKET = 'SET_ESTIMATE_FOR_CURRENT_TICKET',
}

export const enum GroupAction {
  SET_GROUPS_FOR_USER = 'SET_GROUPS_FOR_CURRENT_USER',
  SET_GROUPS_ERROR = 'SET_GROUPS_ERROR',
  SET_GROUPS_LOADING = 'SET_GROUPS_LOADING',
}

export const enum UserTicketAction {
  SET_TICKETS_FOR_USER = 'SET_TICKETS_FOR_USER',
}

export const enum GraphDataAction {
  SET_GRAPH_DATA = 'SET_GRAPH_DATA',
}
