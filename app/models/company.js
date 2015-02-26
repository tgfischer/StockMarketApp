import DS from 'ember-data';

var Company = DS.Model.extend({
    name           : DS.attr('string'),
	openPrice      : DS.attr('number'),
	currentPrice   : DS.attr('number'),
	volume         : DS.attr('number'),
	logoURL        : DS.attr('string'),
	stocks         : DS.hasMany('stock'),

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
	}.property('openPrice', 'currentPrice')
});

Company.reopenClass({
	FIXTURES: [
        {
            id: 1,
            name: "Microsoft Corporation (MSFT)",
            openPrice: 42.59,
            currentPrice: 42.59,
            volume: 0,
            logoURL: 'assets/images/microsoft.png',
            stock  : []
        },
        {
            id: 2,
            name: "Apple Inc. (AAPL)",
            openPrice: 121.62,
            currentPrice: 121.62,
            volume: 0,
            logoURL: 'assets/images/apple.png',
            stock  : []
        },
        {
            id: 3,
            name: "Facebook, Inc. (FB)",
            openPrice: 74.98,
            currentPrice: 74.98,
            volume: 0,
            logoURL: 'assets/images/facebook.png',
            stock  : []
        },
        {
            id: 4,
            name: "Cisco Systems, Inc.",
            openPrice: 27.41,
            currentPrice: 27.41,
            volume: 0,
            logoURL: 'assets/images/cisco.png',
            stock  : []
        },
        {
            id: 5,
            name: "Intel Corporation",
            openPrice: 0.55,
            currentPrice: 0.55,
            volume: 0,
            logoURL: 'assets/images/intel.png',
            stock  : []
        }
    ]
});

export default Company;