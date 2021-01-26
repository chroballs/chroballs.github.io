var canvas = document.querySelector("#jogo");
var contexto = canvas.getContext("2d");

var pontos = 0;

var imgFundo1 = new Image();
imgFundo1.src = "back.png";
imgFundo1.onload = function(){
    contexto.drawImage(imgFundo1,0,0);
}

var imgFundo2 = new Image();
imgFundo2.src = "backstart.png";

var staryu = new Image();
staryu.src = "staryu.png"; 
staryu.name = "pika";

starmie = new Image();
starmie.src = "starmie.png";
starmie.name = "dig";

var personagem;
var personagens = [];

personagens[0] = staryu;
personagens[1] = starmie;

var musica = new Audio();
musica.src = "pallet-town.mp3";
musica.volume = 0.2;

var som = new Audio();
som.src = "staryu.mp3";
som.volume = 0.3;

var sound = new Audio();
sound.src = "starmie.mp3";
sound.volume = 0.3;

var pos_coord = {
    x:0,
    y:0
}
var sec = 60;
var timerGame = 0;
var start = false;
var cont = 0;

var coordX = [85, 203, 345, 76, 230, 380, 147, 362];
var coordY = [38, 78 , 60 , 137,162, 122, 239, 212];

//CORPO DO JOGO
canvas.addEventListener("click",function(event){
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    if(mouseX > 0 && mouseX < canvas.width &&
       mouseY > 0 && mouseY < canvas.height && start == false){
           start = true;
           musica.play();
           timerGame = setInterval(updateGame,600);

           var timer = setInterval(function(){
               sec--;
               if(sec < 10){
                   sec = "0"+sec;
               }
               if(sec == 0){
                   clearInterval(timer);
               }
           },1000);
       }
       else{ 
           if (mouseX >= pos_coord.x && (mouseX <= pos_coord.x+personagem.width) && mouseY >= pos_coord.y && (mouseY <= pos_coord.y+personagem.height)){
               if(personagem.name == "pika"){
                    cont++;
                    console.log("acertei");
                    pontos++;
                    sorteiaCoordenada();
                    som.play();
                }
                if(personagem.name == "dig"){
                    cont--;
                    sorteiaCoordenada();
                    sound.play();
                    console.log("errei");
                    pontos-=1;
                }
            }
        }
    });

//REALIZA ATUALIZAÇÕES NO JOGO
function updateGame(){
    contexto.drawImage(imgFundo2,0,0);
    sorteiaCoordenada();
    personagem = personagens[Math.round(Math.random())]
    contexto.drawImage(personagem,pos_coord.x, pos_coord.y);

    contexto.font="18px arial";
    contexto.fillStyle = "white";
    contexto.fillText("Pontos: "+pontos,200,50);
    contexto.fillText("Timer: ",300,50);
    contexto.fillText(sec, 360,51);
    end();
}

//AO FINALIZAR O JOGO
function end(){
    if(sec == 0){
        clearInterval(timerGame);
        start = "off";
    }
    if(start == "off"){
        contexto.fillStyle = "blue";
        contexto.fillRect(150,100,200,100);
        contexto.fillStyle = "white";
        contexto.fillText("Total de Acertos: "+pontos, 175,160);
    }
}

//SORTEIA AS COORDENADAS DOS POKEMONS
function sorteiaCoordenada(){
    var i = Math.floor(Math.random()*(coordY.length));
    pos_coord = {
        x: coordX[i],
        y: coordY[i]
    }
}