var contexto = document.getElementById("lienzoJuego");
var ctx = contexto.getContext("2d");
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;

contexto.width = WIDTH;
contexto.height = HEIGHT;

//variables
var score = 0;
var FPS = 60;
var gravedad = 1.5;

//Se busca declarar el posicionamiento del personaje
var personaje = {
    x: 50,
    y: 150,
    w: 50,
    h: 50
};
var tuberias = new Array();
tuberias[0] = {
    x: contexto.width,
    y: 0
}

//CONTROL
function keyDown(event) {
    personaje.y -= 35;
}

resize();

function resize() {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = "" + CANVAS_HEIGHT + "px";
    //contexto.style.width = ""+ CANVAS_WIDTH +"px";
}


//VARIABLES AUDIOS
var punto = new Audio()
punto.src = "audios/punto.mp3";


//Variables imagenes
var bird = new Image()
bird.src = "imagenes/bird.png";

var background = new Image()
background.src = "imagenes/background.png";

var suelo = new Image()
suelo.src = "imagenes/suelo.png";

var tuberiaNorte = new Image()
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

var tuberiaSur = new Image()
tuberiaSur.src = "imagenes/tuberiaSur.png";

setInterval(loop, 1000 / FPS);

/*se declaro un loop donde se le dio un color al rectangulo donde se esta tabajando por medio del fiilstyle, el clearrect lo que hace es limpiar el "rastro" que dejaria el rectangulo al caer por la bravedad, ademas de que eso tambin se hizo aqui que el cuadrado caiga*/
function loop() {
    ctx.clearRect(0, 0, 300, 530);
    //fondo
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(suelo, 0, contexto.height - suelo.height);

    //personaje
    ctx.drawImage(bird, personaje.x, personaje.y);

    //tuberias
    //acá se estan dibujando las tuberias 
    for (var i = 0; i < tuberias.length; i++) {
        var constante = tuberiaNorte.height + 80;
        ctx.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y);
        ctx.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + constante);
        tuberias[i].x--
        if (tuberias[i].y + tuberiaNorte.height < 80) {
            tuberias[i].y = 0;
        }

        if (tuberias[i].x == 150) {
            tuberias.push({
                x: contexto.width,
                y: Math.floor(Math.random() * tuberiaNorte.height) - tuberiaNorte.height

            })

        }
        //COLISIONES
        if (personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
                personaje.y + bird.height >= tuberias[i].y + constante)
            || personaje.y + bird.height >= contexto.height - suelo.height) {
            location.reload();
        }
        if (tuberias[i].x == personaje.x) {
            score++
            punto.play();
        }
    }
    //condiciones
    personaje.y += gravedad;
    //SE HIZO EL SCORE
    ctx.fillstyle = "rgba(0,0,0,1)";
    ctx.font = "25px arial";
    ctx.fillText("Score: " + score, 10, contexto.height - 40);
}

//EVENTOS
window.addEventListener("resize", resize);
window.addEventListener("keydown", keyDown);





