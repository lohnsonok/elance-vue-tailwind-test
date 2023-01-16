<template>
  <div class="w-full text-center">
    <h1 :class="classes.h1">{{ $t('home.title') }}</h1>

    <Spacer y="44" />
    <router-link :class="classes.button" to="/verifier-devis">{{ $t('home.get-quote-button') }}</router-link>
  </div>
</template>

<script>
import Spacer from '@/components/Spacer.vue';

export default {
  name: 'Home',
  components: {
    Spacer,
  },
  data() {
    return {
      classes: {
        h1: 'text-4xl font-bold',
        button: 'mt-8 bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded',
      },
    };
  },
};
</script>
