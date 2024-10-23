import { Application, Assets, Container } from "pixi.js";
import { TextImageTool } from "./TextImageTool";
import { Button } from "./Button";
import { ParticleFire } from "./ParticleFire";
import { Cards } from "./Cards";
import { Color } from "revolt-fx";

export class Game {
    public app!: Application;
    private textImageTool!: TextImageTool;
    private particles!: ParticleFire;
    private cards!: Cards;
    private buttonsContainer!: Container;
    private backButton!: Button;
    private currentPage!: Container;
    constructor() {
        
    }

    async initialize(app: Application) {
        this.app = app;
       
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

        this.backButton = new Button(this.app.renderer, "BACK TO MENU", 0xf7fa27);
        this.backButton.interactive = true;
        this.backButton.position.set(this.backButton.width, this.backButton.height);
        this.backButton.on("pointerdown", () => {
            this.currentPage?.destroy();
            this.showButtons();
        });
        this.app.stage.addChild(this.backButton);
    }

    private showCards() {
        this.hideButtons();
        this.cards = new Cards(this.app);
        this.currentPage = this.cards;
        this.app.stage.addChild(this.cards);
        this.cards.position.set((this.app.screen.width - this.cards.width) / 2, (this.app.screen.height - this.cards.height) / 2);
    }

    private showText() {
        console.log("TEXT");
        this.hideButtons();
        this.textImageTool = new TextImageTool(this.app);
        this.currentPage = this.textImageTool;
        this.app.stage.addChild(this.textImageTool);
        this.textImageTool.position.set((this.app.screen.width - this.textImageTool.width) / 2, (this.app.screen.height - this.textImageTool.height) / 2);
    }

    private showParticles() {
        console.log("FIREWORKS");
        this.hideButtons();
        this.particles = new ParticleFire(this.app);
        this.currentPage = this.particles;
        this.app.stage.addChild(this.particles);
        this.particles.position.set((this.app.screen.width - this.particles.width) / 2, (this.app.screen.height - this.particles.height) / 2);
    }

    private hideButtons() {
        this.buttonsContainer.children.forEach((child) => {
            if (child instanceof Button) {
                child.visible = false;
            }
        });
    }

    private showButtons() {
        this.buttonsContainer.children.forEach((child) => {
            if (child instanceof Button) {
                child.visible = true;
            }
        });
    }

    public resize(width: number, height: number) {
        console.log("resize", width, height);
       this.buttonsContainer.position.set((width - this.buttonsContainer.width) / 2, (height - this.buttonsContainer.height) / 2);
       if (this.textImageTool!=undefined) {
        this.textImageTool.position.set((width - this.textImageTool.width) / 2, (height - this.textImageTool.height) / 2);
       }
       if (this.particles!=undefined    ) {
        this.particles.position.set((width - this.particles.width) / 2, (height - this.particles.height) / 2);
       }
       if (this.cards!=undefined) {
        this.cards.position.set((width - this.cards.width) / 2, (height - this.cards.height) / 2);
       }
    }

    
}
