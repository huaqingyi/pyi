import { PYIBootstrap, PYIApplication, pyi } from '../../src';

@PYIBootstrap
export class Application extends PYIApplication {

}

async function bootstrap() {
    const app = new Application();
    await app.create();
    await app.bootstrap();
}

bootstrap();
