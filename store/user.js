import authenticateUserGql from "~/gql/mutations/authenticateUser.gql";
import getUserQuery from "~/gql/queries/me.gql";

export const state = () => ({
    loggedInUser: null,
    token: null,
    isAuthenticated: false,
    editingMode: false,
    error: null
});

export const getters = {
    isAuthenticated: state => {
        return state.token !== null;
    },
    loggedInUser: state => {
        return state.loggedInUser !== null;
    },
    isChannel: state => {
        if (state.loggedInUser) {
            let roles = state.loggedInUser.roles.map(e => {
                return e.name;
            });
            return roles.includes("channel");
        }
    }
};
export const mutations = {
    error: function(state, payload) {
        state.error = payload;
    },
    editingMode: function(state, payload) {
        state.editingMode = payload;
    },
    loggedInUser: function(state, payload) {
        state.loggedInUser = payload;
    },
    isAuthenticated: function(state, payload) {
        state.isAuthenticated = payload;
    },
    receiveToken: function(state, payload) {
        state.token = payload;
    },
    removeToken: function(state, payload) {
        state.token = payload;
    }
};

export const actions = {
    async retrieveToken(context, credentials) {
        let client = this.app.apolloProvider.defaultClient;
        try {
            const res = await client
                .mutate({
                    mutation: authenticateUserGql,
                    variables: {
                        username: credentials.username,
                        password: credentials.password
                    }
                })
                .then(({ data }) => data && data.login);
            await this.$apolloHelpers.onLogin(res.access_token, undefined, {
                expires: 7
            });
            context.commit("isAuthenticated", true);
            context.commit("receiveToken", res.access_token);
            this.$router.push(`/${res.user.username}`);
        } catch (e) {
            console.log(e);
            context.commit("error", e);
        }
    },
    async removeToken(context, payload) {
        await this.$apolloHelpers.onLogout();
        context.commit("isAuthenticated", false);
        context.commit("removeToken", null);
        context.commit("loggedInUser", null);
        context.commit("editingMode", false);
        context.commit("error", null);
        this.$router.push(`/`);
    },
    async getUser(context, payload) {
        let client = this.app.apolloProvider.defaultClient;
        try {
            const res = await client
                .query({
                    query: getUserQuery
                })
                .then(({ data }) => data && data);
            context.commit("loggedInUser", res.me);
        } catch (e) {
            // console.error(e);
            // this.error = e;
        }
    }
};