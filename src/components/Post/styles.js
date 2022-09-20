import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    padding: 12,
    marginBottom: 8,
  },
  user: {
    display: "flex",
    alignItems: "center",
  },
  userLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  icon: {
    color: "white",
    width: "40px",
    height: "40px",
    fontSize: "24px",
    textAlign: "center",
    lineHeight: "36px",
    marginRight: "8px",
    borderRadius: "50px",
    backgroundColor: theme.palette.primary.main,
  },
  createAt: {
    marginLeft: "auto",
    fontSize: "14px",
    fontStyle: "italic",
  },
  message: {
    marginTop: 8,
  },
  image: {
    marginTop: 8,
    display: "flex",
    justifyContent: "center",
    "& img": {
      maxWidth: "100%",
    },
  },
  actions: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
  likeIcon: {
    width: "24px",
    height: "24px",
    marginRight: 4,
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  deleteIcon: {
    marginLeft: "auto",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));
