import {Container, Application, Text, TextStyle} from "pixi.js";

export class TextImageTool extends Container {
    private textField: Text;
    private textStyle:TextStyle;
    private items: string[] = [];
    private updateInterval: NodeJS.Timeout;
    private emoticons: Array<string> = ['👍', '👎', '🤔', '🤣', '👏', '👋', '🤗', '🤩', '🤔', '🤨', '🤗', '🤩', '🤔', '🤨'];
    private currencyIcons: Array<string> = ['💰', '💵', '💴', '💶', '💷', '💸', '💹', '💱', '💲', '💳', '💹', '💱', '💲', '💳'];
    constructor(app:Application) {
        super();
        this.textStyle = new TextStyle({
            fontSize: 24,
            fill: 0xFFFFFF, 
        });
        this.textField = new Text({text:'', style:this.textStyle})
        this.textField.anchor.set(0.5);
        this.addChild(this.textField);
        this.updateInterval = setInterval(() => this.generateRandomContent(), 2000);
    }

    private generateRandomContent():void {
        this.textField.text = '';

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        this.textStyle.fill = parseInt(randomColor, 16);
        
        const randomFontSize = Math.floor(Math.random() * 16) + 32;
        this.textStyle.fontSize = randomFontSize;

        const itemCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 items
        for (let i = 0; i < itemCount; i++) {
            if (Math.random() < 0.5) {
                console.log("adding text");

                this.textField.text += this.getRandomText();
            } else {
                console.log("adding image");
                this.textField.text += this.addRandomImage();
            }
        }
        this.textField.style = this.textStyle;
    }

    private addRandomImage() {
        const string:String = this.emoticons[Math.floor(Math.random() * this.emoticons.length)] || this.currencyIcons[Math.floor(Math.random() * this.currencyIcons.length)];
       return string;
    }


    private getRandomText(): string {
       
        const texts = [' Nice to see you ', ' Wow ', ' Awesome ', ' Hello, glad you made it ', 'Awesomely done ', ' Great Tool '];
        return texts[Math.floor(Math.random() * texts.length)];
    }

    

    public destroy() {
        clearInterval(this.updateInterval);
        super.destroy();
    }
}
