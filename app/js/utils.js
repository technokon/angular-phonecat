'use strict';

function onLoad(){
    var progress = 0;

    setTimeout(progressCallBack, 200);

    function progressCallBack(){
        if (progress <= 100){
            progress = progress + 1;
            document.getElementById('pBar').style.width = progress + '%';
            if (progress < 100){
                setTimeout(progressCallBack, 100);
            }

        }
    }



}// end onload