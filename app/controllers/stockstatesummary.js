import Ember from 'ember';

var StockStateSummaryController = {
	state: 'alphabetical',
	companySortProperties: ['name'],
	sortedCompanies: Ember.computed.sort('model', 'companySortProperties'),
	actions: {
		open: function(route, companyID) {
			this.transitionToRoute(route, companyID);
		},
		activeByVolume: function() {
			if (this.get('state') != 'activeByVolume') {
				this.set('companySortProperties', ['volume:desc']);
				this.set('state', 'activeByVolume');
			} else {
				this.set('companySortProperties', ['name']);
				this.set('state', 'alphabetical');
			}
		},
		gainers: function() {
			if (this.get('state') != 'gainers') {
				this.set('companySortProperties', ['volume:desc']);
				this.set('state', 'gainers');
			} else {
				this.set('companySortProperties', ['name']);
				this.set('state', 'alphabetical');
			}
		},
		losers: function() {
			if (this.get('state') != 'losers') {
				this.set('companySortProperties', ['volume:desc']);
				this.set('state', 'losers');
			} else {
				this.set('companySortProperties', ['name']);
				this.set('state', 'alphabetical');
			}
		}
	}
};

export default Ember.ArrayController.extend(StockStateSummaryController);