<template>
  <div class="wrapper">
    <Header />

    <main :class="classes.main">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      classes: {
        main: 'mt-32 mb-24 container w-full mx-auto px-4',
      },
    };
  },
};
</script>

<style scoped>
main {
    display: flex;
    flex: 1 0 auto;
}

.wrapper {
    flex: 1 1 auto;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
}
</style>
