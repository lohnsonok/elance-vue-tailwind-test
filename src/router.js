const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './Home.vue'),
  },
  {
    path: '/verifier-devis',
    name: 'lead-quote-review',
    component: () => import(/* webpackChunkName: "lead-quote-review" */ './LeadQuoteReview.vue'),
  },
];

export default routes;
