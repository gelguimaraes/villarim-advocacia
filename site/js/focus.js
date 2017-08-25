var focusElm;
var maskElm;
var rectElm;

var inTransition;

var deltaTime = 0.017;
var maskUnitsPerSecond;
var focusElmUnitsPerSecond;

function FocusShow(focusElmId, maskType, maskOpacity, duration){

    focusElm = document.getElementById(focusElmId);
        focusElm.style.pointerEvents = "auto";
        focusElm.style.opacity = 0;
        focusElm.style.display = "block";
    maskElm = focusCreateMask(maskType, maskType);
    rectElm = focusCreateRect(focusElm);
    
    maskUnitsPerSecond = (maskOpacity*deltaTime)/duration;
    focusElmUnitsPerSecond = (1*deltaTime)/duration;

    fade(maskElm, maskOpacity, maskUnitsPerSecond, false);
    fade(focusElm, 1, focusElmUnitsPerSecond, false);
}

function FocusHide(){
    if(inTransition == false){
        fade(maskElm, 0, maskUnitsPerSecond, true);
        fade(focusElm, 0, focusElmUnitsPerSecond, true);
    }
}

function focusCreateMask(type){
    var newMask = document.createElement("div");
        newMask.id = "focusMask";
        //newMask.style.display = "none";
        newMask.style.zIndex = "10";
        newMask.style.position = "fixed";
        newMask.style.top = "0px";
        newMask.style.left = "0px";
        newMask.style.width = "100vw";
        newMask.style.height = "100vh";
        newMask.style.backgroundColor = "#000000";

    if(type == "normal"){
        newMask.style.backgroundColor = "#000000";
        newMask.style.opacity = 0;
    }
    else if(type == "gradientUp"){
        newMask.style.background = "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))";
        newMask.style.opacity = 0;
    }
    else if(type == "gradientDown"){
        newMask.style.background = "linear-gradient(360deg, rgba(0,0,0,1), rgba(0,0,0,0))";
        newMask.style.opacity = 0;
    }

    document.body.appendChild(newMask);
    return newMask;
}

function focusCreateRect(element){
    var newRect = document.createElement("div");
        newRect.id = "focusRect";
        //newRect.style.display = "none";
        newRect.style.zIndex = "11";
        newRect.style.pointerEvents = "none";
        newRect.style.position = "fixed";
        newRect.style.top = "0px";
        newRect.style.left = "0px";
        newRect.style.width = "100vw";
        newRect.style.height = "100vh";
        newRect.style.overflow = "auto";
    
    document.body.appendChild(newRect);
    newRect.appendChild(element);
    return newRect;
}

function fade(elm, targetOpacity, units, destroyWhenFinish){
    inTransition = true;

    var currentOpacity = parseFloat(getComputedStyle(elm).getPropertyValue("opacity"));
        currentOpacity = movesTo(currentOpacity, targetOpacity, units, destroyWhenFinish);
        elm.style.opacity = currentOpacity;

    if(currentOpacity != targetOpacity){
        window.requestAnimationFrame(function(){
            fade(elm, targetOpacity, units, destroyWhenFinish);
        });
    }
    else if(destroyWhenFinish == true){
        if(maskElm){
            document.body.removeChild(maskElm);
            maskElm = null;

            document.body.appendChild(focusElm);
            focusElm.style.display = "none";
            focusElm = null;

            document.body.removeChild(rectElm);
            rectElm = null;
        }
    }
    else{
        inTransition = false;
        maskElm.addEventListener("click", function(){
            if(inTransition == false){
                FocusHide();
            }
        });
    }
}

function movesTo(value, target, units) {
    if (target - value > units) {
        return value += units;
    }
    else if (value - target > units) {
        return value -= units;
    }
    else{
        return target;
    }
}