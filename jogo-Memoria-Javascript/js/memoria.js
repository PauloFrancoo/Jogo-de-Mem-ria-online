//imagens das cartas
let imagens = [];

for(let i = 1; i <= 8; i ++){
    imagens.push(`https://picsum.photos/id/${i}/80`);
        //"https://picsum.photos/id/"+i+"/80";
}
/////////////////////////////
/*for(let i = 0; i <= 15; i ++){
    imagens.push(`imagens/list.json/id/${i}/30`);
}
*/////////////////////////
let fundo = "https://picsum.photos/80?grayscale?grayscale";    //?grayscale";

//estado do jogo
let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];///,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const tempoDoJogo = new Timer("#tempo");

onload = ()=>{
let elementImagens = document.querySelectorAll("#memoria img");
elementImagens.forEach((img, i) => {
        img.src= fundo;
        img.setAttribute("data-valor",i);
        img.style.opacity= 0.3;
    });
    //cria um evento do botão inicio
document.querySelector("#btnInicio").onclick= iniciaJogo;
};

//inicia o jogo
const iniciaJogo= ()=>{
    //embaralhar as cartas
    for(let i= 0; i < cartas.length; i ++){
        let p =Math.trunc(Math.random()* cartas.length);
        let aux = cartas[p];
        cartas[p]= cartas[i];
        cartas[i]= aux;
    }
  

    //associar evento as imagens
    let elementImagens = document.querySelectorAll("#memoria img");
    elementImagens.forEach((img, i) => {
        img.onclick = tratarCliqueImagem;
        img.style.opacity = 1;
        img.src =fundo;
    });

// reinicia o estado do jogo
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
    pontos = 0;

    // ajusta a interface
    document.querySelector("#btnInicio").disabled = true;
    document.querySelector("#tempo").style.backgroundColor = "orange";
    tempoDoJogo.start();
};
/////Processa o clique na imagem
/////
const tratarCliqueImagem=(e) =>{
    if(cliquesTravados)return;
    const p = +e.target.getAttribute("data-valor");
    const  valor = cartas[p];
    e.target.src = imagens[valor -1];
    //console.log("clicou");
    e.target.onclick = null;
    //console.log(cartas[p]);

    if(!temCartaVirada){
        temCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
    }else{
        if(valor == valorCartaVirada){
            pontos ++;
        }else{
            const p0 = posicaoCartaVirada;
            cliquesTravados = true;
            setTimeout(() =>{
                e.target.src =fundo;
                e.target.onclick = tratarCliqueImagem;
                console.log(p0);
                let img = document.querySelector("#memoria #i" + p0);
                img.src = fundo;
                img.onclick = tratarCliqueImagem;
                cliquesTravados = false;
            },1000); 
        }
        temCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada = 0;
    }
    
    
    
    if(pontos == 8){
        document.querySelector("#btnInicio").disabled = false;
        document.querySelector("#tempo").style.backgroundColor = "lightgreen";
        tempoDoJogo.stop();
    }
};
//Timer

function  Timer(e){
    this.element = e;
    this.time =0;
   
    this.control = null;
    this.start= ()=>{
        this.time = 0;
        this.control=setInterval(()=>{
            this.time++; 
            const minutes = Math.trunc(this.time/60);
            const seconds = this.time % 60;
            document.querySelector(this.element).innerHTML =
            (minutes< 10 ? "0" : "") + minutes+ ":" +
            (seconds< 10 ? "0" : "" ) + seconds;
        },1000); //setInterval é infinito
                                  // setTimeOut executa uma vez e acabou
    };
    this.stop = ()=>{
        clearInterval(this.control)};
        this.control = null;
   
}
//01/07/2022