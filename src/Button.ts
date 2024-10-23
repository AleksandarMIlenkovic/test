import { Container, Graphics, Text, Renderer, Sprite } from "pixi.js";

export class Button extends Container {
  private text: string;
  private renderer: Renderer;
  private color: number;

  constructor(renderer: Renderer, text: string, color: number) {
    super();
    this.text = text;
    this.color = color;
    this.renderer = renderer;
    this.createBackground();
    this.createText();
  }

  private createBackground() {
    const graphics = new Graphics().roundRect(0, 0, 100, 30, 10).fill({ color: this.color, alpha: 0.5 });
    const background = Sprite.from(this.renderer.generateTexture(graphics));
    background.anchor.set(0.5);
    this.addChild(background);
  }

  private createText() {
    const text = new Text({text: this.text, style: { fill: 0x000000, fontSize: 16 }});
    text.anchor.set(0.5);
    this.addChild(text);
  }
}
