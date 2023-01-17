<template>
  <div class="mb-6">
    <label
      for="large-input"
      class="block mb-2 text-sm font-medium text-gray-900"
    >{{ label }}</label>
    <input
      id="large-input"
      :name="name"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="invalidField"
      :class="className"
      @input="$emit('update', $event.target.value)"
      @blur="touched = true"
    >
    <span
      v-for="(rule, index) in rules"
      :key="index"
      class="text-red-500 text-sm"
    >
      <p v-if="invalidField">
        {{ rule(value) }}
      </p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    name: {
      type: String,
      default: '',
    },
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
    value: {
      type: [String, Number],
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      touched: false,
    };
  },
  computed: {
    invalidField() {
      return this.touched ? this.validate(this.value) : false;
    },
  },
  methods: {
    validate(value) {
      return this.rules.every((rule) => rule(value));
    },
  },
};
</script>
