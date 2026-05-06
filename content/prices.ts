export const PRICES = {
  studio: {
    hourly: '£35/hr',
    loyaltyHourly: '£30/hr',
    loyaltyMonthly: '£240/month',
    loyaltyLabel: '£30/hr · £240/month',
  },
  tutoring: {
    online: '£45/hr',
    inPerson: '£60/hr',
  },
  mixing: {
    fullMixMaster: '£340',
    vocalMix: '£190',
    mastering: '£40',
  },
  packages: {
    threeTrack: { price: '£920', saving: 'Save £100' },
    fiveTrack: { price: '£1,450', saving: 'Save £250' },
  },
  addons: {
    vocalTuning: '£40',
    stemSeparation: '£75',
    rushDelivery: '+40%',
  },
  production: {
    bespoke: '£400+',
    additional: '£150+',
  },
} as const;
