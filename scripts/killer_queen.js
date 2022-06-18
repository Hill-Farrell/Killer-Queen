import {Player} from "./player.js"
import {InputHandler} from "./input.js"
import {GroundEnemy} from "./enemy.js"
import {UserInterface} from "./userInterface.js"
import {Background} from "./background.js"
import {Coins, Cakes} from "./items.js"

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1100;
    canvas.height = 700;

    const startDiv = document.getElementById('start');
    document.addEventListener('keydown', e => {
        if (e.key === 'x'){
            startDiv.style.display = "none";
            class Game {
                constructor(width, height){
                    this.width = width;
                    this.height = height;
                    this.groundMargin = 75;
                    this.speed = 0;
                    this.maxSpeed = 3;
                    this.background = new Background(this);
                    this.player = new Player(this);
                    this.input = new InputHandler(this);
                    this.userInterface = new UserInterface(this);
                    this.enemies = [];
                    this.enemyTimer = 0;
                    this.enemyInterval = 2000; // 1 per 2secs
                    this.debug = false;
                    this.score = 0;
                    this.lives = 2; // starting lives
                    this.gameOver = false;
                    this.time = 0;
                    this.coins = [];
                    this.coinTimer = 0;
                    this.coinInterval = 2000; // 1 per 2secs
                    this.cakes = [];
                    this.cakeTimer = 0;
                    this.cakeInterval = 60000; // 1 per minute
                    this.music = document.getElementById("mainAudio");
                    this.music.autoplay = true;
                    this.music.loop = true;
                    this.music.volume = 0.2; 
                }
                update (deltaTime){
                    this.time += deltaTime;
                    this.background.update();
                    this.player.update(this.input.keys, deltaTime);
                    // handle enemies
                    if (this.enemyTimer > this.enemyInterval){
                        this.addEnemy();
                        this.enemyTimer = 0;
                    } else {
                        this.enemyTimer += deltaTime;
                    }
                    this.enemies.forEach(enemy => {
                        enemy.update(deltaTime);
                        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
                    });
                    //handle coins
                    if (this.coinTimer > this.coinInterval){
                        this.addCoin();
                        this.coinTimer = 0;
                    } else {
                        this.coinTimer += deltaTime;
                    }
                    this.coins.forEach(coin => {
                        coin.update(deltaTime);
                        if (coin.markedForDeletion) this.coins.splice(this.coins.indexOf(coin), 1);
                    }); 
                    //handle cakes
                    if (this.cakeTimer > this.cakeInterval){
                        this.addCake();
                        this.cakeTimer = 0;
                    } else {
                        this.cakeTimer += deltaTime;
                    }
                    this.cakes.forEach(cake => {
                        cake.update(deltaTime);
                        if (cake.markedForDeletion) this.cakes.splice(this.cakes.indexOf(cake), 1);
                    });
                    if (this.start){
                        startGame();
                        this.start=false;
                    }
        
                }
                draw(context){
                    this.background.draw(context);
                    this.player.draw(context);
                    this.enemies.forEach(enemy => {
                        enemy.draw(context);
                    });
                    this.userInterface.draw(context);
                    this.coins.forEach(coin => {
                        coin.draw(context);
                    });
                    this.cakes.forEach(cake => {
                        cake.draw(context);
                    });
                }
                addEnemy(){
                    this.enemies.push(new GroundEnemy(this));
                }
                addCoin(){
                    this.coins.push(new Coins(this));  
                }
                addCake(){
                    this.cakes.push(new Cakes(this));  
                } 
            }
        
            function volumeControls(){
                var music = document.getElementById("mainAudio");
                var high = document.getElementById('high');
                var mid = document.getElementById('mid');
                var mute = document.getElementById('mute');
        
                high.onclick = function(){
                    music.volume = 0.8;
                }
                mid.onclick = function(){
                    music.volume = 0.2;
                }
                mute.onclick = function(){
                    music.volume = 0.0;
                } 
            }
            volumeControls();
        
            const game = new Game(canvas.width, canvas.height)
            let lastTime = 0;
        
            function animate(timeStamp){
                const deltaTime = timeStamp - lastTime;
                lastTime = timeStamp;
                ctx.clearRect(0,0, canvas.width, canvas.height);
                game.update(deltaTime);
                game.draw(ctx);
                if (!game.gameOver) requestAnimationFrame(animate)
            }
            animate(0)   
        }
    })


    
});