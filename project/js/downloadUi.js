var aside = document.querySelector('aside'),
    asideFolders = aside.querySelectorAll('a');

var jsSelector = document.querySelector('#jsSelector'),
    jsFolder = document.querySelector('#folderJs'),
    mainForm = document.querySelector('#mainForm'),
    quickDownloadForm = document.querySelector('#quickDownloadForm');

// Folder Expand/Contract
(function folderTree(){
   
    for(var foldNo=0; foldNo<asideFolders.length; foldNo++){
        var thisFolder = asideFolders[foldNo];
        
        thisFolder.addEventListener('click',function(){
           var thisFolder = this,
               svgUse = thisFolder.querySelector('use');
            
           thisFolder.classList.toggle('active');
            
            if(svgUse.getAttribute('xlink:href') === '#icon-folder01'){
                svgUse.setAttribute('xlink:href','#icon-folder02');
            }
            else{
               svgUse.setAttribute('xlink:href','#icon-folder01'); 
            }
            
        });
    }
    
 })();


// Folder change on check + link change

function onLoadCheckCheckbox(){
    if(jsSelector.checked === false){
        jsFolder.classList.add('disable');
        
        // form change
        mainForm.setAttribute('action','/download/nojs');
        quickDownloadForm.setAttribute('action','/download/nojs');
    }
}

(function folderChange(){
    
    onLoadCheckCheckbox();
    
     jsSelector.addEventListener('change',function(){
        if(this.checked === false){
           jsFolder.classList.add('disable');
            
           // form change
           mainForm.setAttribute('action','/download/nojs');
           quickDownloadForm.setAttribute('action','/download/nojs');
        } 
         else {
             jsFolder.classList.remove('disable');
             
             // form change
             mainForm.setAttribute('action','/download');
             quickDownloadForm.setAttribute('action','/download');
         }
     });
    
})();

