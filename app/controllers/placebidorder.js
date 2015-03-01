import Ember from 'ember';

var PlaceBidOrderController = {
	actions: {
		submit : function(companyID) {
			if (!isPositiveInteger(this.get('vol')) || !isPositiveInteger(this.get('price'))) { return; }

			var bidOrder = this.store.createRecord('bidorder', {
				volume  : this.get('vol'),
				price   : this.get('price')
			});

			this.store.find('company', companyID).then(function(company) {
				bidOrder.set('company', company);
			});

			this.set('vol', '');
			this.set('price', '');
			this.transitionToRoute('stockstatesummary');
		},
		cancel : function() {
			window.history.go(-1);
		}
	}
};

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

export default Ember.ObjectController.extend(PlaceBidOrderController);