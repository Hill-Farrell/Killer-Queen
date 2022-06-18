class Enemy {
    constructor (game){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20; // how fast animating enemy
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, 
            this.x, this.y, this.width, this.height)
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }  
        // check if off sceen to delete
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 160;
        this.height = 129;
        this.x = this.game.width;
        this.y =  this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("groundEnemyImg");
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 5;
        
    }
    update(deltaTime){
        super.update(deltaTime)
    }
}
