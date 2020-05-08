export const state = () => ({
    storageUrl: "http://manage.chatfata.com/storage/",
    baseUrl: "http://localhost:3000/",
    sideNav: false,
    theme: 'dark-mode'

});

export const mutations = {
    mutateSideNavStatus: function(state, payload) {
        state.sideNav = payload;
    },
    mutateTheme: function(state, payload) {
        state.theme = payload;
    },
};

export const actions = {

};
