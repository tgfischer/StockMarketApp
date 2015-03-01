import Ember from 'ember';

export default Ember.Route.extend({
	model: function(company) {
		return this.store.find('company', company.company_id);
	}
});