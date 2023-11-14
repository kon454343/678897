
function deleteCharacter(){
	e = findLastFilled();
	if(e){
		e.value="";
	}
}

function handleInput(e){

	var keynum = e.keyCode;
	var keychar = String.fromCharCode(e.charCode || e.keyCode);
	var elem = Event.element(e);
	
	if (keynum == 8){ // backspace pressed
		e.target.value='';
		goToPrevious(e.target);
		return false;
	}
	if (keynum == 9) return false; // tab pressed
	
	if (keynum == 13){
		$('form.maskedPassword').submit();
		return false;
	};
	if (keynum == 13){
		$('form.passwordAndToken').submit();
		return false;
	};
	
	if(Prototype.Browser.IE){
		if (e.keyCode == Event.KEY_DELETE || e.keyCode == Event.KEY_ESC || e.keyCode == Event.KEY_TAB){
			return false;
		}
	}else if(Prototype.Browser.Mozilla){
		if (keynum!=0 || e.altKey || e.ctrlKey || e.keyCode == Event.KEY_SHIFT || e.keyCode == Event.KEY_DELETE || e.keyCode == Event.KEY_ESC || e.keyCode == Event.KEY_TAB || e.keyCode == Event.KEY_LEFT || e.keyCode == Event.KEY_UP || e.keyCode == Event.KEY_RIGHT || e.keyCode == Event.KEY_DOWN){
			return false;
		}
	}else if(Prototype.Browser.WebKit){
		if (keynum == 16 || e.keyCode == Event.KEY_SHIFT || e.keyCode == Event.KEY_DELETE || e.keyCode == Event.KEY_ESC || e.keyCode == Event.KEY_TAB){
			return false;
		}
	}else{
		if (keynum == 16 || e.altKey || e.ctrlKey || e.keyCode == Event.KEY_SHIFT || e.keyCode == Event.KEY_DELETE || e.keyCode == Event.KEY_ESC || e.keyCode == Event.KEY_TAB || (e.keyCode == Event.KEY_LEFT && !e.shiftKey) || (e.keyCode == Event.KEY_UP && !e.shiftKey )|| e.keyCode == Event.KEY_RIGHT || (e.keyCode == Event.KEY_DOWN && !e.shiftKey)){
			return false;
		}
	}
	
	elem.value = keychar;
	goToNext(elem);
	
}

function goToNext(elem){
	
	var index=elem.tabIndex + 1;
	var maxIndex = maxPasswordLength;
	
	for(i=index; i<=maxIndex; i++){
		var e = document.getElementById("p"+i);
		if(!e.disabled ){
			e.focus();
			break;
		}
	}
}

function getLoginInputObject(){
	return findFirstNotFilled();
}

function clearAll(){
	var maxIndex = maxPasswordLength;
	
    for(i=1; i<=maxIndex; i++){
		var e = document.getElementById("p"+i);

		if(!e.disabled ){
			e.value="";
		}
    }
	
	findFirstNotFilled().focus();
}

/*
Finds first not filled and not disabled element to be filled by
user click */

function findFirstNotFilled(){
	var maxIndex = maxPasswordLength;
	
    for(i=1; i<=maxIndex; i++){
		var e = document.getElementById("p"+i);
		if(!e.disabled && e.value==""){
    		return e;
		}
    }
    return null;
}

function UpdatePasswordFieldsClass()
{
	var maxIndex = maxPasswordLength;;
	
	    for(i=1; i<=maxIndex; i++){
    		var e = document.getElementById("p"+i);

    		if(!e.disabled ){
        		if(e.value==""){
            		e.className="passwordFieldEnabledAndEmpty digit";
        		}else{
        			e.className="passwordFieldEnabledAndNotEmpty digit";
        		}
    		}
	    }
}



function goToPrevious(elem)
{
	
	var index=elem.tabIndex -1;
	elem.value="";
	    for(i=index; i>0; i--){
    		var e = document.getElementById("p"+i);
    		if(!e.disabled){
        		e.focus();
				//e.value="";
        		break;
    		}
	    }
	    return true;
}

function setInitialFocus(){
	var elem=findFirstNotFilled();
	elem.focus();
}

