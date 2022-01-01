import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import GroupIcon from '@material-ui/icons/Group';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import { navStyles, useStyles } from '../styles/style';
import { CONSTANT, ROUTE } from '../constants/constant';
import { logoutUser } from '../redux/actions/authActions';
import { RootState } from '../redux/store';
import { Button } from '@material-ui/core';

function Navbar() {
  const { token } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function redirectToHome() {
    history.push(ROUTE.home);
  }

  function handleClick() {
    dispatch(logoutUser(redirectToHome));
  }

  function renderButtons() {
    if (token) {
      return (
        <>
          <Button
            component={Link}
            to={ROUTE.dashboard}
            className={navClasses.btn}
          >
            {CONSTANT.dashboard}
          </Button>
          <Button
            component={Link}
            to={ROUTE.myProfile}
            className={navClasses.btn}
          >
            {CONSTANT.profile}
          </Button>
          <Button
            component={Link}
            to={ROUTE.createPokerboard}
            className={navClasses.btn}
          >
            {CONSTANT.createPokerboard}
          </Button>
          <Button className={navClasses.btnRed} onClick={handleClick}>
            {CONSTANT.logout}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button component={Link} to={ROUTE.signin} className={navClasses.btn}>
            {CONSTANT.signIn}
          </Button>
          <Button component={Link} to={ROUTE.signup} className={navClasses.btn}>
            {CONSTANT.signUp}
          </Button>
        </>
      );
    }
  }

  const itemsList = [
    {
      text: CONSTANT.savedPokerboards,
      icon: <SaveIcon className="white" />,
      onClick: () => history.push(ROUTE.dashboard),
    },
    {
      text: CONSTANT.createPokerboard,
      icon: <AddBoxIcon className="white" />,
      onClick: () => history.push(ROUTE.createPokerboard),
    },
    {
      text: CONSTANT.groups,
      icon: <GroupIcon className="white" />,
      onClick: () => history.push(ROUTE.groupPage),
    },
    {
      text: CONSTANT.tickets,
      icon: <ConfirmationNumberIcon className="white" />,
      onClick: () => history.push(ROUTE.tickets),
    },
    {
      text: CONSTANT.createGroup,
      icon: <GroupAddIcon className="white" />,
      onClick: () => history.push(ROUTE.createGroup),
    },
    {
      text: CONSTANT.profile,
      icon: <PersonIcon className="white" />,
      onClick: () => history.push(ROUTE.myProfile),
    },
  ];

  const navClasses = navStyles();
  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {token ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ''
          )}
          <Typography variant="h6" className={navClasses.title}>
            <Link to={ROUTE.home} className="link">
              {CONSTANT.pokerPlaner}
            </Link>
          </Typography>
          {renderButtons()}
        </Toolbar>
      </AppBar>
      {token ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon className="white" />
              ) : (
                <ChevronLeftIcon className="white" />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {itemsList.map((item) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} className="white" />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      ) : (
        ''
      )}
    </div>
  );
}

export default Navbar;
