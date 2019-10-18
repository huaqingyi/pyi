const { Application } = require('./runtime/application');

const app = new Application();

app.runtime(async ({ starter, watcher, config }) => {
    await watcher.close();
    await starter();
});
