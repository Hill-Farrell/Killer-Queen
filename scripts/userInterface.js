export class UserInterface {
    constructor (game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Helvetica";
        this.livesImage = document.getElementById("life");
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText('Score: ' + this.game.score, 20, 50)
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // lives
        for (let i = 0; i < this.game.lives; i++){
        context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)
        }
        // game over
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('GAME OVER, TRY AGAIN', this.game.width * 0.5, this.game.height * 0.4);
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
            context.fillText('Score: ' + this.game.score, this.game.width * 0.5, this.game.height * 0.5);
            context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1) + " Seconds", this.game.width * 0.5, this.game.height * 0.6);
            this.game.music.volume = 0.0;
        }
    }
}