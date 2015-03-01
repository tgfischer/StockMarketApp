import Ember from 'ember';

var PlaceBidOrderController = {
	actions: {
		submit: function(companyID, volume, price) {
			var bidOrder = this.store.createRecord('bidorder', {
				volume  : volume,
				price   : price,
			});

			this.store.find('company', 1).then(function(company) {
				bidOrder.set('company', company);
			});

			this.transitionToRoute('stockstatesummary');
		}
	}
};

export default Ember.ObjectController.extend(PlaceBidOrderController);