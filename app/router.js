import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  renderTemplate: function() {
    //this.render({ outlet: 'placebidorder' });
    //this.render({ outlet: 'placesellorder' });
  }
});

Router.map(function() {
	this.resource('stockstatesummary', { path : 'dashboard' },  function() {
		this.resource('marketby', { path : 'company/:company_id' });
		this.resource('placebidorder', { path : 'bid/:company_id' });
	});
	//this.resource('placebidorder');
	//this.resource('placesellorder');
});

export default Router;
