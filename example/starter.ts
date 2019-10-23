import { Application } from './src/application';

const app = new Application();
app.bootstrap(() => {
    // app.listen(3000);
    app.starter();
});
