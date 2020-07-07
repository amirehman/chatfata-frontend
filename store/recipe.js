import axios from "axios";
import Vue from "vue";

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
    checkNewStep: 0,
    isTypeMode: false,
    isTypeModeEditing: false,
});

export const getters = {
    recipe: state => {
        return state.recipe;
    }
};

export const mutations = {
    isTypeModeEditing: function(state, payload) {
        state.isTypeModeEditing = payload;
    },
    isTypeMode: function(state, payload) {
        state.isTypeMode = payload;
    },
    checkNewStep: function(state, payload) {
        state.checkNewStep += payload;
    },
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
        state.checkNewStep += 1;
    },
    newIngredient: function(state, payload) {
        state.ingredients.push(payload);
        state.checkNewStep += 1;
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
    editingStepTypeOnly: function(state, payload) {
        if (payload) {
            state.editingStep.type = "title";
        } else {
            state.editingStep.type = "step";
        }
    },
    steps: function(state, payload) {
        state.steps = payload;
    },
    updateSteps: function(state, payload) {
        state.steps[payload.index].step = payload.step;
        if (payload.type) {
            state.steps[payload.index].type = "title";
        } else {
            state.steps[payload.index].type = "step";
        }
        state.checkNewStep += 1;
    },
    newStep: function(state, payload) {
        state.steps.push(payload);
        state.checkNewStep += 1;
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
        state.checkNewStep += 1;
    },
    deleteIngredient: function(state, payload) {
        state.ingredients.splice(payload, 1);
        state.checkNewStep += 1;
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
                    country: data.country,
                    serves: data.serves,
                    state: data.state,
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
                    country: data.country,
                    serves: data.serves,
                    state: data.state,
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
    orderSteps(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(
                    `${process.env.SERVER_URL}/api/order/steps/${data.recipe_id}`, {
                        order: data.steps
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
    orderIngredients(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(
                    `${process.env.SERVER_URL}/api/order/ingredients/${data.recipe_id}`, {
                        order: data.ingredients
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
    addStep(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/steps`, {
                    step: data.step,
                    type: data.title,
                    recipe_id: data.recipe_id
                })
                .then(response => {
                    let step = {
                        id: response.data.id,
                        step: response.data.step,
                        type: response.data.type,
                        order: response.data.order
                    };
                    resolve(response); // console.log(response.data);
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
                    step: data.step,
                    type: data.type
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
    addIngredientType(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .post(`${process.env.SERVER_URL}/api/ingredients/heading`, {
                    amount: data.heading,
                    recipe_id: data.recipe_id
                })
                .then(response => {
                    resolve(response);
                    context.commit("newIngredient", response);
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
    updateIngredientType(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(
                    `${process.env.SERVER_URL}/api/ingredients/${data.id}/heading`, {
                        amount: data.amount
                    }
                )
                .then(response => {
                    context.commit("updateIngredients", response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    updateIngredient(context, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + this.$apolloHelpers.getToken();
            axios
                .patch(`${process.env.SERVER_URL}/api/ingredients/${data.id}`, {
                    amount: data.amount,
                    ingredient: data.ingredient,
                    type: data.type,
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