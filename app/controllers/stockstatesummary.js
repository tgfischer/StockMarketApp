import Ember from 'ember';

function reverse(arr) {
	var newArr = [];

	for (var i = arr.length - 1; i > -1; i--) {
		newArr.push(arr.objectAt(i));
	}

	return newArr;
}

export default Ember.ArrayController.extend({
	state: 'alphabetical',
	companySortProperties: ['name'],
	sortedCompanies: Ember.computed.sort('filteredCompanies', 'companySortProperties'),
	filteredCompanies: function() {
		switch (this.get('state')) {
			case 'gainers':
				return this.get('model').filter(function(company) {
					return company.get('value') > 0;
				});
			case 'losers':
				return this.get('model').filter(function(company) {
					return company.get('value') < 0;
				});
			default:
				return this.get('model');
		}
	}.property('model', 'state'),
	changeImage: function(value) {
		var url = '';

		if (value < 0) {
	        url = Ember.Handlebars.Utils.escapeExpression('assets/images/down.png');
	    } else if (value > 0) {
	        url = Ember.Handlebars.Utils.escapeExpression('assets/images/up.png');
	    } else {
	        url = Ember.Handlebars.Utils.escapeExpression('assets/images/noChange.png');
	    }

	    return new Ember.Handlebars.SafeString('<img src="' + url + '" alt="change" />');
	}.property(''),
	actions: {
		open: function(route, companyID) {
			this.transitionToRoute(route, companyID);
		},
		activeByVolume: function() {
			$('a').parent().removeClass('active');

			if (this.get('state') != 'activeByVolume') {
				this.set('companySortProperties', ['volume:desc']);
				this.set('state', 'activeByVolume');
				$('a:contains("Most Active By Volume")').parent().addClass('active');
			} else {
				this.set('companySortProperties', ['name']);
				this.set('state', 'alphabetical');
			}
		},
		gainers: function() {
			$('a').parent().removeClass('active');

			if (this.get('state') != 'gainers') {
				this.set('companySortProperties', ['value:desc']);
				this.set('state', 'gainers');
				$('a:contains("Gainers")').parent().addClass('active');
			} else {
				this.set('companySortProperties', ['name']);
				this.set('state', 'alphabetical');
			}
		},
		losers: function() {
			$('a').parent().removeClass('active');
			
			if (this.get('state') != 'losers') {
				this.set('companySortProperties', ['value']);
				this.set('state', 'losers');
				$('a:contains("Losers")').parent().addClass('active');
			} else {
				this.set('companySortProperties', ['name']);
				this.set('state', 'alphabetical');
			}
		}
	}
});