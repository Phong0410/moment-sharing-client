import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navContainer: {
    position: "fixed",
    top: 0,
    zIndex: "10",
  },
  navPaper: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    height: "32px",
  },
  link: {
    textDecoration: "none",
    display: "flex",
  },
  appName: {
    margin: 0,
    padding: 0,
    paddingRight: 8,
    fontSize: "20px",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  userContainer: {
    marginLeft: "auto",
    marginRight: "24px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
    },
  },
  userIcon: {
    width: "40px",
    height: "40px",
    marginRight: "8px",
    fontSize: "24px",
    textAlign: "center",
    lineHeight: "36px",
    borderRadius: 50,
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
  userName: {
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
  logoutBtn: {
    height: "28px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  logoutIcon: {
    height: "28px",
    display: "none",
    padding: "6px 0",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
    minWidth: "28px",
  },
}));
