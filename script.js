/* ======================================================
   BIRTHDAY WEBSITE
   Part 1
======================================================*/

// ---------- PAGES ----------

const intro = document.getElementById("intro");
const question = document.getElementById("question");
const popup = document.getElementById("popup");
const reveal = document.getElementById("reveal");
const slideshow = document.getElementById("slideshow");
const giftScene = document.getElementById("giftScene");
const celebration = document.getElementById("celebration");
const scrapbook = document.getElementById("scrapbook");

// ---------- BUTTONS ----------

const superb = document.getElementById("superb");
const okayish = document.getElementById("okayish");

const birthdayBtn = document.getElementById("birthdayBtn");
const whatBtn = document.getElementById("whatBtn");
const popupOK = document.getElementById("popupOK");

const openGift = document.getElementById("openGift");
const replay = document.getElementById("replay");

// ---------- AUDIO ----------

const music = document.getElementById("bgMusic");
const cameraSound = document.getElementById("cameraSound");
const meow = document.getElementById("meow");
const scream = document.getElementById("scream");

// ---------- PHOTO ----------

const slideImage = document.getElementById("slideImage");

const photos = [

    "assets/photos/photo1.png",
    "assets/photos/photo2.png",
    "assets/photos/photo3.png",
    "assets/photos/photo4.png",
    "assets/photos/photo5.png",
    "assets/photos/photo6.png"

];

// ---------- HELPERS ----------

function hideAllPages(){

    intro.classList.remove("active");
    question.classList.remove("active");
    popup.classList.remove("active");
    reveal.classList.remove("active");
    slideshow.classList.remove("active");
    giftScene.classList.remove("active");
    celebration.classList.remove("active");
    scrapbook.classList.remove("active");

}

function showPage(page){

    hideAllPages();

    page.classList.add("active");

}

// =====================================================
// INTRO PAGE
// =====================================================

// Okayish button runs away

okayish.addEventListener("mouseenter",()=>{

    const maxX = window.innerWidth - 220;
    const maxY = window.innerHeight - 120;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    okayish.style.position = "absolute";
    okayish.style.left = x + "px";
    okayish.style.top = y + "px";

});

// Mobile support

okayish.addEventListener("click",()=>{

    const maxX = window.innerWidth - 220;
    const maxY = window.innerHeight - 120;

    okayish.style.position = "absolute";
    okayish.style.left = Math.random()*maxX+"px";
    okayish.style.top = Math.random()*maxY+"px";

});

// Superb

superb.addEventListener("click",()=>{

    showPage(question);

});

// =====================================================
// QUESTION PAGE
// =====================================================

// Funny popup

birthdayBtn.addEventListener("click",()=>{

    showPage(popup);
    scream.currentTime = 0;
    scream.play().catch(err => console.log(err));

});

// Popup OK

popupOK.addEventListener("click",()=>{

    showPage(question);

});

// What button

whatBtn.addEventListener("click",()=>{

    showPage(reveal);

    document.body.classList.add("flash");
    document.body.classList.add("shake");

    meow.currentTime = 0;
    meow.play().catch(err => console.log(err));

    setTimeout(()=>{

        document.body.classList.remove("flash");
        document.body.classList.remove("shake");

    },600);

    setTimeout(()=>{

        startSlideshow();

    },5000);

});

/* ======================================================
   PHOTO SLIDESHOW
======================================================*/

function startSlideshow(){

    showPage(slideshow);

    let index = 0;

    function nextPhoto(){

        if(index >= photos.length){

            setTimeout(()=>{

                showGiftScene();

            },4000);

            return;

        }

        cameraSound.currentTime = 0;
        cameraSound.play();

        slideImage.classList.remove("flashPhoto");

        void slideImage.offsetWidth;

        slideImage.src = photos[index];

        slideImage.classList.add("flashPhoto");

        index++;

        setTimeout(nextPhoto,2000);

    }

    nextPhoto();

}

/* ======================================================
   GIFT SCENE
======================================================*/

const giftBox = document.getElementById("giftBox");

function showGiftScene(){

    showPage(giftScene);

}

openGift.addEventListener("click",()=>{

    openGift.disabled = true;

    openGift.innerHTML = "Opening... 🎁";

    giftBox.style.transition = "1s";

    giftBox.style.transform = "scale(1.2) rotate(8deg)";

    giftBox.style.filter = "drop-shadow(0 0 50px gold)";

    let shake = 0;

    const interval = setInterval(()=>{

        shake++;

        giftBox.style.transform =
        `rotate(${shake%2===0?8:-8}deg) scale(1.2)`;

        if(shake>12){

            clearInterval(interval);

            explodeGift();

        }

    },100);

});

/* ======================================================
   GIFT EXPLOSION
======================================================*/

function explodeGift(){

    giftBox.style.transition=".8s";

    giftBox.style.transform="scale(2)";

    giftBox.style.opacity="0";

    openGift.style.display="none";

    // Confetti burst

    confetti({

        particleCount:250,

        spread:180,

        origin:{
            y:.6
        }

    });

    setTimeout(()=>{

        startCelebration();

    },1500);

}
/* ======================================================
   CELEBRATION
======================================================*/

document.getElementById("cake").style.display = "none";

setTimeout(()=>{

    document.getElementById("cake").style.display = "block";

},1200);

const balloons = document.getElementById("balloons");
const hearts = document.getElementById("hearts");
const sparkles = document.getElementById("sparkles");

function startCelebration(){

    music.currentTime = 0;

    music.play().catch(() => {});

    showPage(celebration);

    createFireworks();

    createBalloons();

    createHearts();

    createSparkles();

    // More confetti

    const confettiInterval = setInterval(()=>{

        confetti({

            particleCount:80,

            spread:120,

            origin:{
                x:Math.random(),
                y:Math.random()-0.2
            }

        });

    },1200);

    // Open scrapbook after 20 sec

    setTimeout(()=>{

        clearInterval(confettiInterval);

        showPage(scrapbook);

    },20000);

}

/* ======================================================
   FIREWORKS
======================================================*/

function createFireworks(){

    const interval=setInterval(()=>{

        confetti({

            particleCount:150,

            spread:360,

            startVelocity:55,

            origin:{
                x:Math.random(),
                y:Math.random()*0.6
            }

        });

    },700);

    setTimeout(()=>{

        clearInterval(interval);

    },20000);

}

/* ======================================================
   HEARTS
======================================================*/

function createHearts(){

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.innerHTML="❤️";

        heart.style.position="absolute";

        heart.style.left=Math.random()*100+"vw";

        heart.style.bottom="-50px";

        heart.style.fontSize=(20+Math.random()*30)+"px";

        heart.style.transition="8s linear";

        hearts.appendChild(heart);

        setTimeout(()=>{

            heart.style.transform="translateY(-120vh)";
            heart.style.opacity="0";

        },50);

        setTimeout(()=>{

            heart.remove();

        },8000);

    },300);

}

/* ======================================================
   BALLOONS
======================================================*/

function createBalloons(){

    const colors=["🎈","🎈","🎈","🎈"];

    setInterval(()=>{

        const b=document.createElement("div");

        b.innerHTML=colors[Math.floor(Math.random()*colors.length)];

        b.style.position="absolute";

        b.style.left=Math.random()*100+"vw";

        b.style.bottom="-80px";

        b.style.fontSize=(40+Math.random()*30)+"px";

        b.style.transition="10s linear";

        balloons.appendChild(b);

        setTimeout(()=>{

            b.style.transform="translateY(-130vh)";

        },50);

        setTimeout(()=>{

            b.remove();

        },10000);

    },500);

}

/* ======================================================
   SPARKLES
======================================================*/

function createSparkles(){

    setInterval(()=>{

        const s=document.createElement("div");

        s.innerHTML="✨";

        s.style.position="absolute";

        s.style.left=Math.random()*100+"vw";

        s.style.top=Math.random()*100+"vh";

        s.style.fontSize=(12+Math.random()*20)+"px";

        sparkles.appendChild(s);

        setTimeout(()=>{

            s.style.opacity="0";

        },1000);

        setTimeout(()=>{

            s.remove();

        },1500);

    },150);

}

/* ======================================================
   REPLAY
======================================================*/

replay.addEventListener("click",()=>{

    location.reload();

});