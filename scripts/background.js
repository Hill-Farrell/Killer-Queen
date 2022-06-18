export class Background {
    constructor(game){
        this.game = game;
        this.image = document.getElementById('backgroundImg');
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.speed = 2;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height); // makes background seamless
    }
    update(){
        this.x -= this.speed;
        if (this.x < 0 - this.width) this.x = 0;
    }
}