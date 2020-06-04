import axios from "axios";

import RecipeQuery from "~/gql/queries/Recipe";

export const state = () => ({
    errors: null,
    images: null,
    isUserImageSideBar: false,
    steps: null,
    editingStep: null,
    isStepEditing: false,
    ingredients: null,
    editingIngredient: null,
    editingIngredientIndex: null,
    isIngredientEditing: false,
});

export const getters = {
    recipe: state => {
        return state.recipe;
    }
};

export const mutations = {
    editingIngredientIndex: function(state, payload) {
        state.editingIngredientIndex = payload;
    },
    editingIngredient: function(state, payload) {
        state.editingIngredient = payload;
    },
    isIngredientEditing: function(state, payload) {
        state.isIngredientEditing = payload;
    },
    editingIngredientOnly: function(state, payload) {
        state.editingIngredient[payload.type] = payload.value;
    },
    ingredients: function(state, payload) {
        state.ingredients = payload;
    },
    updateIngredients: function(state, payload) {
        let ingredient = {
            id: payload.ingredient.id,
            title: payload.ingredient.title,
            slug: payload.ingredient.slug,
        };
        state.ingredients[state.editingIngredientIndex].ingredient = ingredient;
    },
    newIngredient: function(state, payload) {
        state.ingredients.push(payload);
    },
    editingStep: function(state, payload) {
        state.editingStep = payload;
    },
    isStepEditing: function(state, payload) {
        state.isStepEditing = payload;
    },
    editingStepOnly: function(state, payload) {
        state.editingStep.step = payload;
    },
    steps: function(state, payload) {
        state.steps = payload;
    },
    updateSteps: function(state, payload) {
        state.steps[payload.index].step = payload.step;
    },
    newStep: function(state, payload) {
        state.steps.push(payload);
    },
    isUserImageSideBar: function(state, payload) {
        state.isUserImageSideBar = payload;
    },
    newImage: function(state, payload) {
        state.images.push(payload);
    },
    images: function(state, payload) {
        state.images = payload;
    },
    deleteImage: function(state, payload) {
        state.images.splice(payload, 1);
    },
    deleteStep: function(state, payload) {
        state.steps.splice(payload, 1);
    },
    deleteIngredient: function(state, payload) {
        state.ingredients.splice(payload, 1);
    }
};

export const actions = {
    async getRecipe(context, data) {
        let client = this.app.apolloProvider.defaultClient;
        const recipe = await client
            .query({
                query: RecipeQuery,
                variables: {
                    slug: data
                }
            })
            .then(({ data }) => data && data.recipe);
        context.commit("recipe", recipe);
    },
    addRecipe(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/recipes`, {
                    title: data.title,
                    detail: data.detail,
                    difficulty: data.difficulty,
                    meals: data.meals,
                    prep_time: data.prep_time,
                    video: data.video,
                    image: data.image
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    updateRecipe(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(`${process.env.SERVER_URL}/api/recipes/${data.id}`, {
                    title: data.title,
                    detail: data.detail,
                    difficulty: data.difficulty,
                    meals: data.meals,
                    prep_time: data.prep_time,
                    video: data.video,
                    note: data.note,
                    image: data.image
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    changeStatus(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(
                    `${process.env.SERVER_URL}/api/recipe/${data.id}/changestatus`, {
                        status: data.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
                    }
                )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    storeImages(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/recipes/images`, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    addStep(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/steps`, {
                    step: data.step,
                    recipe_id: data.recipe_id
                })
                .then(response => {
                    let step = {
                        id: response.data.id,
                        step: response.data.step
                    };
                    resolve(response);
                    context.commit("newStep", step);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    updateStep(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(`${process.env.SERVER_URL}/api/steps/${data.id}`, {
                    step: data.step
                })
                .then(response => {
                    context.commit("updateSteps", data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    deleteStep(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .delete(`${process.env.SERVER_URL}/api/steps/${data.id}`)
                .then(response => {
                    resolve(response);
                    context.commit("deleteStep", data.index);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    addIngredient(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/ingredients`, {
                    ingredient: data.ingredient,
                    amount: data.amount,
                    note: data.note,
                    recipe_id: data.recipe_id
                })
                .then(response => {
                    let ingredient = {
                        id: response.data.recipe_ingredient.id,
                        ingredient: {
                            title: response.data.ingredient.title,
                            slug: response.data.ingredient.slug
                        },
                        amount: response.data.recipe_ingredient.amount,
                        note: response.data.recipe_ingredient.note
                    };
                    // console.log(response.data)
                    resolve(response);
                    context.commit("newIngredient", ingredient);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // updateStep(context, data) {
    //     return new Promise((resolve, reject) => {
    //         axios.defaults.headers.common["Authorization"] =
    //             "Bearer " + this.$apolloHelpers.getToken();
    //         axios
    //             .patch(`${process.env.SERVER_URL}/api/steps/${data.id}`, {
    //                 step: data.step
    //             })
    //             .then(response => {
    //                 context.commit("updateSteps", data);
    //                 resolve(response);
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    // updateStep(context, data) {
    //     return new Promise((resolve, reject) => {
    //         axios.defaults.headers.common["Authorization"] =
    //             "Bearer " + this.$apolloHelpers.getToken();
    //         axios
    //             .patch(`${process.env.SERVER_URL}/api/steps/${data.id}`, {
    //                 step: data.step
    //             })
    //             .then(response => {
    //                 context.commit("updateSteps", data);
    //                 resolve(response);
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    updateIngredient(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(`${process.env.SERVER_URL}/api/ingredients/${data.id}`, {
                    amount: data.amount,
                    ingredient: data.ingredient,
                    note: data.note
                })
                .then(response => {
                    context.commit("updateIngredients", response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    deleteIngredient(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .delete(`${process.env.SERVER_URL}/api/ingredients/${data.id}`)
                .then(response => {
                    resolve(response);
                    context.commit("deleteIngredient", data.index);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};