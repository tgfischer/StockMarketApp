import DS from 'ember-data';

export default DS.Model.extend({
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
    }.property('openPrice', 'currentPrice')
});