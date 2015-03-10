import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('company');
	},
	redirect: function(model) {
		//console.log(this.store.find('company'));
		if (model.get('firstObject')) {
			return this.transitionTo('marketby', model.get('firstObject'));
		} else {
			this.transitionTo('stockstatesummary');
		}
	}
});