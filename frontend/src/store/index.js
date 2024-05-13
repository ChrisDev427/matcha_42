import { createStore } from 'vuex';

export const store = createStore ({
    
    state: {
        access_token: '',
        refresh_token: '',

        user_name: 'Chris',

        is_connected: false,

        login_form_sent: false,
        register_form_sent: false,

        server_response: null,
        server_message: '',
    },

    getters: {
        getLoginFormSent(state) {
            return state.login_form_sent;
        },
        getAccessToken(state) {
            return state.access_token;
        },
        getRefreshToken(store) {
            return store.refresh_token;
        },

        getRegisterFormSent(state) {
            return state.register_form_sent;
        },
        getServerResponseValue(store) {
            return store.server_response;
        },
        getServerMessage(store) {
            return store.server_message;
        },

        getIsConnected(state) {
            return state.is_connected;
        },
        getUserName(store) {
            return store.user_name;
        },
    },

    mutations: {
        setLoginFormSent(state, value) {
            state.login_form_sent = value;
        },
    
        setAccessToken(state, value) {
            state.access_token = value;
        },
        setRefreshToken(state, value) {
            state.refresh_token = value;
        },

        setRegisterFormSent(state, value) {
            state.register_form_sent = value;
        },
        setServerResponseValue(state, value) {
            state.server_response = value;
        },

        setServerMessage(state, value) {
            state.server_message = value;
        },

        setIsConnected(state, value) {
            state.is_connected = value;
        },
        setUserName(state, value) {
            state.user_name = value;
        },
        


    },

    actions: {

    },

    modules: {

    }
})