export default function({ app, error, redirect, route }) {
    app.store
        .dispatch("check/isRecipePublised", route.params.recipe)
        .then(res => {
            let currentUserID = app.store.state.user.loggedInUser.id;
            // console.log(currentUserID);
            // console.log(res);
            if (res.status != 'PUBLISHED' && res.author.id != currentUserID) {
                return redirect("/");
            }
        });
}