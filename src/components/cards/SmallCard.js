import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '10px',
        textAlign: 'center',
        display: 'block',
        color: theme.palette.text.secondary,
        backgroundColor: '#fff',
        padding: '18px 20px 12px 20px',
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'capitalize',
        borderRadius: '8px',
        transition: 'all 0.3s',
        position: 'relative',
        [theme.breakpoints.up('xs')]: {
            width: '150px',
            margin: '0 5px 5px 5px'
        },
        '& .icon': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            margin: '0 auto 10px auto',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
            fontSize: '24px',
            transition: 'all 0.3s',
            color: '#fff'
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            transform: 'translateY(-4px)',
            '& a': {
                color: '#fff'
            },
            '& .icon': {
                color: theme.palette.primary.main,
                backgroundColor: '#fff'
            }
        }
    }
}));

const SmallCard = ({ item }) => {
    const classes = useStyles();

    return (
        <Paper component={Link} to={item.url} className={classes.root}>
            <div>
                <span className="icon">{item.icon}</span>
                {item.title}
            </div>
        </Paper>
    );
};

export default SmallCard;