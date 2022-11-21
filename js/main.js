//Swiper slider
var swiper = new Swiper(".bg-slider-thumbs", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 0,
});

var swiper2 = new Swiper(".bg-slider", {
    loop: true,
    spaceBetween: 0,
    thumbs: {
        swiper: swiper,
    },
});

//Navigation bar effects on scroll
/* to adjust navbar so that its opacity changes on scroll */
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", this.window.scrollY > 0);
});

//Responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});


// slider images 1 -- ongoing mission section
var thumbnails = document.getElementById("thumbnails")
var imgs = thumbnails.getElementsByTagName("img")
var main = document.getElementById("main")
var counter = 0;

for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i]


    img.addEventListener("click", function () {
        main.src = this.src
    })
}

// slider images 2 -- head-member section
var thumbnails2 = document.getElementById("thumbnails2")
var imgs2 = thumbnails2.getElementsByTagName("img")
var main2 = document.getElementById("main2")
var counter2 = 0;

for (let i = 0; i < imgs2.length; i++) {
    let img2 = imgs2[i]


    img2.addEventListener("click", function () {
        main2.src = this.src
    })
}






// counter -- card-section
//#region - start of - number counter animation
//#region - start of - number counter animation
const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
    const target = document.querySelector(qSelector);
    let startTimestamp = null;
    const step = (timestamp) => {
     if (!startTimestamp) startTimestamp = timestamp;
     const progress = Math.min((timestamp - startTimestamp) / duration, 1);
     target.innerText = Math.floor(progress * (end - start) + start);
     if (progress < 1) {
      window.requestAnimationFrame(step);
     }
    };
    window.requestAnimationFrame(step);
   };
   //#endregion - end of - number counter animation
   
   document.addEventListener("DOMContentLoaded", () => {
       counterAnim("#count1", 0, 12, 2500);
       counterAnim("#count2", 0, 30, 3000);
       counterAnim("#count3", 0, 400, 3500);
       counterAnim("#count4", 0, 1000, 4000); //ms
});


// choose us section slider
const testimonials = [
    {
        heading: "Demo heading 1",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    },
    {
        heading: "Demo heading 2",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    },
    {
        heading: "Demo heading 3",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    },
    {
        heading: "Demo heading 4",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    },
    {
        heading: "Demo heading 5",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    },
    {
        heading: "Demo heading 6",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    },
    {
        heading: "Demo heading 7",
        content:
            "Entertainment is the field which undoubtedly must be promoted, in line with this team Aashray has always been a supporter and a conductor of events of this zone.",
        name: "John Doe",
        role: "CEO, ABC corp"
    }
].slice(0, 8);

var template = `
<div class='chat-bubble' style='--rotation:{rotation}deg'>
<i class='fa fa-quote-left'></i>
<br>
<div class='head'>{heading}</div>
<div class='content'>{content}</div>
<div class='person'>
<img class='img' src='./images/logo.png'>
<div class='name'>{name}</div>
<div class='role'>{role}</div>
</div>
</div>
`;

function buildTemplate(template, data) {
    for (const key in data) {
        const reg = new RegExp(`{${key}}`, "ig");
        template = template.replace(reg, data[key]);
    }
    return template;
}

const rotationAmt = 360 / testimonials.length;
let focused = 0;
const tElem = document.querySelector(".testimonial");
const testimonialsElem = document.querySelector(".testimonials");
const navElem = document.querySelector(".navigation");

function getFocusedIndex() {
    let n = focused;
    while (n < 0) n += testimonials.length;
    return n % testimonials.length;
}

const radius = 400 / (2 * Math.sin(Math.PI / testimonials.length));
const distToEdge = Math.round(Math.sqrt(radius ** 2 - 200 ** 2) + 30);
testimonialsElem.style.setProperty("--distance", distToEdge + "px");

testimonials.forEach((t, i) => {
    const elem = buildTemplate(template, {
        ...t,
        rotation: Math.round(i * rotationAmt)
    });
    testimonialsElem.innerHTML += elem;

    const navBtn = document.createElement("div");
    navBtn.classList.add("nav-dot");
    navBtn.addEventListener("click", () => {
        select(i);
    });
    navElem.appendChild(navBtn);
});

let timeout;
function update() {
    testimonialsElem.style.setProperty(
        "--rotation",
        -Math.round(focused * rotationAmt) + "deg"
    );
    const { children } = testimonialsElem;
    for (var i = 0; i < children.length; i++) {
        if (getFocusedIndex() === i) {
            children[i].style.setProperty("filter", "blur(0)");
            navElem.children[i].classList.add("focused");
        } else {
            children[i].style.setProperty("filter", "blur(2px)");
            navElem.children[i].classList.remove("focused");
        }
    }
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        focused++;
        update();
    }, 10000); //  slide show time
}
function select(index) {
    const closest = index - getFocusedIndex();
    focused += closest;
    update();
}
update();

document.querySelector(".arrow-right").addEventListener("click", () => {
    focused++;
    update();
});

document.querySelector(".arrow-left").addEventListener("click", () => {
    focused--;
    update();
});



// testimonial section
$(document).ready(function () {

    $('.client-single').on('click', function (event) {
        event.preventDefault();

        var active = $(this).hasClass('active');

        var parent = $(this).parents('.testi-wrap');

        if (!active) {
            var activeBlock = parent.find('.client-single.active');

            var currentPos = $(this).attr('data-position');

            var newPos = activeBlock.attr('data-position');

            activeBlock.removeClass('active').removeClass(newPos).addClass('inactive').addClass(currentPos);
            activeBlock.attr('data-position', currentPos);

            $(this).addClass('active').removeClass('inactive').removeClass(currentPos).addClass(newPos);
            $(this).attr('data-position', newPos);

        }
    });

}(jQuery));