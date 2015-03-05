import Ember from 'ember';

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) { return i; }
    }
    return -1;
}

export default Ember.ObjectController.extend({
	sortedBidOrdersProperties: ['price:desc', 'time'],
	sortedBidOrders: Ember.computed.sort('model.bidOrders', 'sortedBidOrdersProperties'),
	sortedSellOrdersProperties: ['price', 'time'],
	sortedSellOrders: Ember.computed.sort('model.sellOrders', 'sortedSellOrdersProperties'),
	buildTable: function() {
		var rows = '';
		var bidOrders = this.get('sortedBidOrders');
		var sellOrders = this.get('sortedSellOrders');

		var bidOrderGroup = [];
		var sellOrderGroup = [];

		for (var i = 0; i < bidOrders.length; i++) {
			var order = bidOrders.objectAt(i);
			var groupedOrder = bidOrderGroup[arrayObjectIndexOf(bidOrderGroup, order.get('price'), 'price')];

			if (!groupedOrder) {
				bidOrderGroup.push({
					num: 1,
					volume: order.get('volume'),
					price: order.get('price')
				});
			} else {
				groupedOrder.volume += parseInt(order.get('volume'));
				groupedOrder.num++;
			}
		}

		for (var i = 0; i < sellOrders.length; i++) {
			var order = sellOrders.objectAt(i);
			var groupedOrder = sellOrderGroup[arrayObjectIndexOf(sellOrderGroup, order.get('price'), 'price')];

			if (!groupedOrder) {
				sellOrderGroup.push({
					num: 1,
					volume: order.get('volume'),
					price: order.get('price')
				});
			} else {
				groupedOrder.volume += parseInt(order.get('volume'));
				groupedOrder.num++;
			}
		}

		var size = bidOrderGroup.length > sellOrderGroup.length ? bidOrderGroup.length : sellOrderGroup.length;

		for (var i = 0; i < size && i < 10; i++) {
			rows += '<tr>';

			if (i < bidOrderGroup.length) {
				rows += '<td class="vertical-align">' + bidOrderGroup[i].num + '</td>' + 
						'<td class="vertical-align">' + bidOrderGroup[i].volume + 
						'</td><td class="vertical-align">$' + bidOrderGroup[i].price + '</td>';
			} else {
				rows += '<td></td><td></td><td></td>';
			}

			if (i < sellOrderGroup.length) {
				rows += '<td class="vertical-align">' + sellOrderGroup[i].num + '</td>' +
						'<td class="vertical-align">' + sellOrderGroup[i].volume + 
						'</td><td class="vertical-align">$' + sellOrderGroup[i].price + '</td>';
			} else {
				rows += '<td></td><td></td><td></td>';
			}

			rows += '</tr>';
		}

		return new Ember.Handlebars.SafeString(rows);
	}.property('sortedBidOrders', 'sortedSellOrders')
});