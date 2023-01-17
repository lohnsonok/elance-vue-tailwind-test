<template>
  <div :class="classes.container">
    <div :class="classes.card">
      <div class="mb-8 md:w-1/2">
        <div :class="classes.row_col">
          <p class="text-left caption mb-4 max-w-xs">
            {{ $t("home.form.in-24h-we-respond") }}

            <a
              class="underline text-blue-400"
              text
              :href="
                informationalUrl(
                  '/knowledge-center/your-account/solar-potential'
                )
              "
              alt="élance potentiel solaire"
              rel="noopener noreferer"
              target="_blank"
            >
              En savoir plus
            </a>
          </p>

          <div
            :class="classes.row_col"
          >
            <div
              :class="classes.col"
            >
              <Input
                v-model="name"
                name="name"
                :label="$t('common.last-name')"
                :rules="validationRules.name"
                type="text"
                :className="classes.input"
              />
            </div>
            <div
              :class="classes.col"
            >
              <Input
                v-model="email"
                name="email"
                :label="$t('common.email-address')"
                :rules="validationRules.email"
                type="text"
                :className="classes.input"
              />
            </div>
            <div
              :class="classes.col"
            >
              <Input
                v-model="formattedSearchAddress"
                name="formattedSearchAddress"
                :label="$t('common.address')"
                :rules="formattedSearchAddress"
                type="text"
                :className="classes.input"
              />
            </div>

            <div class="flex">
              <img
                src="@/assets/icons/lock.svg"
                alt="map pin"
                class="w-6 h-6"
              >
              <a
                class="undecorated black--text"
                text
                :href="
                  informationalUrl(
                    '/knowledge-center/your-account/solar-potential'
                  )
                "
                alt="élance solar potential link"
                rel="noopener noreferer"
                target="_blank"
              >
                <small>{{ $t("home.form.verify-map-pin-location") }}</small>
              </a>
            </div>
            <div class="flex">
              <img
                src="@/assets/icons/pin_map.svg"
                alt="map pin"
                class="w-6 h-6"
              >
              <a
                class="undecorated black--text"
                text
                :href="
                  informationalUrl(
                    '/knowledge-center/your-account/data-privacy'
                  )
                "
                alt="élance privacy policy link"
                rel="noopener noreferer"
                target="_blank"
              >
                <small>{{ $t("common.stay-private") }}</small>
              </a>
            </div>

            <div
          :class="classes.col"
        >
          <button
            type="submit"
            :loading="saving"
            :disabled="!valid || saving || saved || loadingAddress || loadingMap"
            :class="classes.button"
            @click="displayLeadForm = true"
          >
          {{ $t("lead-quote-review.check-solar-production.button") }}
          </button>
        </div>

          </div>
        </div>
      </div>
      <iframe
          id="gmap_canvas"
          title="address"
          class="mb-8 h-96 md:h-full md:w-1/2"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2626.70194972017!2d2.3243698!3d48.825748!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671ae17e3410d%3A0x59a503e0b439e9f3!2s101%20Av.%20du%20G%C3%A9n%C3%A9ral%20Leclerc%2C%2075014%20Paris%2C%20France!5e0!3m2!1sfr!2sbj!4v1664124984858!5m2!1sfr!2sbj"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        />
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePhone } from '@/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash/debounce';
import mocks from '@/mocks/api';

import Input from '@/components/inputs/Input.vue';

export default {
  name: 'LeadForm',
  components: {
    Input,
  },
  props: {
    quoteReviewDetails: {
      required: false,
      type: Object,
    },
  },

  data() {
    return {
      classes: {
        container: 'mx-auto flex flex-column w-full',
        card: 'flex md:flex-row flex-col justify-center align-center bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-300 border-opacity-50 w-full',
        row: 'flex md:flex-row flex-col',
        row_col: 'flex flex-col',
        col: 'md:px-4 px-0 mt-2',
        form: 'md:px-4 px-0 mt-8',
        input: 'rounded-lg border-b border-gray-100 bg-gray-100 px-5 py-2.5 text-left text-sm font-medium text-gray-600 transition-all hover:border-gray-200 hover:bg-gray-200 focus:ring focus:ring-gray-50 disabled:opacity-70',
        button: 'rounded-lg border border-yellow-100 bg-yellow-100 px-5 py-2.5 text-center text-sm font-medium text-yellow-600 transition-all hover:border-yellow-200 hover:bg-yellow-200 focus:ring focus:ring-yellow-50 disabled:opacity-70',
      },
      name: '',
      email: '',
      searchAddress: {},
      phone: '',
      wantsCall: true,


      valid: false,
      saving: false,
      saved: false,

      map: {
        center: { lat: 45.8986535, lng: 6.934 },
        zoom: 3,
        marker: null,

        options: {
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          disableDefaultUi: true,
          tilt: 0,
          rotateControl: false,
        },

        addressComponents: {
          houseNumber: null,
          streetLine: null,
          city: null,
          district: null,
          department: null,
          country: null,
          postcode: null,
        },
      },

      loadingAddress: false,
      loadingMap: false,

      validationRules: {
        email: [
          (v) => !!v || this.$t('common.email-is-required'),
          (v) => validateEmail(v) || this.$t('common.email-must-be-valid'),
        ],

        name: [(v) => !!v || this.$t('common.last-name-is-required')],

        address: [(v) => !!v || this.$t('common.address-is-required')],

        phone: [
          (v) => !!v || this.$t('common.phone-number-is-required'),
          (v) => (v ? validatePhone(v) : true)
            || this.$t('common.phone-number-must-be-valid'),
        ],
      },

      geocoder: null,
      autocompleter: null,

      searchResults: [],
      search: null,
      hover: false,

    };
  },

  computed: {
    // You cant display the gmaps component when navigator is googlebot
    showMap() {
      return !(
        navigator.userAgent.toString().includes('Googlebot')
        || navigator.userAgent.toString().includes('HeadlessChrome')
      );
    },

    formattedSearchAddress: {
      get() {
        return this.searchAddress.description;
      },
      set(newValue) {
        this.searchAddress = { description: newValue, placeId: null };
      },
    },

    lead() {
      if (this.quoteReviewDetails === undefined) {
        return {
          name: this.name,
          email: this.email,
          phone: this.phone,
          origin: this.$route.fullPath,
          address: {
            lat: this.map.marker.lat(),
            lng: this.map.marker.lng(),
            houseNumber: this.map.addressComponents.houseNumber,
            streetLine: this.map.addressComponents.streetLine,
            city: this.map.addressComponents.city,
            district: this.map.addressComponents.district,
            department: this.map.addressComponents.department,
            country: this.map.addressComponents.country,
            postcode: this.map.addressComponents.postcode,
          },
        };
      }
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('phone', this.phone);
      formData.append('origin', this.$route.fullPath);
      formData.append('address.lat', this.map.marker.lat());
      formData.append('address.lng', this.map.marker.lng());
      formData.append('address.houseNumber', this.map.addressComponents.houseNumber);
      formData.append('address.streetLine', this.map.addressComponents.streetLine);
      formData.append('address.city', this.map.addressComponents.city);
      formData.append('address.district', this.map.addressComponents.district);
      formData.append('address.department', this.map.addressComponents.department);
      formData.append('address.country', this.map.addressComponents.country);
      formData.append('address.postcode', this.map.addressComponents.postcode);

      formData.append('systemSize', this.quoteReviewDetails.systemSize);
      formData.append('quoteAfterTaxAmount', this.quoteReviewDetails.systemSize);
      formData.append('quote', this.quoteReviewDetails.file);
      return formData;
    },
  },

  watch: {
    search(val) {
      if (!val) return;

      if (!this.autocompleter) return;

      if (this.loadingAddress) return;

      this.autocompleter.getPlacePredictions(
        {
          input: val,
          componentRestrictions: { country: 'FR' },
        },
        this.displaySuggestions,
      );
    },
  },


  mounted() {
    /* if (this.showMap) {
      this.$gmapApiPromiseLazy().then(({ maps }) => {
        this.geocoder = new maps.Geocoder();
        this.autocompleter = new maps.places.AutocompleteService();
      });
    } */
  },


  methods: {
    informationalUrl(url) {
      return process.env.BASE_URL + url;
    },

    onAddressInput: debounce(function (item) {
      this.updateMarkerFromAddress(item);
    }, 600),

    updateAddressFromMarker(event) {
      if (!this.geocoder) return;
      console.log('🚀 ~ file: LeadQuoteReviewForm.vue:618 ~ updateAddressFromMarker ~ this.geocoder', this.geocoder);

      this.loadingAddress = true;

      this.map.marker = event.latLng;

      // eslint-disable-next-line consistent-return
      return new Promise((resolve, reject) => {
        this.geocoder.geocode(
          {
            location: event.latLng,
          },
          (results, status) => {
            if (status === 'OK' && results.length > 0) {
              this.searchResults = [{ description: results[0].formatted_address, placeId: results[0].place_id }];
              this.searchAddress = { description: results[0].formatted_address, placeId: results[0].place_id };

              this.map.addressComponents.houseNumber = this.scrapeAddressComponent(results[0], 'street_number')
                || this.scrapeAddressComponent(results[0], 'subpremise');
              this.map.addressComponents.streetLine = this.scrapeAddressComponent(results[0], 'street_address')
                || this.scrapeAddressComponent(results[0], 'route')
                || this.scrapeAddressComponent(results[0], 'colloquial_area');
              this.map.addressComponents.city = this.scrapeAddressComponent(
                results[0],
                'locality',
              );
              this.map.addressComponents.district = this.scrapeAddressComponent(
                results[0],
                'administrative_area_level_2',
              );
              this.map.addressComponents.department = this.scrapeAddressComponent(
                results[0],
                'administrative_area_level_1',
              );
              this.map.addressComponents.country = this.scrapeAddressComponent(
                results[0],
                'country',
              );
              this.map.addressComponents.postcode = this.scrapeAddressComponent(
                results[0],
                'postal_code',
              );

              this.map.addressComponents.gmapsPlaceId = results[0].place_id;

              this.loadingAddress = false;
              resolve(results[0].formatted_address);
            } else {
              this.loadingAddress = false;
              reject(status);
            }
          },
        );
      });
    },

    updateMarkerFromAddress(item) {
      if (!this.geocoder) return;

      this.loadingMap = true;

      const geocodeQuery = (item) ? {
        placeId: item.placeId,
      } : {
        address: this.searchAddress.description,
      };

      // eslint-disable-next-line consistent-return
      return new Promise((resolve, reject) => {
        this.geocoder.geocode(
          geocodeQuery,
          (results, status) => {
            if (status === 'OK' && results.length > 0) {
              this.map.marker = results[0].geometry.location;
              this.map.addressComponents.houseNumber = this.scrapeAddressComponent(results[0], 'street_number')
                || this.scrapeAddressComponent(results[0], 'subpremise');
              this.map.addressComponents.streetLine = this.scrapeAddressComponent(results[0], 'street_address')
                || this.scrapeAddressComponent(results[0], 'route')
                || this.scrapeAddressComponent(results[0], 'colloquial_area');
              this.map.addressComponents.city = this.scrapeAddressComponent(
                results[0],
                'locality',
              );
              this.map.addressComponents.district = this.scrapeAddressComponent(
                results[0],
                'administrative_area_level_2',
              );
              this.map.addressComponents.department = this.scrapeAddressComponent(
                results[0],
                'administrative_area_level_1',
              );
              this.map.addressComponents.country = this.scrapeAddressComponent(
                results[0],
                'country',
              );
              this.map.addressComponents.postcode = this.scrapeAddressComponent(
                results[0],
                'postal_code',
              );

              this.map.addressComponents.gmapsPlaceId = results[0].place_id;

              if (this.$vuetify.breakpoint.mdAndUp) {
                this.$refs.mapDesktop.$mapPromise.then((map) => {
                  map.panTo(results[0].geometry.location);
                });
              } else {
                this.$refs.mapMobile.$mapPromise.then((map) => {
                  map.panTo(results[0].geometry.location);
                });
              }

              if (this.map.zoom === 3) this.map.zoom = 20;

              this.loadingMap = false;
              resolve(results[0].geometry.location);
            } else {
              this.loadingMap = false;
              reject(status);
            }
          },
        );
      });
    },

    scrapeAddressComponent(place, componentName) {
      const component = place.address_components.filter((c) => c.types.includes(componentName))[0];

      return component ? component.long_name : null;
    },

    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions.map(
        (prediction) => ({
          description: prediction.description,
          placeId: prediction.place_id,
        }),
      );
    },


    saveLead() {
      this.saving = true;

      const endpoint = mocks.postLeadQuote;

      endpoint(this.lead)
        .then(() => {
          this.saved = true;
          window.location = '/rendez-vous';
          // this.$router.push({ name: "demo-scheduling" });
        })
        .catch(() => {
          this.$store.dispatch('snackbars/push', {
            content: this.$t('common.unknown-error'),
            color: 'waiting',
          });
        })
        .finally(() => {
          this.saving = false;
        });
    },
  },
};

</script>

<style>
.mobile-map {
  height: 30vh;
}

.mobile-button {
  font-size: 10px;
}
</style>
