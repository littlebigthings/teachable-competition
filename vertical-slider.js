class VERTICALSLIDER {
    constructor(slider, parent) {
        this.sliderElm = slider;
        this.parentElement = parent;
        this.isSlideChanged = 0;
        this.elemtToObserve = document.querySelector("[wrapper='observe']");
        this.init();
    }
    init() {
        this.startSlider();
        this.checkAndPlayPause();
    }

    checkAndPlayPause() {
        let topVal = "top";
        if (this.elemtToObserve != undefined || this.elemtToObserve != null) {
            let vph = window.innerHeight;
            let elemHeight = this.elemtToObserve.offsetHeight;
            // let elem = window.getComputedStyle(this.elemtToObserve);
            // let elemHeight = parseInt(elem.getPropertyValue('height')) + parseInt(elem.getPropertyValue('margin-top')) + parseInt(elem.getPropertyValue('margin-bottom'))
            topVal = `${parseInt((vph / 2) - (elemHeight / 2))}em`;
        }
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(this.elemtToObserve, {
            scrollTrigger: {
                trigger: this.elemtToObserve,
                start: `${topVal} ${topVal}`,
                markers: true,
                onUpdate: self => {
                    // console.log(self.progress)
                    // console.log(this.swiper.slides.length)
                    // console.log(this.isSlideChanged)
                    if (this.isSlideChanged == 0 && self.direction == 1) {
                        console.log("s0 dir down")
                        this.disableScrolling();

                    }
                    else if (this.isSlideChanged == 0 && self.direction == -1) {
                        console.log("s0 dir up")
                        setTimeout(() => {
                            this.enableScrolling();
                        }, 200)
                    }
                    else if (this.isSlideChanged == this.swiper.slides.length - 1 && self.direction == -1 && self.progress == 0) {
                        console.log("sAll dir up")
                        this.disableScrolling();
                    }
                    else if (this.isSlideChanged == this.swiper.slides.length - 1 && self.direction == 1) {
                        console.log("sAll dir down")
                        setTimeout(() => {
                            this.enableScrolling();
                        }, 200)
                    }
                    // else if (this.isSlideChanged == 0 && self.direction == -1 && self.progress == 0) {
                    //     console.log("finished from bottom")
                    //     setTimeout(() => {
                    //         this.enableScrolling();
                    //     }, 500)
                    // }
                },
                // onEnter: (self) => {
                //     console.log("enter")
                //     if (this.isSlideChanged == 0 && self.direction == 1) {
                //         console.log("s0 dir down")
                //         this.disableScrolling();

                //     }
                // },
                // onLeave: () => {
                //     if (this.isSlideChanged == 0 && self.direction == -1) {
                //         console.log("s0 dir up")
                //         setTimeout(() => {
                //             this.enableScrolling();
                //         }, 500)
                //     }

                // },
                // onEnterBack: () => {
                //     if (this.isSlideChanged == this.swiper.slides.length - 1 && self.direction == -1) {
                //         console.log("sAll dir up")
                //         this.disableScrolling();
                //     }

                // },
                // onLeaveBack: () => {
                //     console.log("leave back")
                //     if (this.isSlideChanged == this.swiper.slides.length - 1 && self.direction == 1) {
                //         console.log("sAll dir down")
                //         setTimeout(() => {
                //             this.enableScrolling();
                //         }, 500)
                //     }
                // },
            }
        });
    }

    disableScrolling() {
        if (window.screen.width >= 768) {
            this.parentElement.classList.add("fixed");
            var x = window.scrollX;
            var y = window.scrollY;
            window.onscroll = function () { window.scrollTo(x, y); };
            this.swiper.mousewheel.enable();
        }
    }

    enableScrolling() {
        if (window.screen.width >= 768) {
            this.parentElement.classList.remove("fixed");
            this.swiper.mousewheel.disable()
            window.onscroll = function () { };
        }
    }
    startSlider() {
        if (this.sliderElm != undefined || this.sliderElm != null) {
            this.swiper = new Swiper(this.sliderElm, {
                direction: 'vertical',
                mousewheel: true,
                grabCursor: false,
                slidesPerView: 1,
                spaceBetween: 0,
                longSwipes: false,
                centeredSlides: true,
                mousewheel: {
                    invert: false,
                    releaseOnEdges: true,
                    eventsTarget: this.parentElement,
                    forceToAxis: true,
                    sensitivity: 0,
                    thresholdDelta: 0,
                    thresholdTime: 0,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    bulletClass: "inactive-page-blot",
                    bulletActiveClass: "active-page-blot",
                },
                on: {
                    init: (swiper) => {
                        swiper.mousewheel.disable();
                    }
                }
            });

            this.swiper.on('toEdge', (swiper) => {
                // this.isSlideChanged = swiper.activeIndex;
                setTimeout(() => {
                    this.enableScrolling();
                }, 200)
            })
            this.swiper.on('slideChange', (swiper) => {
                this.isSlideChanged = swiper.activeIndex;
                // console.log(swiper)
                // if(swiper.activeIndex > 0 && swiper.activeIndex < swiper.slides.length){
                //     if (!this.isSlideChanged) {
                //         this.isSlideChanged = true;
                //     }
                // }
            })
        }
    }
}

// new VERTICALSLIDER;
let sliderElm = document.querySelectorAll(".swiper");
let parentElement = document.querySelectorAll("[data-scroll-area='true']");
if (sliderElm.length > 0) {
    sliderElm.forEach((item, index) => {
        new VERTICALSLIDER(item, parentElement[index]);
    })
}

/**
 * onEnter -> if active slide is 0 allow scroll up and enable mouse scroll disable scroll down check with direction if up allow else block.
 * onLeave -> disable mouse scroll.
 * onEnterBack -> if active slide is last allow scroll down, check direction is up then disable scroll and enable mouse tracker.
 * onLeaveBack -> disable mouse scroll.
 */