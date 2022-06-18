import {Running, Jumping, Falling, Attacking} from "./playerStates.js"

export class Player {
    constructor(game){
        this.game = game;
        this.width = 124;
        this.height = 200;
        this.x = 0;
        this.y =  this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('playerImg');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 10; // how fast player frames animates
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.speed = 0;
        this.vy = 0;
        this.maxSpeed = 10;
        this.states = [new Running(this), new Jumping(this), new Falling(this), new Attacking(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.gravity = 1;
        this.coinAudio = document.getElementById("coinAudio");
        this.damage = document.getElementById("damageAudio");
        this.health = document.getElementById("healthAudio");
        this.gameOverAudio = document.getElementById("gameOverAudio");
        this.coinAudio.volume = 0.4;
        this.damage.volume = 1.0;
        this.health.volume = 0.5;
        this.gameOverAudio.volume = 0.3;
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        // horizontal movement:
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0; // stops player from going off left side of screen
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width; // stops player from going off right side of screen
        
        // vertical movement:
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.gravity;
        else this.vy = 0;

        //sprite animation:
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }     
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin; //Check if player is on ground
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                // enemy collision
                enemy.markedForDeletion = true;
                if (this.currentState == this.states[3]){
                    this.game.score++
                } else {
                    this.damage.play();
                    this.game.lives--;
                    if (this.game.lives <= 0){
                        this.gameOverAudio.play();
                        this.game.gameOver = true;
                    } 
                }
                
            }
        })
        this.game.coins.forEach(coin => {
            if (
                coin.x < this.x + this.width &&
                coin.x + coin.width > this.x &&
                coin.y < this.y + this.height &&
                coin.y + coin.height > this.y
            ){
                this.coinAudio.play();
                coin.markedForDeletion = true;
                this.game.score++; 
            }
        })
        this.game.cakes.forEach(cake => {
            if (
                cake.x < this.x + this.width &&
                cake.x + cake.width > this.x &&
                cake.y < this.y + this.height &&
                cake.y + cake.height > this.y
            ){
                this.health.play();
                cake.markedForDeletion = true;
                this.game.lives++;
                this.game.score + 10;
            }
        })
    }
}