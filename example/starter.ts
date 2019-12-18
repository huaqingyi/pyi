import { Application } from './application';

const app = new Application();
app.bootstrap(() => {
    app.starter();
});
// console.log(app);
