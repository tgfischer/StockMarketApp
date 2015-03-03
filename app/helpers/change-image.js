import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
	var url = '';
	if (value < 0) {
        url = Ember.Handlebars.Utils.escapeExpression('assets/images/down.png');
    } else if (value > 0) {
        url = Ember.Handlebars.Utils.escapeExpression('assets/images/up.png');
    } else {
        url = Ember.Handlebars.Utils.escapeExpression('assets/images/noChange.png');
    }

    return new Ember.Handlebars.SafeString('<img src="' + url + '" alt="change" />');
});