import {Container, Application} from "pixi.js";

export class ParticleFire extends Container {
    private app: Application;
    constructor(app: Application) {
        super();
        this.app = app;
    }
}