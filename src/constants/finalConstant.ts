export const LABEL = {
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'User Name',
  email: 'Email Address',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  skipCard: 'Skip Card',
};

export const TEXT = {
  pokerPlaner: 'Poker Planer',
  signIn: 'Sign In',
  dashboard: 'Dashboard',
  profile: 'Profile',
  logout: 'Logout',
  signUp: 'Sign Up',
  alreadyHaveAnAccountSignin: 'Already have an account? Sign in',
  estimatesMadeEasy: 'Estimates made easy',
  processMadeFun: 'Process made fun',
  subTagline:
    'Poker Planer is the secure, fun way for agile teams to guide sprint planning and build accurate consensus estimates.',
  startAGame: 'Start a Game',
  dontHaveAnAccountSignup: "Don't have an account? Sign Up",
  resendEmail: 'Re-send Email',
  email: 'email',
  bearer: 'Bearer ',
  pageNotFound: '404 Page Not Found',
  copyRights: 'copyrights © Poker Planer 2021',
  token: 'token',
  skipCard: 'Skip Ticket',
  nextCard: 'Next Ticket',
  endGame: 'End Game',
};

export const VALUE = {
  nameLengthLowerBound: 0,
  nameLengthUpperBound: 51,
  usernameLengthLowerBound: 4,
  passwordLengthLowerBound: 6,
  boardNameLowerBound: 4,
  boardNameUpperBound: 30,
  one: 1,
  debounceTime: 1500,
};

export const REGEX_FOR_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const enum CONSTANT {
  auth = 'auth',
  token = 'token',
  pokerboardId = 'pokerboardId',
}
