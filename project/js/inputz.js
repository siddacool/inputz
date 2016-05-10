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

// inputz Components
//  list to string
// and Components count



/*izObject init*/
var izObject = {};

// --- START ----
// InputZ objects starts 
// From the line below

// Select
// Base: Select
izMaster.components.push("Select");
// Object
izObject.select = (function (opt){
    
    izMaster.components.active.push("Select");
    
    /*local declaration*/
    var izSelect = document.querySelectorAll('[data-izObject="select"]');

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

// Multi Select
// Base: Select
izMaster.components.push("Multi Select");
// Object
izObject.multiSelect = (function (){
    
    izMaster.components.active.push("Multi Select");
    
    /*local declaration*/
    var izSelect = document.querySelectorAll('[data-izObject="multiSelect"]');

    (function(){
        for(var i=0;i<izSelect.length;i++){
           var izSelectNow = izSelect[i],
               izParent = izSelectNow.parentElement,
               izSelectOptions = izSelectNow.querySelectorAll('option');
            
             /* add span */
             if(izParent.tagName.toLowerCase() === "label"){
                var newDiv = document.createElement('div'),
                    newSubDiv = document.createElement('div'),
                    newUl = document.createElement('ul'),
                    newCloseIcon = document.createElement('i');
                 
                 newDiv.setAttribute('data-izPartnerOf','multiSelect');
                 
                 newDiv.appendChild(newSubDiv);
                 
                 // close icon
                 newCloseIcon.classList.add('close');
                 
                 newSubDiv.appendChild(newCloseIcon);
                 
                 
                 for(var j=0;j<izSelectOptions.length;j++){
                     var izSelectOptionsNow = izSelectOptions[j],
                         getValue = izSelectOptionsNow.value,
                         getText = izSelectOptionsNow.textContent,
                         newLi = document.createElement('li'),
                         newSpan = document.createElement('span');
                     
                     if(izSelectOptionsNow.selected){
                         newSpan.classList.add('active');
                         newLi.classList.add('deactive');
                     }
                     else{
                         newSpan.classList.remove('active');
                         newLi.classList.remove('deactive');
                     }
                         // fill up the data
                         newSpan.textContent = getText;
                         newSpan.setAttribute('data-value',getValue);
                         
                         newSubDiv.appendChild(newSpan);
                     
                         newLi.textContent = getText;
                         newLi.setAttribute('data-value',getValue);
                         
                         newUl.appendChild(newLi);
                 }
                 
                 newDiv.appendChild(newUl);
                 
                 // change style
                 (function izStyle(){
                      if(izSelectNow.hasAttribute('data-izStyle') || izSelectNow.hasAttribute('disabled')){
                         if(izSelectNow.hasAttribute('data-izStyle')){
                             newSpan.setAttribute('data-izStyle',izSelectNow.getAttribute('data-izStyle'));
                         }
                      else{
                          newSpan.setAttribute('data-izStyle','disable');
                      }
                  }
                 })();
                
                
                if(!izParent.querySelector('div')){
                    
                    izParent.setAttribute('data-izParent','multiSelect');
                    izParent.appendChild(newDiv);
                }
                
               
            } 
            
        }
    })();
  
    
     (function dynamicSelection(){
         
       var izSelectDiv = document.querySelectorAll('[data-izPartnerOf="multiSelect"]');
         
         // self destruction function
         function selfDestruct(self,targetElmParent){
                var selfTopParent = self.parentNode.parentNode,
                    selfParent = self.parentNode,
                    targetElementParent = selfTopParent.querySelector(targetElmParent),
                    appendElm = " ",
                    getValue = self.getAttribute('data-value'),
                    getText = self.textContent;
                    
                    // hide self and set target element value  
                    if(targetElmParent === "ul"){
                       self.classList.remove('active');    
                       showElm = targetElementParent.querySelectorAll('li');
                    }
                    else{
                        self.classList.add('deactive');
                        showElm = targetElementParent.querySelectorAll('span');
                    }
                      
                    // show target element
                    for(var j=0; j<showElm.length; j++){
                        if(showElm[j].getAttribute('data-value') === getValue){
                            
                            if(showElm[j].parentNode.tagName.toLowerCase() === "ul" ){
                                showElm[j].classList.remove('deactive');
                            }
                            else{
                                showElm[j].classList.add('active');
                            }
                        }
                    }
            }
          
          // dynamic select function
          function selectDynamic(){
            for(var i=0;i<izSelectDiv.length;i++){
                var izSelectDivNow = izSelectDiv[i],
                    spanHolder = izSelectDivNow.querySelector('div'),
                    selectDom = spanHolder.parentNode.parentNode.parentNode.querySelector('select'),
                    optionDom = selectDom.querySelectorAll('option'),
                    spanDom = spanHolder.querySelectorAll('span');
                
                var valueArr = '';
                
                // deselect all
                function deselectAll(){
                    for(var i=0;i<optionDom.length; i++){
                        optionDom[i].selected = false;
                    }
                }
                
                // select option
                 function selectItems(stringFromDB) {
                            'use strict';

                        var select = selectDom,
                            stringArray = stringFromDB.split(","),
                            count = 0,
                            i;
                        
                        // calling deselect function
                        deselectAll();
                     
                        for(count = 0; count < stringArray.length; count += 1) {
                            for(i = 0; i < select.options.length; i += 1) {
                             if(select.options[i].value === stringArray[count]) {
                                    select.options[i].selected = true;
                                }
                            }
                        }
                   }
                
                  
                 // push values to valueArr
                  for(var j=0;j<spanDom.length;j++){
                      if(spanDom[j].classList.contains('active')){
                          valueArr = valueArr + spanDom[j].getAttribute('data-value') + ",";
                      }
                      else{
                          
                      }
                  }
                
                selectItems(valueArr);
                /*selectItems('is,InputZ');*/
            }
         }
         
         
         // List show/hide
         (function listShowHide(){
              for(var i=0; i<izSelectDiv.length; i++){
                 var izUl = izSelectDiv[i].querySelector('ul'),
                     izDiv = izSelectDiv[i].querySelector('div'),
                     izCloseButton = izDiv.querySelector('.close');
                  
                  function listPop(){
                      izUl.classList.add('active');
                      this.classList.add('active');
                  }
                  
                  izDiv.addEventListener('click',listPop);
                  
                  izCloseButton.addEventListener('click',function(e){
                      e.stopPropagation();
                      izUl.classList.remove('active');
                      this.parentElement.classList.remove('active');
                  })
              }
         })();
         
         // Ui 
         (function uiDynamic(){
              for(var i=0; i<izSelectDiv.length; i++){
                 var izSpan = izSelectDiv[i].querySelectorAll('span'),
                     izLi = izSelectDiv[i].querySelectorAll('li');
            
                 (function spanDynamic(){
                     for(var j=0; j<izSpan.length; j++){
                         izSpan[j].addEventListener('click',function(){
                                selfDestruct(this,"ul");
                                selectDynamic();
                         })
                     }
                 
                 })();
            
                 
                 (function liDynamic(){
                     for(var j=0; j<izLi.length; j++){
                         izLi[j].addEventListener('click',function(){
                                selfDestruct(this,"div");
                             
                             selectDynamic();
                         })
                     }
                 
                 })();
           }
         })();
         
    })();

});

// Checkbox
// Base: Checkbox
izMaster.components.push("Checkbox");
// Object
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
izMaster.components.push("Radio");
// Object
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
izMaster.components.push("Toggle");
// Object
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
izMaster.components.push("Search");
// Object
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
izMaster.components.push("File Upload");
// Object
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

// --- END ----
// InputZ objects Ends Here 

// List Of Active Components
izObject.activeComponents = izMaster.components.active;

// Componets tally
izMaster.components.list = izMaster.components.toString();
izMaster.components.count = izMaster.components.length;

// Fin