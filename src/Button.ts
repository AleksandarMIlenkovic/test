import { Container, Graphics, Text, TextStyle, Renderer, Sprite } from "pixi.js";

export class Button extends Container {
  private text: string;
  private renderer: Renderer;
  private color: number;
  private textStyle: TextStyle;

  constructor(renderer: Renderer, text: string, color: number) {
    super();
    this.text = text;
    this.color = color;
    this.renderer = renderer;
    this.textStyle = new TextStyle({ 
      fill: 0xFFFFFF,
      stroke: {color: 0x000000, width: 2},
      fontWeight: 'bold', 
      fontSize: 24 });
    this.createBackground();
    this.createText();
  }

  private createBackground() {
   
    const background = Sprite.from("./assets/btn_bcgd.png");
    background.anchor.set(0.5);
    this.addChild(background);
  }

  private createText() {
    const text = new Text({text: this.text, style: this.textStyle});
    text.anchor.set(0.5);
    this.addChild(text);
  }
}
