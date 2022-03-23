class VERTICALSLIDER {
    constructor(slider, elemToObserve, pagination) {
        this.sliderElm = slider;
        this.itemToObserve = elemToObserve;
        this.pagiItem = pagination;
        this.isScroll = null;
        this.activeSlide = 0;
        this.hasSlidesChanged = false;
        this.elementIsInView = false;
        this.sliderReset = false;
        this.init();
    }
    init() {
        this.startSlider();
        this.checkInView();
    }

    checkInView() {
        // function to check scroll up and down + same time enables and disables based on element is in view or not.
        var lastScrollTop = 0;
        window.addEventListener("scroll", () => { 
            var st = window.pageYOffset || document.documentElement.scrollTop; 
            this.isScroll = st > lastScrollTop;
            lastScrollTop = st <= 0 ? 0 : st; 
            //    console.log(this.elementIsInView)
            this.enableDisableSlider()
        }, false);
        this.observer = new IntersectionObserver((wrapper) => {
            if (wrapper[0]['isIntersecting'] == true) {
                this.elementIsInView = true;
                // this.enableDisableSlider(true);
            }
            else{
                // console.log("not")
                this.elementIsInView = false;
                // this.enableDisableSlider(false);
            }
        }, { root: null, threshold: 0.9, rootMargin: '0px' });
        this.observer.observe(this.itemToObserve);
    }

    enableDisableSlider(){
        // issues is here when elements comes in view.
        if(this.elementIsInView){
            if(this.activeSlide == 0 && this.isScroll && !this.hasSlidesChanged && !this.sliderReset){
                // this.swpCrtl.params.mousewheel.releaseOnEdges = false;
                // console.log("active slide 0, scroll down, slide not changed")
                // console.log("upar mat jane do")
                this.swiper.mousewheel.enable();
                this.sliderReset = true;
                this.disableScrolling();
            }
            else if(this.activeSlide == 0 && !this.isScroll && !this.hasSlidesChanged && this.sliderReset){
                // this.swpCrtl.params.mousewheel.releaseOnEdges = false;
                // console.log("active slide 0, scroll up, slide not changed")
                // console.log("upar jane do")
                this.swiper.mousewheel.disable();
                this.sliderReset = false;
                this.enableScrolling();
            }
            else if(this.activeSlide == this.swiper.slides.length-1 && this.isScroll && !this.hasSlidesChanged && this.sliderReset){
                // console.log("active slide full, scroll down, slide not changed")
                // console.log("niche jane do")
                this.hasSlidesChanged = false;
                this.swiper.mousewheel.disable();
                this.sliderReset = false;
                this.enableScrolling();
            }
            else if(this.activeSlide == this.swiper.slides.length-1 && !this.isScroll && !this.hasSlidesChanged && !this.sliderReset){
                // console.log("active slide full, scroll up, slide not changed")
                // console.log("niche mat jane do")
                this.swiper.mousewheel.enable();
                this.sliderReset = true;
                this.disableScrolling();
            }
            // else if(this.activeSlide == this.swiper.slides.length-1 && this.isScroll && !this.hasSlidesChanged && !this.sliderReset){
            //     console.log("active slide full, scroll down, slide not changed")
            //     this.swiper.mousewheel.disable();
            //     this.sliderReset = true;
            //     this.disableScrolling();
            // }
        }
    }

    disableScrolling() {
        if (window.screen.width >= 768) {
            // var x = window.scrollX;
            // var y = window.scrollY;
            // window.onscroll = function () { window.scrollTo(x, y); };
            window.onscroll =  () => { this.itemToObserve.scrollIntoView({
                block: "nearest"
            }) };

        }
    }

    enableScrolling() {
        if (window.screen.width >= 768) {
            window.onscroll = function () { };
        }
    }

    startSlider() {
        if (this.sliderElm != undefined || this.sliderElm != null) {
            // this.slider = new fullpage(this.sliderElm, {
            //     licenseKey: '27B86924-A43141D6-B65E121F-FDF7BCB9',
            //     //options here
            //     autoScrolling: false,
            // });
                this.swiper = new Swiper(this.sliderElm, {
                    direction: 'vertical',
                    mousewheel: true,
                    grabCursor: false,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    longSwipes: false,
                    centeredSlides: true,
                    autoHeight: false,
                    mousewheel: {
                        invert: false,
                        releaseOnEdges: true,
                        eventsTarget: this.itemToObserve,
                        forceToAxis: true,
                        sensitivity: 0,
                        thresholdDelta: 0,
                        thresholdTime: 0,
                    },
                    pagination: {
                        el: this.pagiItem,
                        clickable: true,
                        bulletClass: "inactive-page-blot",
                        bulletActiveClass: "active-page-blot",
                    },
                    on: {
                        init: (swiper) => {
                            this.swpCrtl = swiper;
                            // swiper.mousewheel.disable();
                        }
                    },
                });
                this.swiper.on('toEdge', (swiper) => {
                    this.hasSlidesChanged = false;
                    // this.enableScrolling();
                })
                this.swiper.on('slideChange', (swiper) => {
                    this.activeSlide = swiper.activeIndex;
                    if(this.activeSlide > 0 && this.activeSlide < swiper.slides.length-1){
                        this.hasSlidesChanged = true;
                    }
                })
        }
    }
}

// new VERTICALSLIDER;
let sliderElm = document.querySelectorAll(".swiper");
let elemToObserve = document.querySelectorAll("[wrapper='observe']");
if(window.screen.width < 768){
    elemToObserve = sliderElm;
}
let pagination = document.querySelectorAll(".swiper-pagination")
// new VERTICALSLIDER(sliderElm, elemToObserve, pagination);
if (sliderElm.length > 0) {
    sliderElm.forEach((item, index) => {
        new VERTICALSLIDER(item, elemToObserve[index], pagination[index]);
    })
}