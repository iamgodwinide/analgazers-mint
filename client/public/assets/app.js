const fart = new Fart();
const popupContainer = document.querySelector(".popup");
const popupContent = document.querySelector(".popup .content");

let audio = new Audio();

const sounds = [
    "toot",
    "ripper",
    "plop",
    "squit",
    "squat",
    "raspberry",
    "tuppence",
    "liftoff",
    "trumpet",
    "fizzler",
    "windy",
    "eine",
    "fartception",
    "fartpoint1"
];

const speeds = [
    50,
    50,
    40,
    40,
    40,
    40,
    40,
    40
]

let playing = false;

const writeup = [
    [
        "",
        "Once upon a time in the land of Rearopolis,",
        'There was a peculiar yet captivating character known as "The Gazed."',
        "Forever in pursuit of the most amusing and cheeky sights, he dedicated his life to uncovering the secrets of the enigmatic world of Anal Gazers.",
    ],
    [
        "",
        "One fateful day, the Gazed stumbled upon a mysterious portal shaped like a giant, grinning derriere.", 
        "Unable to resist the allure, he leaped through the opening and found himself swallowed by a colossal beast known as the Gluteus Gobbler."
    ],
    [
        "",
        "Navigating through the winding digestive tract, the Gazed encountered a vibrant assortment of NFTs, each more hilarious and entertaining than the last.",
        "He couldn't help but marvel at the colorful and comical images that filled this peculiar realm"
    ],
    [
        "",
        "As he reached the end of his bizarre journey, the Gazed was met with the ultimate treasure trove:",
        "A gallery of the finest and most amusing Anal Gazers NFTs ever discovered.",
        "Overwhelmed by their hilarity, he let out a hearty laugh that echoed through the beast's cavernous insides."
    ],
    [
        "",
        "The Gluteus Gobbler, tickled by the sound of The Gazed's laughter, couldn't help but join in the merriment.", 
        "As the laughter grew louder and more intense, the beast finally erupted in a fit of giggles, propelling The Gazed out into the open air with a comedic toot."
    ],
    [
        "",
        "Landing safely on the ground, the Gazed couldn't help but chuckle as he recalled his incredible adventure.", 
        "He vowed to share his discoveries with the world, offering a glimpse into the side-splitting universe of the Anal Gazers NFT project."
    ],
    [
        "",
        "And so, with a twinkle in his eye and a grin on his face, the Gazed embarked on a mission to spread laughter and mirth throughout the land, forever championing the humor and artistry of the wacky world he'd discovered within the belly of the Gluteus Gobbler."
    ]
];

const playFart = (num) => {
    fart.play(sounds[Math.floor(Math.random() * 13)]);
    showpopup(num);
}

const enterFunc = () => {
    document.querySelector("body").style.overflowY = "scroll";
    fart.play(sounds[1])
    if(window.innerWidth < 1024){
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        });
    }else{
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    }
}

const showpopup = async (num) => {
    if(typeof num === 'number'){
        // playing = true;
        // popupContainer.style.display = "flex"
        // popupContent.classList.add("content-animate");
        // new Typed(`.popup .content p`, {
        //     strings: writeup[num],
        //     typeSpeed: speeds[num],
        //     showCursor: false,
        //     backDelay: 300,
        //     onComplete: () => {
        //         playing = false;
        //         setTimeout(()=> {
        //             hidepopup();
        //         }, 1200)
        //     }
        //   });
        audio.pause();
        audio = document.querySelectorAll("audio")[num];
        audio.play();
    }
}

const hidepopup = () => {
//    if(!playing){
    // audio.pause();
    // popupContent.querySelector("p").innerText = "";
    // popupContainer.style.display = "none"
    // popupContent.classList.remove("content-animate");
//    }
}

popupContainer.addEventListener("click", hidepopup);

window.onload = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
   setTimeout(()=> {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    document.querySelector("body").style.overflowY = "hidden";
    document.querySelector(".preload-wrap").style.display = "none";
   },500)
}

