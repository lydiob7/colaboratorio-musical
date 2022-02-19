import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, Menu, MenuItem } from '@material-ui/core';

import { Button } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {},
    dropdown: {
        top: '56px!important'
    },
    link: {
        color: theme.palette.text.primary
    }
}));

function MenuButton({ children, items }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const listItems = items?.map((link) => (
        <Link key={link.path} className={classes.link} to={link.path}>
            <MenuItem onClick={handleClose}>{link.title}</MenuItem>
        </Link>
    ));

    return (
        <div className={classes.root}>
            <Button onClick={handleMenu} variant="text">
                {children}
            </Button>
            <Menu
                classes={{ paper: classes.dropdown }}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
            >
                {listItems}
            </Menu>
        </div>
    );
}

export default MenuButton;
