import Ember from 'ember';

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

export default Ember.ObjectController.extend({
	sortedSellOrdersProperties: ['price', 'time'],
	sortedSellOrders: Ember.computed.sort('model.sellOrders', 'sortedSellOrdersProperties'),
	actions: {
		submit : function(companyID) {
			if (!isPositiveInteger(this.get('vol')) || !isPositiveInteger(this.get('price'))) { return; }

			var requestVolume = parseInt(this.get('vol'));
			var requestPrice = parseInt(this.get('price'));
			var newVolume = 0;
			var _this = this;

			var sellOrders = _this.get('sortedSellOrders');

			_this.store.find('company', companyID).then(function(company) {
				for (var i = 0; i < sellOrders.length; i++) {
					var orderPrice = parseInt(sellOrders.objectAt(i).get('price'));
					var orderVolume = parseInt(sellOrders.objectAt(i).get('volume'));

					if (requestPrice >= orderPrice) {
						if (orderVolume > requestVolume) {
							orderVolume -= requestVolume;
							newVolume += requestVolume;
							requestVolume = 0;
							sellOrders.objectAt(i).set('volume', orderVolume);
						} else {
							newVolume += orderVolume;
							requestVolume -= orderVolume;

							sellOrders.objectAt(i).unloadRecord();
							i--;
						}

						company.set('currentPrice', parseInt(orderPrice));
					}
				}

				if (requestVolume > 0) {
					var bidOrder = _this.store.createRecord('bidorder', {
						volume  : requestVolume,
						price   : requestPrice,
						time    : Math.floor(Date.now() / 1000)
					});

					bidOrder.set('company', company);
				}

				company.set('volume', parseInt(company.get('volume')) + newVolume);
			});

			this.set('vol', '');
			this.set('price', '');
			this.transitionToRoute('marketby', companyID);
		},
		cancel : function() {
			window.history.go(-1);
		}
	}
});