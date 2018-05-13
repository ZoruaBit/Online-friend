//button id
var rightButton=document.getElementById("rightButton");
var leftButton=document.getElementById("leftButton");
var standRightButton=document.getElementById("standRightButton");
var standLeftButton=document.getElementById("standLeftButton");
var tellTimeButton=document.getElementById("tellTime");
var stopWatchButtn=document.getElementById("stopWatch");
var japaneseEnglishTrigger=document.getElementById("thisButtonIsChangeable");
//specalFunctions
var keyTimer=0
var inJapanese=false;

var canWidth=650;
var canHeight=400;

var background=new Image();
background.src="try.png";
var z=new Image();
z.src="avali walk sprite sheet.png";
var speechBubble=new Image();
speechBubble.src="textbox3.png"
var speachBubblex=0;
var speachBubbley=canHeight-100;
var canvas=document.getElementById('thisCanvas');
canvas.width=canWidth;
canvas.height=canHeight;
var ctx = canvas.getContext('2d')
var thisText=""

//time
var time=new Date();
var tellTimeActive=false;
var timeHour=time.getHours();
var timeMinuts=time.getMinutes();
var timeSeconds=time.getSeconds();
var timer=0;
var timer2=0;
var jokeTimer=0;
var jokeNum=0;
var jokePos=0;
var textTimer=0;
var whatUseage=Math.floor(Math.random() * 3);
var textHeight=80;
var textusage={1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false}
var thisText2="";
var thisText3="";
var thisText4="";
var thisText5="";
var thisText6="";
var thisText7="";
var thisText8="";
var thisTextSave="";
var thisTextSave2="";
var thisTextSave3="";
var thisTextSave4="";
var thisTextSave5="";
var thisTextSave6="";
var thisTextSave7="";
var thisTextSave8="";
var keyStillDown=false;
//key stuff
var keysPressedDown=[];
var keysMap=[];
var keyPressed=[]
$('*').keydown(function(e){
	keyTimer=100
	console.log("key" + e.keyCode);
	if(!keyPressed.includes(e.keyCode)){
		keysPressedDown.push(e.keyCode);
		keyPressed.push(e.keyCode);
	}
	if(!keysMap.includes(e.keyCode)){
		keysMap.push(e.keyCode);
	}
}).keyup(function(e){
	if(keysMap.includes(e.keyCode)){
		keysMap.splice(keysMap.indexOf(e.keyCode));
	}
	if(keyPressed.includes(e.keyCode)){
		keyPressed.pop(e.keyCode);
	}
});
//functions
function removeKeys(){
	keysPressedDown=[];
	
}
function sprite(img,x,y,trackLeft,trackRight,trackStandLeft,trackStandRight,sheetWidth,sheetHeight,cols,rows,speed,scale,loaded,useTime,wallCollision,name,id,maxFallSpeed,fallSpeedAcceleration,useStand,dontDetectFloor){
	this.img=img;
	this.x=x;
	this.y=y;
	this.trackLeft=trackLeft;
	this.trackRight=trackRight;
	this.trackStandLeft=trackStandLeft;
	this.trackStandRight=trackStandRight;
	this.left=false;
	this.standStill=false;
	this.sheetWidth=sheetWidth;
	this.sheetHeight=sheetHeight;
	this.cols=cols;
	this.rows=rows;
	this.srcY
	this.srcX
	this.width=this.sheetWidth/this.cols;
	this.height=this.sheetHeight/this.rows;
	this.currentFrame=0;
	this.speed=speed;
	this.scale=scale;
	this.loaded=loaded;
	this.useTime=useTime;
	this.wallCollision=wallCollision;
	this.name=name
	this.id=id
	this.debugged=false
	this.debugShowWhat
	this.wishHappyBDay=false
	this.forRandomRng;
	this.falling=false
	this.fallSpeed=0
	this.maxFallSpeed=maxFallSpeed
	this.fallSpeedAcceleration=fallSpeedAcceleration
	this.gravity=true
	this.followTimer;
	this.useStand=useStand
	this.dontDetectFloor=dontDetectFloor
}
function updateDate(){
	time=new Date();
	timeHour=time.getHours();
	timeMinuts=time.getMinutes();
	timeSeconds=time.getSeconds();
	if(tellTimeActive&&!inDebugMode){
		thisText= "Z: " + timeHour + ":" + timeMinuts + ":" + timeSeconds;
		textusage[1]=25
	}
}

function tellTime(){
	tellTimeActive=!tellTimeActive	
	stopWatchActive=false
}
function randomWhat(){
	whatUseage=Math.floor(Math.random()*3);
}
function setTimer(){
	timer=Math.floor(Math.random()*70);
}
function count(){
	if(timer>0){
		timer=timer-1;
	}
	if(keyTimer>0){
		keyTimer-=1;
	}
	if(debug&&debugTimerShow){
		console.log("timer=",timer)
	}
	if(debug&&debugKeyTimerShow){

	}

}
sprite.prototype.moveRight=function(){
	this.left=false;
	this.standStill=false;
}
sprite.prototype.moveLeft=function(){
	this.left=true;
	this.standStill=false;
}
sprite.prototype.standRight=function(){
	this.left=false;
	this.standStill=true;
}
sprite.prototype.standLeft=function(){
	this.left=true;
	this.standStill=true;
}
sprite.prototype.updateFrame=function(){
	if(this.loaded){
		this.currentFrame=++this.currentFrame%this.cols;
		this.srcX=this.currentFrame*this.width
		this.srcY=0;
		if(!this.falling&&this.gravity){
			this.y=canHeight-115-this.height*this.scale;
		}
		if(this.falling&&this.gravity){
			if(this.fallSpeed<this.maxFallSpeed){
				console.log("SPPAAMAMMMM")
				this.fallSpeed+=this.fallSpeedAcceleration
			}
			if(this.y<canHeight-115-this.height*this.scale){
				this.y+=this.fallSpeed
			}
			if(this.y>canHeight-115-this.height*this.scale){
				this.falling=false
				this.fallSpeed=0
			}
		}
		if(this.left&&this.standStill)
			this.srcY = this.trackStandLeft*this.height;
		if(this.left&&!this.standStill)
			this.srcY = this.trackLeft*this.height;
		if(!this.eft&&this.standStill)
			this.srcY = this.trackStandRight*this.height;
		if(!this.left&&!this.standStill)
			this.srcY = this.trackRight*this.height;
		if(this.left&&!this.standStill&&this.x>0&&this.wallCollision){
			this.x-=this.speed;
		}
		if(this.left&&!this.standStill&&!this.wallCollision){
			this.x-=this.speed;
		}
		if(!this.left&&!this.standStill&&this.x<canWidth-this.width&&this.wallCollision){
			this.x+=this.speed;
		}
		if(!this.left&&!this.standStill&&!this.wallCollision){
			this.x+=this.speed;
		}
		if(this.left&&!this.standStill&&this.x==0&&this.wallCollision&&this.useStand){
			this.standLeft();
		}
		if(this.left&&!this.standStill&&this.x<0&&this.wallCollision){
			this.x=0
		}
		if(this.left&&!this.standStill&&this.x>0-this.width&&!this.wallCollision){
			this.loaded=false
			if(debug){
				console.log("unloded",this.name);
			}
		}
		if(!this.left&&!this.standStill&&this.x==canWidth-this.width-1&&this.wallCollision&&this.useStand){
			this.standRight();
		}
		if(!this.left&&!this.standStill&&this.x>canWidth-this.width-1&&this.wallCollision){
			this.x=canWidth-this.width-1
		}
		if(!this.left&&!this.standStill&&this.x>canWidth&&!this.wallCollision){
			this.loaded=false
			if(debug){
				console.log("unloded",this.name);
			}
		}
		if(timer===0&&this.useTime){
			randomWhat();
			setTimer();
			if(whatUseage===0){
				this.moveLeft();
			}else if(whatUseage===1){
				this.moveRight();
			}else if(whatUseage===2){
				this.standLeft();
			}else {
				this.standRight();
			}
		}
	}
	
}
sprite.prototype.setUpBirthday=function(){
	if(!this.wishHappyBDay){
		this.wallCollision=true
		this.loaded=false
		this.gravity=false
		this.forRandomRng=Math.floor(Math.random()*2)
		if(this.forRandomRng===0){
			this.x=0
		}
		if(this.forRandomRng===1){
			this.x=canWidth-this.height
		}
		if(this.forRAndomRng===2){
			this.falling=true
			this.x=canWidth*1/2
			this.y=0
		}
		this.loaded=true
		this.gravity=true
		this.wishHappyBDay=true
	}
}
sprite.prototype.finishBirthday=function(){
	this.wallCollision=false
	this.wishHappyBDay=false
}
sprite.prototype.wishingMyBirthday=function(){
	if(this.x===zBit.x){
		this.followTimer=Math.floor(Math.random(20-10))+10
		this.forRandomRng=Math.floor(Math.random()*1)
		if(this.forRandomRng===0){
			this.left=true
		}else{
			this.left=false
		}
	}
	if(this.wishHappyBDay){
		if(this.x<zBit.x){
			this.left=false
		}
		if(this.x>zBit.x){
			this.left=true
		}
	}
}
sprite.prototype.setDebug=function(){
	if(this.id===entityIDChosen&&whatToDebug===1){
		this.debug=true
		this.debugShowWhat=1
		entitiyIDChosen=0
		whatToDebug=0
	}
	if(this.id===entityIDChosen&&whatToDebug===2){
		this.debug=true
		this.debugShowWhat=2
		entitiyIDChosen=0
		whatToDebug=0
	}
	if(this.id==entityIDChosen&&whatToDebug===3){
		this.debug=true
		this.debugShowWhat=3
		entityIdChosen=0
		whatToDebug=0
	}
	startSpriteDebug=false
}
function japaneseTrigger(){
	inJapanese=!inJapanese;

	if(inJapanese){
		rightButton.innerText="右";
		leftButton.innerText="左";
		standRightButton.innerText="右スタンド";
		standLeftButton.innerText="左スタンド";
		tellTimeButton.innerText="時間言う";
		stopWatchButtn.innerText="ストップウォッチ";
		japaneseEnglishTrigger.innerText="English";
	}else{
		rightButton.innerText="right";
		leftButton.innerText="left";
		standRightButton.innerText="stand right";
		standLeftButton.innerText="stand left";
		tellTimeButton.innerText="tell time";
		stopWatchButtn.innerText="stop watch";
		japaneseEnglishTrigger.innerText="日本語";
	}
}
function drawElse(){
	ctx.clearRect(0,0,canWidth,canHeight);
	count();
	updateDate();
	ctx.drawImage(background,0,0);
	ctx.drawImage(speechBubble,0,speachBubbley);
	ctx.fillStyle = "white";
	ctx.fillText(thisText,5,canHeight-textHeight);
	ctx.fillText(thisText2,5,canHeight-textHeight+10);
	ctx.fillText(thisText3,5,canHeight-textHeight+20);
	ctx.fillText(thisText4,5,canHeight-textHeight+30);
	ctx.fillText(thisText5,5,canHeight-textHeight+40);
	ctx.fillText(thisText6,5,canHeight-textHeight+50);
	ctx.fillText(thisText7,5,canHeight-textHeight+60);
	ctx.fillText(thisText8,5,canHeight-textHeight+70);
}
sprite.prototype.drawSprite=function (){
	if(this.wishHappyBDay){
		this.wishingMyBirthday()
	}
	if(startSpriteDebug===true){
		this.setDebug()
	}
	this.updateFrame();
	if(this.loaded){
		ctx.drawImage(this.img,this.srcX,this.srcY,this.width,this.height,this.x,this.y,this.width*this.scale,this.height*this.scale);
	}
	
}

var zBitNpc1=new sprite(z,0,0,1,0,3,2,272,124,8,4,5,1,false,false,false,"zBitNpc1Name",2,10,3,false,false);
var zBitNpc2=new sprite(z,0,0,1,0,3,2,272,124,8,4,4,1,false,false,false,"zBitNpc2Name",3,10,3,false,false);
var zBitNpc3=new sprite(z,0,0,1,0,3,2,272,124,8,4,6,1,false,false,false,"zBitNpc3Name",4,10,3,false,false);
var zBitNpc4=new sprite(z,0,0,1,0,3,2,272,124,8,4,3,1,false,false,false,"zBitNpc4Name",5,10,3,false,false);
var zBitNpcBig1=new sprite(z,0,0,1,0,3,2,272,124,8,4,2,1.5,false,false,false,"zBitNpcBig1Name",9,10,3,false,false);
var zBitNpcBig2=new sprite(z,0,0,1,0,3,2,272,124,8,4,1,1.5,false,false,false,"zBitNpcBig2Name",10,10,3,false,false);
var zBitNpcBig3=new sprite(z,0,0,1,0,3,2,272,124,8,4,4,1.5,false,false,false,"zBitNpcBig3Name",11,10,3,false,false);
var zBitNpcBig4=new sprite(z,0,0,1,0,3,2,272,124,8,4,3,1.5,false,false,false,"zBitNpcBig4Name",12,10,3,false,false);
var zBit=new sprite(z,0,0,1,0,3,2,272,124,8,4,3,1,true,true,true,"zBitName",1,10,3,true,false);
var zBitNpc5=new sprite(z,0,0,1,0,3,2,272,124,8,4,7,1,false,false,false,"zBitNpc5Name",6,10,3,false,false);
var zBitNpc6=new sprite(z,0,0,1,0,3,2,272,124,8,4,6,1,false,false,false,"zBitNpc6Name",7,10,3,false,false);
var zBitNpc7=new sprite(z,0,0,1,0,3,2,272,124,8,4,5,1,false,false,false,"zBitNpc7Name",8,10,3,false,false);
var zBitNpcBig5=new sprite(z,0,0,1,0,3,2,272,124,8,4,2,1.5,false,false,false,"zBitNpcBig5Name",13,10,3,false,false);
var zBitNpcBig6=new sprite(z,0,0,1,0,3,2,272,124,8,4,3,1.5,false,false,false,"zBitNpcBig6Name",14,10,3,false,false);
var zBitNpcBig7=new sprite(z,0,0,1,0,3,2,272,124,8,4,2,1.5,false,false,false,"zBitNpcBig7Name",15,10,3,false,false);
function useDrawSpriteFunction(){
	zBit.drawSprite();
	zBitNpc1.drawSprite();
	zBitNpc2.drawSprite();
	zBitNpc3.drawSprite();
	zBitNpc4.drawSprite();
	zBitNpc5.drawSprite();
	zBitNpc6.drawSprite();
	zBitNpc7.drawSprite();
	zBitNpcBig1.drawSprite();
	zBitNpcBig2.drawSprite();
	zBitNpcBig3.drawSprite();
	zBitNpcBig4.drawSprite();
	zBitNpcBig5.drawSprite();
	zBitNpcBig6.drawSprite();
	zBitNpcBig7.drawSprite();
	if(startSpriteDebug===true){
		startSpriteDebug=false;
	}
}
setInterval(function(){
	drawElse();
},100,);
setInterval(function(){
	useDrawSpriteFunction();
},100,);

//randomHappning
var randomHappeningArr=[];//arrID=0
var randomHappeningAddArr=[];//arrID=1
var randomHappeningSubArr=[];//arrID=2
var randomHappeningAddResultStack=[];//arrID=3
var randomHappeningSubResultStack=[];//arrID=4
var randomHappeningResultStack=[];
var randomHappeningRandomNumGen;
var randomHappeningTimer=Math.floor(Math.random()*(20-10))+5;
var randomHappeningWhatToDo;
var randomHappeningEnableWhatToDoChange;
var randomHappeningNumadd1;
var randomHappeningNumadd2;
var randomHappeningNumSub1;
var randomHappeningNumSub2;
var randomHappeningEvent;
var randomHappeningNumTemp;
var randomHappeningNumTemp2;
var randomHappeningActive=false;
var howManyTimes;
function randomlyDrawNumberRandomHappening(){
	randomHappeningRandomNumGen=Math.floor(Math.random()*9999);
}
function randomlyHowManyTimes(min,max){
	 howManyTimes=Math.floor(Math.random()*(max-min))+min;
}
function randomHappening(){
	
	if(randomHappeningTimer>0&&!debugHappening){
		randomHappeningTimer-=1;
	}
	
	if(randomHappeningTimer===0){
		if(randomHappeningActive===false){
			randomHappeningTimer=Math.floor(Math.random()*(20-5))+5;
			randomHappeningRandomNumGen=Math.floor(Math.random()*9999);
			

		}
		if(randomHappeningArr.length>=0&&randomHappeningArr.length<=5&&randomHappeningActive===false){
			randomHappeningRng(100);
			randomlyHowManyTimes(0,3)
			randomHappeningChoseWhatToDo2(0,50,randomHappeningPush,50,100,randomHappeningUnshift);
		}else if(randomHappeningArr.length>=5&&randomHappeningArr.length<=10&&randomHappeningActive===false){
			randomHappeningRng(120);
			randomlyHowManyTimes(0,3)
			randomHappeningChoseWhatToDo4(0,50,randomHappeningPush,50,100,randomHappeningUnshift,100,110,randomHappeningPop,110,120,randomHappeningShift);
		}else if(randomHappeningArr.length>=10&&randomHappeningAddResultStack.length===0&&randomHappeningSubResultStack.length===0&&randomHappeningActive===false){
			randomHappeningRng(280);
			randomlyHowManyTimes(0,3)
			randomHappeningChoseWhatToDo14(0,25,randomHappeningPush,25,50,randomHappeningUnshift,50,75,randomHappeningPop,75,100,randomHappeningShift,100,110,randomHappeningSwitchFTB,110,120,randomHappeningSwitchBTF,120,140,randomHappeningInsertAddNumFF,140,160,randomHappeningInsertAddNumFB,160,180,randomHappeningInsertAddNumBF,180,200,randomHappeningInsertAddNumBB,200,220,randomHappeningInsertSubNumFF,220,240,randomHappeningInsertSubNumFB,240,260,randomHappeningInsertSubNumBF,260,280,randomHappeningInsertSubNumBB);
		}else if(randomHappeningArr.length>=10&&randomHappeningAddResultStack.length>=1&&randomHappeningSubResultStack.length>=1&&randomHappeningAddResultStack.length<=50&&randomHappeningSubResultStack.length<=50&&randomHappeningActive===false){
			randomHappeningRng(440);
			randomlyHowManyTimes(0,3)
			randomHappeningChoseWhatToDo21(0,25,randomHappeningPush,25,50,randomHappeningUnshift,50,75,randomHappeningPop,75,100,randomHappeningShift,100,110,randomHappeningSwitchFTB,110,120,randomHappeningSwitchBTF,120,140,randomHappeningInsertAddNumFF,140,160,randomHappeningInsertAddNumFB,160,180,randomHappeningInsertAddNumBF,180,200,randomHappeningInsertAddNumBB,200,220,randomHappeningInsertSubNumFF,220,240,randomHappeningInsertSubNumFB,240,260,randomHappeningInsertSubNumBF,260,280,randomHappeningInsertSubNumBB,280,300,randomHappeningReinsertAddNumberF,300,320,randomHappeningReinsertAddNumberB,320,340,randomHappeningReinsertSubNumberF,340,360,randomHappeningReinsertSubNumberB,360,380,randomHappeningAddJoinF,380,400,randomHappeningAddJoinB,400,420,randomHappeningSubJoinF,420,440,randomHappeningSubJoinB);
		}else if(randomHappeningArr.length>=10&&randomHappeningAddResultStack.length>=1&&randomHappeningAddResultStack.length<=50&&randomHappeningSubResultStack.length===0&&randomHappeningActive===false){
			randomHappeningRng(360);
			randomlyHowManyTimes(0,3)
			randomHappeningChoseWhatToDo18(0,25,randomHappeningPush,25,50,randomHappeningUnshift,50,75,randomHappeningPop,75,100,randomHappeningShift,100,110,randomHappeningSwitchFTB,110,120,randomHappeningSwitchBTF,120,140,randomHappeningInsertAddNumFF,140,160,randomHappeningInsertAddNumFB,160,180,randomHappeningInsertAddNumBF,180,200,randomHappeningInsertAddNumBB,200,220,randomHappeningInsertSubNumFF,220,240,randomHappeningInsertSubNumFB,240,260,randomHappeningInsertSubNumBF,260,280,randomHappeningInsertSubNumBB,280,300,randomHappeningReinsertAddNumberF,300,320,randomHappeningReinsertAddNumberB,320,340,randomHappeningAddJoinF,340,360,randomHappeningAddJoinB);
		}else if(randomHappeningArr.length>=10&&randomHappeningAddResultStack.length===0&&randomHappeningSubResultStack.length>=1&&randomHappeningSubResultStack.length<=50&&randomHappeningActive===false){
			randomHappeningRng(360);
			randomlyHowManyTimes(0,3)
			randomHappeningChoseWhatToDo18(0,25,randomHappeningPush,25,50,randomHappeningUnshift,50,75,randomHappeningPop,75,100,randomHappeningShift,100,110,randomHappeningSwitchFTB,110,120,randomHappeningSwitchBTF,120,140,randomHappeningInsertAddNumFF,140,160,randomHappeningInsertAddNumFB,160,180,randomHappeningInsertAddNumBF,180,200,randomHappeningInsertAddNumBB,200,220,randomHappeningInsertSubNumFF,220,240,randomHappeningInsertSubNumFB,240,260,randomHappeningInsertSubNumBF,260,280,randomHappeningInsertSubNumBB,280,300,randomHappeningReinsertSubNumberF,300,320,randomHappeningReinsertSubNumberB,320,340,randomHappeningSubJoinF,340,360,randomHappeningSubJoinB);
		}else if(randomHappeningArr.length>=10&&randomHappeningAddResultStack.length>=51&&randomHappeningSubResultStack.length>=51&&randomHappeningActive===false){
			randomHappeningRng(400)
			randomlyHowManyTimes(5,10)
			randomHappeningChoseWhatToDo8(0,50,randomHappeningReinsertAddNumberF,50,100,randomHappeningReinsertAddNumberB,100,150,randomHappeningReinsertSubNumberF,150,200,randomHappeningReinsertSubNumberB,200,250,randomHappeningAddJoinF,250,300,randomHappeningAddJoinB,300,350,randomHappeningSubJoinF,350,400,randomHappeningSubJoinB)
		}else if(randomHappeningArr.length>=10&&randomHappeningAddResultStack.length<=50&&randomHappeningSubResultStack.length>=51&&randomHappeningActive===false){
			randomHappeningRng(200)
			randomlyHowManyTimes(3,5)
			randomHappeningChoseWhatToDo4(0,50,randomHappeningReinsertSubNumberF,50,100,randomHappeningReinsertSubNumberB,100,150,randomHappeningSubJoinF,150,200,randomHappeningSubJoinB)
		}else if(randomHappeningArr.length>=10&&randomHappeningSubResultStack.length<=50&&randomHappeningAddResultStack.length>=51&&randomHappeningActive===false){
			randomHappeningRng(200)
			randomlyHowManyTimes(3,5)
			randomHappeningChoseWhatToDo4(0,50,randomHappeningReinsertAddNumberF,50,100,randomHappeningReinsertAddNumberB,100,150,randomHappeningAddJoinF,150,200,randomHappeningAddJoinB)
		}
		if(debug&&randomHappningShowArr&&!inDebugMode&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
		if(debug&&randomHappningShowActive&&!inDebugMode&&!inDebugMode){
			debugThis(randomHappeningActive,"rHActive",18)
		}
		if(debug&&randomHappningShowRNG&&!inDebugMode&&!inDebugMode){
			debugThis(randomHappeningRandomNumGen,"randomHappeningRNG",19)
		}
		if(debug&&randomHappningShowAddArr&&!inDebugMode&&!inDebugMode){
			debugThisArr(randomHappeningAddArr,"+dArr",20)
		}
		if(debug&&randomHappningShowSubArr&&!inDebugMode&&!inDebugMode){
			debugThisArr(randomHappeningSubArr,"-Arr",21)
		}
		if(debug&&randomHappningShowAddArrStack&&!inDebugMode&&!inDebugMode){
			debugThisArr(randomHappeningAddResultStack,"+Stk",22)
		}
		if(debug&&randomHappningShowSubArrStack&&!inDebugMode&&!inDebugMode){
			debugThisArr(randomHappeningSubResultStack,"-Stk",23)
		}

		if(debug&&randomHappiningShowWTD&&!inDebugMode&&!inDebugMode){
			debugThis(randomHappeningWhatToDo,"randomHappeningWTD",24)
		}



		
		randomHappeningWhatToDo=0
	}
	if(randomHappeningSubArr.length>=2){
		randomHappeningNumSub1=randomHappeningSubArr[0];
		randomHappeningSubArr.shift();
		randomHappeningNumSub2=randomHappeningSubArr[0];
		randomHappeningSubArr.shift();
		randomHappeningNumTemp=randomHappeningNumSub1-randomHappeningNumSub2;
		if(randomHappeningNumTemp>=0){
			randomHappeningSubResultStack.push(randomHappeningNumTemp);
		}
		if(randomHappeningNumTemp<0){
			randomHappeningNumTemp=randomHappeningNumTemp*-1;
		}
		if(randomHappeningNumTemp<=9999){
			randomHappeningSubResultStack.push(randomHappeningNumTemp);
		}
		randomHappeningNumTemp=0;
		randomHappeningNumTemp2=0;
	}
	if(randomHappeningAddArr.length>=2){
		randomHappeningNumAdd1=randomHappeningAddArr[0];
		randomHappeningAddArr.shift();
		randomHappeningNumAdd2=randomHappeningAddArr[0];
		randomHappeningAddArr.shift();
		randomHappeningNumTemp=randomHappeningNumAdd1+randomHappeningNumAdd2;
		if(randomHappeningNumTemp<=9999){
			randomHappeningAddResultStack.push(randomHappeningNumTemp)
		}
		if(randomHappeningNumTemp>9999){
			randomHappeningNumTemp2=randomHappeningNumTemp-9999;
			randomHappeningNumTemp=randomHappeningNumTemp-randomHappeningNumTemp2;
			randomHappeningAddResultStack.push(randomHappeningNumTemp);
			randomHappeningAddResultStack.push(randomHappeningNumTemp2);
		}
		randomHappeningNumTemp=0;
		randomHappeningNumTemp2=0;
	}
}
function randomHappeningRng(num){
	randomHappeningWhatToDo=Math.floor(Math.random()*num);
}

function randomHappeningChoseWhatToDo2(min1,max1,whatToDo1,min2,max2,whatToDo2){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		whatToDo1 ();
	
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		whatToDo2 ();
	}

}

function randomHappeningChoseWhatToDo3(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}
	
}
function randomHappeningChoseWhatToDo4(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}
	
}
function randomHappeningChoseWhatToDo5(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}
	
}
function randomHappeningChoseWhatToDo6(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}
	
}
function randomHappeningChoseWhatToDo7(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}
	
}
function randomHappeningChoseWhatToDo8(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}
	
}	
function randomHappeningChoseWhatToDo9(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}
	
}	
function randomHappeningChoseWhatToDo10(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}
	
}	
function randomHappeningChoseWhatToDo11(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}
	
}	
function randomHappeningChoseWhatToDo12(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}
	
}	
function randomHappeningChoseWhatToDo13(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}
	
}	
function randomHappeningChoseWhatToDo14(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}
	
}	
function randomHappeningChoseWhatToDo15(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}
	
}	
function randomHappeningChoseWhatToDo16(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}
	
}	
function randomHappeningChoseWhatToDo17(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16,min17,max17,WTD17){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}else if(randomHappeningWhatToDo<=max17&&randomHappeningWhatToDo>min17){
		WTD17 ();
	}
	
}
function randomHappeningChoseWhatToDo18(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16,min17,max17,WTD17,min18,max18,WTD18){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}else if(randomHappeningWhatToDo<=max17&&randomHappeningWhatToDo>min17){
		WTD17 ();
	}else if(randomHappeningWhatToDo<=max18&&randomHappeningWhatToDo>min18){
		WTD18 ();
	}
	
}
function randomHappeningChoseWhatToDo19(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16,min17,max17,WTD17,min18,max18,WTD18,min19,max19,WTD19){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}else if(randomHappeningWhatToDo<=max17&&randomHappeningWhatToDo>min17){
		WTD17 ();
	}else if(randomHappeningWhatToDo<=max18&&randomHappeningWhatToDo>min18){
		WTD18 ();
	}else if(randomHappeningWhatToDo<=max19&&randomHappeningWhatToDo>min19){
		WTD19 ();
	}
	;
}
function randomHappeningChoseWhatToDo20(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16,min17,max17,WTD17,min18,max18,WTD18,min19,max19,WTD19,min20,max20,WTD20){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}else if(randomHappeningWhatToDo<=max17&&randomHappeningWhatToDo>min17){
		WTD17 ();
	}else if(randomHappeningWhatToDo<=max18&&randomHappeningWhatToDo>min18){
		WTD18 ();
	}else if(randomHappeningWhatToDo<=max19&&randomHappeningWhatToDo>min19){
		WTD19 ();
	}else if(randomHappeningWhatToDo<=max20&&randomHappeningWhatToDo>min20){
		WTD20 ();
	}
	
}
function randomHappeningChoseWhatToDo21(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16,min17,max17,WTD17,min18,max18,WTD18,min19,max19,WTD19,min20,max20,WTD20,min21,max21,WTD21){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}else if(randomHappeningWhatToDo<=max17&&randomHappeningWhatToDo>min17){
		WTD17 ();
	}else if(randomHappeningWhatToDo<=max18&&randomHappeningWhatToDo>min18){
		WTD18 ();
	}else if(randomHappeningWhatToDo<=max19&&randomHappeningWhatToDo>min19){
		WTD19 ();
	}else if(randomHappeningWhatToDo<=max20&&randomHappeningWhatToDo>min20){
		WTD20 ();
	}else if(randomHappeningWhatToDo<=max21&&randomHappeningWhatToDo>min21){
		WTD21 ();
	}
	
}
function randomHappeningChoseWhatToDo22(min1,max1,WTD1,min2,max2,WTD2,min3,max3,WTD3,min4,max4,WTD4,min5,max5,WTD5,min6,max6,WTD6,min7,max7,WTD7,min8,max8,WTD8,min9,max9,WTD9,min10,max10,WTD10,min11,max11,WTD11,min12,max12,WTD12,min13,max13,WTD13,min14,max14,WTD14,min15,max15,WTD15,min16,max16,WTD16,min17,max17,WTD17,min18,max18,WTD18,min19,max19,WTD19,min20,max20,WTD20,min21,ma211,WTD21,min22,max22,WTD22){
	if(randomHappeningWhatToDo<=max1&&randomHappeningWhatToDo>min1){
		WTD1 ();
	}else if(randomHappeningWhatToDo<=max2&&randomHappeningWhatToDo>min2){
		WTD2 ();
	}else if(randomHappeningWhatToDo<=max3&&randomHappeningWhatToDo>min3){
		WTD3 ();
	}else if(randomHappeningWhatToDo<=max4&&randomHappeningWhatToDo>min4){
		WTD4 ();
	}else if(randomHappeningWhatToDo<=max5&&randomHappeningWhatToDo>min5){
		WTD5 ();
	}else if(randomHappeningWhatToDo<=max6&&randomHappeningWhatToDo>min6){
		WTD6 ();
	}else if(randomHappeningWhatToDo<=max7&&randomHappeningWhatToDo>min7){
		WTD7 ();
	}else if(randomHappeningWhatToDo<=max8&&randomHappeningWhatToDo>min8){
		WTD8 ();
	}else if(randomHappeningWhatToDo<=max9&&randomHappeningWhatToDo>min9){
		WTD9 ();
	}else if(randomHappeningWhatToDo<=max10&&randomHappeningWhatToDo>min10){
		WTD10 ();
	}else if(randomHappeningWhatToDo<=max11&&randomHappeningWhatToDo>min11){
		WTD11 ();
	}else if(randomHappeningWhatToDo<=max12&&randomHappeningWhatToDo>min12){
		WTD12 ();
	}else if(randomHappeningWhatToDo<=max13&&randomHappeningWhatToDo>min13){
		WTD13 ();
	}else if(randomHappeningWhatToDo<=max14&&randomHappeningWhatToDo>min14){
		WTD14 ();
	}else if(randomHappeningWhatToDo<=max15&&randomHappeningWhatToDo>min15){
		WTD15 ();
	}else if(randomHappeningWhatToDo<=max16&&randomHappeningWhatToDo>min16){
		WTD16 ();
	}else if(randomHappeningWhatToDo<=max17&&randomHappeningWhatToDo>min17){
		WTD17 ();
	}else if(randomHappeningWhatToDo<=max18&&randomHappeningWhatToDo>min18){
		WTD18 ();
	}else if(randomHappeningWhatToDo<=max19&&randomHappeningWhatToDo>min19){
		WTD19 ();
	}else if(randomHappeningWhatToDo<=max20&&randomHappeningWhatToDo>min20){
		WTD20 ();
	}else if(randomHappeningWhatToDo<=max21&&randomHappeningWhatToDo>min21){
		WTD21 ();
	}else if(randomHappeningWhatToDo<=max22&&randomHappeningWhatToDo>min22){
		WTD22 ();
	}
	
}
function randomHappeningPush(){ //1
	randomHappeningArr.push(randomHappeningRandomNumGen);
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningPush()
	}else{
		randomHappeningActive=false
	}

}
function randomHappeningUnshift(){ //2
	randomHappeningArr.unshift(randomHappeningRandomNumGen);
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningUnshift()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningPop(){ //3
	randomHappeningArr.pop();
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningPop()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningShift(){ //4
	randomHappeningArr.shift();
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningShift()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningSwitchFTB(){ //5
	randomHappeningNumTemp=randomHappeningArr[0];
	randomHappeningArr.shift();
	randomHappeningArr.push(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningSwitchFTB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningSwitchBTF(){ //6
	randomHappeningNumTemp=randomHappeningArr[randomHappeningArr.length-1];
	randomHappeningArr.pop();
	randomHappeningArr.unshift(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningSwitchBTF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertAddNumFF(){ //7
	randomHappeningNumTemp=randomHappeningArr[0];
	randomHappeningArr.shift();
	randomHappeningAddArr.unshift(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertAddNumFF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertAddNumFB(){ //8
	randomHappeningNumTemp=randomHappeningArr[randomHappeningArr.length-1];
	randomHappeningArr.pop();
	randomHappeningAddArr.unshift(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertAddNumFB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertAddNumBF(){//9
	randomHappeningNumTemp=randomHappeningArr[0];
	randomHappeningArr.shift();
	randomHappeningAddArr.push(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertAddNumBF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertAddNumBB(){//10
	randomHappeningNumTemp=randomHappeningArr[randomHappeningArr.length-1];
	randomHappeningArr.pop();
	randomHappeningAddArr.push(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertAddNumBB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertSubNumFF(){ //11
	randomHappeningNumTemp=randomHappeningArr[0];
	randomHappeningArr.shift();
	randomHappeningSubArr.unshift(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertSubNumFF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertSubNumFB(){ //12
	randomHappeningNumTemp=randomHappeningArr[randomHappeningArr.length-1];
	randomHappeningArr.pop();
	randomHappeningSubArr.unshift(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertSubNumFB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertSubNumBF(){//13
	randomHappeningNumTemp=randomHappeningArr[0];
	randomHappeningArr.shift();
	randomHappeningSubArr.push(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertSubNumBF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningInsertSubNumBB(){//14
	randomHappeningNumTemp=randomHappeningArr[randomHappeningArr.length-1];
	randomHappeningArr.pop();
	randomHappeningSubArr.push(randomHappeningNumTemp);
	randomHappeningNumTemp=0;
	randomHappeningActive=true;
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningInsertSubNumBB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningReinsertAddNumberF(){//15
	if(randomHappeningAddResultStack.length>0){
		randomHappeningNumTemp=randomHappeningAddResultStack[randomHappeningAddResultStack.length-1];
		randomHappeningAddResultStack.pop();
		randomHappeningAddArr.unshift(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;	
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningReinsertAddNumberF()
	}else{
		randomHappeningActive=false
	}
	
}
function randomHappeningReinsertAddNumberB(){//16
	if(randomHappeningAddResultStack.length>0){
		randomHappeningNumTemp=randomHappeningAddResultStack[randomHappeningAddResultStack.length-1];
		randomHappeningAddResultStack.pop();
		randomHappeningAddArr.push(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningReinsertAddNumberB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningReinsertSubNumberF(){//17
	if(randomHappeningSubResultStack.length>0){
		randomHappeningNumTemp=randomHappeningSubResultStack[randomHappeningSubResultStack.length-1];
		randomHappeningSubResultStack.pop();
		randomHappeningSubArr.unshift(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningReinsertSubNumberF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningReinsertSubNumberB(){//18
	if(randomHappeningSubResultStack.length>0){
		randomHappeningNumTemp=randomHappeningSubResultStack[randomHappeningSubResultStack.length-1];
		randomHappeningSubResultStack.pop();
		randomHappeningSubArr.push(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;
		
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningReinsertSubNumberB()
	}else{
		randomHappeningActive=false
	}
	
}
function randomHappeningAddJoinF(){//19
	if(randomHappeningAddResultStack.length>0){
		randomHappeningNumTemp=randomHappeningAddResultStack[randomHappeningAddResultStack.length-1];
		randomHappeningAddResultStack.pop();
		randomHappeningArr.unshift(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningAddJoinF()
	}else{
		randomHappeningActive=false
	}
}

function randomHappeningAddJoinB(){//20
	if(randomHappeningAddResultStack.length>0){	
		randomHappeningNumTemp=randomHappeningAddResultStack[randomHappeningAddResultStack.length-1];
		randomHappeningAddResultStack.pop();
		randomHappeningArr.push(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningAddJoinB()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningSubJoinF(){//21
	if(randomHappeningSubResultStack.length>0){
		randomHappeningNumTemp=randomHappeningSubResultStack[randomHappeningSubResultStack.length-1];
		randomHappeningSubResultStack.pop();
		randomHappeningArr.unshift(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;	
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningSubJoinF()
	}else{
		randomHappeningActive=false
	}
}
function randomHappeningSubJoinB(){//22
	if(randomHappeningSubResultStack.length>0){
		randomHappeningNumTemp=randomHappeningSubResultStack[randomHappeningSubResultStack.length-1];
		randomHappeningSubResultStack.pop();
		randomHappeningArr.push(randomHappeningNumTemp);
		randomHappeningNumTemp=0;
		randomHappeningActive=true;
	}
	if(howManyTimes>0){
		howManyTimes-=1
		randomHappeningSubJoinB()
	}else{
		randomHappeningActive=false
	}
}

setInterval(function(){
	randomHappening();
},100,)
//random happnings
var randomRandomRng=0;
var randomRandomRng2=0;
var RandomDoThis=0
var randomAmountOfTime=0
var randomTimers=0
var randomTimersSpeed=0
function randomRezultHappenings(){
	if(randomHappeningArr[10]>=9700&&randomHappeningArr[11]>=9700){
		randomHappeningArr.splice(10);
		randomHappeningArr.splice(11);
		smallNPCL();
		bigNPCL();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[10]>=9700){
		randomHappeningArr.splice(10);
		smallNPCL()
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[11]>=9700){
		randomHappeningArr.splice(11);
		bigNPCL()
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[10]<=299&randomHappeningArr[11]<=299){
		randomHappeningArr.splice(10);
		randomHappeningArr.splice(11);
		smallNPCR();
		bigNPCR();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[10]<=299){
		randomHappeningArr.splice(10);
		smallNPCR();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[11]<=299){
		randomHappeningArr.splice(11);
		bigNPCL()
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[12]>=9700&&randomHappeningArr[13]>=9700){
		randomAmountOfTime=Math.floor(Math.random()*4)
		randomHappeningArr.splice(12);
		randomHappeningArr.splice(13);
		smallNPCLH();
		bigNPCLH();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[12]>=9700){
		randomAmountOfTime=Math.floor(Math.random()*4)
		randomHappeningArr.splice(12);
		smallNPCLH()
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[13]>=9700){
		randomAmountOfTime=Math.floor(Math.random()*4)
		randomHappeningArr.splice(13);
		bigNPCLH()
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[12]<=299&randomHappeningArr[13]<=299){
		randomAmountOfTime=Math.floor(Math.random()*4)
		randomHappeningArr.splice(12);
		randomHappeningArr.splice(13);
		smallNPCRH();
		bigNPCRH();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[12]<=299){
		randomAmountOfTime=Math.floor(Math.random()*4)
		randomHappeningArr.splice(12);
		smallNPCRH();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThiArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[13]<=299){
		randomAmountOfTime=Math.floor(Math.random()*4)
		randomHappeningArr.splice(13);
		bigNPCLH()
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[3]<=100){
		beepbeepIMACAR();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[15]>=9601){
		highWindL();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[16]>=9999){
		highWindR();
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
	if(randomHappeningArr[12]===1999){
		myBirthdayArr();
		console.log("happyBirthday")
		if(debug&&randomHappningShowArr&&!inDebugMode){
			debugThisArr(randomHappeningArr,"rHArr",17)
		}
	}
}

setInterval(function(){
	randomRezultHappenings();
},10,)

//rezults
function smallNPCL(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpc1.left=true
		zBitNpc1.loaded=true
		zBitNpc1.x=canWidth+zBitNpc1.width
		if(debug&&showSpawning){
			console.log("spawned1")
			zBitNpc1.debugged
		}
	}
	if(randomRandomRng===1){
		zBitNpc2.left=true
		zBitNpc2.loaded=true
		zBitNpc2.x=canWidth+zBitNpc2.width
		if(debug&&showSpawning){
			console.log("spawned2")
			zBitNpc2.debugged
		}
	}
	if(randomRandomRng===2){
		zBitNpc3.left=true
		zBitNpc3.loaded=true
		zBitNpc3.x=canWidth+zBitNpc3.width
		if(debug&&showSpawning){
			console.log("spawned3")
			zBitNpc3.debugged
		}
	}
	if(randomRandomRng===3){
		zBitNpc4.left=true
		zBitNpc4.loaded=true
		zBitNpc4.x=canWidth+zBitNpc4.width
		if(debug&&showSpawning){
			console.log("spawned4")
			zBitNpc4.debugged
		}
	}
	if(randomRandomRng===4){
		zBitNpc5.left=true
		zBitNpc5.loaded=true
		zBitNpc5.x=canWidth+zBitNpc5.width
		if(debug&&showSpawning){
			console.log("spawned5")
			zBitNpc5.debugged
		}
	}
	if(randomRandomRng===5){
		zBitNpc6.left=true
		zBitNpc6.loaded=true
		zBitNpc6.x=canWidth+zBitNpc6.width
		if(debug&&showSpawning){
			console.log("spawned6")
			zBitNpc6.debugged
		}
	}
	if(randomRandomRng===6){
		zBitNpc7.left=true
		zBitNpc7.loaded=true
		zBitNpc7.x=canWidth+zBitNpc7.width
		if(debug&&showSpawning){
			console.log("spawned7")
			zBitNpc7.debugged
		}
	}
}
function bigNPCL(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpcBig1.left=true
		zBitNpcBig1.loaded=true
		zBitNpcBig1.x=canWidth+zBitNpcBig1.width
		if(debug&&showSpawning){
			console.log("spawnedBig1")
		}
	}
	if(randomRandomRng===1){
		zBitNpcBig2.left=true
		zBitNpcBig2.loaded=true
		zBitNpcBig2.x=canWidth+zBitNpcBig2.width
		if(debug&&showSpawning){
			console.log("spawnedBig2")
		}
	}
	if(randomRandomRng===2){
		zBitNpcBig3.left=true
		zBitNpcBig3.loaded=true
		zBitNpcBig3.x=canWidth+zBitNpcBig3.width
		if(debug&&showSpawning){
			console.log("spawnedBig3")
		}
	}
	if(randomRandomRng===3){
		zBitNpcBig4.left=true
		zBitNpcBig4.loaded=true
		zBitNpcBig4.x=canWidth+zBitNpcBig4.width
		if(debug&&showSpawning){
			console.log("spawnedBig4")
		}
	}
	if(randomRandomRng===4){
		zBitNpcBig5.left=true
		zBitNpcBig5.loaded=true
		zBitNpcBig5.x=canWidth+zBitNpcBig5.width
		if(debug&&showSpawning){
			console.log("spawned5")
		}
	}
	if(randomRandomRng===5){
		zBitNpcBig6.left=true
		zBitNpcBig6.loaded=true
		zBitNpcBig6.x=canWidth+zBitNpcBig6.width
		if(debug&&showSpawning){
			console.log("spawned6")
		}
	}
	if(randomRandomRng===6){
		zBitNpcBig7.left=true
		zBitNpcBig7.loaded=true
		zBitNpcBig7.x=canWidth+zBitNpcBig7.width
		if(debug&&showSpawning){
			console.log("spawned7")
		}
	}
}
function smallNPCR(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpc1.left=false
		zBitNpc1.loaded=true
		zBitNpc1.x=0-zBitNpc1.width
		if(debug&&showSpawning){
			console.log("spawned1")
			zBitNpc1.debugged
		}
	}
	if(randomRandomRng===1){
		zBitNpc2.left=false
		zBitNpc2.loaded=true
		zBitNpc2.x=0-zBitNpc2.width
		if(debug&&showSpawning){
			console.log("spawned2")
			zBitNpc2.debugged
		}
	}
	if(randomRandomRng===2){
		zBitNpc3.left=false
		zBitNpc3.loaded=true
		zBitNpc3.x=0-zBitNpc3.width
		if(debug&&showSpawning){
			console.log("spawned3")
			zBitNpc3.debugged
		}
	}
	if(randomRandomRng===3){
		zBitNpc4.left=false
		zBitNpc4.loaded=true
		zBitNpc4.x=0-zBitNpc4.width
		if(debug&&showSpawning){
			console.log("spawned4")
			zBitNpc4.debugged
		}
	}
	if(randomRandomRng===4){
		zBitNpc5.left=false
		zBitNpc5.loaded=true
		zBitNpc5.x=0-zBitNpc5.width
		if(debug&&showSpawning){
			console.log("spawned5")
			zBitNpc5.debugged
		}
	}
	if(randomRandomRng===5){
		zBitNpc6.left=false
		zBitNpc6.loaded=true
		zBitNpc6.x=0-zBitNpc6.width
		if(debug&&showSpawning){
			console.log("spawned6")
			zBitNpc6.debugged
		}
	}
	if(randomRandomRng===6){
		zBitNpc7.left=false
		zBitNpc7.loaded=true
		zBitNpc7.x=0-zBitNpc7.width
		if(debug&&showSpawning){
			console.log("spawned7")
			zBitNpc7.debugged
		}
	}
}

function bigNPCR(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpcBig1.left=false
		zBitNpcBig1.loaded=true
		zBitNpcBig1.x=0-zBitNpcBig1.width
		if(debug&&showSpawning){
			console.log("spawnedBig1")
		}
	}
	if(randomRandomRng===1){
		zBitNpcBig2.left=false
		zBitNpcBig2.loaded=true
		zBitNpcBig2.x=0-zBitNpcBig2.width
		if(debug&&showSpawning){
			console.log("spawnedBig2")
		}
	}
	if(randomRandomRng===2){
		zBitNpcBig3.left=false
		zBitNpcBig3.loaded=true
		zBitNpcBig3.x=0-zBitNpcBig3.width
		if(debug&&showSpawning){
			console.log("spawnedBig3")
		}
	}
	if(randomRandomRng===3){
		zBitNpcBig4.left=false
		zBitNpcBig4.loaded=true
		zBitNpcBig4.x=0-zBitNpcBig4.width
		if(debug&&showSpawning){
			console.log("spawnedBig4")
		}
	}
	if(randomRandomRng===4){
		zBitNpcBig5.left=false
		zBitNpcBig5.loaded=true
		zBitNpcBig5.x=0-zBitNpcBig5.width
		if(debug&&showSpawning){
			console.log("spawned5")
		}
	}
	if(randomRandomRng===5){
		zBitNpcBig6.left=false
		zBitNpcBig6.loaded=true
		zBitNpcBig6.x=0-zBitNpcBig6.width
		if(debug&&showSpawning){
			console.log("spawned6")
		}
	}
	if(randomRandomRng===6){
		zBitNpcBig7.left=false
		zBitNpcBig7.loaded=true
		zBitNpcBig7.x=0-zBitNpcBig7.width
		if(debug&&showSpawning){
			console.log("spawned7")
		}
	}
}


function smallNPCLH(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpc1.left=true
		zBitNpc1.loaded=true
		zBitNpc1.x=canWidth+zBitNpc1.width
		if(debug&&showSpawning){
			console.log("spawned1")
			zBitNpc1.debugged
		}
	}
	if(randomRandomRng===1){
		zBitNpc2.left=true
		zBitNpc2.loaded=true
		zBitNpc2.x=canWidth+zBitNpc2.width
		if(debug&&showSpawning){
			console.log("spawned2")
			zBitNpc2.debugged
		}
	}
	if(randomRandomRng===2){
		zBitNpc3.left=true
		zBitNpc3.loaded=true
		zBitNpc3.x=canWidth+zBitNpc3.width
		if(debug&&showSpawning){
			console.log("spawned3")
			zBitNpc3.debugged
		}
	}
	if(randomRandomRng===3){
		zBitNpc4.left=true
		zBitNpc4.loaded=true
		zBitNpc4.x=canWidth+zBitNpc4.width
		if(debug&&showSpawning){
			console.log("spawned4")
			zBitNpc4.debugged
		}
	}
	if(randomRandomRng===4){
		zBitNpc5.left=true
		zBitNpc5.loaded=true
		zBitNpc5.x=canWidth+zBitNpc5.width
		if(debug&&showSpawning){
			console.log("spawned5")
			zBitNpc5.debugged
		}
	}
	if(randomRandomRng===5){
		zBitNpc6.left=true
		zBitNpc6.loaded=true
		zBitNpc6.x=canWidth+zBitNpc6.width
		if(debug&&showSpawning){
			console.log("spawned6")
			zBitNpc6.debugged
		}
	}
	if(randomRandomRng===6){
		zBitNpc7.left=true
		zBitNpc7.loaded=true
		zBitNpc7.x=canWidth+zBitNpc7.width
		if(debug&&showSpawning){
			console.log("spawned7")
			zBitNpc7.debugged
		}
	}
	if(randomAmountOfTime>0){
		randomAmountOfTime-=1
		smallNPCLH()
	}
}
function bigNPCLH(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpcBig1.left=true
		zBitNpcBig1.loaded=true
		zBitNpcBig1.x=canWidth+zBitNpcBig1.width
		if(debug&&showSpawning){
			console.log("spawnedBig1")
		}
	}
	if(randomRandomRng===1){
		zBitNpcBig2.left=true
		zBitNpcBig2.loaded=true
		zBitNpcBig2.x=canWidth+zBitNpcBig2.width
		if(debug&&showSpawning){
			console.log("spawnedBig2")
		}
	}
	if(randomRandomRng===2){
		zBitNpcBig3.left=true
		zBitNpcBig3.loaded=true
		zBitNpcBig3.x=canWidth+zBitNpcBig3.width
		if(debug&&showSpawning){
			console.log("spawnedBig3")
		}
	}
	if(randomRandomRng===3){
		zBitNpcBig4.left=true
		zBitNpcBig4.loaded=true
		zBitNpcBig4.x=canWidth+zBitNpcBig4.width
		if(debug&&showSpawning){
			console.log("spawnedBig4")
		}
	}
	if(randomRandomRng===4){
		zBitNpcBig5.left=true
		zBitNpcBig5.loaded=true
		zBitNpcBig5.x=canWidth+zBitNpcBig5.width
		if(debug&&showSpawning){
			console.log("spawned5")
		}
	}
	if(randomRandomRng===5){
		zBitNpcBig6.left=true
		zBitNpcBig6.loaded=true
		zBitNpcBig6.x=canWidth+zBitNpcBig6.width
		if(debug&&showSpawning){
			console.log("spawned6")
		}
	}
	if(randomRandomRng===6){
		zBitNpcBig7.left=true
		zBitNpcBig7.loaded=true
		zBitNpcBig7.x=canWidth+zBitNpcBig7.width
		if(debug&&showSpawning){
			console.log("spawned7")
		}
	}
	if(randomAmountOfTime>0){
		randomAmountOfTime-=1
		bigNPCLH()
	}
}
function smallNPCRH(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpc1.left=false
		zBitNpc1.loaded=true
		zBitNpc1.x=0-zBitNpc1.width
		if(debug&&showSpawning){
			console.log("spawned1")
			zBitNpc1.debugged
		}
	}
	if(randomRandomRng===1){
		zBitNpc2.left=false
		zBitNpc2.loaded=true
		zBitNpc2.x=0-zBitNpc2.width
		if(debug&&showSpawning){
			console.log("spawned2")
			zBitNpc2.debugged
		}
	}
	if(randomRandomRng===2){
		zBitNpc3.left=false
		zBitNpc3.loaded=true
		zBitNpc3.x=0-zBitNpc3.width
		if(debug&&showSpawning){
			console.log("spawned3")
			zBitNpc3.debugged
		}
	}
	if(randomRandomRng===3){
		zBitNpc4.left=false
		zBitNpc4.loaded=true
		zBitNpc4.x=0-zBitNpc4.width
		if(debug&&showSpawning){
			console.log("spawned4")
			zBitNpc4.debugged
		}
	}
	if(randomRandomRng===4){
		zBitNpc5.left=false
		zBitNpc5.loaded=true
		zBitNpc5.x=0-zBitNpc5.width
		if(debug&&showSpawning){
			console.log("spawned5")
			zBitNpc5.debugged
		}
	}
	if(randomRandomRng===5){
		zBitNpc6.left=false
		zBitNpc6.loaded=true
		zBitNpc6.x=0-zBitNpc6.width
		if(debug&&showSpawning){
			console.log("spawned6")
			zBitNpc6.debugged
		}
	}
	if(randomRandomRng===6){
		zBitNpc7.left=false
		zBitNpc7.loaded=true
		zBitNpc7.x=0-zBitNpc7.width
		if(debug&&showSpawning){
			console.log("spawned7")
			zBitNpc7.debugged
		}
	}
	if(randomAmountOfTime>0){
		randomAmountOfTime-=1
		smallNPCRH()
	}
}
function bigNPCRH(){
	randomRandomRng=Math.floor(Math.random()*6);
	if(randomRandomRng===0){
		zBitNpcBig1.left=false
		zBitNpcBig1.loaded=true
		zBitNpcBig1.x=0-zBitNpcBig1.width
		if(debug&&showSpawning){
			console.log("spawnedBig1")
		}
	}
	if(randomRandomRng===1){
		zBitNpcBig2.left=false
		zBitNpcBig2.loaded=true
		zBitNpcBig2.x=0-zBitNpcBig2.width
		if(debug&&showSpawning){
			console.log("spawnedBig2")
		}
	}
	if(randomRandomRng===2){
		zBitNpcBig3.left=false
		zBitNpcBig3.loaded=true
		zBitNpcBig3.x=0-zBitNpcBig3.width
		if(debug&&showSpawning){
			console.log("spawnedBig3")
		}
	}
	if(randomRandomRng===3){
		zBitNpcBig4.left=false
		zBitNpcBig4.loaded=true
		zBitNpcBig4.x=0-zBitNpcBig4.width
		if(debug&&showSpawning){
			console.log("spawnedBig4")
		}
	}
	if(randomRandomRng===4){
		zBitNpcBig5.left=false
		zBitNpcBig5.loaded=true
		zBitNpcBig5.x=0-zBitNpcBig5.width
		if(debug&&showSpawning){
			console.log("spawned5")
		}
	}
	if(randomRandomRng===5){
		zBitNpcBig6.left=false
		zBitNpcBig6.loaded=true
		zBitNpcBig6.x=0-zBitNpcBig6.width
		if(debug&&showSpawning){
			console.log("spawned6")
		}
	}
	if(randomRandomRng===6){
		zBitNpcBig7.left=false
		zBitNpcBig7.loaded=true
		zBitNpcBig7.x=0-zBitNpcBig7.width
		if(debug&&showSpawning){
			console.log("spawned7")
		}
	}
	if(randomAmountOfTime>0){
		randomAmountOfTime-=1
		bigNPCRH()
	}
}
var beepBeep=false
var highWindDirL=false
var highWindDirR=false
var myBirthdayInArr=false
function beepbeepIMACAR(){
	beepBeep=true
	randomTimersSpeed=1
	randomTimers=100
}
function highWindL(){
	hiwhWindDirL=true
	randomTimers=100
	randomTimersSpeed=1
}
function highWindR(){
	hiwhWindDirR=true
	randomTimers=100
	randomTimersSpeed=1
}
function myBirthdayArr(){
	myBirthdayInArr=true
	randomTimers=1000
	randomTimersSpeed=1
}
function gassMask(){
}



function theseUseTimers(){
	if(randomTimers>0){
		randomTimers-=randomTimersSpeed
	}
	if(randomTimers<0){
		randomTimers=0
	}
	if(beepBeep===true){
		if(randomTimers>0){
			if(!inDebugMode){
				if(inJapanese){
					insertText(26,"ブウブウ")
				}else{

					insertText(26,"VROOOM")
				}
			}
			zBit.speed=40
		}
		if(randomTimers===0){
			resetText(26)
			zBit.speed=3
		}
	}
	if(highWindDirL){
		if(randomTimers>0){
			zBit.x-=2
			zBitNpc2.x-=2
			zBitNpc3.x-=2
			zBitNpc4.x-=2
			zBitNpc5.x-=2
			zBitNpc6.x-=2
			zBitNpc7.x-=2
		}else{
			highWindDirL=false
			insertText(27,"z:i think the wind is blowing hard to the right")
		}
	}
	if(highWindDirR){
		if(randomTimers>0){
			zBit.x+=2
			zBitNpc2.x+=2
			zBitNpc3.x+=2
			zBitNpc4.x+=2
			zBitNpc5.x+=2
			zBitNpc6.x+=2
			zBitNpc7.x+=2
			insertText(28,"z:i think the wind is blowing hard to the right");
		}else{
			highWindDirR=false
			resetText(28);
		}
	}
	if(myBirthdayInArr){
		if(randomTimers>0){
			zBitNpc2.setUpBirthday();
			zBitNpc3.setUpBirthday();
			zBitNpc4.setUpBirthday();
			zBitNpc5.setUpBirthday();
			zBitNpc6.setUpBirthday();
			zBitNpc7.setUpBirthday();
			insertText(27,"z:the array has my birthday in it")
		}else{
			zBitNpc2.finishBirthday();
			zBitNpc3.finishBirthday();
			zBitNpc4.finishBirthday();
			zBitNpc5.finishBirthday();
			zBitNpc6.finishBirthday();
			zBitNpc7.finishBirthday();
			myBirthdayInArr=false
			resetText(27)
		}
	}	
}



setInterval(function(){
	theseUseTimers()
},100,)
function insertText(textNum,textName){
	if(!textusage[1]||textusage[1]===textNum){
			thisText=textName 
		textusage[1]=textNum
	}else if(!textusage[2]||textusage[2]===textNum){
		thisText2=textName 
		textusage[2]=textNum
	}else if(!textusage[3]||textusage[3]===textNum){
		thisText3=textName
		textusage[3]=textNum
	}else if(!textusage[4]||textusage[4]===textNum){
		thisText4=textName
		textusage[4]=textNum
	}else if(!textusage[5]||textusage[5]===textNum){
		thisText5=textName
		textusage[5]=textNum
	}else if(!textusage[6]||textusage[6]===textNum){
		thisText6=textName
		textusage[6]=textNum
	}else if(!textusage[7]||textusage[7]===textNum){
		thisText7=textName
		textusage[7]=textNum
	}else if(!textusage[8]||textusage[8]===textNum){
		thisText8=textName
		textusage[8]=textNum
	}
	
}
function resetText(textNum){
	if(textusage[1]===textNum){
		textusage[1]=false
		thisText=""
	}else if(textusage[2]===textNum){
		textusage[2]=false
		thisText2=""
	}else if(textusage[3]===textNum){
		textusage[3]=false
		thisText3=""
	}else if(textusage[4]===textNum){
		textusage[4]=false
		thisText4=""
	}else if(textusage[5]===textNum){
		textusage[5]=false
		thisText5=""
	}else if(textusage[6]===textNum){
		textusage[6]=false
		thisText6=""
	}else if(textusage[7]===textNum){
		textusage[7]=false
		thisText7=""
	}else if(textusage[8]===textNum){
		textusage[8]=false
		thisText8=""
	}
	if(textusage[2]===textNum&&textusage[1]===textNum){
		textusage[2]=false
		thistext2=""
	}else if(textusage[3]===textNum&&textusage[2]===textNum){
		textusage[3]=false
		thistext3=""
	}else if(textusage[4]===textNum&&textusage[3]===textNum){
		textusage[4]=false
		thistext4=""
	}else if(textusage[5]===textNum&&textusage[4]===textNum){
		textusage[5]=false
		thistext5=""
	}else if(textusage[6]===textNum&&textusage[5]===textNum){
		textusage[6]=false
		thistext6=""
	}else if(textusage[7]===textNum&&textusage[6]===textNum){
		textusage[7]=false
		thistext7=""
	}else if(textusage[8]===textNum&&textusage[7]===textNum){
		textusage[8]=false
		thistext8=""
	}
}
//debug
var debug=false;
var randomHappningShowArr=false;
var randomHappningShowActive=false;
var randomHappningShowRNG=false;
var randomHappningShowAddArr=false;
var randomHappningShowSubArr=false;
var randomHappningShowSubArrStack=false;
var	randomHappningShowAddArrStack=false;
var debugTimerShow=false;
var debugKeyTimerShow=false;
var randomHappiningShowWTD=false;
var debugHappening=false;
var showSpawning=false;
var useText=false;
var entityIDChose=false;
var entityIDChosen;
var debugWhatChoose=false;
var whatToDoDebug;
var inDebugMode=false;
var startSpriteDebug=false;
var debugModeChose;
var insertNumberArr=[];
var insertArrPlace=[];
var arrPlace;
var debugMath1;
var whatArrId;
var whatArrIsId
var arrIDName
var maxArrId=4
var debugTimer=0
var useArrLength=false
function debuging(){
	if(debugTimer>0){
			debugTimer-=1
		}
	if(keysPressedDown[0]===68&&keysPressedDown[1]===69&&keysPressedDown[2]===66&&keysPressedDown[3]===85&&keysPressedDown[4]===71){
		debug=!debug;
		removeKeys();
		
		if(debug){
			thisText8="Debug Active";

			textusage[8]=16
		}
		if(!debug){
			thisText8="";
			textusage[8]=false
		}
	}
	if(debug===true){
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===65&&keysPressedDown[7]===82&&keysPressedDown[8]===82&&keysPressedDown[9]===13){
			removeKeys();
			randomHappningShowArr=!randomHappningShowArr;
			console.log("randomHappningShowArr=",randomHappningShowArr)
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===65&&keysPressedDown[7]===67&&keysPressedDown[8]===84&&keysPressedDown[9]===73&&keysPressedDown[10]===86&&keysPressedDown[11]===69&&keysPressedDown[12]===13){
			removeKeys();
			randomHappningShowActive=!randomHappningShowActive;
			console.log("randomHappningShowActive=",randomHappningShowActive);
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===82&&keysPressedDown[7]===78&&keysPressedDown[8]===71&&keysPressedDown[9]===13){
			removeKeys();
			randomHappningShowRNG=!randomHappningShowRNG;
			console.log("randomHappningShowRNG=",randomHappningShowRNG);
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===65&&keysPressedDown[7]===68&&keysPressedDown[8]===68&&keysPressedDown[9]===65&&keysPressedDown[10]===82&&keysPressedDown[11]===82&&keysPressedDown[12]===13){
			removeKeys();
			randomHappningShowAddArr=!randomHappningShowAddArr;
			console.log("randomHappningShowAddArr=",randomHappningShowAddArr);
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===83&&keysPressedDown[7]===85&&keysPressedDown[8]===66&&keysPressedDown[9]===65&&keysPressedDown[10]===82&&keysPressedDown[11]===82&&keysPressedDown[12]===13){
			removeKeys();
			randomHappningShowSubArr=!randomHappningShowSubArr;
			console.log("randomHappningShowSubArr=",randomHappningShowSubArr);
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===83&&keysPressedDown[7]===85&&keysPressedDown[8]===66&&keysPressedDown[9]===65&&keysPressedDown[10]===82&&keysPressedDown[11]===82&&keysPressedDown[12]===83&&keysPressedDown[13]===84&&keysPressedDown[14]===75&&keysPressedDown[15]===13){
			removeKeys();
			randomHappningShowSubArrStack=!randomHappningShowSubArrStack;
			console.log("randomHappningShowSubArrStack=",randomHappningShowSubArrStack);
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===65&&keysPressedDown[7]===68&&keysPressedDown[8]===68&&keysPressedDown[9]===65&&keysPressedDown[10]===82&&keysPressedDown[11]===82&&keysPressedDown[12]===83&&keysPressedDown[13]===84&&keysPressedDown[14]===75&&keysPressedDown[15]===13){
			removeKeys();
			randomHappningShowAddArrStack=!randomHappningShowAddArrStack;
			console.log("randomHappningShowAddArrStack=",randomHappningShowAddArrStack);
		}
		if(keysPressedDown[0]===84&&keysPressedDown[1]===73&&keysPressedDown[2]===77&&keysPressedDown[3]===69&&keysPressedDown[4]===82&&keysPressedDown[5]===13){
			removeKeys();
			timerShow=!timerShow;
			console.log("timerShow=",timerShow);
		}
		if(keysPressedDown[0]===75&&keysPressedDown[1]===69&&keysPressedDown[2]===89&&keysPressedDown[3]===84&&keysPressedDown[4]===73&&keysPressedDown[5]===77&&keysPressedDown[6]===69&&keysPressedDown[7]===82&&keysPressedDown[8]===13){
			removeKeys();
			debugKeyTimerShow=!debugKeyTimerShow;
			console.log("debugKeyTimerShow=",debugKeyTimerShow);
		}
		if(keysPressedDown[0]===82&&keysPressedDown[1]===65&&keysPressedDown[2]===78&&keysPressedDown[3]===68&&keysPressedDown[4]===79&&keysPressedDown[5]===77&&keysPressedDown[6]===87&&keysPressedDown[7]===84&&keysPressedDown[8]===68&&keysPressedDown[9]===13){
			removeKeys();
			randomHappiningShowWTD=!randomHappiningShowWTD;
			console.log("randomHappiningShowWTD=",randomHappiningShowWTD);
		}
		if(keysPressedDown[0]===83&&keysPressedDown[1]===80&&keysPressedDown[2]===65&&keysPressedDown[3]===87&&keysPressedDown[4]===78&&keysPressedDown[5]===83&&keysPressedDown[6]===72&&keysPressedDown[7]===79&&keysPressedDown[8]===87&&keysPressedDown[9]===13){
			removeKeys();
			showSpawning=!showSpawning
			console.log("showSpawning=",showSpawning);
		}
		if(keysPressedDown[0]===85&&keysPressedDown[1]===83&&keysPressedDown[2]===69&&keysPressedDown[3]===76&&keysPressedDown[4]===69&&keysPressedDown[5]===78&&keysPressedDown[6]===71&&keysPressedDown[7]===84&&keysPressedDown[8]===72&&keysPressedDown[9]===13){
			removeKeys();
			useArrLength=!useArrLength
			console.log("useArrLenght=",useArrLength)
		}
		if(keysPressedDown[0]===85&&keysPressedDown[1]===83&&keysPressedDown[2]===69&&keysPressedDown[3]===84&&keysPressedDown[4]===69&&keysPressedDown[5]===88&&keysPressedDown[6]===84&&keysPressedDown[7]===13){
			removeKeys()
			useText=!useText
			console.log("useText=",useText)
			if(!useText){
				thisText="";
				thisText2="";
				thisText3="";
				thisText4="";
				thisText5="";
				thisText6="";
				thisText7="";
				textusage[1]=false
				textusage[2]=false
				textusage[3]=false
				textusage[4]=false
				textusage[5]=false
				textusage[6]=false
				textusage[7]=false
			}
		}
		if(keysPressedDown[0]===83&&keysPressedDown[1]===80&&keysPressedDown[2]===82&&keysPressedDown[3]===73&&keysPressedDown[4]===84&&keysPressedDown[5]===69&&keysPressedDown[6]===68&&keysPressedDown[7]===69&&keysPressedDown[8]===66&&keysPressedDown[9]===85&&keysPressedDown[10]===71&&keysPressedDown[11]===13&&!inDebugMode){
			removeKeys()
			saveText()
			thisText="What entity ID "
			entityIDChose=true
			inDebugMode=true
		}
		if(keysPressedDown[0]===73&&keysPressedDown[1]===78&&keysPressedDown[2]===83&&keysPressedDown[3]===69&&keysPressedDown[4]===82&&keysPressedDown[5]===84&&keysPressedDown[6]===13&&!inDebugMode){
			removeKeys();
			saveText()
			thisText="What is number you wana input "
			debugModeChose=1
			inDebugMode=true
		}



		if(debugModeChose===1){
			
			if(keysPressedDown[0]===49){
				insertNumberArr.push(1);
				removeKeys()
			}
			if(keysPressedDown[0]===50){
				insertNumberArr.push(2);
				removeKeys()
			}
			if(keysPressedDown[0]===51){
				insertNumberArr.push(3);
				removeKeys()
			}
			if(keysPressedDown[0]===52){
				insertNumberArr.push(4);
				removeKeys()
			}
			if(keysPressedDown[0]===53){
				insertNumberArr.push(5);
				removeKeys()
			}
			if(keysPressedDown[0]===54){
				insertNumberArr.push(6);
				removeKeys()
			}
			if(keysPressedDown[0]===55){
				insertNumberArr.push(7);
				removeKeys()
			}
			if(keysPressedDown[0]===56){
				insertNumberArr.push(8);
				removeKeys()
			}
			if(keysPressedDown[0]===57){
				insertNumberArr.push(9);
				removeKeys()
			}
			if(keysPressedDown[0]===48){
				insertNumberArr.push(0);
				removeKeys()

			}
			if(insertNumberArr.length===4||keysPressedDown[0]===13){
				thisText="what arr ID"
				debugMath1=insertNumberArr.join('');
				debugMath1=Number(debugMath1)
				debugModeChose=2
				thisText="what arr ID"
				insertNumberArr=[];
				removeKeys();
			}
		}
		if(debugModeChose===2){
			if(keysPressedDown[0]===49&&keysPressedDown[1]===13){
				whatArrId=1
				removeKeys()
				whatArrIsId=randomHappeningAddArr
				arrIDName="randomHappeningAddArr"
			}
			if(keysPressedDown[0]===50&&keysPressedDown[1]===13){
				whatArrId=2
				removeKeys()
				whatArrIsId=randomHappeningSubArr
				arrIDName="randomHappeningSubArr"
			}
			if(keysPressedDown[0]===51&&keysPressedDown[1]===13){
				whatArrId=3
				removeKeys()
				whatArrIsId=randomHappeningAddResultStack
				arrIDName="randomHappeningAddResultStack"
			}
			if(keysPressedDown[0]===52&&keysPressedDown[1]===13){
				whatArrId=4
				removeKeys()
				whatArrIsId=randomHappeningSubResultStack
				arrIDName="randomHappeningSubResultStack"
			}
			if(keysPressedDown[0]===53&&keysPressedDown[1]===13){
				whatArrId=5
				removeKeys()
			}
			if(keysPressedDown[0]===54&&keysPressedDown[1]===13){
				whatArrId=6
				removeKeys()
			}
			if(keysPressedDown[0]===55&&keysPressedDown[1]===13){
				whatArrId=7
				removeKeys()
			}
			if(keysPressedDown[0]===56&&keysPressedDown[1]===13){
				whatArrId=8
				removeKeys()
			}
			if(keysPressedDown[0]===57&&keysPressedDown[1]===13){
				whatArrId=9
				removeKeys()
			}
			if(keysPressedDown[0]===48&&keysPressedDown[1]===13){
				whatArrId=0
				removeKeys()
				whatArrIsId=randomHappeningArr
				arrIDName="randomHappeningArr"
			}
			if(whatArrId<=maxArrId&&whatArrIsId!=null){
				debugModeChose=3
				thisText="chosePossisonToInsert"
			}
		}
		if(debugModeChose==3){
			if(keysPressedDown[0]===49){
				insertArrPlace.push(1);
				removeKeys();
			}
			if(keysPressedDown[0]===50){
				insertArrPlace.push(2);
				removeKeys();
			}
			if(keysPressedDown[0]===51){
				insertArrPlace.push(3);
				removeKeys();
			}
			if(keysPressedDown[0]===52){
				insertArrPlace.push(4);
				removeKeys();
			}
			if(keysPressedDown[0]===53){
				insertArrPlace.push(5);
				removeKeys();
			}
			if(keysPressedDown[0]===54){
				insertArrPlace.push(6);
				removeKeys();
			}
			if(keysPressedDown[0]===55){
				insertArrPlace.push(7);
				removeKeys();
			}
			if(keysPressedDown[0]===56){
				insertArrPlace.push(8);
				removeKeys();
			}
			if(keysPressedDown[0]===57){
				insertArrPlace.push(9);
				removeKeys();
			}
			if(keysPressedDown[0]===48){
				insertArrPlace.push(0);
				removeKeys();
			}
			if(keysPressedDown[0]===13&&insertArrPlace.length>=1){
				arrPlace=insertArrPlace.join('');
				arrPlace=Number(arrPlace)
				removeKeys();
				debugModeChose=4
				debugTimer=30
			}
		}
		if(debugModeChose===4){
			thisText="inserted"+debugMath1+"into"+arrIDName+"at"+arrPlace
			if(debugTimer===0){
				whatArrIsId.splice(arrPlace,0,debugMath1)

				loadText()
				insertArrPlace=[]
				debugModeChose=0
				arrPlace=null
				inDebugMode=false
				whatArrId=null
				whatArrIsId=null
				arrIDName=null
			}
		}
		if(entityIDChose===true){
			if(keysPressedDown[0]===49&&keysPressedDown[1]===13){
				entityIdChosen=1
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===50&&keysPressedDown[1]===13){
				entityIdChosen=2
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===51&&keysPressedDown[1]===13){
				entityIdChosen=3
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===52&&keysPressedDown[1]===13){
				entityIdChosen=4
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===53&&keysPressedDown[1]===13){
				entityIdChosen=5
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===54&&keysPressedDown[1]===13){
				entityIdChosen=6
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===55&&keysPressedDown[1]===13){
				entityIdChosen=7
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===56&&keysPressedDown[1]===13){
				entityIdChosen=8
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===57&&keysPressedDown[1]===13){
				entityIdChosen=9
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===49&&keysPressedDown[1]===48&&keysPressedDown[2]===13){
				entityIdChosen=10
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===49&&keysPressedDown[1]===49&&keysPressedDown[2]===13){
				entityIdChosen=11
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===49&&keysPressedDown[1]===50&&keysPressedDown[2]===13){
				entityIdChosen=12
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===49&&keysPressedDown[1]===51&&keysPressedDown[2]===13){
				entityIdChosen=13
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===49&&keysPressedDown[1]===52&&keysPressedDown[2]===13){
				entityIdChosen=14
				entityIDChose=false
				debugWhatChoose=true
			}else if(keysPressedDown[0]===49&&keysPressedDown[1]===53&&keysPressedDown[2]===13){
				entityIdChosen=15
				entityIDChose=false
				debugWhatChoose=true
			}
			if(debugWhatChoose===true){
				thisText="what do you want to debug"
			}
		}
		if(debugWhatChoose===true){
			if(keysPressedDown[0]===88&&keysPressedDown[1]===13){
				whatToDoDebug=1
				debugWhatChoose=false
				loadText()
			}
			if(keysPressedDown[0]===89&&keysPressedDown[1]===13){
				whatToDoDebug=2
				debugWhatChoose=false
				loadText()
			}
			if(keysPressedDown[0]===83&&keysPressedDown[1]===80&&keysPressedDown[2]===69&&keysPressedDown[3]===69&&keysPressedDown[4]===68&&keysPressedDown[5]===13){
				whatToDoDebug=3
				debugWhatChoose=false
			}
			if(debugWhatChoose===false){
				thisText=thisTextSave
				inDebugMode=false
				startSpriteDebug=true
				ZBit.setDebug()
				loadText()
			}
		}
	}
	if(keysMap.includes(13)){
		removeKeys();
	}
}

function debugThis(varToDebug,varName,varNum){
	if(!useText){
		console.log(varName , varToDebug);
	}
	if(useText&&!inDebugMode){
		if(textusage[1]===false||textusage[1]===varNum){
			thisText=varName +"="+varToDebug 
			textusage[1]=varNum
		}else if(textusage[2]===false||textusage[2]===varNum){
			thisText2=varName +"="+varToDebug 
			textusage[2]=varNum
		}else if(textusage[3]===false||textusage[3]===varNum){
			thisText3=varName +"="+varToDebug 
			textusage[3]=varNum
		}else if(textusage[4]===false||textusage[4]===varNum){
			thisText4=varName +"="+varToDebug
			 textusage[4]=varNum
		}else if(textusage[5]===false||textusage[5]===varNum){
			thisText5=varName +"="+varToDebug
			 textusage[5]=varNum
		}else if(textusage[6]===false||textusage[6]===varNum){
			thisText6=varName +"="+varToDebug
			 textusage[6]=varNum
		}else if(textusage[7]===false||textusage[7]===varNum){
			thisText7=varName +"="+varToDebug
			 textusage[7]=varNum
		}else if(textusage[8]===false||textusage[8]===varNum){
			thisText8=varName +"="+varToDebug
			 textusage[8]=varNum
		}else{
			console.log(varName , varToDebug);	
		}
		if(textusage[2]===varNum&&textusage[1]===varNum){
			textusage[2]=false
			thistext2=""
		}else if(textusage[3]===varNum&&textusage[2]===varNum){
			textusage[3]=false
			thistext3=""
		}else if(textusage[4]===varNum&&textusage[3]===varNum){
			textusage[4]=false
			thistext4=""
		}else if(textusage[5]===varNum&&textusage[4]===varNum){
			textusage[5]=false
			thistext5=""
		}else if(textusage[6]===varNum&&textusage[5]===varNum){
			textusage[6]=false
			thistext6=""
		}else if(textusage[7]===varNum&&textusage[6]===varNum){
			textusage[7]=false
			thistext7=""
		}else if(textusage[8]===varNum&&textusage[7]===varNum){
			textusage[8]=false
			thistext8=""
		}
	}
}
function debugThisArr(varToDebug,varName,varNum){
	if(!useText){
		console.log(varName , varToDebug);
	}
	if(useText&&!inDebugMode){
		if(textusage[1]===false||textusage[1]===varNum){
			if(useArrLength){
				thisText=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText=varName +"="+varToDebug 	
			}
			textusage[1]=varNum
		}else if(textusage[2]===false||textusage[2]===varNum){
			if(useArrLength){
				thisText2=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText2=varName +"="+varToDebug 	
			}
			textusage[2]=varNum
		}else if(textusage[3]===false||textusage[3]===varNum){
			if(useArrLength){
				thisText3=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText3=varName +"="+varToDebug 	
			}
			textusage[3]=varNum
		}else if(textusage[4]===false||textusage[4]===varNum){
			if(useArrLength){
				thisText4=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText4=varName +"="+varToDebug	
			}
			textusage[4]=varNum
		}else if(textusage[5]===false||textusage[5]===varNum){
			if(useArrLength){
				thisText5=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText5=varName +"="+varToDebug	
			}
			textusage[5]=varNum
		}else if(textusage[6]===false||textusage[6]===varNum){
			if(useArrLength){
				thisText6=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText6=varName +"="+varToDebug	
			}
			textusage[6]=varNum
		}else if(textusage[7]===false||textusage[7]===varNum){
			if(useArrLength){
				thisText7=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText7=varName +"="+varToDebug	
			}
			textusage[7]=varNum
		}else if(textusage[8]===false||textusage[8]===varNum){
			if(useArrLength){
				thisText8=varName+"("+varToDebug.length+")"+"="+varToDebug	
			}else{
				thisText8=varName +"="+varToDebug	
			}
			textusage[8]=varNum
		}else{
			console.log(varName , varToDebug);	
		}
		if(textusage[2]===varNum&&textusage[1]===varNum){
			textusage[2]=false
			thistext2=""
		}else if(textusage[3]===varNum&&textusage[2]===varNum){
			textusage[3]=false
			thistext3=""
		}else if(textusage[4]===varNum&&textusage[3]===varNum){
			textusage[4]=false
			thistext4=""
		}else if(textusage[5]===varNum&&textusage[4]===varNum){
			textusage[5]=false
			thistext5=""
		}else if(textusage[6]===varNum&&textusage[5]===varNum){
			textusage[6]=false
			thistext6=""
		}else if(textusage[7]===varNum&&textusage[6]===varNum){
			textusage[7]=false
			thistext7=""
		}else if(textusage[8]===varNum&&textusage[7]===varNum){
			textusage[8]=false
			thistext8=""
		}
	}
}

sprite.prototype.debugThis=function(){
	if(this.debug&&this.debugShowWhat===1){
		if(!useText&&!inDebugMode){
			console.log(this.name,"x=",this.x);
		}
		if(useText&&!inDebugMode){
			if(!textusage[1]||textusage[1]===this.id){
				thisText=this.name+"x="+this.x
				textusage[1]=this.id
			}else if(!textusage[2]||textusage[2]===this.id){
				thisText2=this.name+"x="+this.x 
				textusage[2]=this.id
			}else if(!textusage[3]||textusage[3]===this.id){
				thisText3=this.name+"x="+this.x 
				textusage[3]=this.id
			}else if(!textusage[4]||textusage[4]===this.id){
				thisText4=this.name+"x="+this.x 
				 textusage[4]=this.id
			}else if(!textusage[5]||textusage[5]===this.id){
				thisText5=this.name+"x="+this.x 
				 textusage[5]=this.id
			}else if(!textusage[6]||textusage[6]===this.id){
				thisText6=this.name+"x="+this.x 
				 textusage[6]=this.id
			}else if(!textusage[7]||textusage[7]===this.id){
				thisText7=this.name+"x="+this.x 
				 textusage[7]=this.id
			}else if(!textusage[8]||textusage[8]===this.id){
				thisText8=this.name+"x="+this.x 
				 textusage[8]=this.id
			}else{
				console.log(this.name,"x=",this.x);	
			}
		}
	}
	if(this.debug&&this.debugShowWhat===2){
		if(!useText&&!inDebugMode){
			console.log(this.name,"y=",this.y);
		}
		if(useText&&!inDebugMode){
			if(!textusage[1]||textusage[1]===this.id){
				thisText=this.name+"y="+this.y
				textusage[1]=this.id
			}else if(!textusage[2]||textusage[2]===this.id){
				thisText2=this.name+"y="+this.y
				textusage[2]=this.id
			}else if(!textusage[3]||textusage[3]===this.id){
				thisText3=this.name+"y="+this.y 
				textusage[3]=this.id
			}else if(!textusage[4]||textusage[4]===this.id){
				thisText4=this.name+"y="+this.y 
				 textusage[4]=this.id
			}else if(!textusage[5]||textusage[5]===this.id){
				thisText5=this.name+"y="+this.y 
				 textusage[5]=this.id
			}else if(!textusage[6]||textusage[6]===this.id){
				thisText6=this.name+"y="+thisxy
				 textusage[6]=this.id
			}else if(!textusage[7]||textusage[7]===this.id){
				thisText7=this.name+"y="+this.y 
				 textusage[7]=this.id
			}else if(!textusage[8]||textusage[8]===this.id){
				thisText8=this.name+"y="+this.y
				 textusage[8]=this.id
			}else{
				console.log(this.name,"y=",this.y);	
			}
		}
	}
	if(this.debug&&this.debugShowWhat===1){
		if(!useText&&!inDebugMode){
			console.log(this.name,"speed=",this.speed);
		}
		if(useText&&!inDebugMode){
			if(!textusage[1]||textusage[1]===this.id){
				thisText=this.name+"speed="+this.speed
				textusage[1]=this.id
			}else if(!textusage[2]||textusage[2]===this.id){
				thisText2=this.name+"speed="+this.speed
				textusage[2]=this.id
			}else if(!textusage[3]||textusage[3]===this.id){
				thisText3=this.name+"speed="+this.speed 
				textusage[3]=this.id
			}else if(!textusage[4]||textusage[4]===this.id){
				thisText4=this.name+"speed="+this.speed 
				 textusage[4]=this.id
			}else if(!textusage[5]||textusage[5]===this.id){
				thisText5=this.name+"speed="+this.speed 
				 textusage[5]=this.id
			}else if(!textusage[6]||textusage[6]===this.id){
				thisText6=this.name+"speed="+this.speed 
				 textusage[6]=this.id
			}else if(!textusage[7]||textusage[7]===this.id){
				thisText7=this.name+"speed="+this.speed 
				 textusage[7]=this.id
			}else if(!textusage[8]||textusage[8]===this.id){
				thisText8=this.name+"speed="+this.speed 
				 textusage[8]=this.id
			}else{
				console.log(this.name,"speed=",this.speed);	
			}
		}
	}
}
function saveText(){
	thisTextSave=thisText
	thisTextSave2=thisText2
	thisTextSave3=thisText3
	thisTextSave4=thisText4
	thisTextSave5=thisText5
	thisTextSave6=thisText6
	thisTextSave7=thisText7
	thisText=""
	thisText2=""
	thisText3=""
	thisText4=""
	thisText5=""
	thisText6=""
	thisText7=""
}
function loadText(){
	thisText=""
	thisText2=""
	thisText3=""
	thisText4=""
	thisText5=""
	thisText6=""
	thisText7=""
	thisText=thisTextSave
	thisText2=thisTextSave2
	thisText3=thisTextSave3
	thisText4=thisTextSave4
	thisText5=thisTextSave5
	thisText6=thisTextSave6
	thisText7=thisTextSave7
}
setInterval(function(){
	debuging();
},100,)
var eastereggDate=new Date()
function eastereggs(){
	if(keysPressedDown[0]===38&&keysPressedDown[1]===38&&keysPressedDown[2]===40&&keysPressedDown[3]===40&&keysPressedDown[4]===37&&keysPressedDown[5]===39&&keysPressedDown[6]===37&&keysPressedDown[7]===39&&keysPressedDown[8]===66&&keysPressedDown[9]===65&&keysPressedDown[10]===13){
		insertText(100,"you just inserted the konami code... you can now jump using the w key or the up key...")
	}
	if(eastereggDate.getDate()===2&&eastereggDate.getMonth()===11){
		insertText(101,"its my birthday :D")
	}
	if(eastereggDate.getDate()===13&&eastereggDate.getMonth()===5){
		background.src="tryHappyMothersDay.png"
	}
}
setInterval(function(){
	eastereggs();
},100,);