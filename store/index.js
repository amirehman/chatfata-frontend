export const state = () => ({
    // storageUrl: "http://127.0.0.1:8000/storage/",
    // baseUrl: "http://localhost:3000",
    storageUrl: "https://manage.chatfata.com/storage/",
    baseUrl: "https://chatfata.com",
    sideNav: false,
    theme: 'dark-mode',
    searchMode: false

});

export const mutations = {
    mutateSideNavStatus: function(state, payload) {
        state.sideNav = payload;
    },
    mutateTheme: function(state, payload) {
        state.theme = payload;
    },
    mutateSearchMode: function(state, payload) {
        state.searchMode = payload;
    },
};

export const actions = {

};