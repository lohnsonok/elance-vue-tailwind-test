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
      <form :class="classes.form">
        <div class="md:flex justify-center" :class="classes.row">
          <div :class="classes.col" class="md:w-1/2">
            <Input v-model="form.quoteReviewDetails.afterTaxAmount" :label="$t('lead-quote-review.after-tax-price')"
              :rules="form.validationRules.afterTaxAmount" required type="number" class="my-4" />
          </div>
          <div :class="classes.col" class="md:w-1/2">
            <Input v-model="form.quoteReviewDetails.systemSize" :label="$t('lead-quote-review.system-size')"
              :rules="form.validationRules.systemSize" type="number" class="my-4" />
          </div>
        </div>
        <div :class="classes.col" class="text-center">
          <button v-if="!displayQuoteReview" :disabled="!form.valid" @click="displayQuoteReview = true"
            :class="classes.button">
            {{ $t('lead-quote-review.review-quote-button') }}
          </button>
        </div>
      </form>
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
        subtitle: 'md:text-base text-sm text-center max-w-2xl mx-auto',
        card: 'md:px-16 px-4 py-8 md:pb-16 max-w-5xl mx-auto',
        row: 'md:flex-row flex-col',
        col: 'md:px-4 px-0 mt-8',
        form: 'md:px-4 px-0 mt-8',
        button: 'rounded-lg border border-yellow-100 bg-yellow-100 px-5 py-2.5 text-center text-sm font-medium text-yellow-600 transition-all hover:border-yellow-200 hover:bg-yellow-200 focus:ring focus:ring-yellow-50 disabled:border-yellow-50 disabled:bg-yellow-50 disabled:text-blue-400',
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
          afterTaxAmount: [(v) => !!v || this.$t('common.last-name-is-required')],
          systemSize: [(v) => !!v || this.$t('common.last-name-is-required')],
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
  },

  methods: {

  },
};

</script>


<style>
.slider-container {
  width: 60%;
  position: relative;
}

.card {
  width: 1500px;
  box-sizing: border-box;
  padding: 2em;
  font-family: Ubuntu;
  border-radius: 25px;
  color: white;
  line-height: 25px;
  box-shadow: 5px 5px 10px #ccc;
  float: left;
  margin-right: 1em;
  margin-left: 1em;

}

.card.gradient {
  background: linear-gradient(150deg, #ccffcc, #ff0000 100%);
}
</style>
