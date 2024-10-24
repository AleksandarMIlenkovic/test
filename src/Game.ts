import { Application, Assets, Container, Sprite } from "pixi.js";
import { TextImageTool } from "./TextImageTool";
import { Button } from "./Button";
import { ParticleFire } from "./ParticleFire";
import { Cards } from "./Cards";

export class Game {
    public app!: Application;
    private textImageTool!: TextImageTool;
    private particles!: ParticleFire;
    private cards!: Cards;
    private buttonsContainer!: Container;
    private backButton!: Sprite;
    private currentPage!: Container;
    constructor() {
        
    }

    async initialize(app: Application) {
        this.app = app;
        await Assets.load(["./assets/btn_bcgd.png", "./assets/back_btn_bcgd.png"]);
        this.backButton = Sprite.from("./assets/back_btn_bcgd.png");
        this.backButton.interactive = true;
        this.backButton.position.set(this.backButton.width, this.backButton.height);
        this.backButton.on("pointerdown", () => {
            this.currentPage?.destroy(true);
            this.showButtons();
        });
        this.app.stage.addChild(this.backButton);
        this.backButton.visible = false;
        this.createButtons();
        
    }

    private createButtons() {
        
        this.buttonsContainer = new Container();
        const cards_button = new Button(this.app.renderer, "CARDS", 0x0000ff);
        this.buttonsContainer.addChild(cards_button);
        cards_button.position.set(0, 0);
        cards_button.interactive = true;
        cards_button.onpointerdown = () => {
            this.showCards();
        };

        const text_button = new Button(this.app.renderer, "TEXT", 0xff0000);
        this.buttonsContainer.addChild(text_button);
        text_button.position.set(0, 100);
        text_button.interactive = true;
        text_button.onpointerdown = () => {
            this.showText();
        };

        const particles_button = new Button(this.app.renderer, "FIREWORKS", 0x00ff00);
        this.buttonsContainer.addChild(particles_button);
        particles_button.position.set(0, 200);
        particles_button.interactive = true;
        particles_button.on("pointerdown", () => {
            this.showParticles();
        });
        this.app.stage.addChild(this.buttonsContainer);
        this.resize();
    }

    private showCards() {
        this.hideButtons();
        this.cards = new Cards(this.app);
        this.currentPage = this.cards;
        this.app.stage.addChild(this.cards);
        this.cards.position.set((this.app.screen.width - this.cards.width) / 2, (this.app.screen.height - this.cards.height) / 2);
        this.resize();
    }

    private showText() {
        this.hideButtons();
        this.textImageTool = new TextImageTool(this.app);
        this.currentPage = this.textImageTool;
        this.app.stage.addChild(this.textImageTool);
        this.textImageTool.position.set((this.app.screen.width - this.textImageTool.width) / 2, (this.app.screen.height - this.textImageTool.height) / 2);
        this.resize();
    }

    private showParticles() {
        this.hideButtons();
        this.particles = new ParticleFire(this.app);
        this.currentPage = this.particles;
        this.app.stage.addChild(this.particles);
        this.particles.position.set((this.app.screen.width - this.particles.width) / 2, (this.app.screen.height - this.particles.height) / 2);
        this.resize();
    }

    private hideButtons() {
        this.buttonsContainer.children.forEach((child) => {
            if (child instanceof Button) {
                child.visible = false;
            }
        });
        this.backButton.visible = true;

    }

    private showButtons() {
        this.buttonsContainer.children.forEach((child) => {
            if (child instanceof Button) {
                child.visible = true;
            }
        });
        this.backButton.visible = false;
    }

    public resize() {
        const width = this.app.screen.width;
        const height = this.app.screen.height;
       if (this.textImageTool?.position) {
        this.textImageTool.position.set(width/2, height/2);
       }
       if (this.particles?.position) {
        this.particles.position.set((width - this.particles.width) / 2, (height - this.particles.height) / 2);
       }
       if (this.cards?.position) {
        this.cards.position.set(width  / 2, height/2 + 150);
       }
       this.buttonsContainer.position.set(width/2, height/2);
       this.backButton.position.set(this.backButton.width/2, this.backButton.height/2);
    }

    
}
