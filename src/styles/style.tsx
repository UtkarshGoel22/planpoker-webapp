import {
  makeStyles,
  Theme,
  createStyles,
  InputBase,
  withStyles,
} from '@material-ui/core';

// purple violet color : #3F51B5

/**
 * Navbar
 */

export const navStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: 'white',
    },
    btn: {
      color: 'white',
    },
    btnRed: {
      color: 'white',
      background: '#d50000',
    },
  })
);

/**
 * Signup
 */

export const signupStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * Signin
 */

export const signinStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(19.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * Loader
 */

export const loaderStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: 'primary',
    '&:hover': {
      backgroundColor: 'primary',
    },
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -12,
  },
}));

/**
 * BackDrop
 */

export const backdropStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

/**
 * Modal
 */

export const modalStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      margin: '0 auto',
      width: 400,
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    container: {
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
    },

    centerAll: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerHorizontal: {
      justifyContent: 'center',
    },
    gap: {
      marginBottom: '5px',
    },
  })
);

/**
 * Dashboard
 */

export const dashboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '30px auto',
    },
    card: {
      marginTop: theme.spacing(1),
    },
    item: {
      margin: '10px auto',
      padding: '1px',
    },
    topRightColumn: {
      display: 'flex',
      margin: theme.spacing(1),
    },
    importTickets: {
      marginTop: theme.spacing(2),
    },
    btn: {
      marginLeft: theme.spacing(1),
    },
  })
);

export const snackbarStyle = makeStyles((theme) => ({
  snackbarStyle: {
    position: 'absolute',
  },
}));
/**
 * Liner Loader
 */

export const linerLoaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

/**
 * navbar
 */

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      backgroundColor: '#3F51B5',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: '#3F51B5',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
