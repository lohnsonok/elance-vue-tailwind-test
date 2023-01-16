<template>
  <div
    :class="classes.spacer"
    :style="{ paddingTop: `${y}px`, paddingBottom: `${y}px`, paddingLeft: `${x}px`, paddingRight: `${x}px`}"
  />
</template>

<script>
export default {
  name: 'Spacer',
  props: {
    x: {
      type: String,
      default: '0',
    },
    y: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      classes: {
        spacer: 'w-full h-0',
      },
    };
  },
};
</script>
