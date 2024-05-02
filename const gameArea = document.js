const gameArea = document.querySelector('.game-area');
const scoreText=document.querySelector('.score')
const bestScoreText=document.querySelector('.best-score')
const startBtn= document.querySelector("#startBtn")
const stopBtn= document.querySelector("#stopBtn")
const scale = 20;
const snakeColor='#0d6efd';
const foodColor='#dc3545'
let isStarted=false;
let snake=[{x:200,y:200}];
let food={x:0,y:150};
let direction='right';
let score=0;
let speed=500;
let bestScore=localStorage.getItem("bestscore");
bestScoreText.textContent=bestScore;




// Generate random food loaction
function generateFood(){
    food.x=Math.floor(Math.random()*scale)*scale;
    food.y=Math.floor(Math.random()*scale)*scale;
}
function draw(){   
    gameArea.innerHTML='';
    //draw snake
    snake.forEach((segment,index)=>{
        const snakeElement = document.createElement('div');
        snakeElement.style.width=scale+'px'
        snakeElement.style.height=scale+'px'
        snakeElement.style.position='absolute';
        snakeElement.style.left= segment.x+'px';
        snakeElement.style.top= segment.y+'px';
        if(index===0){
            snakeElement.style.background=foodColor;
        }else{
            snakeElement.style.background=snakeColor;
        }
        gameArea.appendChild(snakeElement)
    })
    //draw food
    const foodElement = document.createElement('div')
    foodElement.style.width=scale+'px'
    foodElement.style.height=scale+'px'
    foodElement.style.background=foodColor;
    foodElement.style.position='absolute';
    foodElement.style.left= food.x+'px';
    foodElement.style.top= food.y+'px';
    gameArea.appendChild(foodElement)
}
//move the snake
function move(){
    if(isStarted){
        let newHead={x:snake[0].x,y:snake[0].y};
        if(direction=='up'){
            newHead.y-=scale;
        }else if(direction=='down'){
            newHead.y+=scale;
        }else if(direction=='left'){
            newHead.x-=scale;
        }else if(direction=='right'){
            newHead.x+=scale;
        }
        snake.unshift(newHead);
        //eating food
        if(newHead.x===food.x && newHead.y===food.y){
            generateFood();
            score+=10;
        }else{
            snake.pop();
        }
        //Passing the limits of the game
        if(newHead.x >= gameArea.clientWidth || newHead.x < 0){
            gameOver()
        }
        if(newHead.y >= gameArea.clientHeight || newHead.y < 0){
            gameOver()
        }
        //Game Over
        if(snake.slice(0).some(segment=>snake[0] !== segment && segment.x===snake[0].x && segment.y===snake[0].y)){
            gameOver();
        }  
    }
}
function main(){
    setInterval(()=>{
        move()
        draw();
        if(score>Number(localStorage.getItem('bestscore'))){
            localStorage.setItem('bestscore',score)
            console.log(localStorage.getItem('bestscore'));
        }
        scoreText.textContent=score


    },speed)

}
//Game over function
function gameOver(){
    isStarted=false;
    alert('Game Over! your score is :'+score)
}

startBtn.addEventListener('click',()=>{
    if(!isStarted){
        generateFood()
        main()
        isStarted=true
    }
})

stopBtn.addEventListener('click',()=>{
    if(isStarted){
        isStarted=false  
    }   
})
//Moving the snake with keyboard
document.addEventListener('keydown',e=>{
    if(e.key==='ArrowUp'  && direction!=='down'){
        direction='up';
    }else if(e.key==='ArrowDown' && direction!=='up'){
        direction='down';
    }else if(e.key==='ArrowLeft' && direction!=='right'){
        direction='left';
    }else if(e.key==='ArrowRight' && direction!=='left'){
        direction='right';
    }
})
