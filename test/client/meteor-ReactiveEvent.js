var r = ReactiveEvent();


Template.testTemplate.created = function() {
    console.log('registering event');
    r.on('testEvent', function(n) {
        console.log('event fired', n, getTime());
        Session.set('number', n);
    });
};

Template.testTemplate.helpers({
    number: function() {
        return Session.get('number');
    },
    number2: function() {
        return r.on('testEvent')[0];
    }
});

Meteor.startup(function() {
    var count = 0;
    setInterval(function() {
        r.fire('testEvent', count++);
    }, 2000);

});

function getTime() {
    return Math.floor(new Date().getTime()/1000)
}

UI.body.events({
    'click #kickBtn': function() {
        Session.set('kick', false);
        Deps.flush();
        Session.set('kick', true);
        Deps.flush();
    }
});

UI.body.helpers({
    kick: function() {
        return Session.get('kick');
    }
});

