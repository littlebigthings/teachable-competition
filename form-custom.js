class SALSEFORCEFORM {
    constructor(currForm) {
        this.currForm = currForm;
        this.$errorBlock = this.currForm.parentElement.querySelector(".w-form-fail");
        this.redirectUrl = null;
        this.email = this.currForm.querySelector("[data-input-type='email']");
        this.checkbox = this.currForm.querySelector("[type='checkbox']");
        this.$btn = this.currForm.querySelector("[btn='form']");
        this.dropDownBtn = this.currForm.querySelector("[wrapper='dropdown-holder']");
        this.dropDownWrapper = this.currForm.querySelector("[wrapper='options']");
        this.dropDownTitle = this.currForm.querySelector("[data-change='dropdown-title']");
        this.dropDownList = this.currForm.querySelectorAll("[data-audience]");
        this.dropDownData = null;
        this.pageUrl = window.location.href;
        this.init();
    }

    init() {
        this.setRedirectUrl();
        this.dropDownListener();
        this.addListener();
    }

    dropDownListener(){
        if(this.dropDownList.length > 0){
            this.dropDownList.forEach(item => {
                item.addEventListener("click", (evt) => {
                    // let currData = evt.currentTarget.getAttribute("data-audience");
                    let currText = evt.currentTarget.innerHTML;
                    if(currData.length > 0){
                        this.dropDownData = currText;
                        this.dropDownTitle.innerHTML = currText;
                        this.dropDownWrapper.classList.remove("hide-dropdown");
                        this.dropDownBtn.click();
                    }
                })
            })
        }
        this.dropDownBtn.addEventListener('click', () => {
            this.dropDownWrapper.classList.toggle("hide-dropdown");
        })
    }

    setRedirectUrl(){
        let url = document.location.search;
        if(url.length > 0){
            this.redirectUrl = (new URL(document.location)).searchParams.get('go-to');
            // console.log(this.redirectUrl)
        }
    }

    addListener() {
        this.currForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this.hideMsg();
            if (this.$btn != null) {
                this.$btn.value = "Please wait..."
            }
            let encryMail = sha1(this.currForm.querySelector("[data-input-type='email']").value);
            // check data before final push
            let filledData = {
                email:this.email.value,
                getUpdate: this.checkbox.value,
                oid:"00D3t000003xIvk",
                leadCapturePath:this.pageUrl,
                moduleId:"hero",
                dropDownVal:this.dropDownData,
            };
             // check data before final push
            if (encryMail.length > 0) {
                ire('trackConversion', "23435", {
                    customerEmail: encryMail,
                },
                );
            }
            if(this.dropDownData != null){
                iris.emit("email_submitted", {
                    email:$("[data-input-type='email']").val(),
                    external_source: "webflow",
                    eu: $("[wrapper='form']").data('eu'),
                    opted_into_marketing_materials: $("[wrapper='form']").find("input[type='checkbox']").prop('checked'),
                    survey_marketing_audience_size: this.dropDownData,
                    title: "March 2022 Competition",
                });
            }

            if(this.dropDownData != null){
                let resFromSf = this.sendDataToSalseForce(filledData);
                resFromSf.then(() => {
                    if (this.redirectUrl != null) {
                        window.location.href = this.redirectUrl;
                    }
                })
            }
            else{
                this.showMsg(true,"Please Select Audience...");
            }
        })
    }

    async sendDataToSalseForce(filledData) {
        var requestOptions = {
            method: "POST",
            mode: 'no-cors',
        };
        try {
            const res = await fetch(
                // `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid=${filledData.oid}&email=${filledData.email}&agree-to-receive-product-and-marketing-updates=${filledData.getUpdate}&lead-capture-path=${filledData.leadCapturePath}`,
                `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&oid=${filledData.oid}&email=${filledData.email}&agree-to-receive-product-and-marketing-updates=${filledData.getUpdate}&00N3t00000GH4mJ=${filledData.leadCapturePath}&00N3t00000GH4mO=${filledData.moduleId}&00N4z000003vL9z=${filledData.dropDownVal}&url=${filledData.leadCapturePath}`,
                requestOptions
            );

            if (res) {
                return res;
            }
            else {
                this.showMsg(true);
            }
        }
        catch {
            this.showMsg(true);
        }
    }

    showMsg(isInvalid, customMsg) {
        const msg = customMsg || "Something went wrong, please try again.";

        if (this.$btn != null && this.$errorBlock != undefined) {
            if (isInvalid) {
                this.$errorBlock.style.display = "block";
                this.$errorBlock.innerHTML = msg;
                this.$btn.value = "Retry"
            } else {
                this.$errorBlock.style.display = "none";
            }
        }
    }

    hideMsg() {
        if (this.$btn != null) {
            this.$errorBlock.style.display = "none";
        }
    }
}

const formArray = document.querySelectorAll("[wrapper='form']");
if (formArray.length > 0) {
    formArray.forEach(form => {
        new SALSEFORCEFORM(form);
    })
}