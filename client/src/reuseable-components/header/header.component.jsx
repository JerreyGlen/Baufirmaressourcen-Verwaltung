import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Axios from "axios";

import { Context } from "../../provider/provider";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";

import "./_header.styles.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        display: "block"
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#212121",
        color: "white"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    white: {
        color: "white"
    },
    hide: {
        display: 'none',
    },
    item: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        textDecoration: "none",
        paddingLeft: "20px",
        color: "white"
    }
}))

const Header = ({ width }) => {

    const { user, setUser } = useContext(Context);

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = () => {
        if (process.env.NODE_ENV === "production") {
            Axios.post("https://api.developmore.net/logout", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }).then(response => {
                localStorage.removeItem("token");
                localStorage.removeItem("role")
                document.cookie = "username=express cookie; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setUser(null);
                history.push("/");
            }).catch(err => {
                console.log(err);
            })
        } else {
            Axios.post("http://localhost:4000/logout", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            }).then(response => {
                localStorage.removeItem("token");
                document.cookie = "username=express cookie; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setUser(null);
                history.push("/");
            }).catch(err => {
                console.log(err);
            })
        }

    }

    return (
        <div className="header">
            {
                <Link className="logo-container" to="/">
                    <i className="fas fa-igloo fa-3x logo"></i>
                </Link>
            }
            {
                user && (
                    width > 768 ?
                        <div className="menus">
                            <Button onClick={logout} className="logout-btn">
                                Ausloggen
                            </Button>
                        </div>
                        :
                        <div className="menus">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerOpen}
                                className={open ? classes.hide : ""}
                            >
                                <i className="fas fa-bars"></i>
                            </IconButton>

                            <Drawer
                                className={open ? classes.drawer : classes.hide}
                                variant="persistent"
                                anchor="right"
                                open={open}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div className={classes.drawerHeader}>
                                    <IconButton className={classes.white} onClick={handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>}
                                    </IconButton>
                                </div>
                                <List>
                                    <p style={{ paddingLeft: "10px" }} onClick={logout}>Ausloggen</p>
                                </List>
                            </Drawer>
                        </div>
                )
            }

        </div>
    )
};

export default Header;
