const imgs = document.querySelectorAll(".imgscroll img");
const bulltesContainer = document.querySelector(".bullets ul");
const home = document.querySelector("body > .home");
const list = document.querySelector("i.list")
let ttb;// the var of set interval to change wallpaper

// set header
const header = document.querySelector('.header');
const linksBox = document.querySelector('.links');
const ulLinks = document.querySelector('.ul-links');
const account = document.querySelector('.account');
const listBtn = document.querySelector('.list');

let drawer = null; // .parent-links
// mobile media
function mountMobile() {
    if (drawer || window.innerWidth > 768) return;
    drawer = document.createElement('div');
    drawer.className = 'parent-links';
    drawer.innerHTML = '<i class="fa-solid fa-xmark close" aria-label="Close"></i>';
    header.appendChild(drawer);

    drawer.appendChild(ulLinks);
    // drawer.appendChild(account);
    // open and close
    listBtn?.addEventListener('click', openDrawer);
    drawer.querySelector('.close')?.addEventListener('click', closeDrawer);
}

function unmountDesktop() {
    if (!drawer || window.innerWidth <= 768) return;
    // return elements to its locations
    linksBox.appendChild(ulLinks);
    header.appendChild(account);

    drawer.remove();
    drawer = null;
}

function openDrawer() { drawer?.classList.add('show'); }
function closeDrawer() { drawer?.classList.remove('show'); }

// close with ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
});

// the start of website and resize
function handleResize() {
    if (window.innerWidth <= 768) mountMobile();
    else unmountDesktop();
}
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);


// end header
// start go-up button
let goUp = document.querySelector(".go-up")
window.onscroll = function(){
    if(window.scrollY >= 500){

    goUp.classList.remove("opacity-0")
}else{
    goUp.classList.add("opacity-0")
}

}
goUp.addEventListener("click",((e)=>{
    window.scrollTo({
        top:0,
        left:0
    })
}))


// 
window.onload = function () {
    let change = window.sessionStorage.getItem("ChangeWallpaper")

    if (change !== "manual") {
        bulltesContainer.classList.add(change)
        ttb = setInterval(changeWallpaper, 4000)
    }

}



// craet bullets
for (let i = 0; i < imgs.length; i++) {
    let bulltes = document.createElement("li")
    bulltes.classList.add("bullte");
    bulltes.style.cssText
    bulltesContainer.appendChild(bulltes)
    console.log(bulltes)
}


// select bulltes
let bullets = document.querySelectorAll("ul li.bullte");
bullets[0].classList.add("active")

// change wallpaper and set class active
let i = 0;

bullets.forEach((el, ind) => {
    el.addEventListener("click", function () {
        // remove class active from all
        bullets.forEach(b => b.classList.remove("active"));

        // add class active
        this.classList.add("active");
        let activeInd = ind;
        i = ind
        console.log(activeInd);
        let wallpaper = imgs[activeInd].src;
        console.log(wallpaper);
        // toggle class auto from ul
        bulltesContainer.classList.toggle("auto")

        // change wallpaper
        home.style.cssText = `background-image:url(${wallpaper})`

        if (bulltesContainer.classList.contains("auto")) {
            window.sessionStorage.setItem("ChangeWallpaper", "auto")
        } else {
            window.sessionStorage.setItem("ChangeWallpaper", "manual")

        }

        clearInterval(ttb)
        ttb = setInterval(changeWallpaper, 4000)



    });
});

function changeWallpaper() {
    if (bulltesContainer.classList.contains("auto")) {
        if (i >= bullets.length) {
            i = 0
        }
        bullets.forEach(b => b.classList.remove("active"));
        bullets[i].classList.add("active")
        home.style.cssText = `background-image:url(${imgs[i].src})`
        i++
        console.log("true")
    }

}


// we will add info with JSON

const dist = document.querySelector("div.box.Destination select");
const chickIn = document.querySelector("div.box.check-in select");
const chickOut = document.querySelector("div.box.check-out select");

fetch("js/data.json").then((response) => {
    console.log("true");
    return response.json()
}).then((values) => {

    // add options to destinaion
    for (let i = 0; i < values.Destination.length; i++) {
        let opt = document.createElement("option")
        dist.appendChild(opt)
        opt.textContent = values.Destination[i]


    }
    // add opt to chick in
    for (let i = 0; i < values["check in"].length; i++) {
        let opt = document.createElement("option")
        chickIn.appendChild(opt)
        opt.textContent = values["check in"][i]


    }
    // add opt to chick out
    for (let i = 0; i < values["check out"].length; i++) {
        let opt = document.createElement("option")
        chickOut.appendChild(opt)
        opt.textContent = values["check out"][i]


    }

})
    .catch((reason) => {
        console.log("false")
        console.log(reason)
    })
// end home
// --------------------->

// start destinaiton
const slideImge = document.querySelectorAll(".img-slide img");
let slide = document.querySelector(".slide")
//------------->

// first creat slide card
for (let i = 0; i < slideImge.length; i++) {
    let slideCard = document.createElement("div");
    slideCard.classList.add("card");
    slide.appendChild(slideCard);
    let slideImage = slideImge[i];
    slideCard.appendChild(slideImage);
    let info = document.createElement("div");
    info.classList.add("info");
    slideCard.appendChild(info);
    let h2 = document.createElement("h2")
    let p = document.createElement("p")
    // bring text from JSON file
    fetch("js/data.json").then((response) => {
        console.log("fulfilled");
        return response.json()
    }).then((response) => {
        // console.log(response["slide Title"][i])
        h2.textContent = response["slide Title"][i];
        p.textContent = response["slide Text"][i]
    })
    // Entering texts
    info.appendChild(h2)
    info.appendChild(p)
    let link = document.createElement("a")
    link.href = "mailto:travelas@gmail.com"
    link.textContent = "Book Now"
    info.appendChild(link)
    
}

// Animate images
const minusTrans = document.querySelector(".minus-trans");
const plusTrans = document.querySelector(".plus-trans");
minusTrans.style.cssText = "background-color:var(--main-color)"
plusTrans.style.cssText = "background-color:black"


let card = document.querySelectorAll(".slide .card");
let plus = 0.8 * (slideImge[0].width);
let minus = - plus;
let tranform = 0








minusTrans.addEventListener("click", ((e) => {
    let visible = Math.floor(slide.offsetWidth / (card[0].offsetWidth))
    let inVisible = card.length - visible;
    let maxSlide = inVisible * plus
    if (tranform >= -maxSlide) {
        card.forEach((el) => {

            el.style.cssText = `transform: translateX(${tranform + minus}px)`

        })
        tranform = tranform + minus;
        minusTrans.style.cssText = "background-color:var(--main-color)"
        plusTrans.style.cssText = "background-color:black"
    }else{
        if(tranform >= -(maxSlide + plus)){
            card.forEach((el) => {
            el.style.cssText = `transform: translateX(${tranform + minus}px)`;
        })
            tranform = tranform + minus
    
        };

        plusTrans.style.cssText = "background-color:var(--main-color)"
        minusTrans.style.cssText = "background-color:black"
    }


}))
plusTrans.addEventListener("click", ((e) => {

    let card = document.querySelectorAll(".slide .card");
    if (tranform < 0) {
        card.forEach((el) => {

            el.style.cssText = `transform: translateX(${tranform + plus}px)`
        })
        tranform = tranform + plus
        plusTrans.style.cssText = "background-color:var(--main-color)"
        minusTrans.style.cssText = "background-color:black"
    }else{
        minusTrans.style.cssText = "background-color:var(--main-color)"
        plusTrans.style.cssText = "background-color:black"
    }


}))


// start offers
const slideImgeOffer = document.querySelectorAll(".img-slide-offer img");
let slideOffer = document.querySelector(".slide-offer")
// first creat slide card
for (let i = 0; i < slideImgeOffer.length; i++) {
    let slideCard = document.createElement("div");
    slideCard.classList.add("card");
    slideOffer.appendChild(slideCard);
    let slideImage = slideImgeOffer[i];
    slideCard.appendChild(slideImage);
    let info = document.createElement("div");
    info.classList.add("info");
    slideCard.appendChild(info);
    let h2 = document.createElement("h2")
    let p = document.createElement("p")
    let price = document.createElement("span")
    // bring text from JSON file
    fetch("js/data.json").then((response) => {
        console.log("fulfilled");
        return response.json()
    }).then((response) => {

        console.log(response["offer title"][i])
        h2.textContent = response["offer title"][i];
        p.textContent = response["offer info"][i];
        price.textContent="price is "+response["offer prices"][i]
    })
    // Entering texts
    info.appendChild(h2)
    info.appendChild(p)
    let linkTag = document.createElement("a")
    linkTag.textContent = "Details";
    let link = document.createElement("div")
    link.classList.add("flex","justify-around","w-full")
    info.appendChild(link)
    
    link.appendChild(price)
    link.appendChild(linkTag)
    
}

let plusOffer = 0.8 * (slideImgeOffer[0].width);
let minusOffer = - plus;
let tranformOffer = 0
let cardOffer = document.querySelectorAll(".slide-offer .card");
const minusTransOffer = document.querySelector(".slide-control-offer .minus-trans");
const plusTransOffer = document.querySelector(".slide-control-offer .plus-trans");
minusTransOffer.style.cssText = "background-color:var(--main-color)"
plusTransOffer.style.cssText = "background-color:black"


minusTransOffer.addEventListener("click", ((e) => {
    let visible = Math.floor(slide.offsetWidth / (cardOffer[0].offsetWidth))
    let inVisible = cardOffer.length - visible;
    let maxSlide = inVisible * plusOffer
    if (tranformOffer >= -maxSlide) {
        cardOffer.forEach((el) => {
            el.style.cssText = `transform: translateX(${tranformOffer + minusOffer}px)`
        })
        tranformOffer = tranformOffer + minusOffer;
        minusTransOffer.style.cssText = "background-color:var(--main-color)"
        plusTransOffer.style.cssText = "background-color:black"
    }else{
        if(tranformOffer >= -(maxSlide + plusOffer)){
            cardOffer.forEach((el) => {
            el.style.cssText = `transform: translateX(${tranformOffer + minusOffer}px)`;
        });
        tranformOffer =tranformOffer + minusOffer
        }
        plusTransOffer.style.cssText = "background-color:var(--main-color)"
        minusTransOffer.style.cssText = "background-color:black"
    }
}))

plusTransOffer.addEventListener("click", ((e) => {
    if (tranformOffer < 0) {
        cardOffer.forEach((el) => {
            el.style.cssText = `transform: translateX(${tranformOffer + plusOffer}px)`
        })
        tranformOffer = tranformOffer + plusOffer
         plusTransOffer.style.cssText = "background-color:var(--main-color)"
        minusTransOffer.style.cssText = "background-color:black"
    }else{
        minusTransOffer.style.cssText = "background-color:var(--main-color)"
        plusTransOffer.style.cssText = "background-color:black"
    }
}))


// start planners

const slideimgPlanners = document.querySelectorAll(".planners .img-container img");

let plusPlanners = 1 * (slideimgPlanners[0].offsetWidth); 
let minusPlanners = -plusPlanners;
let tranformPlanners = 0;
let cardPlanners = document.querySelectorAll(".planners .card");
const minusTransPlanners = document.querySelector(".planners .slide-controler  .minus-trans");
const plusTransPlanners = document.querySelector(".planners .slide-controler .plus-trans");

minusTransPlanners.style.cssText = "background-color:var(--main-color)";
plusTransPlanners.style.cssText = "background-color:black";

minusTransPlanners.addEventListener("click", ((e) => {
    let slide = document.querySelector(".planners .img-container");
    let visible = Math.floor(slide.offsetWidth / (cardPlanners[0].offsetWidth));
    let inVisible = cardPlanners.length - visible;
    let maxSlide = inVisible * plusPlanners;

    if (tranformPlanners >= -maxSlide) {
        cardPlanners.forEach((el) => {
            el.style.transform = `translateX(${tranformPlanners + minusPlanners}px)`;
        })
        tranformPlanners = tranformPlanners + minusPlanners;
        minusTransPlanners.style.cssText = "background-color:var(--main-color)";
        plusTransPlanners.style.cssText = "background-color:black";
    } else {
        if(tranformPlanners >= -(maxSlide + plusPlanners)){
            cardPlanners.forEach((el) => {
            el.style.cssText = `transform: translateX(${tranformPlanners + minusPlanners}px)`;
        });
        tranformPlanners = tranformPlanners + minusPlanners
        }
        plusTransPlanners.style.cssText = "background-color:var(--main-color)";
        minusTransPlanners.style.cssText = "background-color:black";
    }
}))

plusTransPlanners.addEventListener("click", ((e) => {
    if (tranformPlanners < 0) {
        cardPlanners.forEach((el) => {
            el.style.transform = `translateX(${tranformPlanners + plusPlanners}px)`; 
        })
        tranformPlanners = tranformPlanners + plusPlanners;
        plusTransPlanners.style.cssText = "background-color:var(--main-color)";
        minusTransPlanners.style.cssText = "background-color:black";
    } else {
        minusTransPlanners.style.cssText = "background-color:var(--main-color)";
        plusTransPlanners.style.cssText = "background-color:black";
    }
}))

const hideImg = document.querySelector(".control-vision")
const parentImgs = document.querySelector(".planners .container .parent-img")
const controlParentLinks = document.querySelector(".control-parent-links");
controlParentLinks.addEventListener("click",((e)=>{
    e.preventDefault()
    parentImgs.classList.remove("opacity-0")
}))
hideImg.addEventListener("click",((e)=>{
    e.preventDefault()
    parentImgs.classList.add("opacity-0")

}))

// destination gallery

const slideImgeGallery = document.querySelectorAll(".img-gallery img");
let slideGallery = document.querySelector(".slide-gallery");

// first create slide card
for (let i = 0; i < slideImgeGallery.length; i++) {
    let slideCard = document.createElement("div");
    slideCard.classList.add("card");
    slideGallery.appendChild(slideCard);

    let slideImage = slideImgeGallery[i];
    slideCard.appendChild(slideImage);
    let link = document.createElement("div");
    link.textContent="Detail"
    link.classList.add("link")
    slideCard.appendChild(link)
}

// slider control
let plusGallery = 0.8 * (slideImgeGallery[0].width);
let minusGallery = -plusGallery;
let transformGallery = 0;
let cardGallery = document.querySelectorAll(".slide-gallery .card");

const minusTransGallery = document.querySelector(".slide-control-galley .minus-gallrey");
const plusTransGallery = document.querySelector(".slide-control-galley .plua-gallery");

minusTransGallery.parentElement.style.cssText = "background-color:var(--main-color)";
plusTransGallery.parentElement.style.cssText = "background-color:black";

minusTransGallery.addEventListener("click", ((e) => {
    let visible = Math.floor(slideGallery.offsetWidth / (cardGallery[0].offsetWidth));
    let inVisible = cardGallery.length - visible;
    let maxSlide = inVisible * plusGallery;
    if (transformGallery >= -maxSlide) {
        cardGallery.forEach((el) => {
            el.style.cssText = `transform: translateX(${transformGallery + minusGallery}px)`;
        });
        transformGallery = transformGallery + minusGallery;
        minusTransGallery.parentElement.style.cssText = "background-color:var(--main-color)";
        plusTransGallery.parentElement.style.cssText = "background-color:black";
    } else {
        if(transformGallery >= -(maxSlide + plusGallery)){
            cardGallery.forEach((el) => {
            el.style.cssText = `transform: translateX(${transformGallery + minusGallery}px)`;
        });
        transformGallery = transformGallery + minusGallery
        }
        plusTransGallery.parentElement.style.cssText = "background-color:var(--main-color)";
        minusTransGallery.parentElement.style.cssText = "background-color:black";
    }
}));

plusTransGallery.addEventListener("click", ((e) => {
    if (transformGallery < 0) {
        cardGallery.forEach((el) => {
            el.style.cssText = `transform: translateX(${transformGallery + plusGallery}px)`;
        });
        transformGallery = transformGallery + plusGallery;
        plusTransGallery.parentElement.style.cssText = "background-color:var(--main-color)";
        minusTransGallery.parentElement.style.cssText = "background-color:black";
    } else {
        minusTransGallery.parentElement.style.cssText = "background-color:var(--main-color)";
        plusTransGallery.parentElement.style.cssText = "background-color:black";
    }
}));
// ---------------------------->
// comments
// ====== جلب الصور من hidden container ======
const commentImages = document.querySelectorAll(".img-comments-hidden img");
const slideComments = document.querySelector(".slide-comments");

// بيانات الأشخاص
const persons = [
  { name: "John Doe", job: "Traveler" },
  { name: "Sarah Smith", job: "Photographer" },
  { name: "Ali Hassan", job: "Developer" },
  { name: "Emma Johnson", job: "Designer" },
  { name: "David Lee", job: "Doctor" }
];

// النص الأساسي للتعليق
const feedbackText = `But I must explain to you how all this mistaken idea of denouncing 
pleasure and praising pain was born and I will give you a complete account of the system 
and expound the actual teachings of the great explorer of the truth, the master-builder of 
human happiness.`;

// ====== بناء الكروت ======
for (let i = 0; i < commentImages.length; i++) {
  let card = document.createElement("div");
  card.classList.add("comment-card");

  // صورة
  let img = commentImages[i].cloneNode(true);
  img.classList.add("comment-img");
  card.appendChild(img);

  // النص
  let p = document.createElement("p");
  p.textContent = feedbackText;
  p.classList.add("comment-text"); // بدال sec-text
  card.appendChild(p);

  // التقييم
  let stars = document.createElement("div");
  stars.classList.add("stars");
  stars.innerHTML = `<i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>
                     <i class="fa-solid fa-star"></i>`;
  card.appendChild(stars);

  // الاسم
  let name = document.createElement("h3");
  name.textContent = persons[i].name;
  name.classList.add("person-name");
  card.appendChild(name);

  // الوظيفة
  let job = document.createElement("p");
  job.textContent = persons[i].job;
  job.classList.add("person-job");
  card.appendChild(job);

  slideComments.appendChild(card);
}

// ====== السلايدر ======
let plusComments = 0.8 * document.querySelector(".comment-card").offsetWidth;
let minusComments = -plusComments;
let transformComments = 0;
let cardComments = document.querySelectorAll(".slide-comments .comment-card");

const minusTransComments = document.querySelector(".slide-control-comments .minus-comments");
const plusTransComments = document.querySelector(".slide-control-comments .plus-comments");

// ألوان مبدئية
minusTransComments.parentElement.style.cssText = "background-color:var(--main-color)";
plusTransComments.parentElement.style.cssText = "background-color:black";

// زرار اليسار
minusTransComments.addEventListener("click", () => {
  let visible = Math.floor(slideComments.offsetWidth / cardComments[0].offsetWidth);
  let inVisible = cardComments.length - visible;
  let maxSlide = inVisible * plusComments;

  if (transformComments >= -maxSlide) {
    cardComments.forEach((el) => {
      el.style.transform = `translateX(${transformComments + minusComments}px)`;
    });
    transformComments = transformComments + minusComments;
    minusTransComments.parentElement.style.cssText = "background-color:var(--main-color)";
    plusTransComments.parentElement.style.cssText = "background-color:black";
  } else {
    if (transformComments >= -(maxSlide + plusComments)) {
      cardComments.forEach((el) => {
        el.style.transform = `translateX(${transformComments + minusComments}px)`;
    });
    transformComments = transformComments + minusComments
    }
    plusTransComments.parentElement.style.cssText = "background-color:var(--main-color)";
    minusTransComments.parentElement.style.cssText = "background-color:black";
  }
});

// زرار اليمين
plusTransComments.addEventListener("click", () => {
  if (transformComments < 0) {
    cardComments.forEach((el) => {
      el.style.transform = `translateX(${transformComments + plusComments}px)`;
    });
    transformComments = transformComments + plusComments;
    plusTransComments.parentElement.style.cssText = "background-color:var(--main-color)";
    minusTransComments.parentElement.style.cssText = "background-color:black";
  } else {
    minusTransComments.parentElement.style.cssText = "background-color:var(--main-color)";
    plusTransComments.parentElement.style.cssText = "background-color:black";
  }
});
