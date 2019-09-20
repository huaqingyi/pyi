import { Application } from './src/application';

const app = new Application();
app.runtime(({ starter }) => {
    starter();
});
