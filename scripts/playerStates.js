const states = {
    RUNNING: 0, // have states class allows for expansions later
    JUMPING: 1,
    FALLING: 2,
    ATTACKING: 3,
}

class State{
    constructor(state){
        this.state = state;
    }
}

export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.width = 124;
        this.player.height = 200;
        this.player.maxFrame = 5;
        this.player.fps = 10;
        this.player.frameY = 0;
    }
    handleInput(input){
        if (input.includes('ArrowUp')){
            this.player.setState(states.JUMPING);
        } else if (input.includes('ArrowDown')){
            this.player.setState(states.ATTACKING);
        }
    }
}

export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        if (this.player.onGround()) this.player.vy -= 30
        this.jump = document.getElementById("jumpAudio");
        this.jump.volume = 0.3;
        this.jump.play();
        this.player.maxFrame = 3;
        this.player.fps = 5;
        this.player.frameY = 1;
        this.player.frameX = 0;

    }
    handleInput(input){
        if (this.player.vy > this.player.gravity){
            this.player.setState(states.FALLING);
      }
    }
}

export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 3;
        this.player.fps = 5;
        this.player.frameY = 1;
        this.player.frameX = 2;
    }
    handleInput(input){
      if (this.player.onGround()){
        this.player.setState(states.RUNNING);
      }
    }
}

export class Attacking extends State {
    constructor(player){
        super("ATTACKING");
        this.player = player; 
    }
    enter(){
        this.swing = document.getElementById("swordAudio");
        this.swing.volume = 0.3;
        this.swing.play();
        this.player.width = 160;
        this.player.height = 200;
        this.player.maxFrame = 5;
        this.player.frameY = 2;
        this.player.frameX = 0;
    }
    handleInput(input){
        setTimeout(() => {this.player.setState(states.RUNNING)}, 550);
    }
}
