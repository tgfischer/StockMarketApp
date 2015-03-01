import DS from 'ember-data';

var Company = DS.Model.extend({
    name           : DS.attr('string'),
	openPrice      : DS.attr('number'),
	currentPrice   : DS.attr('number'),
	volume         : DS.attr('number'),
	logoURL        : DS.attr('string'),
	bidOrders      : DS.hasMany('bidorder'),
    sellOrders     : DS.hasMany('sellorder'),

    // Change this
	value: function() {
        var value = this.get('currentPrice') - this.get('openPrice');

    	if (value === 0) {
    		return value;
    	} else {
    		return value.toFixed(2);
    	}
    }.property('openPrice', 'currentPrice'),

	percent: function() {
    	var percent = Math.abs((this.get('currentPrice') / this.get('openPrice') - 1) * 100);

		if (percent === 0) {
			return  percent;
		} else {
			return percent.toFixed(2);
		}
	}.property('openPrice', 'currentPrice'),

    diffURL: function() {
        if (this.get('value') === 0) {
            return 'assets/images/noChange.png';
        } else if (this.get('value') > 0) {
            return 'assets/images/up.png';
        } else if (this.get('value') < 0) {
            return 'assets/images/down.png';
        }
    }.property('value')
});

Company.reopenClass({
	FIXTURES: [
        {
            id           : 1,
            name         : "Microsoft Corporation (MSFT)",
            openPrice    : 42.59,
            currentPrice : 42.59,
            volume       : 0,
            logoURL      : 'assets/images/microsoft.png',
            bidOrders    : [],
            sellOrders   : []
        },
        {
            id           : 2,
            name         : "Apple Inc. (AAPL)",
            openPrice    : 121.62,
            currentPrice : 121.62,
            volume       : 0,
            logoURL      : 'assets/images/apple.png',
            bidOrders    : [],
            sellOrders   : []
        },
        {
            id           : 3,
            name         : "Facebook, Inc. (FB)",
            openPrice    : 74.98,
            currentPrice : 74.98,
            volume       : 0,
            logoURL      : 'assets/images/facebook.png',
            bidOrders    : [],
            sellOrders   : []
        },
        {
            id           : 4,
            name         : "Cisco Systems, Inc.",
            openPrice    : 27.41,
            currentPrice : 27.41,
            volume       : 0,
            logoURL      : 'assets/images/cisco.png',
            bidOrders    : [],
            sellOrders   : []
        },
        {
            id           : 5,
            name         : "Intel Corporation",
            openPrice    : 0.55,
            currentPrice : 0.55,
            volume       : 0,
            logoURL      : 'assets/images/intel.png',
            bidOrders    : [],
            sellOrders   : []
        }
    ]
});

export default Company;