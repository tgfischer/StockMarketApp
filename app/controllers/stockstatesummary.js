import Ember from 'ember';

var StockStateSummaryController = {
	isBuying: false,
	isSelling: false,
	company: null,
	actions: {
		buying: function(company) {
			this.set('isBuying', true);
			this.set('company', company);
		},
		doneBuying: function() {
			this.set('isBuying', false);
			this.set('company', null);
		},
		selling: function(company) {
			this.set('isSelling', true);
			this.set('company', company);
		},
		doneSelling: function() {
			this.set('isSelling', false);
			this.set('company', null);
		},
		open: function(name) {
			return this.render(name, { outlet : name });
		},
		close: function() {
			return this.disconnectOutlet();
		},
		up: function(value) {
			return value > 0;
		},
		down: function(value) {
			return value < 0;
		},
		noChange: function(value) {
			return value === 0;
		}
	}
};

export default Ember.ObjectController.extend(StockStateSummaryController);