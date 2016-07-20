;
var inputzVersion = 0.1,
    // 1 or 0
    inputzIsBeta = 1,
    inputzDateMod = "July 20 2016";
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


/*focus Outline*/

function focusOutline(self){
    
    var izTarget = document.querySelectorAll(self);
    
    for(var i=0; i<izTarget.length; i++){
        
         function focusShow(){
             this.parentNode.classList.add('focus');
         }
        
         izTarget[i].addEventListener('focus',focusShow);
       
        izTarget[i].addEventListener('focusout',function(){
             this.parentNode.classList.remove('focus');
         });

    }
 
}


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
                izP = izSelectDiv[i].querySelector('p'),
                izUl = izSelectDiv[i].querySelector('ul');
            
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
                        izLi[j].addEventListener('click',function(e){
                            var divP = this.parentElement.parentElement.querySelector('p'),
                                selectElm = this.parentElement.parentElement.parentElement.querySelector('select');
                            
                            e.stopPropagation();
                            
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
    
    (function shadowMime(){
        
        var izSelectDiv = document.querySelectorAll('[data-izPartnerOf="select"]');
        
        for(var i=0;i<izSelect.length;i++){
            
            
            izSelect[i].addEventListener('change',function(){
                var izP = this.parentNode.querySelector('p'),
                    izLi = this.parentNode.querySelectorAll('li');
                
                izP.textContent = this.value;
                
                // function li focus reset
                function listFocusReset(){
                    for(var j=0;j<izLi.length;j++){
                        izLi[j].classList.remove('focus');
                    }
                }
                
                for(var j=0;j<izLi.length;j++){
                    
                    if(this.value === izLi[j].getAttribute('data-value')){
                        listFocusReset();
                        izLi[j].classList.add('focus');
                    }
                }
                
            });
            
            
            izSelect[i].addEventListener('focus',function(){
                var izP = this.parentNode.querySelector('p');
                
                izP.classList.add('focus');
            });
            
            izSelect[i].addEventListener('focusout',function(){
                var izP = this.parentNode.querySelector('p');
                
                izP.classList.remove('focus');
            });
            
            izSelect[i].addEventListener('keypress',function(e){
               var izP = this.parentNode.querySelector('p');
                if(e.keyCode == "32" || "13"){
                    izP.click();
                }
            });
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
                    newUl = document.createElement('ul');
                 
                 newDiv.setAttribute('data-izPartnerOf','multiSelect');
                 
                 newDiv.appendChild(newSubDiv);
                 
                 
                 for(var j=0;j<izSelectOptions.length;j++){
                     var izSelectOptionsNow = izSelectOptions[j],
                         getValue = izSelectOptionsNow.value,
                         getText = izSelectOptionsNow.textContent,
                         newLi = document.createElement('li'),
                         newSpan = document.createElement('span'),
                         newIcon = document.createElement('i');
                     
                     
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
                         
                         // close icon
                         newIcon.classList.add('close');
                         newSpan.appendChild(newIcon);
                     
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
                                showElm[j].classList.remove('focus');
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
                 function listPop(){
                      izUl.classList.add('active');
                      this.classList.add('active');
                  }
                  
                  function listClose(){
                      this.classList.remove('active');
                      izDiv.classList.remove('active');
                  }
                  
                  function listToggle(){
                      this.classList.toggle('active');
                      izUl.classList.toggle('active');
                  }
             
              for(var i=0; i<izSelectDiv.length; i++){
                 var izUl = izSelectDiv[i].querySelector('ul'),
                     izDiv = izSelectDiv[i].querySelector('div'),
                     izSpan = izDiv.querySelectorAll('span');
 
                    izDiv.addEventListener('click',listToggle);
                    izUl.addEventListener('click',listClose);
                  
                  
                   // focus out
                  for(var j=0; j<izSpan.length; j++){
                      izSpan[j].addEventListener('click',function(e){
                          e.stopPropagation();
                      })
                  }

              }
         })();
         
         // Ui 
         (function uiDynamic(){
              for(var i=0; i<izSelectDiv.length; i++){
                 var izSpan = izSelectDiv[i].querySelectorAll('span'),
                     izLi = izSelectDiv[i].querySelectorAll('li');
            
                 (function spanDynamic(){
                     for(var j=0; j<izSpan.length; j++){
                         var izClose = izSpan[j].querySelector('.close');
                         
                         izClose.addEventListener('click',function(){
                                selfDestruct(this.parentNode,"ul");
                                selectDynamic();
                         });
                         
                         izSpan[j].addEventListener('click',function(){
                             this.classList.add('focus');
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
    
    // Shadow Mime
    
   (function shadowMime(){
        
        var izSelectDiv = document.querySelectorAll('[data-izPartnerOf="multiSelect"]');
        
        for(var i=0;i<izSelect.length;i++){
            
            
            izSelect[i].addEventListener('focus',function(){
                var izPartner = this.parentNode.querySelector('[data-izPartnerOf="multiSelect"]'),
                    izDiv = izPartner.querySelector('div');
                
                izDiv.classList.add('focus');
            });
            
            izSelect[i].addEventListener('focusout',function(){
                var izPartner = this.parentNode.querySelector('[data-izPartnerOf="multiSelect"]'),
                    izDiv = izPartner.querySelector('div');
                
                izDiv.classList.remove('focus');
            });
            
        }
      
        
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
    
    /*focus*/
    
    focusOutline('[data-izObject="checkbox"]');
    
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
    
    /*focus*/
    
    focusOutline('[data-izObject="radio"]');
    
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
    
    /*focus*/
    
    focusOutline('[data-izObject="toggle"]');
    
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
    
    
    /* File Upload Focus */
    (function fileUploadFocus(){
       
        for(var i=0;i<izfileUpload.length;i++){
            izfileUpload[i].addEventListener('focus',function(){
                 var izParent = this.parentElement;
                
                izParent.classList.add('focus');
            });
            
            izfileUpload[i].addEventListener('focusout',function(){
                 var izParent = this.parentElement;
                
                izParent.classList.remove('focus');
            });
        }
        
    })();
  
});

// Date Picker
// Base: Text
izMaster.components.push("Date Picker");
// Object
izObject.datePicker = (function (dateType){
    izMaster.components.active.push("Date Picker");
    
    /*Global attributes*/
    var izDatePicker = document.querySelectorAll('[data-izObject="datePicker"]'),
        // date utilities
        izDate = new Date(),
        dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        monthDayCount = [31,28,31,30,31,30,31,31,30,31,30,31],
        leapDayCount = [31,29,31,30,31,30,31,31,30,31,30,31],
        firstDay = (function(){
            var izAltDate = new Date();      
            izAltDate.setDate(1);
            return izAltDate.getDay();
        })();
    
    /*date type variation*/
    var izDateFormat,
        dateFormats = ['default','dd/mm/yyyy','mm-dd-yyyy','dd-mm-yyyy','mmm_dd,yyyy','dd_mmm_yyyy'];
    if(! dateType){
        izDateFormat = 'default';
    }
    else{
       izDateFormat =  dateType;
    }
    
    // century master    
    var centuryMaster = {};
        // Decade
        centuryMaster.decade = (function(e){

              var input = (function(){
               if(!e){
                   var fullYear = izDate.getFullYear();
                   
                   return fullYear.toString();
               }
              else{
                  return e;
              }
           })(),
           firstTwo = input.substring(0,2),
           lastTwo = input.slice(-2),
           century = parseInt(firstTwo),
           decade = parseInt(lastTwo);
        
          if(decade <= 9){
              return century + "00";
           }
          else{
             return century + input.substring(2,3) + "0";
          }
        });
        // Century
        centuryMaster.century = (function(e){

              var input = (function(){
               if(!e){
                   var fullYear = izDate.getFullYear();
                   
                   return fullYear.toString();
               }
              else{
                  return e;
              }
           })(),
           firstTwo = input.substring(0,2),
           lastTwo = input.slice(-2),
           century = parseInt(firstTwo),
           decade = parseInt(lastTwo);
        
          return century + "00";
        });
    
    // leapYear Master
    var leapYearMaster = (function(year) {
            var value = parseInt(year);
            return ((value % 4 == 0) && (value % 100 != 0)) || (value % 400 == 0);
       });
    
    /* base function */
    (function baseFunction(){
        for(var i=0;i<izDatePicker.length;i++){
            var izDatePickerNow = izDatePicker[i],
                izParent = izDatePickerNow.parentElement,
                newDiv = document.createElement('div'),
                newSpan = document.createElement('span');
            
            // set span icon
            newSpan.setAttribute('data-izSupportBtn','datePicker');
            
            // set partner
            newDiv.setAttribute('data-izPartnerOf','datePicker');
            
            if(izParent.tagName.toLowerCase() === "label"){
                
                if(!izParent.querySelector('div')){
                    izParent.setAttribute('data-izParent','datePicker');
                    izParent.appendChild(newSpan);
                    izParent.appendChild(newDiv);
                }
                
                /* add data-izObject Attribute if not present*/
                if(!izDatePickerNow.hasAttribute('data-izObject')){
                    izDatePickerNow.setAttribute('data-izObject','datePicker');
                }
            }
        }
    })();
    
    
    /* Call Calender function */

    
    function removeCalender(){
       var izPartnerDatePicker = document.querySelectorAll('[data-izPartnerOf="datePicker"]');
        
        for(var i=0;i<izPartnerDatePicker.length;i++){
            var izPartnerDatePickerNow = izPartnerDatePicker[i];
            
            izPartnerDatePickerNow.innerHTML = "";
            
            izPartnerDatePickerNow.classList.remove('active');
        }
    }
    
    
    function callCalender(self){
        var nowSelf = self,
            izParent = self.parentElement,
            izPartner = izParent.querySelector('[data-izPartnerOf="datePicker"]');
        
        
        if(izParent.tagName.toLowerCase() === "label"){
             var newYear = document.createElement('p'),
                 newYearText = document.createElement('a'),
                 newMonthMap = document.createElement('table'),
                 newMonthName = document.createElement('p'),
                 newMonthNameText = document.createElement('a'),
                 newMonthNamePrevArrow = document.createElement('span'),
                 newMonthNameNextArrow = document.createElement('span'),
                 newTrMain = document.createElement('tr'),
                 /*Month Modal*/
                 newMonthModal = document.createElement('div'),
                 newBackArrow = document.createElement('span'),
                 newYearShow = document.createElement('span'),
                 newMonthMoTable = document.createElement('table'),
                 /*Year Modal*/
                 newYearModal = document.createElement('div'),
                 newYearBackArrow = document.createElement('span'),
                 newDecadeShow = document.createElement('span'),
                 newYearMoTable = document.createElement('table'),
                 /*Decade Modal*/
                 newDecadeModal = document.createElement('div'),
                 newDecadeBackArrow = document.createElement('span'),
                 newCenturyShow = document.createElement('span'),
                 newDecadeMoTable = document.createElement('table'),
                 /*Century Modal*/
                 newCenturyModal = document.createElement('div'),
                 newCenturyBackArrow = document.createElement('span'),
                 newCenturyPlaceholder = document.createElement('span'),
                 newCenturyMoTable = document.createElement('table');
            
                 izPartner.classList.add('active');
            
                 /*add Year Details*/
                 newYear.classList.add('dateYear');
                 // year Digits
                 newYearText.textContent = izDate.getFullYear().toString();
                 newYearText.setAttribute('data-value',izDate.getFullYear().toString());
                 newYear.appendChild(newYearText);
                 // Push Year
                 izPartner.appendChild(newYear);
            
                 /* add Month Deatils */
                 newMonthName.classList.add('dateMonth');
                 // month name
                 newMonthNameText.textContent = monthNames[izDate.getMonth()];
                 newMonthNameText.setAttribute('data-value',izDate.getMonth() + 1);
                 newMonthNameText.setAttribute('data-id','monthModalBtn');
                 newMonthName.appendChild(newMonthNameText);
                 // month arrows
                 newMonthNamePrevArrow.setAttribute('data-id','prevArrow');
                 newMonthNameNextArrow.setAttribute('data-id','nextArrow');
                 newMonthName.appendChild(newMonthNamePrevArrow);
                 newMonthName.appendChild(newMonthNameNextArrow);
                 // Push Month
                 izPartner.appendChild(newMonthName);
                 
                 // add Day Names
                 for(var i=0;i<dayNames.length;i++){
                     var  newTh = document.createElement('th');
                     
                     newTh.textContent = dayNames[i];
                     newTrMain.appendChild(newTh);
                 };
                 
                 newTrMain.classList.add('firstTr');
                 newMonthMap.appendChild(newTrMain);
                
                 // add Day Rows and Columns 
                  for(var row=0;row<6;row++){
                      var newTr = document.createElement('tr');
                      for(var col=0;col<7;col++){
                          var  newTd = document.createElement('td');
                          
                            newTr.appendChild(newTd);
                      }
                      
                      newMonthMap.appendChild(newTr);
                  };
                 
                 // add Month Map Table
                 newMonthMap.classList.add('monthMap');
                 izPartner.appendChild(newMonthMap);
            
                /* populate actual Data*/
            
                // diffrentiate Empty Cells
                 (function diffEmptyCells(){
                   var izTable = izPartner.querySelector('table'),
                       izTd = izTable.querySelectorAll('td');

                   for(j=0;j<izTd.length;j++){
                      if(j >= firstDay){
                          izTd[j].classList.add('fill');
                      }
                   }
                 })();
                // add anchors
                (function addAnchors(){
                        var izTable = izPartner.querySelector('table'),
                            izTd = izTable.querySelectorAll('td');
                                    
                                  
                        for(j=0;j<izTd.length;j++){
                            var newTdText = document.createElement('a');
                           izTd[j].appendChild(newTdText);
                        }
                    })();
               // Populate Month data
               (function popMonthData(){
                   var izTable = izPartner.querySelector('table'),
                       izTd = izTable.querySelectorAll('td.fill');
                                 
                   for(j=0;j<izTd.length;j++){
                                     
                       var izTdText = izTd[j].querySelector('a');
                                     
                       izTdText.textContent = (function(){
                           
                           if(leapYearMaster(izDate.getFullYear())){
                              if(j < leapDayCount[izDate.getMonth()]){
                                  return j + 1;
                               }
                              else{
                                  return "";
                               }
                           }
                           else{
                              if(j < monthDayCount[izDate.getMonth()]){
                                  return j + 1;
                               }
                              else{
                                  return "";
                               }
                           }
                           
                           
                       })();
                        
                                   
                   }
               })();
        
               // Highlight Todays Date
               (function highlightToday(){
                     var izTable = izPartner.querySelector('table'),
                         izTd = izTable.querySelectorAll('td.fill');

                      for(j=0;j<izTd.length;j++){
                         izTd[j].textContent;
                                      
                          if(izTd[j].textContent === izDate.getDate().toString()){
                              izTd[j].classList.add('today');
                          }
                     }
                 })();
            
              // Month Modal
              newMonthModal.setAttribute('data-id','monthModal');
              newBackArrow.setAttribute('data-id','backArrow');
              newMonthModal.appendChild(newBackArrow);
                  
              newYearShow.setAttribute('data-id','yearShow');
              newYearShow.textContent = izDate.getFullYear();
              newYearShow.setAttribute('data-value',izDate.getFullYear());
              newMonthModal.appendChild(newYearShow);
                  
              // decorate Table
              for(var row=0; row<4 ; row++){
                  var newMonthMoTr = document.createElement('tr');
                      
                  for(var col=0; col<3; col++){
                      var newMonthMoTd = document.createElement('td'),
                          newMonthMoAnchor = document.createElement('a');
                          
                      newMonthMoAnchor.classList.add('monthMoAnchor');
                          
                      newMonthMoTd.appendChild(newMonthMoAnchor);
                          
                      newMonthMoTr.appendChild(newMonthMoTd);
                  }
                      
                  newMonthMoTable.appendChild(newMonthMoTr);
              }
                       
                  
              newMonthModal.appendChild(newMonthMoTable);
            
             // Push Month Modal
             izPartner.appendChild(newMonthModal);
            
            // Populate Month Modal
            (function popMonthModal(){
                  var monthModal = izPartner.querySelector('[data-id="monthModal"]'),
                      targetGo = monthModal.querySelectorAll('.monthMoAnchor');
                
                
                for(var i=0;i<targetGo.length;i++){
                   targetGo[i].textContent = monthNames[i];
                   targetGo[i].setAttribute('data-value',i + 1);
                }

            })();
            
            
             // Year Modal
              newYearModal.setAttribute('data-id','yearModal');
              newYearBackArrow.setAttribute('data-id','backArrow');
              newYearModal.appendChild(newYearBackArrow);
                  
              newDecadeShow.setAttribute('data-id','decadeShow');
              newDecadeShow.setAttribute('data-value',centuryMaster.decade());
              newDecadeShow.textContent = centuryMaster.decade() + "\'s";
              newYearModal.appendChild(newDecadeShow);
            
               // decorate Table
              for(var row=0; row<4 ; row++){
                  var newYearMoTr = document.createElement('tr');
                      
                  for(var col=0; col<3; col++){
                      var newYearMoTd = document.createElement('td'),
                          newYearMoAnchor = document.createElement('a');
                          
                      newYearMoAnchor.classList.add('yearMoAnchor');
                          
                      newYearMoTd.appendChild(newYearMoAnchor);
                          
                      newYearMoTr.appendChild(newYearMoTd);
                  }
                      
                  newYearMoTable.appendChild(newYearMoTr);
              }
                       
                  
              newYearModal.appendChild(newYearMoTable);
            
              // Push Year Modal
              izPartner.appendChild(newYearModal);
             
            // Populate Year Modal
            (function popYearModal(){
                  var yearModal = izPartner.querySelector('[data-id="yearModal"]'),
                      targetGo = yearModal.querySelectorAll('.yearMoAnchor');
                
                for(var i=0;i<10;i++){
                    
                    var parseI = parseInt(i),
                        parseCentury = parseInt(centuryMaster.decade()),
                        pushValue = parseI + parseCentury;
                    
                   targetGo[i].textContent = pushValue;
                   targetGo[i].setAttribute('data-value',pushValue);
                }
               
            })();
            
            // Decade Modal
              newDecadeModal.setAttribute('data-id','decadeModal');
              newDecadeBackArrow.setAttribute('data-id','backArrow');
              newDecadeModal.appendChild(newDecadeBackArrow);
                  
              newCenturyShow.setAttribute('data-id','centuryShow');
              newCenturyShow.setAttribute('data-value',centuryMaster.century());
              newCenturyShow.textContent = centuryMaster.century() + "z";
              newDecadeModal.appendChild(newCenturyShow);
            
               // decorate Table
              for(var row=0; row<4 ; row++){
                  var newDecadeMoTr = document.createElement('tr');
                      
                  for(var col=0; col<3; col++){
                      var newDecadeMoTd = document.createElement('td'),
                          newDecadeMoAnchor = document.createElement('a');
                          
                      newDecadeMoAnchor.classList.add('decadeMoAnchor');
                          
                      newDecadeMoTd.appendChild(newDecadeMoAnchor);
                          
                      newDecadeMoTr.appendChild(newDecadeMoTd);
                  }
                      
                  newDecadeMoTable.appendChild(newDecadeMoTr);
              }
                       
                  
              newDecadeModal.appendChild(newDecadeMoTable);
            
              // Push Decade Modal
              izPartner.appendChild(newDecadeModal);
            
            // Populate Decade Modal
            (function popDecadeModal(){
                  var decadeModal = izPartner.querySelector('[data-id="decadeModal"]'),
                      targetGo = decadeModal.querySelectorAll('.decadeMoAnchor');
                
                   for(var i=0;i<10;i++){
                    
                    var modI = i + "0",
                        parseI = parseInt(modI),
                        parseCentury = parseInt(centuryMaster.century()),
                        pushValue = parseI + parseCentury;
                    
                   targetGo[i].textContent = pushValue + "\'s";
                   targetGo[i].setAttribute('data-value',pushValue);
                }
               
            })();
            
            // Century Modal
              newCenturyModal.setAttribute('data-id','centuryModal');
              newCenturyBackArrow.setAttribute('data-id','backArrow');
              newCenturyModal.appendChild(newCenturyBackArrow);
                  
              newCenturyPlaceholder.setAttribute('data-id','centuryPlaceholder');
              newCenturyPlaceholder.textContent = 'Select';
              newCenturyModal.appendChild(newCenturyPlaceholder);
              
              
              
            
               // decorate Table
              for(var row=0; row<1 ; row++){
                  var newCenturyMoTr = document.createElement('tr');
                      
                  for(var col=0; col<2; col++){
                      var newCenturyMoTd = document.createElement('td'),
                          newCenturyMoAnchor = document.createElement('a');
                          
                      newCenturyMoAnchor.classList.add('centuryMoAnchor');
                          
                      newCenturyMoTd.appendChild(newCenturyMoAnchor);
                          
                      newCenturyMoTr.appendChild(newCenturyMoTd);
                  }
                      
                  newCenturyMoTable.appendChild(newCenturyMoTr);
              }
                       
                  
              newCenturyModal.appendChild(newCenturyMoTable);
            
              // Push Century Modal
              izPartner.appendChild(newCenturyModal);
            
            // Populate Century Modal
            (function popCenturyModal(){
                  var centuryModal = izPartner.querySelector('[data-id="centuryModal"]'),
                      targetGo = centuryModal.querySelectorAll('.centuryMoAnchor');
                
                   targetGo[0].textContent = "1900z";
                   targetGo[0].setAttribute('data-value',"1900");
                   targetGo[1].textContent = "2000z";
                   targetGo[1].setAttribute('data-value',"2000");
               
            })();
        }
    }
    
    // push details back to textbox
    
    // calender Change function
    function calenderChange(e){
      var self = e,
          izPartner = self.parentElement.querySelector('[data-izPartnerOf="datePicker"]'),
          // main window
          izPrevBtn = izPartner.querySelector('[data-id="prevArrow"]'),
          izNextBtn = izPartner.querySelector('[data-id="nextArrow"]'),
          izMonthBtn = izPartner.querySelector('[data-id="monthModalBtn"]'),
          // month modal
          izMonthMoAnchor = izPartner.querySelectorAll('.monthMoAnchor'),
          izYearBtn = izPartner.querySelector('.dateYear').querySelector('a'),
          izMonthMoYearShow = izPartner.querySelector('[data-id="yearShow"]'),
          // year modal
          izYearMoAnchor = izPartner.querySelectorAll('.yearMoAnchor'),
          izDecadeShow = izPartner.querySelector('[data-id="decadeShow"]'),
          // Decade Modal
          izDecadeMoAnchor = izPartner.querySelectorAll('.decadeMoAnchor'),
          izCenturyShow = izPartner.querySelector('[data-id="centuryShow"]'),
          // Century Modal
          izCenturyMoAnchor = izPartner.querySelectorAll('.centuryMoAnchor'),
          // Modal Close: back Button
          izBackBtn = izPartner.querySelectorAll('[data-id="backArrow"]');
        
          // Prepare calender
          function prepareCal(monthData,yearData){
                   var izTable = izPartner.querySelector('table'),
                       izTd = izTable.querySelectorAll('td'),
                       izTdFill = izTable.querySelectorAll('td.fill');

                 for(j=0;j<izTdFill.length;j++){
                        
                       izTdFill[j].classList.remove('today');
                     
                       izTdFill[j].querySelector('a').textContent = (function(){
                           
                            if(!yearData){
                                   if(j < monthDayCount[monthData]){
                                     return j + 1;
                                    }
                                      else{
                                       return "";
                                    }  
                            }
                            else{
                                if(leapYearMaster(yearData)){
                                    if(j < leapDayCount[monthData]){
                                     return j + 1;
                                    }
                                      else{
                                       return "";
                                    }
                                }
                                else{
                                    if(j < monthDayCount[monthData]){
                                     return j + 1;
                                    }
                                      else{
                                       return "";
                                    }
                                }
                            }
                           
                           
                       })();            
                }
              
          }
        
        // Populate Month data to Calender
             function popMonthData(monthData,yearData){
                   var izTable = izPartner.querySelector('table'),
                       izTd = izTable.querySelectorAll('td'),
                       izTdFill = izTable.querySelectorAll('td.fill'),
                       fakeDate = (function(dateMonth,dateYear){
                            var izAltDate = new Date(); 
                                
                                if(!yearData){
                                    
                                }
                                else{
                                   izAltDate.setFullYear(dateYear); 
                                }
                                izAltDate.setMonth(dateMonth);
                                izAltDate.setDate(1);
                                return izAltDate.getDay();
                       });

                   // reset calender
                   (function(){
                       for(j=0;j<izTd.length;j++){
                       izTd[j].classList.remove('fill');
                       
                       // prepare calender
                       if(j >= fakeDate(monthData,yearData)){
                          izTd[j].classList.add('fill');
                       }
                        else{
                            izTd[j].querySelector('a').textContent = "";
                        }
   
                     }
                   })();
                 
               };
        
        // change month toggler value
        function changeMonthToggler(value,text){
            var izMonthToggle = izPartner.querySelector('[data-id="monthModalBtn"]');
            
                izMonthToggle.textContent = text;
                izMonthToggle.setAttribute('data-value',value);
        }
        
        // open month modal
        function openMonthModal(e){
           var monthModal = e.querySelector('[data-id="monthModal"]'),
               yearShow = monthModal.querySelector('[data-id="yearShow"]'),
               nowYear = e.querySelector('.dateYear').querySelector('a').getAttribute('data-value');
            
            monthModal.classList.add('active');
            
            yearShow.textContent = nowYear;
            yearShow.setAttribute('data-value',nowYear);
       }
        
        // open Year modal
        function openYearModal(e){
           var target = e.parentElement.parentElement,
               yearValue = e.getAttribute('data-value'),
               yearModal = target.querySelector('[data-id="yearModal"]'),
               targetGo = yearModal.querySelectorAll('.yearMoAnchor'),
               decadeShow = yearModal.querySelector('[data-id="decadeShow"]');
            
            yearModal.classList.add('active');
            
            // reset
            decadeShow.textContent= "";
            decadeShow.setAttribute('data-value',"");
            
            for(var i=0;i<targetGo.length;i++){
                
                targetGo[i].textContent= "";
                targetGo[i].setAttribute('data-value',"");
            }
            
            // pop data
            decadeShow.textContent= centuryMaster.decade(yearValue) + "\'s";
            decadeShow.setAttribute('data-value',centuryMaster.decade(yearValue));
            
            for(var i=0;i<10;i++){
                    var parseI = parseInt(i),
                        parseCentury = parseInt(centuryMaster.decade(yearValue)),
                        pushValue = parseI + parseCentury;
                    
                   targetGo[i].textContent = pushValue;
                   targetGo[i].setAttribute('data-value',pushValue);
            }
            
       }
        
         // open Decade modal
        function openDecadeModal(e){
           var target = e.parentElement.parentElement,
               decadeValue = e.getAttribute('data-value'),
               decadeModal = target.querySelector('[data-id="decadeModal"]'),
               targetGo = decadeModal.querySelectorAll('.decadeMoAnchor'),
               centuryShow = decadeModal.querySelector('[data-id="centuryShow"]');
               
               decadeModal.classList.add('active'); 
               
               // reset
               centuryShow.textContent= "";
               centuryShow.setAttribute('data-value',"");
            
               for(var i=0;i<targetGo.length;i++){
                
                targetGo[i].textContent= "";
                targetGo[i].setAttribute('data-value',"");
              }
            
              // pop data
              centuryShow.textContent= centuryMaster.century(decadeValue) + "z";
              centuryShow.setAttribute('data-value',centuryMaster.century(decadeValue));
              
              for(var i=0;i<10;i++){
                    var modI = i + "0",
                        parseI = parseInt(modI),
                        parseCentury = parseInt(centuryMaster.century(decadeValue)),
                        pushValue = parseI + parseCentury;
                    
                   targetGo[i].textContent = pushValue + "\'s";
                   targetGo[i].setAttribute('data-value',pushValue);
            }
       }
        
        // close modal
        function closeModal(e){
             var parent = e.parentElement;
          
             parent.classList.remove('active');
        }
        
        // Previous : Month Toggle        
          izPrevBtn.addEventListener('click',function(){
              var target = this.parentElement.querySelector('a'),
                  yearText = this.parentElement.parentElement.querySelector('.dateYear').querySelector('a').textContent,
                  targetValue = target.getAttribute('data-value'),
                  targetValueChange = (function(){
                   if(targetValue > 1 && targetValue < 12){
                       return targetValue - 1;
                   }
                  else{
                      
                      if(targetValue == 0){
                          return 1;
                      }
                      
                      else if(targetValue == 12){
                          return targetValue - 1;
                      }
                      
                      return targetValue;
                  }
              })(); 
              
              target.setAttribute('data-value',targetValueChange);
              
              target.textContent = monthNames[targetValueChange - 1];
              
              
              popMonthData(targetValueChange - 1,yearText);
              prepareCal(targetValueChange - 1,yearText);
          });
        
        // Next : Month Toggle
        izNextBtn.addEventListener('click',function(){
              var target = this.parentElement.querySelector('a'),
                  yearText = this.parentElement.parentElement.querySelector('.dateYear').querySelector('a').textContent,
                  targetValue = target.getAttribute('data-value'),
                  targetValueChange = (function(){
                   if(targetValue > 0 && targetValue < 12){
                       return + targetValue + 1;
                   }
                  else{
                      return targetValue;
                  }
              })();
              
              target.setAttribute('data-value',targetValueChange);
            
             target.textContent = monthNames[targetValueChange - 1];
            
              popMonthData(targetValueChange - 1,yearText);
              prepareCal(targetValueChange - 1,yearText);
              
          });
        
        // Open Modal : Month Toggle
        izMonthBtn.addEventListener('click',function(){
              var target = this.parentElement.parentElement;
                   
                  // open month modal
                  openMonthModal(target);
          });
        
        // retrive Data : Month Modal
        (function monthModalRetrive(){
            for(var i=0;i<izMonthMoAnchor.length;i++){
            var monthMoAnchor = izMonthMoAnchor[i];
            
            monthMoAnchor.addEventListener('click',function(){
                var thisText = this.textContent,
                    thisValue = this.getAttribute('data-value'),
                    tableParent = this.parentElement.parentElement.parentElement,
                    yearText = tableParent.parentElement.querySelector('[data-id="yearShow"]').textContent;
                
                popMonthData(thisValue - 1,yearText);
                prepareCal(thisValue - 1,yearText);
                changeMonthToggler(thisValue,thisText);
                closeModal(tableParent);
            });
          }
        })();
        
        // open Modal : dateYear
        izYearBtn.addEventListener('click',function(){
               openYearModal(this);
        });
        
        // open Modal : year show from month modal
        izMonthMoYearShow.addEventListener('click',function(){
               openYearModal(this);
        });
        
        
        // retrive Data : Year Modal
        (function yearModalRetrive(){
             for(var i=0;i<izYearMoAnchor.length;i++){
             izYearMoAnchor[i].addEventListener('click',function(){
                 var self = this,
                     tableParent = self.parentElement.parentElement.parentElement,
                     modal = tableParent.parentElement,
                     datePicker = modal.parentElement,
                     calenderYear = datePicker.querySelector('.dateYear').querySelector('a'),
                     monthModalYear = datePicker.querySelector('[data-id="yearShow"]'),
                     thisYear = self.textContent,
                     thisMonth = datePicker.querySelector('[data-id="monthModalBtn"]').getAttribute('data-value');
                 
                 calenderYear.textContent = thisYear;
                 calenderYear.setAttribute('data-value',thisYear);
                 monthModalYear.textContent = thisYear;
                 monthModalYear.setAttribute('data-value',thisYear);
                 
                 popMonthData(thisMonth - 1,thisYear);
                 prepareCal(thisMonth - 1,thisYear);
                 
                 closeModal(tableParent);
             });
          }
        })();
        
        // open Modal : Decade
        izDecadeShow.addEventListener('click',function(){
               openDecadeModal(this);
        });
        
        // retrive Data : Decade Modal
        (function decadeModalRetrive(){
             for(var i=0;i<izDecadeMoAnchor.length;i++){
             izDecadeMoAnchor[i].addEventListener('click',function(){
                 var self = this,
                     yearValue = self.getAttribute('data-value'),
                     tableParent = self.parentElement.parentElement.parentElement,
                     datePicker = self.parentElement.parentElement.parentElement.parentElement.parentElement,
                     yearModal = datePicker.querySelector('[data-id="yearModal"]'),
                     targetGo = yearModal.querySelectorAll('.yearMoAnchor'),
                     decadeShow = yearModal.querySelector('[data-id="decadeShow"]');
                    
                    yearModal.classList.add('active');
                 
                    // reset
                    decadeShow.textContent= "";
                    decadeShow.setAttribute('data-value',"");
                 
                    for(var i=0;i<targetGo.length;i++){
                        targetGo[i].textContent= "";
                        targetGo[i].setAttribute('data-value',"");
                    }
                    
                    // pop data
                    decadeShow.textContent= centuryMaster.decade(yearValue) + "\'s";
                    decadeShow.setAttribute('data-value',centuryMaster.decade(yearValue));
                    
                    for(var i=0;i<10;i++){
                        var parseI = parseInt(i),
                            parseCentury = parseInt(centuryMaster.decade(yearValue)),
                            pushValue = parseI + parseCentury;
                    
                       targetGo[i].textContent = pushValue;
                       targetGo[i].setAttribute('data-value',pushValue);
                    }

                    closeModal(tableParent);
             });
          }
        })();
        
        // open Modal : Century
        izCenturyShow.addEventListener('click',function(){
            var self = this,
                datePicker = self.parentElement.parentElement,
                centuryModal = datePicker.querySelector('[data-id="centuryModal"]');
            
            centuryModal.classList.add('active');
        });
        
        // retrive Data : Century Modal
        (function centuryModalRetrive(){
             for(var i=0;i<izCenturyMoAnchor.length;i++){
             izCenturyMoAnchor[i].addEventListener('click',function(){
                 var self = this,
                     yearValue = self.getAttribute('data-value'),
                     tableParent = self.parentElement.parentElement.parentElement,
                     datePicker = tableParent.parentElement.parentElement,
                     decadeModal = datePicker.querySelector('[data-id="decadeModal"]'),
                     targetGo = decadeModal.querySelectorAll('.decadeMoAnchor'),
                     centuryShow = decadeModal.querySelector('[data-id="centuryShow"]');
                    
                    decadeModal.classList.add('active');
                 
                    // reset
                    centuryShow.textContent= "";
                    centuryShow.setAttribute('data-value',"");
                 
                    for(var i=0;i<targetGo.length;i++){
                        targetGo[i].textContent= "";
                        targetGo[i].setAttribute('data-value',"");
                    }
                    
                    // pop data
                    centuryShow.textContent= centuryMaster.decade(yearValue) + "z";
                    centuryShow.setAttribute('data-value',centuryMaster.decade(yearValue));
                    
                    for(var i=0;i<10;i++){
                        var modI = i + "0",
                            parseI = parseInt(modI),
                            parseCentury = parseInt(centuryMaster.century(yearValue)),
                            pushValue = parseI + parseCentury;
                    
                       targetGo[i].textContent = pushValue + "\'s";
                       targetGo[i].setAttribute('data-value',pushValue);
                    }

                    closeModal(tableParent);
             });
          }
        })();
        
        // close Modal
        for(var i=0;i<izBackBtn.length;i++){
             izBackBtn[i].addEventListener('click',function(){
             closeModal(this);
           });
        }

        
    }
    
    // Push deatils Back
    // one to two digit converter
    function twoDigit(n) {
       return (n < 10) ? ("0" + n) : n;
    };
    function pushDeatilsBack(self){
        var thisNow = self,
            izParent = self.parentElement,
            izPartner = izParent.querySelector('[data-izPartnerOf="datePicker"]'),
            izTable = izPartner.querySelector('table'),
            izAnchor = izTable.querySelectorAll('a');
        
        // function clear focus
        function clearFocus(){
            for(i=0;i<izAnchor.length;i++){
                izAnchor[i].classList.remove('selected');
            }
        }
                
        for(i=0;i<izAnchor.length;i++){
            izAnchor[i].addEventListener('click',function(){
                var targetDiv = this.parentElement.parentElement.parentElement.parentElement,
                    targetParent = targetDiv.parentElement,
                    target = targetParent.querySelector('[data-izObject="datePicker"]'),
                    self = this,
                    dayText = twoDigit( (function(){ return self.textContent })() ),
                    monthValue = twoDigit( (function(){ return targetDiv.querySelector('.dateMonth').querySelector('a').getAttribute('data-value')})() ),
                    monthText = targetDiv.querySelector('.dateMonth').querySelector('a').textContent,
                    yearText = targetDiv.querySelector('.dateYear').querySelector('a').textContent;
                    
                    // date format check
                    function dateFormatCheck(dateFormatVal){
                        switch (dateFormatVal){
                            case dateFormats[0]:
                              // mm/dd/yyyy
                              return monthValue + '/' + dayText + '/' + yearText;
                              break;
                            case dateFormats[1]:
                              // dd/mm/yyyy
                              return dayText + '/' + monthValue + '/' + yearText;
                              break;
                            case dateFormats[2]:
                              // mm-dd-yyyy
                              return monthValue + '-' + dayText + '-' + yearText;
                              break;
                            case dateFormats[3]:
                              // dd-mm-yyyy
                              return dayText + '-' + monthValue + '-' + yearText;
                              break;
                            case dateFormats[4]:
                              // mmm_dd,yyyy
                              return monthText + ' ' + dayText + ',' + yearText;
                              break;
                             case dateFormats[5]:
                              // dd_mmm_yyyy
                              return dayText + ' ' + monthText + ' ' + yearText;
                              break;
                            default:
                              // mm/dd/yyyy
                              return monthValue + '/' + dayText + '/' + yearText;
                        }
                    }
                    
                    if(this.textContent !== ""){
                        clearFocus();
                        
                        if(target.hasAttribute('data-izFormat')){
                            var targetFormat = target.getAttribute('data-izFormat');
                            
                            target.value = dateFormatCheck(targetFormat);
                        }
                        else{
                           target.value = dateFormatCheck(izDateFormat); 
                        }
                        
                        // set value for text box object
                        target.setAttribute('data-value',monthValue + '/' + dayText + '/' + yearText);
                        
                        self.classList.add('selected');
                    }

            }); 
        }
            
    };
    
    // on focus add calender
    for(var i=0;i<izDatePicker.length;i++){
        
        var izDatePickerNow = izDatePicker[i],
            thisParent = izDatePickerNow.parentElement,
            izSupportBtn = thisParent.querySelector('[data-izSupportBtn="datePicker"]');
        
        izDatePicker[i].addEventListener('focusout',function(){
            
        });
        
        izSupportBtn.addEventListener('click',function(){
            var izPartner = this.parentElement.querySelector('[data-izPartnerOf="datePicker"]');
            
            removeCalender();
            callCalender(this);
            pushDeatilsBack(this);
            
            izPartner.classList.toggle('show');
            
             // calender Change function
             calenderChange(this);
        });
        
    }

    
});

// --- END ----
// InputZ objects Ends Here 

// List Of Active Components
izObject.activeComponents = izMaster.components.active;

// Componets tally
izMaster.components.list = izMaster.components.toString();
izMaster.components.count = izMaster.components.length;

// Fin