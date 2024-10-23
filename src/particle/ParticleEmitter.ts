import { Container, Texture } from 'pixi.js';
import { Particle } from './Particle';

export class ParticleEmitter {
  public particles: Particle[] = [];
  public container: Container;
  public frequency: number;
  public timeSinceLastEmit: number = 0;
  public maxParticles: number;
  public particleTextures: Texture[];
  public gravity: { x: number, y: number };
  public rotationRange: { min: number, max: number };
  public rotationSpeedRange: { min: number, max: number };
  public alpha: { start: number, end: number };
  public scale: { start: number, end: number };
  public emitting: boolean = true; // Flag for controlling particle generation
  public position: { x: number; y: number };

  constructor(
    container: Container,
    particleTextures: Texture[],
    frequency: number,
    maxParticles: number,
    gravity: { x: number, y: number },
    rotationRange: { min: number, max: number },
    rotationSpeedRange: { min: number, max: number },
    alpha: { start: number, end: number },
    scale: { start: number, end: number },
    position: {x: number, y: number}
  ) {
    this.container = container;
    this.particleTextures = particleTextures;
    this.frequency = frequency;
    this.maxParticles = maxParticles;
    this.gravity = gravity;
    this.rotationRange = rotationRange;
    this.rotationSpeedRange = rotationSpeedRange;
    this.alpha = alpha;
    this.scale = scale;
    this.position = position;
    this.particles = [];
   
  }


  // Random selection of a texture from an array
  getRandomTexture(): Texture {
    const randomIndex = Math.floor(Math.random() * this.particleTextures.length);
    return this.particleTextures[randomIndex];
  }

  emitParticle() {
    if (this.particles.length >= this.maxParticles || !this.emitting) return;

    // Set even stronger random initial horizontal force
    const initialForceX = 0//0(Math.random() - 0.5) * 8; // Range: -4 to 4 (doubled again)
    
    // Set random speed for the particle (vertical speed)
    const speed = Math.random() * 0.4 + 0.6; // Speed range: 0.2 to 0.6 pixels/second (slightly increased)
    
    // Initial velocity components
    const vx = initialForceX;
    const vy = -speed*1.2; // Negative speed for initial upward movement
    
    // Set initial upward boost
    const initialBoost = 0; // Added a small initial boost
    
    // Set random lifetime for the particle
    const lifetime = Math.random() * 50 + 50; // Lifetime range: 50 to 75 seconds (increased)
    
    // Set random rotation speed within the defined range
    const rotationSpeed = Math.random() * (this.rotationSpeedRange.max - this.rotationSpeedRange.min) + this.rotationSpeedRange.min;

    // Select a random texture from the available textures
    const randomTexture = this.getRandomTexture();

    // Create a new particle with the calculated properties
    const particle = new Particle(
      randomTexture,
      this.alpha,
      this.scale,
      vx,
      vy,
      this.gravity,
      initialBoost,
      lifetime,
      rotationSpeed
    );

    // Set starting position to the emission point with slight variation
    particle.x = this.position.x + (Math.random() - 0.5) * 20; // Small horizontal variation
    particle.y = this.position.y + (Math.random() - 0.5) * 20; // Small vertical variation

    // Add the particle to the array and the container
    this.particles.push(particle);
    this.container.addChild(particle);
  }

  update(delta: number) {
    this.timeSinceLastEmit += delta;

    if (this.timeSinceLastEmit >= this.frequency) {
      this.timeSinceLastEmit = 0;
      this.emitParticle();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      if (particle.update(delta)) {
        this.particles.splice(i, 1);
        this.container.removeChild(particle);
      }
    }
  }

  // Stop the emitter (stops generating new particles)
  stop() {
    this.emitting = false;
  }

  // Clear all active particles
  clear() {
    this.particles.forEach((particle) => {
      this.container.removeChild(particle);
    });
    this.particles = [];
  }

  // Full shutdown of the emitter (stops and clears)
  destroy() {
    this.stop();
    this.clear();
  }
}
