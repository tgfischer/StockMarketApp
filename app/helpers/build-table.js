import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(type, bidOrders, sellOrders) {
	bidOrders.sortBy('price');
	sellOrders.sortBy('price');

	var size = bidOrders.length > sellOrders.length ? bidOrders.length : sellOrders.length;

	var rows = '';

	for (var i = 0; i < size && i < 10; i++) {
		switch (type) {
			case 'order':
				rows += '<tr>';

				if (i < bidOrders.length) {
					rows += '<td class="vertical-align">' + bidOrders.objectAt(i).get('volume') + '</td><td class="vertical-align">$' + bidOrders.objectAt(i).get('price') + '</td>';
				} else {
					rows += '<td></td><td></td>';
				}

				if (i < sellOrders.length) {
					rows += '<td class="vertical-align">' + sellOrders.objectAt(i).get('volume') + '</td><td class="vertical-align">$' + sellOrders.objectAt(i).get('price') + '</td>';
				} else {
					rows += '<td></td><td></td>';
				}

				rows += '</tr>';
				break;
			case 'price':
				rows += '<tr>';

				if (i < bidOrders.length) {
					rows += '<td class="vertical-align">1</td><td class="vertical-align">' + bidOrders.objectAt(i).get('volume') + '</td><td class="vertical-align">$' + bidOrders.objectAt(i).get('price') + '</td>';
				} else {
					rows += '<td></td><td></td><td></td>';
				}

				if (i < sellOrders.length) {
					rows += '<td class="vertical-align">1</td><td class="vertical-align">' + sellOrders.objectAt(i).get('volume') + '</td><td class="vertical-align">$' + sellOrders.objectAt(i).get('price') + '</td>';
				} else {
					rows += '<td></td><td></td><td></td>';
				}

				rows += '</tr>';
				break;
			default:
				break;
		}
	}

	return new Ember.Handlebars.SafeString(rows);
});