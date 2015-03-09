import DS from 'ember-data';

export default DS.Model.extend({
    name           : DS.attr('string'),
    openPrice      : DS.attr('number'),
    lastPrice      : DS.attr('number'),
    value          : DS.attr('number'),
    percent        : DS.attr('number'),
    volume         : DS.attr('number'),
    logoURL        : DS.attr('string'),
    bidOrders      : DS.hasMany('bidorder'),
    sellOrders     : DS.hasMany('sellorder'),
});