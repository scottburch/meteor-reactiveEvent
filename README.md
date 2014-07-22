meteor-reactiveEvent
====================

A event package that works with Meteor's reactivity.



## Examples

### Creating a new reactive context

    var event = ReactiveEvent()
    
Returns an object with the following methods:
    
+ on: function(eventName, [optional callback])

    NOTE: if callback provided it will be called with the arguments passed to fire()
    
+ fire: function(eventName, args...)    



### Using without a reactive context

reactiveEvent will behave like any other event library when used outside of a reactive context.

    var ev = ReactiveEvent()
    ev.on('some.event', function(x) {console.log(x)});  // 'foo'
    ev.fire('some.event', 'foo');

### Using inside of a reactive context

Inside of a reactive context, reactiveEvent will take advantage of Meteors reactive context to automatically unregister
itself.  This is useful for templates.

    Template.helpers({
        foo: function() {
            return ev.on('some.event');  // returns the arguments passed to fire() as an array [arg1, arg2]
        }
    })
    
    // somewhere else in code
    ev.fire('some.event', arg1, arg2);

In the above example, the 'foo' helper will be called each time the event is fired.

### Using inside of Template.created()

Meteor does not provide a reactive context inside of Template.created() so reactiveEvent wraps created() and destroyed() 
to make it work.  You should use the callback function inside of created() so that other things inside of created do not
 run again.  You do not need to do anything special in destroyed().  The event will be unregistered automatically when
 the template is destroyed.
 
    Template.foo.created = function() {
        ev.on('some.event', function(x) {console.log(x)}; // 'bar'
    }
    
    // somewhere else in code
    ev.fire('some.event', 'bar');
 
 