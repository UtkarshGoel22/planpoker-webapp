import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AddBoxIcon from "@mui/icons-material/AddBox"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber"
import CssBaseline from "@mui/material/CssBaseline"
import GridViewIcon from "@mui/icons-material/GridView"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import GroupIcon from "@mui/icons-material/Group"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { ROUTES } from "@constants/routes.const"
import { TEXT } from "@constants/text.const"
import Tooltip from "@mui/material/Tooltip"

import { authActions } from "@src/state/redux/authSlice"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.primary.main,
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

function Navbar() {
  const { token } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  function handleClick() {
    dispatch(authActions.logoutUser(token))
  }

  const drawerItemsList = [
    {
      text: TEXT.dashboard,
      icon: <GridViewIcon sx={{ color: "white" }} />,
      onClick: () => navigate(ROUTES.dashboard),
    },
    {
      text: TEXT.createPokerboard,
      icon: <AddBoxIcon sx={{ color: "white" }} />,
      onClick: () => navigate(ROUTES.createPokerboard),
    },
    {
      text: TEXT.createGroup,
      icon: <GroupAddIcon sx={{ color: "white" }} />,
      onClick: () => navigate(ROUTES.createGroup),
    },
    {
      text: TEXT.groups,
      icon: <GroupIcon sx={{ color: "white" }} />,
      onClick: () => navigate(ROUTES.groups),
    },
    {
      text: TEXT.tickets,
      icon: <ConfirmationNumberIcon sx={{ color: "white" }} />,
      onClick: () => navigate(ROUTES.tickets),
    },

    {
      text: TEXT.profile,
      icon: <PersonIcon sx={{ color: "white" }} />,
      onClick: () => navigate(ROUTES.myProfile),
    },
  ]

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed" open={open}>
        <Toolbar>
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            <Link
              to={ROUTES.home}
              style={{ textDecoration: "none", color: "white" }}
            >
              {TEXT.planPoker}
            </Link>
          </Typography>
          {token && (
            <Tooltip title="Logout">
              <IconButton sx={{ color: "white" }} onClick={handleClick}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      {token && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerItemsList.map(item => {
              const { text, icon, onClick } = item
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && (
                    <ListItemIcon>
                      <Tooltip title={text} placement="right">
                        {icon}
                      </Tooltip>
                    </ListItemIcon>
                  )}
                  <ListItemText primary={text} sx={{ color: "white" }} />
                </ListItem>
              )
            })}
          </List>
        </Drawer>
      )}
    </Box>
  )
}

export default Navbar
