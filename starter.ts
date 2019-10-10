import { Application } from './demo/application';

const app = new Application();
app.runtime(({ starter }) => {
    starter();
});
