import authenticateUserGql from "~/gql/mutations/authenticateUser.gql";
import resetPassword from "~/gql/mutations/ResetPassword.gql";
import registerUserGql from "~/gql/mutations/registerUser.gql";
import getUserQuery from "~/gql/queries/me.gql";
import axios from "axios";

export const state = () => ({
    loggedInUser: null,
    token: null,
    isAuthenticated: false,
    editingMode: false,
    error: null,
    message: null
});

export const getters = {
    isAuthenticated: state => {
        return state.token !== null;
    },
    loggedInUser: state => {
        return state.loggedInUser !== null;
    },
    isVerified: state => {
        if (state.loggedInUser) {
            return state.loggedInUser.email_verified_at === null ? false : true;
        }
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
    message: function(state, payload) {
        state.message = payload;
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
    async checkEmailIfValid(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${process.env.SERVER_URL}/api/check-if-email-valide/${data.email}`
                )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async checkUsernameIfValid(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${process.env.SERVER_URL}/api/check-if-username-valide/${data.username}`
                )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    registerUser(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${process.env.SERVER_URL}/api/register`, {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    confirm_password: data.confirm_password
                })
                .then(response => {
                    context.dispatch("sendVerificationMail", response.data.success.token);
                    resolve(response);
                })
                .catch(error => {
                    context.commit("error", error);
                    reject(error);
                });
        });
    },
    sendVerificationMail(context, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get(`${process.env.SERVER_URL}/api/email/resend`);
    },

    applyForChannel(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/channels/apply`, {
                    user_id: data.user_id,
                    type: data.type,
                    url: data.url,
                    user_id: data.user_id,
                    status: "pending"
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // async registerUser(context, credentials) {
    // let client = this.app.apolloProvider.defaultClient;
    // try {
    // const res = await client
    //     .mutate({
    //         mutation: registerUserGql,
    //         variables: {
    //             name: credentials.name,
    //             username: credentials.username,
    //             email: credentials.email,
    //             password: credentials.password,
    //             password_confirmation: credentials.password_confirmation
    //         }
    //     })
    //     .then(({ data }) => data && data.register);

    // await this.$apolloHelpers.onLogin(res.tokens.access_token, undefined, {
    //     expires: 7
    // });
    // context.commit("isAuthenticated", true);
    // context.commit("receiveToken", res.tokens.access_token);
    // this.$router.push(`/${res.tokens.user.username}`);
    // } catch (e) {
    //     context.commit("error", e);
    // }
    // },

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
    async resetPassword(context, credentials) {
        let client = this.app.apolloProvider.defaultClient;
        try {
            const res = await client
                .mutate({
                    mutation: resetPassword,
                    variables: {
                        email: credentials.email
                    }
                })
                .then(response => {
                    context.commit("error", null);
                    context.commit("message", response.data.forgotPassword.message);
                });
        } catch (e) {
            context.commit("message", null);
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