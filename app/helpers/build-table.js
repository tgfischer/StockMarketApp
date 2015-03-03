import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(type, bidOrders, sellOrders) {
	bidOrders = bidOrders.sortBy('price');
	sellOrders = sellOrders.sortBy('price');

	var rows = '';

	if (type === 'price') {
		

		console.log(buyOrderGroup);
	}

	
	switch (type) {
		case 'order':
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

			break;
		case 'price':
			var buyOrderGroup = [];
			var sellOrderGroup = [];

			for (var i = 0; i < bidOrders.length; i++) {
				var order = bidOrders.objectAt(i);
				var groupedOrder = buyOrderGroup.findBy('price', order.get('price'));

				if (!groupedOrder) {
					buyOrderGroup.pushObject(Ember.Object.create({
						num: 1,
						volume: order.get('volume'),
						price: order.get('price')
					}));
				} else {
					groupedOrder.set('volume', parseInt(groupedOrder.get('volume')) + parseInt(order.get('volume')));
					groupedOrder.set('num', parseInt(groupedOrder.get('num') + 1));
				}
			}

			for (var i = 0; i < sellOrders.length; i++) {

			}

			var size = buyOrderGroup.length > sellOrderGroup.length ? buyOrderGroup.length : sellOrderGroup.length;

			for (var i = 0; i < size && i < 10; i++) {
				rows += '<tr>';

				if (i < buyOrderGroup.length) {
					rows += '<td class="vertical-align">1</td>' + 
							'<td class="vertical-align">' + buyOrderGroup.objectAt(i).get('volume') + 
							'</td><td class="vertical-align">$' + buyOrderGroup.objectAt(i).get('price') + '</td>';
				} else {
					rows += '<td></td><td></td><td></td>';
				}

				if (i < sellOrderGroup.length) {
					rows += '<td class="vertical-align">1</td>' +
							'<td class="vertical-align">' + sellOrderGroup.objectAt(i).get('volume') + 
							'</td><td class="vertical-align">$' + sellOrderGroup.objectAt(i).get('price') + '</td>';
				} else {
					rows += '<td></td><td></td><td></td>';
				}

				rows += '</tr>';
			}

			break;
		default:
			break;
	}

	return new Ember.Handlebars.SafeString(rows);
});