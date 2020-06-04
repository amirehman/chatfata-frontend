export const state = () => ({
    sliderMode: false,
    currentSlide: "",
    currentSlideIndex: 0,
    sliderCount: 0,
    isNextSlide: true,
    isPrevSlide: true
});

export const mutations = {
    mutateCurrentSlide: function(state, payload) {
        state.currentSlide = payload;
    },
    mutateSlideMode: function(state, payload) {
        state.sliderMode = payload;
    },
    currentSlideIndex: function(state, payload) {
        state.currentSlideIndex = payload;
    },
    mutateSliderCount: function(state, payload) {
        state.sliderCount = payload;
    },
    mutateIsNextSlide: function(state, payload) {
        state.isNextSlide = payload;
    },
    mutateIsPrevSlide: function(state, payload) {
        state.isPrevSlide = payload;
    },
    checkNextPrev: function(state, payload) {
        if (payload + 1 === state.sliderCount) {
            state.isNextSlide = false;
            state.isPrevSlide = true;
        }
        if (payload === 0) {
            state.isPrevSlide = false;
            state.isNextSlide = true;
        }
        if (payload + 1 != state.sliderCount && payload != 0) {
            state.isNextSlide = true;
            state.isPrevSlide = true;
        }
    }
};

export const actions = {};