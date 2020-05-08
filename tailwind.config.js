module.exports = {
    theme: {
        extend: {
            screens: {
                dark: { 'raw': '(prefers-color-scheme: dark)' },
                light: { 'raw': '(prefers-color-scheme: light)' },
                xxl: "1450px",
                xxxl: "1650px"
            },
            colors: {
                "theme-red": "#c0392b",
                "theme-red-dark": "#d9c10c",
                "theme-orange": "#e67e22",
                "dark-mode": "#2f3542",
            },
            backgroundColor: theme => ({
                "theme-orange": "#e67e22",
                "theme-red": "#c0392b",
                "white-trans-95": "rgba(255,255,255, 0.95)",
                "black-trans-95": "rgba(0,0,0, 0.95)",
                "dark-mode": "#2f3542",
                "dark-mode-light": "#353b48",
            }),
            spacing: {
                "3.1rem": "3.1rem",
                "20rem": "20rem",
                "22rem": "22rem",
                "25rem": "25rem",
                "30rem": "30rem",
                "32rem": "32rem",
                "34rem": "34rem",
                "35rem": "35rem",
                "40rem": "40rem",
                "45rem": "45rem",
                "18rem": "18rem",
                "24rem": "24rem",
                "26rem": "26rem",
                "screen-80": "80vh"
            },
            opacity: {
                "85": ".85",
                "95": ".95",
                "98": ".98"
            },
            inset: {
                "-1": "-1rem",
                "-2": "-2rem",
                "-3": "-3rem",
                "-4": "-4rem",
                "-5": "-5rem",
                "-6": "-6rem",
                "-7": "-7rem",
                "-16": "-16rem",
                "-32": "-32rem"
            }
        },
        spinner: theme => ({
            default: {
                color: "#aeb6bd", // color you want to make the spinner
                size: "1.3em", // size of the spinner (used for both width and height)
                border: "2px", // border-width of the spinner (shouldn't be bigger than half the spinner's size)
                speed: "500ms" // the speed at which the spinner should rotate
            }
        })
    },
    variants: {},
    plugins: [require("tailwindcss-spinner")()]
};
