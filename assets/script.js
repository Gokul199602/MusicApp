const playMusic = document.getElementById("playMusic");
const audioPlayer = document.getElementById("playAudio");
const muteIcon = document.getElementById("muteIcon");
const nextMusic = document.getElementById("nextMusic");
var appData =  
{
    positionArr:[],
    musicArr:['assets/music/bensound-sweet.mp3']
}


playMusic.addEventListener("click",function(){
    musicPlay();
});



nextMusic.addEventListener("click",nextMusicFun);

muteIcon.addEventListener("click",function(){
    let icon = muteIcon.querySelector("i");
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-volume-off');
    audioPlayer.muted = !icon.classList.contains("fa-volume-up");
});

var canvas = document.getElementById('musicPlayerControl');

canvas.width = screen.width;
canvas.height = '248';


canvas.addEventListener("click",showPos,false);

function showPos(event)
{
    let position = (event.pageX-30)/(canvas.width-60);
    position+=0.01;
    changeTime(position);
}

class Bar
{
    constructor(moveX,moveY,drawX,drawY,color)
    {
        this.moveX = moveX;
        this.moveY = moveY;
        this.drawX = drawX;
        this.drawY = drawY;
        this.color = color;
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(this.moveX, this.moveY);
        ctx.lineTo(this.drawX, this.drawY);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}


function generateName(x,y,text,len,color)
{
    var ctx = canvas.getContext("2d");
    var contentWidth =  ctx.measureText(text).width+ctx.measureText(text).width*0.3;
    var rectWidth = contentWidth;
    var rectHeight = 25;
    var cornerRadius = 10;
    var rectX = ((x+rectWidth)>canvas.width)?(x-rectWidth+10): (x-0.5*rectWidth);
    var rectY = len-rectHeight;
    ctx.beginPath();
    ctx.arc(x, 150, 5, 0, 2 * Math.PI);
    ctx.fillStyle = hexToRgbA(color,0.4);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(x, 150);
    ctx.lineTo(x, len);
    ctx.strokeStyle = hexToRgbA(color,0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;
    ctx.fillStyle = hexToRgbA(color,1);
    ctx.strokeStyle = hexToRgbA(color,1);
    ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    ctx.stroke();
    ctx.beginPath();
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.measureText(text).height
    ctx.fillText(text,rectX+0.5*rectWidth-0.5*ctx.measureText(text).width,rectY+18);
}


function hexToRgbA(hex,opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    throw new Error('Bad Hex');
}

function videoPlayCanvas(getDur)
{
    if (canvas.getContext) 
    {
       var ctx = canvas.getContext("2d");
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       var position = 30,
       totalWidth  = canvas.width-60,
       dration =  totalWidth*getDur;
       index = 0;
       while(position <= canvas.width-30)
       {
        var color = "rgba(0,0,0,0.1)";
        if(position <= dration)
        color = "coral";
        let moveyY = appData.positionArr[index]?appData.positionArr[index].moveY:getRandomArbitrary(20,150),
        lineY = appData.positionArr[index]?appData.positionArr[index].lineY:getRandomArbitrary(150,220);
        var bar = new Bar(position,moveyY, position, lineY,color);
        var posObj = 
        {
            moveY:getRandomArbitrary(20,150),
            lineY:getRandomArbitrary(150,220)
        }
        appData.positionArr.push(posObj);
        position+=10;
        bar.draw(ctx);
        ++index;
       }
       generateName(canvas.width*0.3,0,"Introduction",90,"#12d123");
       generateName(canvas.width*0.5,0,"One_Six",30,"#25dd8f");
       generateName(canvas.width*0.9,0,"Profile",100,"#1900b8");
       generateName(canvas.width*0.94,0,"Rapport Building - Empathy",70,"#936666");
       generateName(canvas.width*0.96,0,"Rapport Building - Energy",40,"#68a743");
     }
}
musicDurationUpdate();
setInterval(function(){ 
    musicDurationUpdate();
 }, 100);

 function musicDurationUpdate()
 {
     let currentTime = Math.floor(audioPlayer.currentTime),
     totTime = Math.floor(audioPlayer.duration),
     divTime = currentTime/totTime + 0.02;
     videoPlayCanvas(divTime)
 }

 function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


function changeTime(timePer){
    let currentTime = Math.floor(audioPlayer.currentTime),
    totTime = Math.floor(audioPlayer.duration),
    divTime = totTime*timePer;
    audioPlayer.currentTime = divTime;
}


function nextMusicFun()
{
    var currentMusic = audioPlayer.getAttribute("src");
    let index = appData.musicArr.indexOf(currentMusic);
    let nextIndex =  (index+1)>=appData.musicArr.length?0:index+1;
    audioPlayer.setAttribute("src",appData.musicArr[nextIndex]);
    audioPlayer.currentTime = 0;
    musicPlay();
}

function musicPlay()
{
    let playMusic = document.getElementById("playMusic");
    let icon = playMusic.querySelector("i");
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');
    playMusic.classList.toggle("play");
    if(playMusic.classList.contains("play"))
    {
        audioPlayer.play();
    }
    else
    {
        audioPlayer.pause();
    }
}



