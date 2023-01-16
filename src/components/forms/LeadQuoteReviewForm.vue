<template>
  <v-container>
    <v-container
      v-if="$vuetify.breakpoint.mdAndUp"
      class="ml-n3 d-md-flex flex-column"
    >
      <v-row>
        <v-col
          :cols="12"
          :md="5"
        >
          <a
            class="undecorated black--text"
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
            <p class="text-left caption mb-4">
              {{ $t("home.form.in-24h-we-respond") }}
            </p>
          </a>
          <v-form
            v-model="valid"
            @submit.prevent="saveLead"
          >
            <v-text-field
              v-model="name"
              :label="$t('common.last-name')"
              :rules="validationRules.name"
              filled
              rounded
              required
              hide-details
              dense
              class="my-4"
            />
            <v-text-field
              v-model="email"
              :label="$t('common.email-address')"
              :rules="validationRules.email"
              filled
              rounded
              required
              hide-details
              dense
              class="my-4"
            />
            <v-autocomplete
              v-model="formattedSearchAddress"
              :items="searchResults"
              :loading="loadingAddress"
              :disabled="loadingAddress"
              :search-input.sync="search"
              item-text="description"
              return-object
              dense
              filled
              rounded
              clearable
              :rules="validationRules.address"
              :label="
                geocoder
                  ? $t('common.address')
                  : $t('home.form.loading-google-maps')
              "
              @input="onAddressInput"
            >
              <template #no-data>
                <v-list-item>
                  <v-list-item-title>
                    {{ $t("common.no-address-found") }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #selection="{ attr, on, item, selected }">
                <v-list-item>
                  <v-list-item-content>
                    <span v-text="item.description" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
            <div class="mt-n2 mb-2">
              <v-icon color="black">
                mdi-map-marker
              </v-icon>
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
            <v-icon color="black">
              mdi-lock
            </v-icon>
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
            <v-row class="mt-4">
              <v-switch
                v-model="wantsCall"
                class="ml-5"
                inset
              >
                <template #label>
                  <a v-if="wantsCall">
                    {{ $t("home.form.want-to-be-called") }}
                  </a>
                  <a v-else>
                    {{ $t("home.form.do-no-want-to-be-called") }}
                  </a>
                </template>
              </v-switch>
            </v-row>
            <template v-if="wantsCall">
              <v-text-field
                v-model="phone"
                :label="$t('common.phone-number')"
                :rules="validationRules.phone"
                filled
                rounded
                required
                hide-details
                dense
                class="my-4"
              />
            </template>

            <v-btn
              block
              large
              :elevation="hover ? 12 : 5"
              type="submit"
              :loading="saving"
              :disabled="
                !valid || saving || saved || loadingAddress || loadingMap
              "
              class="mt-4 text-center black--text"
            >
              {{ $t("lead-quote-review.check-solar-production.button") }}
            </v-btn>
          </v-form>
        </v-col>
        <v-col
          v-if="showMap"
          :cols="12"
          :md="7"
          class="my-0 py-0 pa-10"
        >
          <gmap-map
            ref="mapDesktop"
            class="fill-height map ma-0 pa-0"
            :class="{ 'loading-map': loadingMap }"
            :center="map.center"
            :zoom="map.zoom"
            :options="map.options"
            map-type-id="satellite"
            @click="updateAddressFromMarker"
          >
            <gmap-marker
              v-if="map.marker"
              :position="map.marker"
            />
          </gmap-map>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-else-if="$vuetify.breakpoint.smAndDown"
      :class="$vuetify.breakpoint.xs ? 'ml-n4' : 'ml-n8'"
    >
      <v-row>
        <v-col :cols="12">
          <a
            class="undecorated black--text"
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
            <p class="text-left caption mb-4">
              {{ $t("home.form.in-24h-we-respond") }}
            </p>
          </a>
          <v-form
            v-model="valid"
            @submit.prevent="saveLead"
          >
            <v-text-field
              v-model="name"
              :label="$t('common.last-name')"
              :rules="validationRules.name"
              rounded
              filled
              dense
              required
              hide-details
              class="my-2"
            />
            <v-text-field
              v-model="email"
              :label="$t('common.email-address')"
              :rules="validationRules.email"
              rounded
              filled
              dense
              required
              hide-details
              class="my-2"
            />
            <v-autocomplete
              v-model="formattedSearchAddress"
              :items="searchResults"
              :loading="loadingAddress"
              :disabled="loadingAddress"
              :search-input.sync="search"
              return-object
              item-text="description"
              dense
              rounded
              filled
              clearable
              :rules="validationRules.address"
              :label="
                geocoder
                  ? $t('common.address')
                  : $t('home.form.loading-google-maps')
              "
              @input="onAddressInput"
            >
              <template #no-data>
                <v-list-item>
                  <v-list-item-title>
                    {{ $t("common.no-address-found") }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #selection="{ attr, on, item, selected }">
                <v-list-item>
                  <v-list-item-content>
                    <span v-text="item.description" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
            <v-container v-if="showMap">
              <gmap-map
                ref="mapMobile"
                class="fill-height mobile-map"
                :class="{ 'loading-map': loadingMap }"
                :center="map.center"
                :zoom="map.zoom"
                :options="map.options"
                map-type-id="satellite"
                @click="updateAddressFromMarker"
              >
                <gmap-marker
                  v-if="map.marker"
                  :position="map.marker"
                />
              </gmap-map>
            </v-container>

            <div class="mb-2 mt-n2">
              <v-icon color="black">
                mdi-map-marker
              </v-icon>
              <a
                class="undecorated black--text"
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
                <small>{{ $t("home.form.verify-map-pin-location") }}</small>
              </a>
            </div>
            <v-icon color="black">
              mdi-lock
            </v-icon>
            <a
              class="undecorated black--text"
              text
              :href="
                informationalUrl(
                  '/knowledge-center/legal/déclaration-confidentialité'
                )
              "
              alt="élance privacy policy link"
              rel="noopener noreferer"
              target="_blank"
            >
              <small>{{ $t("common.stay-private") }}</small>
            </a>
            <v-row class="mt-4">
              <v-switch
                v-model="wantsCall"
                class="ml-5"
                inset
              >
                <template #label>
                  <a v-if="wantsCall">
                    {{ $t("home.form.want-to-be-called") }}
                  </a>
                  <a v-else>
                    {{ $t("home.form.do-no-want-to-be-called") }}
                  </a>
                </template>
              </v-switch>
            </v-row>
            <template v-if="wantsCall">
              <v-text-field
                v-model="phone"
                :label="$t('common.phone-number')"
                :rules="validationRules.phone"
                rounded
                filled
                required
                hide-details
                dense
                class="my-4"
              />
            </template>
            <v-row>
              <v-btn
                block
                :elevation="hover ? 12 : 5"
                type="submit"
                :loading="saving"
                :disabled="
                  !valid || saving || saved || loadingAddress || loadingMap
                "
                class="mobile-button mt-4 text-center black--text mx-0 pa-0"
              >
                {{ $t("lead-quote-review.check-solar-production.button") }}
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { validateEmail, validatePhone } from '@/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash/debounce';
import mocks from '@/mocks/api';

export default {
  name: 'LeadForm',

  props: {
    quoteReviewDetails: {
      required: false,
      type: Object,
    },
  },

  data() {
    return {
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
    if (this.showMap) {
      this.$gmapApiPromiseLazy().then(({ maps }) => {
        this.geocoder = new maps.Geocoder();
        this.autocompleter = new maps.places.AutocompleteService();
      });
    }
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
