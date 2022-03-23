class UPDATEPRICE {
    constructor() {
      this.monthBtnArr = document.querySelectorAll("[button='monthly']");
      this.annualBtnArr = document.querySelectorAll("[button='annual']");
      this.allButtons = document.querySelectorAll("[button]");
      this.showMonthly = document.querySelectorAll("[display-item='monthly']");
      this.showAnnual = document.querySelectorAll("[display-item='annual']");
      this.init();
    }
  
    init() {
      this.listenToClick();
      this.openDefault();
    }
  
    listenToClick() {
      this.allButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let toShowPrice = e.target.getAttribute("button");
          if (toShowPrice.length > 0) {
            if (toShowPrice == "monthly") {
              this.resetPrice(true, false);
            } else if (toShowPrice == "annual") {
              this.resetPrice(false, true);
            }
          }
        });
      });
    }
  
    openDefault() {
      // code to select default active state of prices.
      this.annualBtnArr["0"].click();
      // comment the above and uncomment the below one to make month default.
      // this.monthBtnArr[0].click();
    }
    resetPrice(monthly, annual) {
      if (true) {
        if (monthly) {
          this.monthBtnArr.forEach((btn) => {
            btn.classList.add("active");
          });
          this.annualBtnArr.forEach((btn) => {
            btn.classList.remove("active");
          });
          this.showMonthly.forEach((priceElm) => {
            priceElm.classList.remove("hide");
          });
          this.showAnnual.forEach((priceElm) => {
            priceElm.classList.add("hide");
          });
        } else if (annual) {
          this.monthBtnArr.forEach((btn) => {
            btn.classList.remove("active");
          });
          this.annualBtnArr.forEach((btn) => {
            btn.classList.add("active");
          });
          this.showMonthly.forEach((priceElm) => {
            priceElm.classList.add("hide");
          });
          this.showAnnual.forEach((priceElm) => {
            priceElm.classList.remove("hide");
          });
        }
      }
    }
  }
  
  new UPDATEPRICE();