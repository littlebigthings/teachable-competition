// check of the element is first element or not if yes then open it.
class SETCMSLIST {
    constructor() {
        this.featureWrapper = document.querySelector('[wrapper]');
        this.featureItems = [...this.featureWrapper.querySelectorAll("[data-feature='plan']")];
        this.plansWrapper = [...document.querySelectorAll("[data-to-add]")];
        this.showFeatureBtn = document.querySelectorAll("[btn='switch']");
        this.cards = [...document.querySelectorAll("[card='content']")];
        this.cardsClosed = false;
        this.planObj = {
            Free: [],
            Basic: [],
            Pro: [],
            Business: [],
        };
        this.init();
    }

    init() {
        this.addItemsToArray()
        this.addBtnClickListener();
    }

    addItemsToArray() {
        if (this.featureItems.length != 0) {
            this.featureItems.forEach(item => {
                let checkPlan = item.innerHTML;
                let parent = item.parentElement;
                if (checkPlan.length > 0) {
                    if (checkPlan === "Free") {
                        this.planObj.Free.push(parent);
                    }
                    else if (checkPlan === "Basic") {
                        this.planObj.Basic.push(parent);
                    }
                    else if (checkPlan === "Pro") {
                        this.planObj.Pro.push(parent);
                    }
                    else if (checkPlan === "Business") {
                        this.planObj.Business.push(parent);
                    }
                }
            })
            this.addEventsItemsToTab();
        }
    }

    addEventsItemsToTab() {
        // removing empty wrapper
        this.featureWrapper.remove();
        Object.keys(this.planObj).forEach(item => {
            if (item.length != 0) {
                if (item == "Free") {
                    let tabToPush = this.plansWrapper.find(item => item.getAttribute("data-to-add") == "Free");
                    this.pushElements(tabToPush, item)
                }
                else if (item == "Basic") {
                    let tabToPush = this.plansWrapper.find(item => item.getAttribute("data-to-add") == "Basic");
                    this.pushElements(tabToPush, item)
                }
                else if (item == "Pro") {
                    let tabToPush = this.plansWrapper.find(item => item.getAttribute("data-to-add") == "Pro");
                    this.pushElements(tabToPush, item)
                }
                else if (item == "Business") {
                    let tabToPush = this.plansWrapper.find(item => item.getAttribute("data-to-add") == "Business");
                    this.pushElements(tabToPush, item)
                }
            }
        });
        this.setHeight();
    }

    pushElements(tabToPush, item) {
        if (tabToPush != undefined || tabToPush != null) {
            this.planObj[item].forEach((elem, index) => {
                tabToPush.appendChild(elem);
            })
        }
    }

    addBtnClickListener() {
        if (this.showFeatureBtn.length > 0) {
            this.showFeatureBtn.forEach(btn => {
                btn.addEventListener('click', (evt) => {
                    let elemToOpenClose = evt.target.parentElement.querySelector("[card='content']");
                    if (elemToOpenClose != null || elemToOpenClose != undefined) {
                        this.animateBlock(elemToOpenClose);
                    }
                })
            })
        }
    }

    animateBlock(block) {
        let getAttr = block.getAttribute("isactive");
        let getHeightVal = block.getAttribute("card-height");
        if (getAttr == "true") {
            block.setAttribute("isactive", false);
            gsap.to(block, { height: getHeightVal, ease: "circ.out", duration: 0.2, });
        }
        else {
            block.setAttribute("isactive", true);
            gsap.to(block, { height: "0", ease: "circ.out", duration: 0.2, });
        }
    }

    setHeight() {
        this.cards.forEach(card => {
            let getElmHeight = card.offsetHeight;
            card.setAttribute("card-height", getElmHeight);
            card.setAttribute("isactive", true);
        });
        this.activateResizeEvt();
    }

    activateResizeEvt() {
        this.checkAndOpenClose();
        let resizeTimer;
        $(window).on("resize", (e) => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.checkAndOpenClose();
            }, 250);
        });
    }
    checkAndOpenClose() {
        let isOnmobile = (window.screen.width < 768);
        if (isOnmobile && !this.cardsClosed) {
            this.cardsClosed = true;
            this.closeCards();
        }
        else if (!isOnmobile && this.cardsClosed) {
            this.cardsClosed = false;
            this.openCards();
        }
    }

    closeCards() {
        this.cards.forEach(card => {
            gsap.to(card, { height: "0", ease: "circ.out", duration: 0.2, });
        })
    }

    openCards() {
        this.cards.forEach(card => {
            let getHeightVal = card.getAttribute("card-height");
            gsap.to(card, { height: getHeightVal, ease: "circ.out", duration: 0.2, });
        })
    }

}
new SETCMSLIST;