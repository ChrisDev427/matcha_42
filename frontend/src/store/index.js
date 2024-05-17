import { createStore } from "vuex";

export const store = createStore({
  state: {
    is_ready: false,
    isLoading: false,
    isLoadingStartApp: false,
    user_name: "",
    is_connected: null,
    ws: null,
    is_login_form_sent: false,
    is_register_form_sent: false,
    server_message: "",
  },

  getters: {
    getIsReady(state) {
      return state.is_ready;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsLoadingStartApp(state) {
      return state.isLoadingStartApp;
    },
    getIsConnected(state) {
      return state.is_connected;
    },
    getUserName(state) {
      return state.user_name;
    },
    getWebSocket(state) {
      return state.ws;
    },
    getIsLoginFormSent(state) {
      return state.is_login_form_sent;
    },
    getIsRegisterFormSent(state) {
      return state.is_register_form_sent;
    },
    getServerMessage(state) {
      return state.server_message;
    },
  },

  mutations: {
    setIsReady(state, value) {
      state.is_ready = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setIsLoadingStartApp(state, value) {
      state.isLoadingStartApp = value;
    },
    setIsConnected(state, value) {
      state.is_connected = value;
    },
    setUserName(state, value) {
      state.user_name = value;
    },
    setWebSocket(state, value) {
      state.ws = value;
    },
    setIsLoginFormSent(state, value) {
      state.is_login_form_sent = value;
    },
    setIsRegisterFormSent(state, value) {
      state.is_register_form_sent = value;
    },
    setServerMessage(state, value) {
      state.server_message = value;
    },
  },

  actions: {
    // closeWebSocket({state}) {
    //   state.ws.close();
    // },

    initWebSocket({ commit, state }) {
      commit(
        "setWebSocket",
        new WebSocket(
          "ws://localhost:8080/?id=" + localStorage.getItem("userId")
        )
      );

      state.ws.onopen = function () {
        console.log("Connection is open ...");
        let message = JSON.stringify({
          type: "test",
          userId: "",
          message: "Hello Server!",
        });
        state.ws.send(message);
      };
      state.ws.onmessage = function (messageEvent) {
        console.log("Server says: " + messageEvent.data);
      };
      state.ws.onclose = function () {
        console.log("Connection is closed.");
      };
    },

    async submitRegisterForm({commit}, formData) {
      // store.commit('setIsLoading', true);
      console.log(formData);
      try {
        // Envoyer les données du formulaire au backend Node.js
        const response = await fetch("/register-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        switch (response.status) {
          case 201:
            commit('setServerMessage', 'registerSuccess');
            break;
          case 409:
            if (responseData.message === 'Username already exists') {
              commit('setServerMessage', 'userExist');
            }
            if (responseData.message === 'Email already exists') {
              commit('setServerMessage', 'emailExist');
            }
            break;
          case 503:
            commit('setServerMessage', 'serverError');
            break;
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        commit('setIsRegisterFormSent', true);
        commit('setIsLoading', false);
      }
    },


    async submitLoginForm({ commit, dispatch }, formData) {
      // commit('setIsLoading', true);
      console.log("submitLoginForm");

      try {
        const response = await fetch("/login-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        console.log(responseData);
        switch (response.status) {
          case 201:
            localStorage.setItem("accessToken", responseData.accessToken);
            localStorage.setItem("userId", responseData.user.id);
            localStorage.setItem("userName", responseData.user.username);
            commit("setUserName", localStorage.getItem("userName"));
            // commit("setIsReady", true);
            dispatch("initWebSocket");
            commit("setServerMessage", "success");
            break;
          case 401:
            if (responseData.message === "Wrong Password") {
              commit("setServerMessage", "wrongPassword");
            }
            if (responseData.message === "Email not verified") {
              commit("setServerMessage", "emailNotVerif");
            }
            break;
          case 404:
            commit("setServerMessage", "loginFail");
            break;
          case 500:
            commit("setServerMessage", "serverError");
            break;
        }
        // Gérer la réponse du backend si nécessaire
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        commit("setIsLoginFormSent", true);
        commit("setIsLoading", false);
      }
    },
  },

  modules: {},
});
