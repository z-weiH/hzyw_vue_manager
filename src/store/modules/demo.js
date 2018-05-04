export default {
    namespaced: true,
    state : {
        city : 'xy',
    },
    mutations : {
        setCity(state, data) {
            state.city = data;
        },
    },
}