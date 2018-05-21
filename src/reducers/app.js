

export default function appReducer(state = {}, action) {
    switch(action.type) {
        case "SET_USER":
            let isAdmin = (action.value.email === 'jhansell@colorcon.com');
            return Object.assign({}, state, {user: action.value, isAdmin}); 
        case "SET_PAGE":
            let page = action.value || 'home';
            switch(page) {
                case "home":
                    import('../pages/home-page.js');
                    break;
                case "tablet-overview":
                    import('../pages/tablet-overview-page.js');
                    break;
                case "tablet-library":
                    import('../pages/tablet-library-page.js');
                    break;
                case "tablet-designer":
                    import('../pages/tablet-designer-page.js');
                    break;
                case "pan-overview":
                    import('../pages/pan-overview-page.js');
                    break;
                case "pan-library":
                    import('../pages/pan-library-page.js');
                    break;
                case "pan-designer":
                    import('../pages/pan-designer-page.js');
                    break;
                case "coating-overview":
                    import('../pages/coating-overview-page.js');
                    break;
                case "coating-library":
                    import('../pages/coating-library-page.js');
                    break;
                case "coating-designer":
                    import('../pages/coating-designer-page.js');
                    break;
            }
            return Object.assign({}, state, { page }); 
        default: 
            return state;
    }
}  

export { appReducer };