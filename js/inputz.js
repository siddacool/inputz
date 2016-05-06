;
var inputzVersion = 0.1,
    // 1 or 0
    inputzIsBeta = 1,
    inputzDateMod = "Apr 29 2016";
// intro
var izMaster = {};
izMaster.ver = inputzVersion;
izMaster.isBeta = (function(){if(inputzIsBeta === 1){return "yes";} else{return "no";}})();
izMaster.intro = "Inputz v" + inputzVersion + " " + (function(){if(inputzIsBeta === 1){return "Beta";} })() + " Script has been loaded";
izMaster.creator = "Siddhesh Mangela";

// inputzComponents dev opt
izMaster.dev = {};
izMaster.dev.date = inputzDateMod;

// inputzComponents list init
izMaster.components = [];
izMaster.components.active = [];

// inputzComponents 
//  which requires this script
izMaster.components.push("Checkbox");
izMaster.components.push("Select");
izMaster.components.push("Radio");
izMaster.components.push("Toggle");
izMaster.components.push("Search");
izMaster.components.push("FileUpload");

// inputz Components
//  list to string
// and Components count
izMaster.components.list = izMaster.components.toString();
izMaster.components.count = izMaster.components.length;


/*izObject init*/
var izObject = {};

// Select
// Base: Select
izObject.select = (function (opt){
    
    izMaster.components.active.push("Select");
    
    /*local declaration*/
    var izSelect = document.querySelectorAll('[data-izObject="select"]');
    
    /*global declaration*/
    if(opt === "global" || "all"){
        izSelect = document.querySelectorAll('select');
    }
    
    (function(){
        for(var i=0;i<izSelect.length;i++){
           var izSelectNow = izSelect[i],
               izParent = izSelectNow.parentElement,
               izSelectOptions = izSelectNow.querySelectorAll('option');
            
             /* add span */
             if(izParent.tagName.toLowerCase() === "label"){
                var newDiv = document.createElement('div'),
                    newP = document.createElement('p'),
                    newUl = document.createElement('ul');
                 
                 newDiv.setAttribute('data-izPartnerOf','select');
                 
                 for(var j=0;j<izSelectOptions.length;j++){
                     var izSelectOptionsNow = izSelectOptions[j],
                         getValue = izSelectOptionsNow.value,
                         getText = izSelectOptionsNow.textContent,
                         newLi = document.createElement('li');
                     
                     newLi.textContent = getText;
                     newLi.setAttribute('data-value',getValue);
                     
                     if(izSelectOptionsNow.hasAttribute("selected")){
                         newP.textContent = newLi.textContent;
                     }
                     
                     
                     newUl.appendChild(newLi);
                 }
                 
                 newDiv.appendChild(newP);
                 newDiv.appendChild(newUl);
                 
                 // change style
                 (function izStyle(){
                      if(izSelectNow.hasAttribute('data-izStyle') || izSelectNow.hasAttribute('disabled')){
                         if(izSelectNow.hasAttribute('data-izStyle')){
                             newP.setAttribute('data-izStyle',izSelectNow.getAttribute('data-izStyle'));
                         }
                      else{
                          newP.setAttribute('data-izStyle','disable');
                      }
                  }
                 })();
                
                
                if(!izParent.querySelector('div')){
                    
                    izParent.setAttribute('data-izParent','select');
                    izParent.appendChild(newDiv);
                }
                
                /* add data-izObject Attribute if not present*/
                if(!izSelectNow.hasAttribute('data-izObject')){
                    izSelectNow.setAttribute('data-izObject','select');
                }
                
            } 
            
        }
    })();
  
    (function dynamicSelection(){
       var izSelectDiv = document.querySelectorAll('[data-izPartnerOf="select"]');
        
        function deselectAll(){
            for(var i=0; i<izSelectDiv.length; i++){
                izSelectDiv[i].querySelector('p').classList.remove('active');
                izSelectDiv[i].querySelector('ul').classList.remove('active');
            }
        }
        
        for(var i=0; i<izSelectDiv.length; i++){
            var izLi = izSelectDiv[i].querySelectorAll('li'),
                izP = izSelectDiv[i].querySelector('p');
            
            izP.addEventListener('click',function(){
                     
                    // check for disabled element
                    if(this.hasAttribute('data-izStyle')){
                        if(this.getAttribute('data-izStyle') !== 'disable'){
                            this.classList.toggle('active');
                            this.parentElement.querySelector('ul').classList.toggle('active');
                        }
                    }
                    
                else{
                    this.classList.toggle('active');
                    this.parentElement.querySelector('ul').classList.toggle('active');
                }
                
                    
            });
            
            (function liDynamic(){
                for(var j=0; j<izLi.length; j++){
                        izLi[j].addEventListener('click',function(){
                            var divP = this.parentElement.parentElement.querySelector('p'),
                                selectElm = this.parentElement.parentElement.parentElement.querySelector('select');
                            
                            // set text to div p
                            divP.textContent = this.textContent;
                            
                            // set value to select
                            selectElm.value = this.getAttribute('data-value');
                            
                            // close ul
                            this.parentElement.classList.remove('active');
                            
                            // defocus element
                            divP.classList.remove('active');
                        })
                }
            
            })();
            
             
        }
        
    })();
    
});

// Checkbox
// Base: Checkbox
izObject.checkbox = (function (opt){
    
    izMaster.components.active.push("Checkbox");
    
    /*local declaration*/
    var izCheckBox = document.querySelectorAll('[data-izObject="checkbox"]');
    
    /*global declaration*/
    if(opt === "global" || "all"){
        izCheckBox = document.querySelectorAll('input[type="checkbox"]');
    }

    (function(){
        for(var i=0;i<izCheckBox.length;i++){
           var izCheckBoxNow = izCheckBox[i],
               izParent = izCheckBoxNow.parentElement;
              
            if(izCheckBoxNow.getAttribute('data-izObject') === 'toggle'){
               /* skip toggle checkbox for global*/
            }
            
            else{
                 /* add span */
                 if(izParent.tagName.toLowerCase() === "label"){
                    var newSpan = document.createElement('span');
                
                    if(!izParent.querySelector('span')){
                    
                        izParent.setAttribute('data-izParent','checkbox');
                        izParent.appendChild(newSpan);
                    }
                
                    /* add data-izObject Attribute if not present*/
                    if(!izCheckBoxNow.hasAttribute('data-izObject')){
                      izCheckBoxNow.setAttribute('data-izObject','checkbox');
                    }
                 
                } 
            }
            
            
        }
    })();
    
    
});


// Radio
// Base: Radio
izObject.radio = (function (opt){
    
    izMaster.components.active.push("Radio");
    
    /*local declaration*/
    var izRadio = document.querySelectorAll('[data-izObject="radio"]');
    
    /*global declaration*/
    if(opt === "global" || "all"){
        izRadio = document.querySelectorAll('input[type="radio"]');
    }

    (function(){
        for(var i=0;i<izRadio.length;i++){
           var izRadioNow = izRadio[i],
               izParent = izRadioNow.parentElement;
            
             /* add span */
             if(izParent.tagName.toLowerCase() === "label"){
                var newSpan = document.createElement('span');
                
                if(!izParent.querySelector('span')){
                    
                    izParent.setAttribute('data-izParent','radio');
                    izParent.appendChild(newSpan);
                }
                
                /* add data-izObject Attribute if not present*/
                if(!izRadioNow.hasAttribute('data-izObject')){
                    izRadioNow.setAttribute('data-izObject','radio');
                }
                
            } 
            
        }
    })();
    
});


// Toggle
// Base: Checkbox
izObject.toggle = (function (opt){
    
    izMaster.components.active.push("Toggle");
    
    /*local declaration*/
    var izToggle = document.querySelectorAll('[data-izObject="toggle"]');
    
    (function(){
        for(var i=0;i<izToggle.length;i++){
           var izToggleNow = izToggle[i],
               izParent = izToggleNow.parentElement;
            
             /* add span */
             if(izParent.tagName.toLowerCase() === "label"){
                var newSpan = document.createElement('span');
                
                if(!izParent.querySelector('span')){
                    
                    izParent.setAttribute('data-izParent','toggle');
                    izParent.appendChild(newSpan);
                }
                
                /* add data-izObject Attribute if not present*/
                if(!izToggleNow.hasAttribute('data-izObject')){
                    izToggleNow.setAttribute('data-izObject','toggle');
                }
                
            } 
            
        }
    })();
    
});


// Search
// Base: Search
izObject.search = (function (opt){
    
    izMaster.components.active.push("Search");
    
    /*local declaration*/
    var izSearch = document.querySelectorAll('[data-izObject="search"]');
    
    /*global declaration*/
    if(opt === "global" || "all"){
        izRadio = document.querySelectorAll('input[type="search"]');
    }
    
    (function(){
        for(var i=0;i<izSearch.length;i++){
           var izSearchNow = izSearch[i],
               izParent = izSearchNow.parentElement;
            
             /* add span */
             if(izParent.tagName.toLowerCase() === "label"){
                var newSpan = document.createElement('span');
                
                if(!izParent.querySelector('span')){
                    
                    izParent.setAttribute('data-izParent','search');
                    izParent.appendChild(newSpan);
                }
                
                /* add data-izObject Attribute if not present*/
                if(!izSearchNow.hasAttribute('data-izObject')){
                    izSearchNow.setAttribute('data-izObject','search');
                }
                
            } 
            
        }
    })();
  
});

// File Upload
// Base: File
izObject.fileUpload = (function (opt){
    
    izMaster.components.active.push("File Upload");
    
    /*local declaration*/
    var izfileUpload = document.querySelectorAll('[data-izObject="fileUpload"]');
    
    (function(){
        for(var i=0;i<izfileUpload.length;i++){
           var izfileUploadNow = izfileUpload[i],
               izParent = izfileUploadNow.parentElement;
            
             /* add span */
             if(izParent.tagName.toLowerCase() === "label"){
                var newSpan = document.createElement('span'),
                    inputPlaceholder = izfileUploadNow.getAttribute('placeholder');
                    
                    izParent.setAttribute('placeholder',inputPlaceholder);
                
                if(!izParent.querySelector('span')){
                    
                    izParent.setAttribute('data-izParent','fileUpload');
                    izParent.appendChild(newSpan);
                }
                
                /* add data-izObject Attribute if not present*/
                if(!izfileUploadNow.hasAttribute('data-izObject')){
                    izfileUploadNow.setAttribute('data-izObject','fileUpload');
                }
                
            } 
            
            
        }
    })();
    
    // on file select change placeholder
    (function placeHolderSelector(){
        for(var i=0;i<izfileUpload.length;i++){
            
            izfileUpload[i].addEventListener('change',function(){
                var nowValue = this.value,
                    izParent = this.parentElement,
                    nowValueSplit = nowValue.substr(nowValue.indexOf("\\") + 10),
                    vendorChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
                    vendorApple = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                
                if(vendorChrome || vendorApple){
                    izParent.setAttribute('placeholder',nowValueSplit);
                }
                else{
                    izParent.setAttribute('placeholder',nowValue);
                }
                
            });
        }
    })();
  
});

// List Of Active Components
izObject.activeComponents = izMaster.components.active;

// Fin