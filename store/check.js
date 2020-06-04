import axios from "axios";

import isRecipePublished from "~/gql/queries/recipe/isRecipePublished";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
    isRecipePublised(context, data) {
        return new Promise((resolve, reject) => {
            let client = this.app.apolloProvider.defaultClient;
            const status = client
                .query({
                    query: isRecipePublished,
                    variables: {
                        slug: data
                    }
                })
                .then(({ data }) => data && data.isRecipePublished)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};