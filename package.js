Package.describe({
    summary: "Reactive events"
});

Package.on_use(function (api) {
    api.use(['deps', 'ejson'], ['client']);
    if (api.export) {
        api.export('ReactiveEvent', ['client']);
    }
    api.add_files('reactiveEvent.js', ['client']);
});

//Package.on_test(function (api) {
//    api.use(['coffeescript', 'tinytest', 'variable']);
//    api.add_files('variable-tests.coffee', ['client', 'server']);
//});