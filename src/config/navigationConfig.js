const navigationConfig = (language) => ({
    headermenu: [
        // {
        //     title: language?.navigationMenu?.home,
        //     icon: 'home_outlined',
        //     path: '/',
        //     onlyLoggedIn: true
        // },
        {
            title: language?.navigationMenu?.login,
            icon: 'lock_open_outlined',
            path: '/login',
            onlyLoggedOut: true
        },
        {
            title: language?.navigationMenu?.profile,
            icon: 'perm_identity_outlined',
            path: '/profile',
            type: 'user-menu',
            onlyLoggedIn: true
        },
        {
            title: language?.navigationMenu?.projects,
            icon: 'list_alt_outlined',
            path: '/projects',
            onlyLoggedIn: true
        },
        {
            title: language?.navigationMenu?.register,
            icon: 'person_outlined',
            path: '/register',
            onlyLoggedOut: true
        },
        {
            title: language?.navigationMenu?.settings,
            icon: 'settings',
            type: 'user-menu',
            onlyLoggedIn: true,
            path: '/settings'
        },
        {
            title: language?.navigationMenu?.userProjects,
            icon: 'list_alt_outlined',
            path: '/user/projects',
            onlyLoggedIn: true
        },
        {
            title: language?.navigationMenu?.logout,
            icon: 'exit_to_app_outlined',
            type: 'logout',
            onlyLoggedIn: true
        }
    ],
    footermenu: [
        {
            path: '/terms&conditions',
            title: language?.footer?.menuItems?.terms
        },
        {
            path: '/privacy-policy',
            title: language?.footer?.menuItems?.privacyPolicy
        }
    ]
});

export default navigationConfig;
