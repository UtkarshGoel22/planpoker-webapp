import { Outlet } from "react-router-dom"

import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"

import Navbar from "@components/Navbar"

function NavLayout() {
  const theme = useTheme()

  return (
    <Box component="div" sx={{ display: "flex", flexGrow: 1 }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: theme.spacing(3) }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            p: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default NavLayout
