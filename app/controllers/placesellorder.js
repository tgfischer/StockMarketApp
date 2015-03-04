import Ember from 'ember';

var PlaceSellOrderController = {
	actions: {
		submit : function(companyID) {
			if (!isPositiveInteger(this.get('vol')) || !isPositiveInteger(this.get('price'))) { return; }

			var requestVolume = parseInt(this.get('vol'));
			var requestPrice = parseInt(this.get('price'));
			var newVolume = 0;
			var _this = this;

			_this.store.find('company', companyID).then(function(company) {
				var bidOrders = company.get('bidOrders').sortBy('price');

				bidOrders.forEach(function(order) {
					var orderPrice = parseInt(order.get('price'));
					var orderVolume = parseInt(order.get('volume'));

					if (requestPrice >= orderPrice) {
						if (orderVolume > requestVolume) {
							orderVolume -= requestVolume;
							newVolume += requestVolume;
							requestVolume = 0;
							order.set('volume', orderVolume);
						} else {
							newVolume += orderVolume;
							requestVolume -= orderVolume;

							order.unloadRecord();
						}

						company.set('currentPrice', parseInt(requestPrice));
					}
				});

				if (requestVolume > 0) {
					var sellOrder = _this.store.createRecord('sellorder', {
						volume  : requestVolume,
						price   : requestPrice
					});

					sellOrder.set('company', company);
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
};

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

export default Ember.ObjectController.extend(PlaceSellOrderController);