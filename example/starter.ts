import { Application } from './src/application';

const app = new Application();
app.bootstrap(() => {
    app.starter();
});
