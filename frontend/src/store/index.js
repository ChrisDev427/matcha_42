import { createStore } from 'vuex';

export const store = createStore ({
    
    state: {
        connection_state: false,
        access_token: '',
        refresh_token: '',
    },

    getters: {
        getConnectionState(state) {
            return state.connection_state;
        },
        getAccessToken(state) {
            return state.access_token;
        },
        getRefreshToken(store) {
            return store.refresh_token;
        },
    },

    mutations: {
        setConnectionState(state, value) {
            state.connection_state = value;
        },
    
        setAccessToken(state, value) {
            state.access_token = value;
        },
        setRefreshToken(state, value) {
            state.refresh_token = value;
        }


    },

    actions: {

    },

    modules: {

    }
})