import { Application, Assets } from 'pixi.js';
import { Game } from "./Game";


const screen = {
    width: 1920,
    height: 1080
};

// Add this declaration at the top of your file
declare global {
    interface Window {
        __PIXI_APP__: Application;
    }
}

(async () => {
    const app = new Application();
    const gameElement = document.getElementById("game");
    await app.init({width: 1280, height: 640});

    if (gameElement) {
        gameElement.appendChild(app.canvas);
    } else {
        console.error("Game element not found");
    }

    // Load assets
   

    const game = new Game();
    await game.initialize(app);
    
    window.__PIXI_APP__ = app;
    
    const resize =() => {
        const {innerWidth, innerHeight} = window;
        const MAX_SIZE = 1500;

        // design game width and height
        const GAME_WIDTH = 1280;
        const GAME_HEIGHT = 640;
    
        const clientAspectRatio = innerWidth / innerHeight;
    
        const gameWidth = clientAspectRatio > 1 ? GAME_WIDTH : GAME_HEIGHT;
        const gameHeight = clientAspectRatio > 1 ? GAME_HEIGHT : GAME_WIDTH;
    
        let width = gameWidth,
          height = gameHeight;
    
        if (clientAspectRatio > 1) {
          width = Math.floor(
            clamp(height * clientAspectRatio, gameWidth, MAX_SIZE)
          );
        } else {
          height = Math.floor(
            clamp(width / clientAspectRatio, gameHeight, MAX_SIZE)
          );
        }
    
        if (gameElement) {
          const rootStyle = app.canvas.style;
    
          const scale = Math.min(innerWidth / width, innerHeight / height);
    
          const left = Math.floor(Math.max(0, (innerWidth - width * scale) / 2));
    
          const top = Math.floor(Math.max(0, (innerHeight - height * scale) / 2));
    
          rootStyle.marginLeft = px(left);
          rootStyle.marginTop = px(top);
    
          rootStyle.width = px(width * scale);
          rootStyle.height = px(height * scale);
        }
        app.renderer.resize(width, height);
        game.resize();
    };
    window.addEventListener("resize", resize);
    
    function clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }
    const px = (value: string | number) => `${value}px`;
    resize();
})();


