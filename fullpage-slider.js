class VERTICALSLIDER {
    constructor(slider, elemToObserve, pagination) {
        this.sliderElm = slider;
        this.itemToObserve = elemToObserve;
        this.pagiItem = pagination;
        this.init();
    }
    init() {
        this.startSlider();
        this.checkInView();
    }

    checkInView() {  
        this.observer = new IntersectionObserver((wrapper) => {
            if (wrapper[0]['isIntersecting'] == true) {
               
                this.swiper.mousewheel.enable();
               
                this.centerEle()
                
            }
            else{
                setTimeout( ()=>{
                    this.swiper.mousewheel.disable();
                    this.swiper.params.mousewheel.releaseOnEdges = false;                
                }, 200)

            }
        }, { root: null, threshold: 0.9, rootMargin: '0px' });
        this.observer.observe(this.itemToObserve);
    }

    centerEle() {
        if (window.screen.width >= 768) {
            window.onscroll =  (event) => { this.itemToObserve.scrollIntoView({
                    block: "center",
                    behavior: "auto"
                });
                
            };
        }
    }
    
    

    addScrollFromWindow() {
        if (window.screen.width >= 768) {
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
                            swiper.mousewheel.disable();
                        }
                    },
                });
                this.swiper.on('toEdge', (swiper) => {
                    
                    this.addScrollFromWindow();
        
                    setTimeout(() =>{
                    this.swiper.params.mousewheel.releaseOnEdges = true;
                    }, 200);
                    
                })
        }
    }
}

let sliderElm = document.querySelectorAll(".swiper");
let elemToObserve = document.querySelectorAll("[wrapper='observe']");

if(window.screen.width < 768){
    elemToObserve = sliderElm;
}
let pagination = document.querySelectorAll(".swiper-pagination")
if (sliderElm.length > 0) {
    sliderElm.forEach((item, index) => {
        new VERTICALSLIDER(item, elemToObserve[index], pagination[index]);
    })
}