export default function({ store, route, redirect, document }) {
    store.commit("mutateSideNavStatus", false);
    store.commit("mutateSearchMode", false);
}
