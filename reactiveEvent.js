Meteor.startup(function() {
    _.each(Template, wrapCreatedAndDestroyed);
});

/**
 * Adds a dependency context to created and automatically invalidates on destroyed
 * possibly should be another package since this may be useful for other things.
 **/
function wrapCreatedAndDestroyed(template, name) {
    if(/__.*/.test(name) || template.created === undefined) {
        return;
    }

    var origCreated = template.created;
    var origDestroyed = template.destroyed;

    template.created = function() {
        var context = this;
        if(Deps.active) {
            return origCreated.call(context);
        } else {
            context._dependencyContext = Deps.autorun(function () {
                return origCreated.call(context);
            });
        }
    }

    template.destroyed = function() {
        this._dependencyContext && this._dependencyContext.stop();
        if(origDestroyed) {
            return origDestroyed.call(this);
        }
    }
}

ReactiveEvent = function() {
    var events = {}

    var api = {
        on: function(name, cb) {
            var firstRun = true;
            var ev = events[name];
            if(!ev) {
                ev = events[name] = {dep: new Deps.Dependency}
            }

            if(cb) {
                Deps.autorun(function () {
                    ev.dep.depend();
                    firstRun || cb.apply(undefined, ev.args);
                    firstRun = false;
                });
            } else {
                ev.dep.depend();
                return ev.args || [];
            }
        },
        fire: function(name) {
            var ev = events[name];
            if(ev) {
                ev.args = Array.prototype.slice.call(arguments, 1);
                ev.dep.changed();
            }
        }
    }
    return api;
};