export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = []; // Array to hold keypress
        window.addEventListener('keydown', e => { // Checking for keypress down
            if ((   e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1){ //check if key is already in keypress array
                this.keys.push(e.key); // put keypress into array
            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            } else if (e.key === 'Enter'){
                window.location.reload();
            }
        });
        window.addEventListener('keyup', e => { // Checking for keypress release
            if (    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight'){
                this.keys.splice(this.keys.indexOf(e.key), 1); // removes keypress from array when key is let go based on index
            }
        }); 
    }
}