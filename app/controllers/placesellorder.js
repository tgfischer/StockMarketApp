import Ember from 'ember';

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

function computeValue(lastPrice, openPrice) {
	var value = lastPrice - openPrice;

    if (value === 0) {
        return value;
    } else {
        return value.toFixed(2);
    }
}

function computePercent(lastPrice, openPrice) {
	var percent = Math.abs((lastPrice / openPrice - 1) * 100);

    if (percent === 0) {
        return  percent;
    } else {
        return percent.toFixed(2);
    }
}

export default Ember.ObjectController.extend({
	sortedBidOrdersProperties: ['price:desc', 'time'],
	sortedBidOrders: Ember.computed.sort('model.bidOrders', 'sortedBidOrdersProperties'),
	actions: {
		submit : function(companyID) {
			if (!isPositiveInteger(this.get('vol')) || !isPositiveInteger(this.get('price'))) { return; }
			
			var requestVolume = parseInt(this.get('vol'));
			var requestPrice = parseFloat(this.get('price'));
			var newVolume = 0;
			var _this = this;
			
			var bidOrders = _this.get('sortedBidOrders');

			_this.store.find('company', companyID).then(function(company) {
				for (var i = 0; i < bidOrders.length; i++) {
					var orderPrice = parseFloat(bidOrders.objectAt(i).get('price'));
					var orderVolume = parseInt(bidOrders.objectAt(i).get('volume'));
					
					if (requestPrice <= orderPrice) {
						if (orderVolume > requestVolume) {
							orderVolume -= requestVolume;
							newVolume += requestVolume;
							requestVolume = 0;
							bidOrders.objectAt(i).set('volume', orderVolume);
						} else {
							newVolume += orderVolume;
							requestVolume -= orderVolume;

							bidOrders.objectAt(i).unloadRecord();
							i--;
						}

						company.set('lastPrice', parseFloat(requestPrice));
						company.set('value', computeValue(parseFloat(company.get('lastPrice')), parseFloat(company.get('openPrice'))));
						company.set('percent', computePercent(parseFloat(company.get('lastPrice')), parseFloat(company.get('openPrice'))));
					}
				}

				if (requestVolume > 0) {
					var sellOrder = _this.store.createRecord('sellorder', {
						volume  : requestVolume,
						price   : requestPrice,
						time    : Math.floor(Date.now() / 1000)
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
});