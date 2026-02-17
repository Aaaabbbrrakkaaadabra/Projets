const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// --- Joueur sprite sheet ---
const playerSprite = new Image();
playerSprite.src = "./assets/moon_girl_sprite_sheet.png"; // ton sprite sheet d'athlète

canvas.width = 1280;
canvas.height = 960;

const frameWidth = 57;
const frameHeight = 86;

// --- Plateformes inclinées ---
const platforms = [
    { x1: 150, y1: 750, x2: 1250, y2: 700 },
    { x1: 50, y1: 600, x2: 1200, y2: 650 },
    { x1: 150, y1: 550, x2: 1250, y2: 500 },
    { x1: 50, y1: 400, x2: 1200, y2: 450 },
    { x1: 150, y1: 350, x2: 1250, y2: 300 },
    { x1: 50, y1: 200, x2: 1200, y2: 250 },
    { x1: 150, y1: 150, x2: 1250, y2: 100 }
];

// --- Joueur ---
const firstPlatform = platforms[0];
const startX = 200;
const slope = (firstPlatform.y2 - firstPlatform.y1) / (firstPlatform.x2 - firstPlatform.x1);
const startY = firstPlatform.y1 + slope * (startX - firstPlatform.x1) - frameHeight;

const player = {
    x: startX,
    y: startY,
    width: frameWidth,
    height: frameHeight,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -10,
    onGround: true,
    state: "fall",  // walk, jump, fall, climb
    frameIndex: 0,
    frameTimer: 0,
    frameSpeed: 6, // vitesse de l'animation
    direction: "right" // "right" ou "left"
};

// --- Animations ---
const animations = {
   walk:  { y: 0,   frames: 7 },
    jump:  { y: 86,  frames: 4 },
    fall:  { y: 172, frames: 2 },
    climb: { y: 258, frames: 6 }
};

// --- Échelles ---
const ladders = [
    { x: 200, y: 320, width: 20, height: 120 },
    { x: 500, y: 220, width: 20, height: 120 }
];

// --- Barils ---
const barrels = [];
const BARREL_SPEED = 70;
const BARREL_GRAVITY = 0.6;

// --- Game state ---
let gameOver = false;
let levelComplete = false;
let points = 0;

// --- Chronomètre ---
let startTime = Date.now();
let elapsedTime = 0;

// --- Contrôles ---
const keys = {};
window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);
window.addEventListener("keydown", e => {
    if ((gameOver || levelComplete) && e.code === "Enter") location.reload();
});

// --- Feux d'artifice ---
const fireworks = [];
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const colors = ["red","orange","yellow","lime","cyan","magenta","white"];
    for (let i = 0; i < 50; i++) {
        fireworks.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 1.5) * 6,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

// --- Spawn barils ---
function spawnBarrel() {
    if (levelComplete) return;
    barrels.push({
        x: 80 + Math.random() * 20,
        y: 50,
        radius: 15,
        velocityX: 1,
        velocityY: 0,
        gravity: BARREL_GRAVITY
    });
}
setInterval(spawnBarrel, 3000);

// --- Checkpoint ---
function getCheckpoint() {
    const topPlatform = platforms[platforms.length - 1];
    const slope = (topPlatform.y2 - topPlatform.y1) / (topPlatform.x2 - topPlatform.x1);
    const cpWidth = 50, cpHeight = 50;
    let cpX = slope < 0 ? topPlatform.x2 - cpWidth : topPlatform.x1;
    let cpY = slope < 0 ? topPlatform.y2 - cpHeight : topPlatform.y1 - cpHeight;
    return { x: cpX, y: cpY, width: cpWidth, height: cpHeight };
}

// --- Dessin ---
function drawPlatforms() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    platforms.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        ctx.lineTo(p.x2, p.y2);
        ctx.stroke();
    });
}

function drawLadders() {
    ctx.fillStyle = "yellow";
    ladders.forEach(l => ctx.fillRect(l.x, l.y, l.width, l.height));
}

// --- Joueur avec animation et flip ---
function drawPlayer() {
    const anim = animations[player.state];
    const sx = player.frameIndex * frameWidth;
    const sy = anim.y;

    ctx.save();
    if (player.direction === "left") {
        ctx.translate(player.x + player.width / 2, 0);
        ctx.scale(-1, 1);
        ctx.translate(-(player.x + player.width / 2), 0);
    }

    ctx.drawImage(playerSprite, sx, sy, frameWidth, frameHeight, player.x, player.y, player.width, player.height);
    ctx.restore();

 // Animation liée à la vitesse
let movementSpeed = 0;
if (player.state === "walk") {
    movementSpeed = Math.abs((keys["ArrowRight"] ? 5 : 0) - (keys["ArrowLeft"] ? 5 : 0));
}

player.frameTimer += movementSpeed;
if (player.frameTimer >= 1) {
    player.frameTimer = 0;
    player.frameIndex++;
    if (player.frameIndex >= anim.frames) player.frameIndex = 0;
}

}

// --- Mise à jour de l'état joueur ---
function updatePlayerState() {
    let onLadder = ladders.some(l => player.x < l.x + l.width &&
                                     player.x + player.width > l.x &&
                                     player.y < l.y + l.height &&
                                     player.y + player.height > l.y);

    if (onLadder && (keys["ArrowUp"] || keys["ArrowDown"])) {
        player.state = "climb";
        return;
    }

    if (!player.onGround) {
        player.state = player.velocityY < 0 ? "jump" : "fall";
    } else if (keys["ArrowLeft"] || keys["ArrowRight"]) {
        player.state = "walk";
    } else {
        player.state = "fall";
        player.frameIndex = 0;
    }
}

// --- Dessin complet ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Appuyez sur ENTER pour recommencer", canvas.width / 2, canvas.height / 2 + 40);
        return;
    }

    if (levelComplete) {
        if (Math.random() < 0.05) createFirework();
        fireworks.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx; p.y += p.vy;
            p.vy += 0.05; p.alpha -= 0.02;
        });
        ctx.globalAlpha = 1;
        for (let i = fireworks.length-1; i>=0; i--) if(fireworks[i].alpha<=0) fireworks.splice(i,1);

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("NIVEAU TERMINÉ !", canvas.width/2, canvas.height/2-30);
        ctx.font = "30px Arial";
        ctx.fillText("Points : "+points, canvas.width/2, canvas.height/2+20);
        ctx.font = "20px Arial";
        ctx.fillText("Temps écoulé : "+elapsedTime+"s", canvas.width/2, canvas.height/2+40);
        ctx.fillText("Appuyez sur ENTER pour recommencer", canvas.width/2, canvas.height/2+60);
        return;
    }

    drawPlatforms();
    drawLadders();

    const cp = getCheckpoint();
    ctx.fillStyle = "green";
    ctx.fillRect(cp.x, cp.y, cp.width, cp.height);

    drawPlayer();

    barrels.forEach(barrel => {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(barrel.x, barrel.y, barrel.radius, 0, Math.PI*2);
        ctx.fill();
    });

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Temps : ${elapsedTime}s`, canvas.width/2, canvas.height-30);
}

// --- Update ---
function update() {
    if (gameOver || levelComplete) return;

    elapsedTime = Math.floor((Date.now()-startTime)/1000);

    if(keys["ArrowRight"]){ player.x+=5; player.direction="right"; }
    if(keys["ArrowLeft"]){ player.x-=5; player.direction="left"; }

    player.velocityY += player.gravity;
    player.y += player.velocityY;
    player.onGround = false;

    platforms.forEach(p=>{
        const slope = (p.y2 - p.y1)/(p.x2 - p.x1);
        const minX = Math.min(p.x1,p.x2), maxX = Math.max(p.x1,p.x2);
        if(player.x+player.width>minX && player.x<maxX){
            const yOnPlatform = p.y1 + slope*(player.x - p.x1);
            if(player.y+player.height >= yOnPlatform-1 && player.y+player.height - player.velocityY < yOnPlatform+1){
                player.y = yOnPlatform - player.height;
                player.velocityY = 0;
                player.onGround = true;
            }
        }
    });

    if(keys["Space"] && player.onGround) player.velocityY = player.jumpPower;

    barrels.forEach(barrel=>{
        barrel.velocityY += barrel.gravity;
        barrel.y += barrel.velocityY;
        barrel.x += barrel.velocityX;

        platforms.forEach(p=>{
            const slope = (p.y2 - p.y1)/(p.x2 - p.x1);
            const minX = Math.min(p.x1,p.x2), maxX = Math.max(p.x1,p.x2);
            if(barrel.x>minX && barrel.x<maxX){
                const yOnPlatform = p.y1 + slope*(barrel.x - p.x1);
                if(barrel.y + barrel.radius >= yOnPlatform && barrel.y+barrel.radius - barrel.velocityY < yOnPlatform){
                    barrel.y = yOnPlatform - barrel.radius;
                    barrel.velocityY = 0;
                    barrel.velocityX = slope*BARREL_SPEED;
                }
            }
        });
    });

    barrels.forEach(barrel=>{
        const dx = player.x + player.width/2 - barrel.x;
        const dy = player.y + player.height/2 - barrel.y;
        if(Math.sqrt(dx*dx + dy*dy) < barrel.radius + player.width/2) gameOver = true;
    });

    const cp = getCheckpoint();
    if(player.x+player.width>cp.x && player.x<cp.x+cp.width && player.y+player.height>cp.y && player.y<cp.y+cp.height){
        levelComplete = true;
        points += 100;
    }

    updatePlayerState();
}

// --- Game loop ---
playerSprite.onload = ()=>{
    function gameLoop(){
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
};
