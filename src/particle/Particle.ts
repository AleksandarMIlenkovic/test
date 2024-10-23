import { Sprite, Texture } from 'pixi.js';

export class Particle extends Sprite {
  public vx: number; // Speed on the X axis
  public vy: number; // Speed on the Y axis
  public lifetime: number;
  public elapsedTime: number = 0;
  public startAlpha: number;
  public endAlpha: number;
  public startScale: number;
  public endScale: number;
  public gravity: { x: number, y: number }; // Gravity
  public initialBoost: number; // Initial impulse
  public rotationSpeed: number; // Rotation speed

  constructor(
    texture: Texture,
    alpha: { start: number, end: number },
    scale: { start: number, end: number },
    vx: number,
    vy: number,
    gravity: { x: number, y: number },
    initialBoost: number,
    lifetime: number,
    rotationSpeed: number
  ) {
    super(texture);
    this.vx = vx;
    this.vy = vy;
    this.lifetime = lifetime;
    this.startAlpha = alpha.start;
    this.endAlpha = alpha.end;
    this.startScale = scale.start;
    this.endScale = scale.end;
    this.gravity = gravity; // Set gravity
    this.initialBoost = initialBoost;
    this.rotationSpeed = rotationSpeed;
    this.alpha = alpha.start; // Set the initial value of alpha transparency
    this.scale.set(scale.start); // Set the initial scale
    this.anchor.set(0.5, 0.5); // Rotate relative to the center
  }

  update(delta: number) {
    const progress = Math.min(this.elapsedTime / this.lifetime, 1);

    // Apply initial boost only at the beginning
    if (this.elapsedTime < 0.05) {  // Apply boost for the first 5% of lifetime
      this.vy -= this.initialBoost * delta;
    }

    // Apply gravity continuously
    this.vy += this.gravity.y * delta * 0.15; // Kept the same
    this.vx += this.gravity.x * delta * 0.15; // Kept the same

    // Updating position
    this.x += this.vx * delta;
    this.y += this.vy * delta;

    // Updating rotation (reduced speed)
    this.rotation += this.rotationSpeed * delta * 0.05;  // Kept the same

    // Updating alpha channel (even slower fade out)
    if (progress > 0.8) {  // Start fading only after 90% of lifetime
      this.alpha = this.startAlpha - (this.startAlpha - this.endAlpha) * ((progress - 0.9) / 0.1);
    } else {
      this.alpha = this.startAlpha;
    }

    // Updating scale
    const currentScale = this.startScale - (this.startScale - this.endScale) * progress;
    this.scale.set(currentScale);

    this.elapsedTime += delta;
    return this.elapsedTime >= this.lifetime;
  }
}
