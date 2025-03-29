document.addEventListener("DOMContentLoaded", function(){

// переключение дня и ночи
    const themeButton = document.getElementById("themeButton");
    const daytime = document.getElementById("daytime");
    const overlay = document.getElementById("overlay");
    
    let isDarkMode = false;
    
    themeButton.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
    
        themeButton.classList.toggle("button1", !isDarkMode);
        themeButton.classList.toggle("button2", isDarkMode);
    
        daytime.classList.toggle("sun", !isDarkMode);
        daytime.classList.toggle("moon", isDarkMode);
    
        overlay.style.opacity = isDarkMode ? "0.8" : "0";
    });
    
// руны
const runes = document.querySelectorAll(".rune");
const popup2 = document.getElementById("popup2");

let collectedRunes = new Set(); 

window.addEventListener("load", () => {
    popup2.style.display = "none"; 
});

runes.forEach((rune) => {
    rune.addEventListener("click", () => {
        collectedRunes.add(rune.id); 
        rune.style.opacity = "0.5"; 
        rune.style.pointerEvents = "none"; 

        if (collectedRunes.size === 6) {
            popup2.style.display = "flex";
        }
    });
});

popup2.addEventListener("click", (event) => {
    if (event.target === popup2) {
        popup2.style.display = "none"; 
    }
});



// глаза 
    const eyes = document.querySelectorAll('.eye');
    const pupils = document.querySelectorAll('.pupil');
    
    document.addEventListener('mousemove', (event) => {
        const { clientX: mouseX, clientY: mouseY } = event;
    
        eyes.forEach((eye, index) => {
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;
    
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
    
            const maxMoveX = (rect.width / 2) - (pupils[index].offsetWidth / 2);
            const maxMoveY = (rect.height / 2) - (pupils[index].offsetHeight / 2);
    
            const pupilX = Math.cos(angle) * maxMoveX;
            const pupilY = Math.sin(angle) * maxMoveY;
    
            pupils[index].style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });


// Звездочки
const stars = document.querySelectorAll('.star');

stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
        star.classList.add('shake');
    });

    star.addEventListener('mouseleave', () => {
        star.classList.remove('shake');
    });
});


// Четвертый этаж дома 
const flower = document.querySelector('.flower');

flower.addEventListener('mouseenter', () => {
    flower.classList.add('swinging');
});

flower.addEventListener('mouseleave', () => {
    flower.classList.remove('swinging');
});

// Кот
const cat = document.querySelector(".cat");

cat.addEventListener("click", () => {
    cat.style.transition = "transform 0.3s ease-in-out";
    cat.style.transform = "translateY(-2vw)";
    setTimeout(() => {
        cat.style.transform = "translateY(0)";
    }, 300);
});



// Третий этаж дома

document.querySelectorAll(".resizable").forEach((box) => {
    const resizer = box.querySelector(".resizer");

    resizer.addEventListener("mousedown", (event) => {
        event.preventDefault();

        const startY = event.clientY;
        const startHeight = parseInt(window.getComputedStyle(box).height, 10);

        function resize(event) {
            const newHeight = startHeight + (event.clientY - startY);
            if (newHeight > 20) { 
                box.style.height = newHeight + "px";
            }
        }

        function stopResize() {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        }

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
    });
});

/* Первый этаж дома */
document.querySelectorAll(".fabric").forEach((fabric) => {
    let state = 1;

    fabric.addEventListener("click", (event) => {
        event.stopPropagation();

        fabric.classList.add("inactive");

        state = (state % 3) + 1;
        fabric.classList.remove("state-1", "state-2", "state-3");
        fabric.classList.add(`state-${state}`);

        setTimeout(() => fabric.classList.remove("inactive"), 300);
    });
});

const pot = document.getElementById("pot");
const objects = document.querySelectorAll(".obj");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

let objectsInPot = new Set();
objects.forEach(obj => {
    obj.addEventListener("dragstart", (event) => {
        event.target.style.opacity = "1";
        event.dataTransfer.setData("text", event.target.id);
    });

    obj.addEventListener("dragend", (event) => {
        event.target.style.opacity = "1";
    });
});

pot.addEventListener("dragover", (event) => {
    event.preventDefault(); 
    event.target.style.opacity = "1";
});

pot.addEventListener("drop", (event) => {
    event.preventDefault();
    let objId = event.dataTransfer.getData("text");
    let droppedObj = document.getElementById(objId);

    if (!objectsInPot.has(objId)) {
        objectsInPot.add(objId);
        droppedObj.style.display = "none"; 
    }

    if (objectsInPot.size === 3) {
        popup.style.display = "block";
    }
});

closePopup.addEventListener("click", () => {
    popup.style.display = "none"; 
});


});