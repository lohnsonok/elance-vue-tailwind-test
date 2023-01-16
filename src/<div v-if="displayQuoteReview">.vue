<div v-if="displayQuoteReview">
  <div :class="classes.col">
  <p class="ma-4 mb-15">
    {{ reviewDescription }}
  </p>
  <v-container :class="$vuetify.breakpoint.mdAndDown ? '' : 'slider-container'">
    <v-slider
      class="mt-8"
      :value="pricePerKwh"
      readonly
      :color="color"
      track-color="grey"
      always-dirty
      min="1"
      max="5"
      :thumb-size="80"
      thumb-label="always"
    >
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #thumb-label="{ value }">
        <h3>{{ pricePerKwh }} €/Wc</h3>
      </template>
    </v-slider>
    <v-row>
      <div class="card gradient" />
    </v-row>
    <v-row>
      <v-col :cols="4">
        <h3 class="text-left">
          1,00 €/Wc
        </h3>
      </v-col>
      <v-col :cols="4" />
      <v-col :cols="4">
        <h3 class="text-right">
          5,00 €/Wc
        </h3>
      </v-col>
    </v-row>
  </v-container>


  <v-btn
    text
    :x-small="$vuetify.breakpoint.xs"
    :disabled="displayLeadForm"
    @click="displayLeadForm = true"
  >
    {{ $t("lead-quote-review.check-solar-production.button") }}
  </v-btn>
</v-col>
</d>


  