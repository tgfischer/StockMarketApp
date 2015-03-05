import DS from 'ember-data';

export default DS.Model.extend({
	volume	: DS.attr('number'),
	price	: DS.attr('number'),
	time 	: DS.attr('number'),
	company	: DS.belongsTo('company')
});