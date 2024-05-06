<template>
  <div class="language-selector">
    <span><p @click="changeLanguage('en')">En</p></span>
    <p>&nbsp;|&nbsp;</p>
    <span><p @click="changeLanguage('fr')">Fr</p></span>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "LangSelectBtn",

  setup() {
    const { locale } = useI18n();

    const changeLanguage = (localeValue) => {
      // Met à jour la langue de l'application
      locale.value = localeValue;
    };

    return {
      changeLanguage,
    };
  },
};
</script>

<style lang="scss">
.language-selector {
  display: flex;
  align-items: center;
  span {
    color: white;
    &:hover {
      color: gray;
    }
    p {
      cursor: pointer;
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      &:hover {
        color: var(--pink);
      }
    }
  }
  p {
    cursor: default;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>