var codeButtonHtml = document.querySelectorAll('[data-id="codeButtonHtml"]'),
    codeButtonCss = document.querySelectorAll('[data-id="codeButtonCss"]'),
    codeButtonJs = document.querySelectorAll('[data-id="codeButtonJs"]'),
    codeHtml = document.querySelectorAll('data-id[codeHtml]'),
    codeCss = document.querySelectorAll('data-id[codeCss]'),
    codeJs = document.querySelectorAll('data-id[codeJs]'),
    codeWindow = document.querySelectorAll('.codeWindow'),
    codeButtonsHolder = document.querySelector('.codeButtons'),
    codeButtons = codeButtonsHolder.querySelectorAll('a');


/*Code Refrence Viewer tabs*/

function removeCodeRefClass(){
    (function clearCodeButtons(){
        for(var i=0; i<codeButtons.length; i++){
        codeButtons[i].classList.remove('active');
       }
    })();

    (function clearCodeWindows(){
        for(var i=0; i<codeWindow.length; i++){
        codeWindow[i].classList.remove('active');
       }
    })();

}

/*desktop*/
(function codeRefTabs(){

   for(var i=0; i<codeButtonHtml.length; i++){
     codeButtonHtml[i].addEventListener('click',function(){
          var thisParent = this.parentNode,
              thisGrandpa = thisParent.parentNode,
              thisTarget = thisGrandpa.querySelector('[data-id="codeHtml"]'),
              siblingButtons = thisParent.querySelectorAll('a'),
              siblingWindows = thisGrandpa.querySelectorAll('.codeWindow');

         if(this.classList.contains('active')){

         }
         else{

             for(var m=0;m<siblingButtons.length;m++){
               siblingButtons[m].classList.remove('active');
             }

             for(var k=0;k<siblingWindows.length;k++){
               siblingWindows[k].classList.remove('active');
             }

             this.classList.add('active');
             thisTarget.classList.add('active');
         }
     });
   }


   for(var j=0; j<codeButtonCss.length; j++){
     codeButtonCss[j].addEventListener('click',function(){
       var thisParent = this.parentNode,
           thisGrandpa = thisParent.parentNode,
           thisTarget = thisGrandpa.querySelector('[data-id="codeCss"]'),
           siblingButtons = thisParent.querySelectorAll('a'),
           siblingWindows = thisGrandpa.querySelectorAll('.codeWindow');

         if(this.classList.contains('active')){

         }
         else{
           for(var m=0;m<siblingButtons.length;m++){
             siblingButtons[m].classList.remove('active');
           }

           for(var k=0;k<siblingWindows.length;k++){
             siblingWindows[k].classList.remove('active');
           }

           this.classList.add('active');
           thisTarget.classList.add('active');
         }
     });
   }

   for(var k=0; k<codeButtonJs.length; k++){
     codeButtonJs[k].addEventListener('click',function(){
       var thisParent = this.parentNode,
           thisGrandpa = thisParent.parentNode,
           thisTarget = thisGrandpa.querySelector('[data-id="codeJs"]'),
           siblingButtons = thisParent.querySelectorAll('a'),
           siblingWindows = thisGrandpa.querySelectorAll('.codeWindow');

         if(this.classList.contains('active')){

         }
         else{
           for(var m=0;m<siblingButtons.length;m++){
             siblingButtons[m].classList.remove('active');
           }

           for(var k=0;k<siblingWindows.length;k++){
             siblingWindows[k].classList.remove('active');
           }

           this.classList.add('active');
           thisTarget.classList.add('active');
         }
     });
   }

})();
