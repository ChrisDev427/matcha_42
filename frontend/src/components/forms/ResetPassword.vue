<template>
  <div class="resetPassword--container">
      <form class="resetPassword--form" @submit.prevent="submitForm">
          <input
              name="newPassword"
              type="password"
              :placeholder="$t('password')"
              v-model="inputs.newPassword"
              required
              :maxlength="maxLength"
          />
          <input
              name="confirmPassword"
              type="password"
              :placeholder="$t('confirmPassword')"
              v-model="inputs.confirmPassword"
              required
              :maxlength="maxLength"
          />
          <button
              :class="{ 'disabled--btn': !isFormValid }"
              :disabled="!isFormValid"
              type="submit"
          >
              {{ $t("resetPassword") }}
          </button>
      </form>
      <div v-if="passwordResetAction" class="password--reset--msg">
          <p> Check your mailbox </p>
      </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex"; // Importer useStore
import { useRouter } from "vue-router"; // Importer useRouter pour la navigation
// import TextButton from '@/components/TextButton.vue';
import { fetchData } from "@/config/api";

export default {
  name: "ResetPassword",
  // components: {
      // TextButton,
  // },
  setup() {
      const store = useStore(); // Obtenir l'instance du store
      const router = useRouter(); // Obtenir l'instance du routeur

      const maxLength = 15;
      const inputs = ref({
          newPassword: "",
          confirmPassword: "",
      });

      // Définir isFormValid comme une propriété computed pour une réactivité optimale
      const isFormValid = computed(() => {
          return (
              inputs.value.newPassword === inputs.value.confirmPassword &&
              inputs.value.newPassword.length > 0 &&
              inputs.value.confirmPassword.length > 0
          );
      });

      // Propriété pour afficher un message de succès
      const passwordResetAction = ref(false);

      // Méthode asynchrone pour soumettre le formulaire
      async function submitForm(event) {
          event.preventDefault();
          store.commit('setIsLoading', true);
          const url = window.location.href;
          console.log("URL:", url);
          const token = url.searchParams.get("token");
          const email = url.searchParams.get("email");
          const data = {
              newPassword: inputs.value.newPassword,
              confirmPassword: inputs.value.confirmPassword,
              toker : token,
              email : email
          };
          try {
              const response = await fetchData("/resetPassword", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
              });
              console.log("Réponse du serveur:", response);
              // Afficher un message de succès
              passwordResetAction.value = true;
              setTimeout(() => {
                  passwordResetAction.value = false;
                  // Naviguer vers la page de connexion après le message
                  router.push({ name: "LoginPage" });
              }, 5000);
          } catch (error) {
              console.error("Erreur lors de la soumission du formulaire:", error);
              // Optionnel : Afficher un message d'erreur à l'utilisateur
          } finally {
              store.commit('setIsLoading', false);
          }
      }

      return {
          inputs,
          maxLength,
          submitForm,
          isFormValid,
          passwordResetAction,
      };
  }
}
</script>

<style scoped>
.resetPassword--container {
  /* Vos styles ici */
}

.resetPassword--form {
  /* Vos styles ici */
}

.password--reset--msg {
  /* Styles pour le message de succès */
  margin-top: 20px;
  color: green;
  text-align: center;
}
</style>
