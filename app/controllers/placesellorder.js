import Ember from 'ember';

var PlaceSellOrderController = {
	actions: {
		submit : function(companyID) {
			if (!isPositiveInteger(this.get('vol')) || !isPositiveInteger(this.get('price'))) { return; }

			var sellOrder = this.store.createRecord('sellorder', {
				volume  : this.get('vol'),
				price   : this.get('price')
			});

			this.store.find('company', companyID).then(function(company) {
				sellOrder.set('company', company);
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

export default Ember.ObjectController.extend(PlaceSellOrderController);