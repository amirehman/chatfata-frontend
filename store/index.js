export const state = () => ({
    storageUrl: process.env.STORAGE_URL,
    baseUrl: process.env.BASE_URL,
    serverUrl: process.env.SERVER_URL,
    sideNav: false,
    theme: "dark-mode",
    searchMode: false,
    wiki: null
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
    mutateWiki: function(state, payload) {
        state.wiki = payload;
    }
};

export const actions = {
    async getWiki(context, payload) {
        try {
            const res = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${payload}`
            );
            const data = await res.json();
            context.commit("mutateWiki", data);
        } catch (e) {
            // console.error(e);
            // this.error = e;
        }
    }
};