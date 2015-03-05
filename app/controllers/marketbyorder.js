import Ember from 'ember';

export default Ember.ObjectController.extend({
	sortedBidOrdersProperties: ['price:desc', 'time'],
	sortedBidOrders: Ember.computed.sort('model.bidOrders', 'sortedBidOrdersProperties'),
	sortedSellOrdersProperties: ['price', 'time'],
	sortedSellOrders: Ember.computed.sort('model.sellOrders', 'sortedSellOrdersProperties'),
	buildTable: function() {
		var rows = '';
		var bidOrders = this.get('sortedBidOrders');
		var sellOrders = this.get('sortedSellOrders');
	
		var size = bidOrders.length > sellOrders.length ? bidOrders.length : sellOrders.length;

		for (var i = 0; i < size && i < 10; i++) {
			rows += '<tr>';

			if (i < bidOrders.length) {
				rows += '<td class="vertical-align">' + bidOrders.objectAt(i).get('volume') + 
						'</td><td class="vertical-align">$' + bidOrders.objectAt(i).get('price') + '</td>';
			} else {
				rows += '<td></td><td></td>';
			}

			if (i < sellOrders.length) {
				rows += '<td class="vertical-align">' + sellOrders.objectAt(i).get('volume') + 
						'</td><td class="vertical-align">$' + sellOrders.objectAt(i).get('price') + '</td>';
			} else {
				rows += '<td></td><td></td>';
			}

			rows += '</tr>';
		}

		return new Ember.Handlebars.SafeString(rows);
	}.property('sortedBidOrders', 'sortedSellOrders')
});