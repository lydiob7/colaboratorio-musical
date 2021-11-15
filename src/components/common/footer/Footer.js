import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import CopyrightMenu from './CopyrightMenu';
import SocialProfile from 'components/other/account/SocialProfile';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2vh 0',
        marginTop: '5vh'
    }
}));

function Footer() {
    const classes = useStyles();
    const appInformation = useSelector(({ ui }) => ui.appInformation);
    const footerContent = useSelector(({ ui }) => ui.footerContent);

    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item sm={12} md={5}>
                        <Copyright
                            rightsOwner={appInformation?.creator}
                            rightsOwnerWebsite={appInformation?.creatorWebsite}
                        />
                    </Grid>
                    <Grid item sm={12} md={4}>
                        <CopyrightMenu menus={footerContent?.menuItems} />
                    </Grid>
                    <Grid item sm={12} md={3}>
                        <SocialProfile socials={footerContent?.general?.sociallinks} />
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
