import { Application } from './template/application';

const app = new Application();
app.runtime(({ starter }) => {
    starter();
});
