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
        // window.addEventListener("scroll", () => { 
        //     var st = window.pageYOffset || document.documentElement.scrollTop; 
        //     this.isScroll = st > lastScrollTop;
        //     lastScrollTop = st <= 0 ? 0 : st; 
        //     // this.enableDisableSlider()
        // }, false);
        this.observer = new IntersectionObserver((wrapper) => {
            if (wrapper[0]['isIntersecting'] == true) {
                this.elementIsInView = true;
                console.log('ob - true')
                // this.removeScroll(true, window);
                this.centerEle()
                //    console.log(this.elementIsInView)
                // setTimeout(() =>{
                    // this.removeScroll(false, window);
                // }, 200);
                // this.enableDisableSlider();
            }
            else{
                console.log('ob - false')
                // console.log("not")
                this.elementIsInView = false;
                setTimeout( ()=>{
                    this.swiper.params.mousewheel.releaseOnEdges = false;                
                }, 200)
                // this.enableDisableSlider(false);
            }
        }, { root: null, threshold: 0.9, rootMargin: '0px' });
        this.observer.observe(this.itemToObserve);
    }



    enableDisableSlider(){

        // issues is here when elements comes in view.
        if(this.elementIsInView){


            if(this.activeSlide == 0 && this.isScroll && !this.hasSlidesChanged){
                // this.swpCrtl.params.mousewheel.releaseOnEdges = false;
                // console.log("active slide 0, scroll down, slide not changed")
                // console.log("upar mat jane do")
                this.swiper.mousewheel.enable();
                this.sliderReset = true;
                this.centerEle();
            }
            else if(this.activeSlide == 0 && !this.isScroll && !this.hasSlidesChanged ){
                // this.swpCrtl.params.mousewheel.releaseOnEdges = false;
                // console.log("active slide 0, scroll up, slide not changed")
                // console.log("upar jane do")
                this.swiper.mousewheel.disable();
                this.sliderReset = false;
                this.addScrollFromWindow();
            }
            else if(this.activeSlide == this.swiper.slides.length-1 && this.isScroll && !this.hasSlidesChanged){
                // console.log("active slide full, scroll down, slide not changed")
                // console.log("niche jane do")
                this.hasSlidesChanged = false;
                this.swiper.mousewheel.disable();
                this.sliderReset = false;
                this.addScrollFromWindow();
            }
            else if(this.activeSlide == this.swiper.slides.length-1 && !this.isScroll && !this.hasSlidesChanged){
                // console.log("active slide full, scroll up, slide not changed")
                // console.log("niche mat jane do")
                this.swiper.mousewheel.enable();
                this.sliderReset = true;
                // this.centerEle();
            }
            // else if(this.activeSlide == this.swiper.slides.length-1 && this.isScroll && !this.hasSlidesChanged && !this.sliderReset){
            //     console.log("active slide full, scroll down, slide not changed")
            //     this.swiper.mousewheel.disable();
            //     this.sliderReset = true;
            //     this.centerEle();
            // }
        }
    }

    removeScroll(flag, ele=window){
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = {37: 1, 38: 1, 39: 1, 40: 1};
        
        function preventDefault(e) {
            e.preventDefault();
        }
        
        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }
        
        // modern Chrome requires { passive: false } when adding event
        var supportsPassive = false;
        try {
            
            ele.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: function () { supportsPassive = true; } 
            }));
        } catch(e) {}
        
        var wheelOpt = supportsPassive ? { passive: false } : false;
        var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
        
        // call this to Disable
        function disableS() {
            console.log(ele, "elem in removeScroll Dis");
            ele.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            ele.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
            ele.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            ele.addEventListener('keydown', preventDefaultForScrollKeys, false);
        }
        
        // call this to Enable
        function enableS() {
            console.log(ele, "elem in removeScroll En");
            ele.removeEventListener('DOMMouseScroll', preventDefault, false);
            ele.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
            ele.removeEventListener('touchmove', preventDefault, wheelOpt);
            ele.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        }        

        if(flag == true){
            disableS();
        } else {
            enableS();
        }
    }

    centerEle() {
        if (window.screen.width >= 768) {
            // var x = window.scrollX;
            // var y = window.scrollY;
            // window.onscroll = function () { window.scrollTo(x, y); };
            // setTimeout(function(){
            //     if(this.elementIsInView == 'true'){
            //     } else {
            //         console.log('scrillinview not called')
            //     }
            // }, 200)
            
            window.onscroll =  (event) => { this.itemToObserve.scrollIntoView({
                    block: "center",
                    behavior: "auto"
                });
                // this.removeScroll(true);
                // event.preventDefault();
                // console.log(event.deltaY)
            };
            // setTimeout(function(){
            //         this.removeScroll(flase);
            //     }, 200)

        }
    }
    
    

    addScrollFromWindow() {
        if (window.screen.width >= 768) {
            window.onscroll = function () { };
            // this.removeScroll(false)
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
                        releaseOnEdges: false,
                        eventsTarget: this.itemToObserve,
                        forceToAxis: true,
                        sensitivity: 0,
                        thresholdDelta: 0,
                        thresholdTime: 200,
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
                    // this.addScrollFromWindow();
                    this.addScrollFromWindow();
                    // this.removeScroll(false, window);
                    setTimeout(() =>{
                    //         console.log('Check if remove Scroll is called')
                    //     this.removeScroll(false, window);
                    this.swiper.params.mousewheel.releaseOnEdges = true;
                    }, 200);
                    console.log("reached on edge")
                    // this.removeScroll(false)
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
console.log(elemToObserve, "Elem to Obs")
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