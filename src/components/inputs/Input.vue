<template>
  <div class="mb-6">
    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input :type=type id="large-input" :placeholder="placeholder" :required="required" :disabled="disabled" :invalid="invalid"
      class="block w-full p-4 text-gray-900 border border-gray-300 bg-yellow-50 sm:text-md focus:ring-yellow-500 focus:border-yellow-500 rounded-full">
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
