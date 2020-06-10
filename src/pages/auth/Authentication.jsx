import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../redux/user/user.selector";
import { Redirect } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    gridTemplateColumns: "200px 1fr",
    backgroundColor: theme.palette.background.paper,
    display: "grid",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsWrap: {
    alignSelf: "center",
  },
}));

const Authentication = ({ userData }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (userData.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen items-center flex justify-center">
      <div className={classes.root}>
        <div className={classes.tabsWrap}>
          <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Signup />
        </TabPanel>
      </div>
    </div>
  );
};
// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  userData: selectAllUserData,
});

export default connect(mapStateToProps)(Authentication);
