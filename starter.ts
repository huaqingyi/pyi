import { Application } from './example/application';

const app = new Application();
app.runtime(({ starter }) => {
    starter();
});
