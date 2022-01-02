const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea'); 

const keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};

let player={speed:5,score:0};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

startScreen.addEventListener('click',start);


function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(e.key);
    console.log(keys);
}
function keyUp(e){
    
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
    console.log(keys);
    

}
function moveLines(){
    let lines=document.querySelectorAll('.lines');

    lines.forEach(function(item){
     if(item.y>=600){
         item.y-=650;
     }   
     item.y += player.speed;
     item.style.top=item.y+"px";

    })
}
  function isCollide(a,b){
      aRect=a.getBoundingClientRect();
      bRect=b.getBoundingClientRect();

      return !((aRect.top>bRect.bottom) || (aRect.bottom<bRect.top) || (aRect.right<bRect.left)
      || (aRect.left>bRect.right))
  }


  function endGame(){
      player.start=false;
      startScreen.classList.remove('hide'); 

  }

function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isCollide(car,item)){
            console.log("Boom");
            endGame();
        }
     if(item.y>=750){
         item.y=-350;
        item.style.left=Math.floor(Math.random()*350)+"px";


     }   
     item.y += player.speed;
     item.style.top=item.y+"px";

    })
}
function gamePlay(){
    console.log("I  am clicked");
    let car=document.querySelector('.car');

    let road=gameArea.getBoundingClientRect();
    console.log(road);
    if(player.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y>(road.top+70)){player.y-=player.speed;}
        if(keys.ArrowDown && player.y<(road.bottom-70)){player.y+=player.speed;}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed;}
        if(keys.ArrowRight && player.x<(road.width-50)){player.x+=player.speed;}

    car.style.top=player.y+"px";
    car.style.left=player.x+"px";
    window.requestAnimationFrame(gamePlay);

    console.log(player.score++);

    player.score++;
    score.innerText="Score :"+player.score;

}}
function start(){
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide'); 
    gameArea.innerHTML="";


    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<4;x++){
        
        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y=(x*150);
        roadLine.style.top=roadLine.y+"px";
        gameArea.appendChild(roadLine);
            

    }

    let car=document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="halelo   i m car";
    gameArea.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;

   
    
    for(x=0;x<3;x++){
        
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.color='red';
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
            

    }        

    
} 