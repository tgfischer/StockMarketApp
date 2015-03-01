import DS from 'ember-data';

export default DS.Model.extend({
	type	: DS.attr('string'),
	volume	: DS.attr('number'),
	price	: DS.attr('number'),
	company	: DS.belongsTo('company')
});