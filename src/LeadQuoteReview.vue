<template>
  <div class="container">
    <h1 :class="classes.h1">
      {{ $t('lead-quote-review.title') }}
    </h1>

    <Spacer y="24" />
    <p :class="classes.subtitle">
      {{ $t('lead-quote-review.description') }}
    </p>

    <div :class="classes.card">
      <form
        id="app"
        action
        method="post"
        name="form"
        :class="classes.form"
        @submit.prevent="onSubmit"
      >
        <div
          class="md:flex justify-center"
          :class="classes.row"
        >
          <div
            :class="classes.col"
            class="md:w-1/2"
          >
            <Input
              v-model="form.quoteReviewDetails.afterTaxAmount"
              :className="classes.input"
              name="afterTaxAmount"
              :label="$t('lead-quote-review.after-tax-price')"
              :rules="form.validationRules.afterTaxAmount"
              required
              type="number"
              class="my-4"
            />
          </div>
          <div
            :class="classes.col"
            class="md:w-1/2"
          >
            <Input
              v-model="form.quoteReviewDetails.systemSize"
              :className="classes.input"
              name="systemSize"
              :label="$t('lead-quote-review.system-size')"
              :rules="form.validationRules.systemSize"
              type="number"
              class="my-4"
            />
          </div>
        </div>
        <div
          :class="classes.col"
          class="text-center"
        >
          <button
            v-if="!displayQuoteReview"
            type="submit"
            :disabled="!validateForm"
            :class="classes.button"
            @click="displayQuoteReview = true"
          >
            {{ $t('lead-quote-review.review-quote-button') }}
          </button>
        </div>
      </form>
    </div>

    <div v-if="displayQuoteReview">
      <div :class="classes.col">
        <p class="mt-4 mb-15 text-center">
          {{ reviewDescription }}
        </p>
        <Spacer y="12" />
        <div :class="classes.smallContainer">
          <ul
            className="relative ml-10 mr-10 hidden h-96 w-14 flex-col items-center justify-between font-bold text-primary sm:flex"
          >
            <li className="flex flex-col items-center justify-center">
              <input
                className="custom-slider-bullet h-3 w-80 bg-primary"
                type="range"
                min="1"
                max="5"
                step="1"
                :value="pricePerKwh"
                disabled
                @change="pricePerKwh = $event.target.value"
              >
            </li>
          </ul>
          <div>
            <div class="card gradient" />
          </div>

          <div
            :class="[classes.row, classes.jbc]"
            class="w-full"
          >
            <div :class="[classes.col]">
              <h3
                :class="classes.h3"
                class="text-left"
              >
                1,00 €/Wc
              </h3>
            </div>
            <div :class="classes.col">
              <h3
                :class="classes.h3"
                class="text-right"
              >
                5,00 €/Wc
              </h3>
            </div>
          </div>
        </div>

        <div
          :class="classes.col"
          class="text-center"
        >
          <button
            type="submit"
            :disabled="!validateLeadForm"
            :class="classes.button"
            @click="displayLeadForm = true"
          >
            {{ $t('lead-quote-review.check-solar-production.button') }}
          </button>
        </div>

        <div
          v-if="displayLeadForm"
          :class="classes.row"
          class="max-w-max mx-auto"
        >
          <div class="xl:mt-5 mt-15">
            <div class="relative py-8">
              <div
                class="absolute inset-0 flex items-center mb-4"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <span class="px-3 bg-white text-lg font-medium text-gray-900">
                  &nbsp;
                </span>
              </div>
            </div>
            <div :class="classes.row">
              <div :class="classes.col">
                <h4
                  :class="classes.h4"
                  class="text-left"
                >
                  {{ $t('lead-quote-review.check-technicals-for-quote.title') }}
                </h4>
                <p
                  :class="classes.small"
                  class="mt-4 text-left"
                >
                  {{ $t('lead-quote-review.check-technicals-for-quote.description') }}
                </p>
              </div>
              <div :class="classes.col">
                <div class="flex items-center justify-between space-x-6">
                  <label class="block">
                    <span class="sr-only">{{
                      $t('lead-quote-review.check-technicals-for-quote.file-input-label')
                    }}</span>
                    <input
                      id="profile_picture"
                      type="file"
                      class="custom-input-file"
                      accept=".pdf, .png, .jpg, .jpeg"
                      @change="onFileChange"
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="displayLeadForm"
          :class="classes.row"
        >
          <div class="xl:mt-24 mt-15 mx-auto w-full max-w-4xl">
            <h4
              :class="classes.h4"
              class="mt-15"
            >
              {{ $t('lead-quote-review.check-solar-production.title') }}
            </h4>
            <p
              :class="classes.small"
              class="mt-4"
            >
              {{ $t('lead-quote-review.check-solar-production.description') }}
            </p>

            <Spacer :y="12" />

            <lead-form :quote-review-details="form.quoteReviewDetails" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Input from '@/components/inputs/Input.vue';
import LeadForm from '@/components/forms/LeadQuoteReviewForm.vue';
import Spacer from '@/components/Spacer.vue';

export default {
  name: 'LeadQuoteReview',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LeadForm,
    Spacer,
    Input,
  },
  metaInfo() {
    return {
      title: 'vérification gratuite de devis de panneaux solaires',
      link: [{
        rel: 'canonical',
        href: `${process.env.CANONICAL_URL}${this.$route.fullPath}`,
      }],
      meta: [
        {
          property: 'og:url',
          content: `${process.env.BASE_URL}${this.$route.fullPath}`,
          vmid: 'og:url',
        },
        {
          property: 'og:title',
          content: 'vérification gratuite de devis de panneaux solaires',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          content: "Vérifiez votre devis photovoltaïque avec un avis indépendant de spécialistes de l'autoconsommation.  Estimez la production réelle pour éviter les arnaques.",
          vmid: 'og:description',
        },
        {
          name: 'description',
          content: "Vérifiez votre devis photovoltaïque avec un avis indépendant de spécialistes de l'autoconsommation.  Estimez la production réelle pour éviter les arnaques.",
        },
        {
          property: 'og:image',
          content: 'https://images.ctfassets.net/1b6f0wuf6ave/51dHfAbrcKIvVObL1zAA4w/aa42687894b1611dc6adadb037b16e84/9.png',
          vmid: 'og:image',
        },
        {
          property: 'og:image:secure_url',
          content: 'https://images.ctfassets.net/1b6f0wuf6ave/51dHfAbrcKIvVObL1zAA4w/aa42687894b1611dc6adadb037b16e84/9.png',
          vmid: 'og:image:secure_url',
        },
        {
          property: 'og:image:alt',
          content: 'https://images.ctfassets.net/1b6f0wuf6ave/51dHfAbrcKIvVObL1zAA4w/aa42687894b1611dc6adadb037b16e84/9.png',
          vmid: 'og:image:alt',
        }],
    };
  },

  data() {
    return {
      classes: {
        h1: 'md:text-2xl text-xl font-bold text-center',
        h4: 'md:text-xl text-lg font-bold',
        subtitle: 'md:text-base text-sm text-center max-w-2xl mx-auto',
        small: 'md:text-sm text-xs',
        card: 'md:px-16 px-4 py-8 md:pb-10 max-w-5xl mx-auto',
        input: 'block w-full p-4 text-gray-900 border border-gray-300 bg-yellow-50 sm:text-md focus:ring-yellow-500 focus:border-yellow-500 rounded-full valid:ring-green-500 valid:border-green-500 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-yellow-500 focus-within:ring-opacity-50 invalid:ring-red-500 invalid:border-red-500 transition-all duration-500',
        row: 'flex md:flex-row flex-col',
        col: 'md:px-4 px-0 mt-8',
        form: 'md:px-4 px-0 mt-8',
        button: 'rounded-lg border border-yellow-100 bg-yellow-100 px-5 py-2.5 text-center text-sm font-medium text-yellow-600 transition-all hover:border-yellow-200 hover:bg-yellow-200 focus:ring focus:ring-yellow-50 disabled:opacity-70',
        smallContainer: 'max-w-2xl mx-auto relative',
        jbc: 'md:justify-between justify-center',
        jsc: 'md:justify-start justify-center',
      },
      displayQuoteReview: false,
      displayLeadForm: false,

      form: {
        valid: false,
        quoteReviewDetails: {
          afterTaxAmount: null,
          systemSize: null,
          file: null,
        },

        validationRules: {
          afterTaxAmount: [(v) => (v ? '' : this.$t('common.after-tax-amount-is-required'))],
          systemSize: [(v) => (v ? '' : this.$t('common.system-size-is-required'))],
        },
      },
    };
  },

  computed: {
    pricePerKwh() {
      const { afterTaxAmount } = this.form.quoteReviewDetails;
      const { systemSize } = this.form.quoteReviewDetails;
      return (this.displayQuoteReview) ? (afterTaxAmount / (systemSize * 1000)).toFixed(2) : 0;
    },
    reviewDescription() {
      if (this.pricePerKwh < 2) return this.$t('lead-quote-review.review-message.<2');
      if (this.pricePerKwh < 4) return this.$t('lead-quote-review.review-message.2-4');
      if (this.pricePerKwh < 5) return this.$t('lead-quote-review.review-message.4-5');
      return this.$t('lead-quote-review.review-message.>5');
    },
    color() {
      if (this.pricePerKwh < 1) return 'indigo';
      if (this.pricePerKwh < 2) return 'teal';
      if (this.pricePerKwh < 2.5) return 'green';
      if (this.pricePerKwh < 3) return 'orange';
      return 'red';
    },
    validateForm() {
      const inputs = Object.keys(this.form.quoteReviewDetails);
      inputs.pop();
      const valid = inputs.every((input) => this.form.quoteReviewDetails[input] !== null);
      return valid;
    },
    validateLeadForm() {
      return this.displayQuoteReview && this.validateForm;
    },
  },
  methods: {
    onFileChange(e) {
      [this.form.quoteReviewDetails.file] = e.target.files;
    },
  },
};

</script>


<style>
.slider-container {
  width: 60%;
  position: relative;
}

.card {
  width: 100%;
  box-sizing: border-box;
  padding: 1.5em;
  border-radius: 25px;
  color: white;
  line-height: 25px;
  box-shadow: 5px 5px 10px #ccc;
  float: left;
}

.card.gradient {
  background: linear-gradient(150deg, #ccffcc, #ff0000 100%);
}

.custom-input-file::-webkit-file-upload-button {
  background: rgb(214, 214, 214);
  color: #000;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
