import {Container, Application, Assets, Texture, Ticker, Sprite, FederatedPointerEvent} from "pixi.js";
import {ParticleEmitter} from './particle/ParticleEmitter'

export class ParticleFire extends Container {
    private app: Application;
    private particleEmitter!: ParticleEmitter;
    private particlesContainer!: Container;
    private woodTexture!: Sprite;
    constructor(app: Application) {
        super();
        this.app = app;
        this.addWoodImage();
    }

    private async addWoodImage() {
        await Assets.load('./assets/woodPile.png').then(texture => {
            this.woodTexture = Sprite.from(texture);
            this.addChildAt(this.woodTexture, 0);
            this.woodTexture.anchor.set(0.5);
            this.woodTexture.scale.set(0.5);
            this.woodTexture.position.y = 35;
        });
        this.startFire();
    }

    private async startFire() {
        await Assets.load([
            './assets/particleFire0.png',
            './assets/particleFire1.png',
            './assets/particleFire2.png',
            './assets/particleFire3.png',
            './assets/particleFire4.png'
        ])
        const particleImages = [
            './assets/particleFire0.png',
            './assets/particleFire1.png',
            './assets/particleFire2.png',
            './assets/particleFire3.png',
            './assets/particleFire4.png'
        ]
        this.particlesContainer = new Container();       
        this.addChildAt(this.particlesContainer, 1);

        this.particleEmitter = new ParticleEmitter(
            this.particlesContainer,  // Container to hold the particles
            particleImages.map(image => Texture.from(image)),  // Array of textures for particles
                0.5,  // frequency: Time in seconds between particle emissions (increased for fewer, more spread out particles)
                10,   // maxParticles: Increased to accommodate wider spread
                { x: 0, y: 0 },  // gravity: Reduced vertical gravity for slower fall
                { min: -1, max: 1 },  // rotationRange: Increased range of initial rotation for particles (in degrees)
                { min: 0, max: 0 },  // rotationSpeedRange: Increased range of rotation speed for particles (in radians/second)
                { start: 0.4, end: 0 },  // alpha: Start and end alpha values for particle lifetime (more fade)
                { start: 1.1, end: 0.7 },  // scale: Start and end scale values for particle lifetime (slightly larger)
                { x: 0, y: 0 }  // position: Initial emission point relative to the container's position (moved even higher)
            );
            
        const ticker = new Ticker();
            ticker.add(() => {
            this.particleEmitter.update(ticker.deltaTime);
        });
        ticker.start();
    }

    public destroy() {
        this.particleEmitter.destroy();
        super.destroy();
    }
}
