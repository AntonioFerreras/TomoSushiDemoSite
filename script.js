window.onscroll = scrollAction;

var navbar = document.getElementById("navbar");
var threshholdForScroll = navbar.offsetTop;

function scrollAction() {
    //If you scrolled far enough to not see navbar, make it sticky.
    if (window.pageYOffset >= threshholdForScroll) {
        navbar.classList.add("scrollFixed");
    } else {
        //Make navbar not sticky once you scroll back to top
        navbar.classList.remove("scrollFixed");

        //Update threshold just in case user resizes window
        threshholdForScroll = navbar.offsetTop;
    }
}

/* SLideshow stuff */
var slideIndex = 0;
var ignoreNextAutoChange = false;

setSlide(slideIndex);

function setSlide(newIndex, manual) {


    if (ignoreNextAutoChange && !manual) {
        slideIndex -= 1;
        ignoreNextAutoChange = false;
    } else {

        //Get slides from html
        var slides = document.getElementsByClassName("slide");

        //Update all slide states
        for (var i = 0; i < slides.length; i++) {
            if (i == slideIndex) {
                slides[i].classList.remove("unseen");
                slides[i].classList.add("shown");
            } else {
                slides[i].classList.remove("shown");
                slides[i].classList.add("unseen");
            }
        }

    }

    if (!manual) {
        setTimeout(function () { nextSlide(false) }, 4500);
    }
}

function nextSlide(manual) {
    slideIndex += 1;
    var slideLength = document.getElementsByClassName("slide").length;

    //Wrap around to first slide if needed
    if (slideIndex == slideLength) {
        slideIndex = 0;
    }

    if (manual) {
        ignoreNextAutoChange = true;
    }

    setSlide(slideIndex, manual);
}

function prevSlide(manual) {
    slideIndex -= 1;
    var slideLength = document.getElementsByClassName("slide").length;

    //Wrap around to last slide if needed
    if (slideIndex < 0) {
        console.log(slideIndex);
        slideIndex = slideLength - 1;
    }

    if (manual) {
        ignoreNextAutoChange = true;
    }

    setSlide(slideIndex, manual);
}

/* Menu stuff */
var currentMenuType = 0;
var menuButtons = document.getElementsByClassName("menu-type");
var menuContainers = document.getElementsByClassName("menu-container");

window.onresize = updateMenuHeight;

function updateMenuHeight() {
    if (menuContainers.length > 0) {//Make sure youre on the menu page
        //Resize menu containers
        var mobile = window.matchMedia("screen and (max-width: 720px)").matches;
        var smallScreen = window.matchMedia("screen and (max-width: 1100px)").matches;

        if (!mobile && !smallScreen) {
            menuContainers[0].style.height = "630px";
            menuContainers[1].style.height = "850px";
        } else if (smallScreen && !mobile) {
            menuContainers[0].style.height = "750px";
            menuContainers[1].style.height = "850px";
        } else {
            for (var i = 0; i < menuButtons.length; i++) {
                menuContainers[i].style.height = "auto";
            }
        }
    }
}

function setMenuType(n) {
    if (currentMenuType != n) {
        for (var i = 0; i < menuButtons.length; i++) {
            if (i == n) {
                menuButtons[i].classList.add("menu-button-selected");
                menuContainers[i].classList.add("menu-selected");
            } else {
                menuButtons[i].classList.remove("menu-button-selected");
                menuContainers[i].classList.remove("menu-selected");
            }
        }

        currentMenuType = n;

        updateMenuHeight();

        console.log(currentMenuType);
    }
}