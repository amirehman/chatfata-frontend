import axios from "axios";

import isRecipePublished from "~/gql/queries/recipe/isRecipePublished";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
    contactForm(context, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("http://127.0.0.1:8000/api/contact", {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};