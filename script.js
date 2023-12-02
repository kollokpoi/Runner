let trackTranslate = 0;
const track = document.getElementById('track');
const player = document.getElementById('player');
let speed = 5;
let frame = 1;
let gameStarted = false;
let points = 0;

document.body.addEventListener('keydown',(e)=>{
    if(!gameStarted)
        return;
    if(e.key == 'ArrowUp'){
        playerJump()
    }
    console.log(e.key);
})

function playerJump(){
    if(!gameStarted)
        return;
    var initialY = player.getBoundingClientRect().top;
    if(player.classList.contains('jumping'))  
        return;
    player.classList.add('jumping');

    setTimeout(() => {
        player.classList.remove('jumping');
    }, 500);
}


function switchUserFrame(){

    if(!gameStarted)
        return;

    if(frame<4){
        frame++;
        player.style.background = `url(playerImages/${frame}.png)`
    }else{
        frame = 0
    }
};

setInterval(switchUserFrame,30);


document.getElementById('startGameBtn').addEventListener('click',()=>{
    document.getElementById('startGameBtn').classList.remove('visible');
    player.style.display = 'block';
    gameStarted=true;
    points = 0;
    document.getElementById('pointsP').textContent=points;
    createCactus();
});

function createCactus(){
    if(!gameStarted)
        return;
    let count = Math.floor(Math.random() * (3-1) + 1)

    let cactusBlock = document.createElement('div');
    cactusBlock.className='cactusBlock';
    cactusBlock.style.left = window.innerWidth + 'px';
    for (let index = 0; index < count; index++) {
        let cactus = document.createElement('div');
        cactus.className='cactus';
        cactusBlock.appendChild(cactus);
    }
    track.appendChild(cactusBlock);
    let cactusItem = new Cactus(cactusBlock);
}

class Cactus{
    visible = true;
    jumpedOff=false;
    constructor(item){
        this.item = item;
        let draw = this.Draw.bind(this);
        setInterval(()=>draw(),10);
    }

    Draw(){
        if(this.visible){
            let leftPosition = this.item.offsetLeft;
            this.item.style.left = `${leftPosition-speed}px`;
            
            let topPosition = this.item.offsetTop;
            let rightPosition = leftPosition+this.item.clientWidth;

            let playerBottom = player.offsetTop + player.clientHeight;
            let playerLeft = player.offsetLeft;
            if( playerBottom>=topPosition && playerLeft>=leftPosition && playerLeft<=rightPosition){
                console.log("ай");
                document.getElementById('startGameBtn').classList.add('visible');
                gameStarted = false;
                player.style.display = 'none';
            }else if(playerLeft>=rightPosition && !this.jumpedOff){
                this.jumpedOff = true;
                points++;
                document.getElementById('pointsP').textContent=points;
            }

            if (leftPosition +this.item.clientWidth <0 ){
                createCactus();
                track.removeChild(this.item);
                this.visible = false;
            }
        }
    }
}

