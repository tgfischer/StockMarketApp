import Ember from 'ember';

var StockStateSummaryController = {
	state: 'alphabetical',
	companySortProperties: ['name'],
	sortedCompanies: Ember.computed.sort('model', 'companySortProperties'),
	filteredCompanies: function() {
		switch (this.get('state')) {
			case 'gainers':
				return this.get('sortedCompanies').filter(function(company) {
					return company.get('value') > 0;
				});

				break;
			case 'losers':
				return this.get('sortedCompanies').filter(function(company) {
					return company.get('value') < 0;
				});

				break;
			default:
				return this.get('sortedCompanies');

				break;
		}
	}.property('sortedCompanies', 'state'),
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