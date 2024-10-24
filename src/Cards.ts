import { Application, Container, Sprite, Texture, Assets, Text, Ticker, TextStyle } from "pixi.js";
import gsap from "gsap";

export class Cards extends Container {
    private ticker!: Ticker;
    private app: Application;
    private cardTextures: Sprite[] = [];
    private firstDeck: Container = new Container();
    private firstDeckText: Text = new Text({text: 'First Deck', style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xFFFFFF,
    })});
    private secondDeck: Container = new Container();
    private secondDeckText: Text = new Text({text: 'Second Deck', style: new TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xFFFFFF,
    })});
    private fpsTxt!: Text;

    constructor(app: Application) {
        super();
        this.app = app;
        this.initializeComponents();
        this.setupFPSCounter();
        this.loadAssets();
    }

    private initializeComponents() {
        this.firstDeck.x = -100;
        this.secondDeck.x = 100;
        this.addChild(this.firstDeck, this.secondDeck);
        this.secondDeck.y -= 100;  
        this.firstDeckText.anchor.set(0.5);
        this.secondDeckText.anchor.set(0.5);
        this.firstDeckText.position.set(-100, 100);
        this.secondDeckText.position.set(100, 100);

    }

    private setupFPSCounter() {
        this.fpsTxt = new Text({text: 'FPS: 0', style: new TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF,
        })});
        this.fpsTxt.anchor.set(0.5);
        this.addChild(this.fpsTxt);
        this.fpsTxt.position.set(0, -350);

        this.ticker = new Ticker();
        this.ticker.add(() => {
            this.fpsTxt.text = `FPS: ${this.ticker.FPS.toFixed(2)}`;
        });
        this.ticker.start();
    }

    public async loadAssets() {
        console.log("Loading card assets");
        await Assets.load('assets/tile-0.json');
        this.createCardTextures();
        this.fillFirstDeck();
    }

    private createCardTextures() {
        for (let i = 0; i < 144; i++) {
            let cardNo = Math.floor(Math.random() * 54);
            const val = cardNo < 10 ? `0${cardNo}` : cardNo;
            const texture = Texture.from(`tile0${val}`);
            const sprite = Sprite.from(texture);
            this.cardTextures.push(sprite);
            
        }
    }

    private fillFirstDeck() {
        this.cardTextures.forEach((card, index) => {
            card.anchor.set(0.5);
            card.scale.set(4);
            card.position.set(0, -(index * 2));
            this.firstDeck.addChild(card);
        });
        this.addChild(this.firstDeckText, this.secondDeckText);
        
        this.firstDeckText.text = `First Deck (${this.firstDeck.children.length})`;
        this.startAnimation();
    }

    private startAnimation() {
        const totalCards = this.firstDeck.children.length;

        this.firstDeck.children.forEach((card, index) => {
            const clonedCard = this.cloneCard(card as Sprite);
            this.addChild(clonedCard);
            this.animateCard(clonedCard, index, totalCards);
        });
    }

    private animateCard(clonedCard: Sprite, index: number, totalCards: number) {
        const originalCard = this.firstDeck.children[index] as Sprite;
        clonedCard.position.set(
            this.firstDeck.x + originalCard.x,
            this.firstDeck.y + originalCard.y
        );

        gsap.to(clonedCard, {
            x: this.secondDeck.x,
            y: this.calculateFinalY(index, totalCards, clonedCard),
            duration: 1,
            delay: (totalCards - index - 1) * 2,
            onComplete: () => this.onAnimationComplete(clonedCard, originalCard, index, totalCards)
        });
    }

    private calculateFinalY(index: number, totalCards: number, card: Sprite): number {
        return this.secondDeck.y - (totalCards - index * 2) - card.height / 2;
    }

    private onAnimationComplete(clonedCard: Sprite, originalCard: Sprite, index: number, totalCards: number) {
        this.removeChild(clonedCard);
        this.secondDeck.addChild(clonedCard);
        this.secondDeckText.text = `Second Deck (${this.secondDeck.children.length})`;
        this.firstDeckText.text = `First Deck (${144-this.secondDeck.children.length})`;

        clonedCard.position.set(0, this.calculateFinalY(index, totalCards, clonedCard) - this.secondDeck.y);
        originalCard.visible = false;
    }

    private cloneCard(originalCard: Sprite): Sprite {
        const clonedCard = new Sprite(originalCard.texture);
        clonedCard.position.copyFrom(originalCard.position);
        clonedCard.scale.copyFrom(originalCard.scale);
        clonedCard.rotation = originalCard.rotation;
        clonedCard.anchor.copyFrom(originalCard.anchor);
        clonedCard.alpha = originalCard.alpha;
        clonedCard.tint = originalCard.tint;
        clonedCard.visible = originalCard.visible;
        clonedCard.blendMode = originalCard.blendMode;
        clonedCard.roundPixels = originalCard.roundPixels;
        return clonedCard;
    }

   

    public destroy() {
        this.ticker.stop();
        this.ticker.destroy();
        super.destroy();
    }
}
