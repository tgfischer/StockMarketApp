import Ember from 'ember';

export default Ember.Route.extend({
	/*setupController: function(controller, model) {
		this._super('model', model);
	},*/
	model: function() {
		return this.store.find('bidorder', { company : ':company_id' });
	}
});