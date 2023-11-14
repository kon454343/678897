/*
Funkcja dla textarea
*/
var NS = (document.layers) ? 1 : 0;
var NS6= (document.getElementById) ? 1 : 0;
var IE = (document.all) ? 1: 0;
var isIE = navigator.appVersion.match(/msie/i)? 1 : 0;
var isOpera =  navigator.userAgent.indexOf("Opera")!=-1?1:0;


function unsetGlobalHandler(){
 document.onkeydown = null; 
}


function setGlobalHandler(){
 if (window.mykeyhandler) {
     document.onkeydown = mykeyhandler;
  }
}

 function debug(a) {                
                //var dd = document.getElementById("debugWindow");
                //dd.value = a + "\r" + dd.value ;
}

            
            function ta_init(el,cols,rows){
                el.rows_=rows;
                el.cols_=cols;
                // jesli nie mamy elementu edycyjnego to go tworzymy
                if(!el.textEntered){
                    debug("backup new element");
                    var text = el.value;
                // przetwarzamy go do formatu edycyjnego
                    //text = text.replace(/\n/g,"#");
                    text = text.replace(/\r/g,"");
                    var text_='';
                    //debug(text);
                    el.textEntered = text;
                }
            }

            function ta_ieSetCursorPos(el){
                debug("setup Cursor IE: "+el.cursorPos+":"+(!el.cursorPos)+":"+(el.cursorPos+'' != "0"));
                if(!el.cursorPos && el.cursorPos+'' != '0') return;
                el.range = el.createTextRange();
                el.range.moveStart("character", el.cursorPos);
                while(el.range.text.length > 0 || el.range.boundingWidth > 0){
                    el.range.moveEnd("character", -1);
                }
                el.range.select();
                el.cursorPos = false;
            }
            function ta_keyup(el, e){
                if(document.selection && el.pasteCor && !isOpera){
                    ta_ieSetCursorPos(el);
                }
		if(isIE) {
			if(!el.controlPressed && el.keydownCode != 45) return true;
		}
                if(el.catched) return false;
                if(document.selection && !isOpera){
                    return false;
                }
                //jesli nie IE to obslugujemy wstawiony tekst
                var text = el.value;
                text = text.replace(/\r/g,"");
                if(ta_validateAndShow(el, text)){
                    el.textEntered = el.value;
                }else{
                    ta_validateAndShow(el, el.textEntered);
                }

                return true;
            }
            function ta_keydown(el, e){
                if(isIE) key = e.keyCode;
                else key = e.which;
                //nacisniety delete (keypress go nie widzi)
                el.keydownCode = key;
                el.controlPressed = (isIE && e.altKey && e.ctrlKey) ? false : e.ctrlKey;
                if(isOpera){
                 el.controlPressed = e.ctrlKey || e.altKey ;
                }
                el.catched = false;
                if(key == 46){

                    ta_delete(el, 1);
                    el.catched = true;
                    return false;
                }
                if(key == 8){

                    ta_delete(el, -1);
                    el.catched = true;
                    return false;
                }
                if(isIE && key == 27) {
                    ta_clear(el);
                    el.catched = true;
                    return false;                
                }
                // dziwny znaczek przy shifcie
                if( isOpera &&  ( key == 16 || key == 35 || key == 36 ) ){
                    el.catched = true;
                    return false;
                };
                return true;

            }
            function ta_afterUpdate(el){
                ta_insertText(el, "");
            }
            function ta_simulatePaste(el, e){
                if(isIE) {
                    el.keydownCode=86;
                } else {
                    el.controlPressed=true;
                    e.which=118;
                }
                return ta_keyPress(el, e);
            }
            function ta_keyPress(el, e){
                if(isIE) key = e.keyCode;
                else key = e.which;
                el.pasteCor = false;
                //obslugujemy paste					
				if(e.type=="paste"){
					// if(el.keydownCode == 86 || el.keydownCode == 45){
						el.pasteCor = true;
						if(window.clipboardData){
							ta_insertText(el, window.clipboardData.getData("Text"));
						}else{
							return true;
						}
					// } 
					return false;
				}
							
				


                if(el.controlPressed){
                  return true;
                  }
                if(el.catched) return false;
                if(key == 0) return true;
                if(key == 13) key = 10;

                if(isOpera && key == 10){
                  ta_insertText(el, "\r\n");
                }else {
                  ta_insertText(el, String.fromCharCode(key));
                }
                return false;
            }
            /*
            * Metoda ksuje znak (lub znaki w zaleznosci od parametru delType)
            * odpowiedznio przed lub za kursorem.
            */
            function ta_ieCursorSetup(el){
                el.focus();
                el.selRange = document.selection.createRange();
                ofLeft = el.selRange.offsetLeft;
                ofTop = el.selRange.offsetTop;
                el.range = el.createTextRange();
                var posL;
                for(startPos = 0; startPos < el.value.length; startPos++){
                    if(el.range.offsetLeft < ofLeft || el.range.offsetTop < ofTop){
                        el.range.moveStart("character");
                    } else break;
                }
                var text = el.selRange.text.replace(/\r/g,"");
                endPos = startPos + text.length;
                return {endPos: endPos, startPos: startPos};
            }
            function ta_delete(el, delType ){
                var corLine;
                if( document.selection ) corLine = -1;
                else corLine = -1;
                if(isOpera){
                 corLine = -2 ; // * delType;
                };
                if (document.selection && !isOpera ) { //
                    corLine = 1;
                    pos = ta_ieCursorSetup(el);
                    startPos = ta_getCursorPosition(el,pos.startPos, -corLine);
                    endPos = ta_getCursorPosition(el,pos.endPos, -corLine);
                    oldCursorPos = endPos;
                } else {
                    if (el.selectionStart || el.selectionStart == '0') {
                        var startPos = ta_getCursorPosition(el,el.selectionStart, corLine);
                        var endPos = ta_getCursorPosition(el,el.selectionEnd, corLine);
                        oldCursorPos = endPos;
                    }
                }
                if(startPos || startPos=='0'){
                    if(endPos == startPos){
                        if(delType < 0) {
                                    //wycinamy znak przed kursorem
                            startPos--;
                            if(startPos < 0) startPos = 0;
                        } else {
                            endPos++;
                            if(endPos > el.textEntered.length) endPos = el.textEntered.length;
                        }
                    }

                    ta_insertText(el, "", startPos, endPos);
                }
            }
            
            function ta_clear(el) {
                el.textEntered = "";
                el.value = el.textEntered;
            }

            function ta_insertText(el, text, startPos, endPos){
                var newCursorPos = false;
                var oldCursorPos = false;
                var newString = '';
                var corLine;

                if (!startPos && startPos != '0' && !endPos && endPos != '0' && document.selection && !isOpera) {
                    debug("IE selection");
                    corLine = 1;
                    pos = ta_ieCursorSetup(el);
                    startPos = ta_getCursorPosition(el,pos.startPos, -corLine);
                    endPos = ta_getCursorPosition(el,pos.endPos, -corLine);
                } else {

                    corLine = 1;
                    if(isOpera){
                     corLine=-2;
                    };
                    if (!startPos && startPos != '0' && (el.selectionStart || el.selectionStart == '0')) {
                        startPos = ta_getCursorPosition(el,el.selectionStart, -corLine);
                    }
                    if (!endPos && endPos != '0' && (el.selectionStart || el.selectionStart == '0')) {
                        endPos = ta_getCursorPosition(el,el.selectionEnd, -corLine);
                    }
                }
                if(startPos || startPos == 0) {
                    oldCursorPos = endPos;
                    //debug(startPos +" + "+ text.length);
                    newCursorPos = startPos + text.length;
                    debug("inserting text: "+text+"; "+startPos+":"+endPos+"; crPos: "+newCursorPos);
                    newString = el.textEntered.substring(0, startPos)
                            + text
                            + el.textEntered.substring(endPos, el.value.length);
                    if(!ta_validateAndShow(el, newString)) newCursorPos = oldCursorPos;
                } else {
                    el.textEntered += text;
                    if(!ta_validateAndShow(el, newString)) newCursorPos = false;
                }
                //ustawiamy cursor na odpowiedniej pozycji.
                if(newCursorPos == false && el.textEnetered) newCursorPos = el.textEnetered.length;
                debug('inserting cursor at: '+    newCursorPos);
                if(isOpera){
                  corLine= 2;
                 };
                cPos = ta_getCursorPositionBack(el, newCursorPos, corLine);
                debug('inserting cursor at_: '+ cPos);
                if (document.selection   && !isOpera ) {
                    el.cursorPos = cPos;
                    ta_ieSetCursorPos(el);
                    if(el.pasteCor){
                        el.cursorPos = cPos;
                    }
                } else {
                    el.selectionStart = el.selectionEnd = cPos;
                }
            }
            /*
            * Metoda zamienia polozenie kursora z textarea na polozenie
            * w oryginalnym tekscie. Do tego uzywa zmiennej specialChars
            * ktora jest ustawiana przy wyswietlaniu tekstu i ktora zawiera
            * polozenie wszystkich znakow dodanych.
            */
            function ta_getCursorPosition(el, position, corector){
                var sp = el.specialChars;
                var corTm = 0;
                if (sp){
                    for (i = 0;i<sp.length;i++) {
                        debug("testing pos: "+sp[i]+" <= "+position+" ("+(position - (corector * corTm))+")");
                        if(sp[i] <= position - (corector * corTm)){
                            debug("corecting pos");
                            position += corector;
                            corTm++;
                        } else break;
                    }
                }
                return position;
            }
            function ta_getCursorPositionBack(el, position, corector){
                var sp = el.specialChars;
                var corTm = 0;
                if (sp){
                    for (i = 0;i<sp.length;i++) {
                        debug("testing pos: "+sp[i]+" ("+(sp[i] - (corector * corTm))+") <= "+position);
                        if(sp[i] - (corector * corTm) <= position){
                            debug("corecting pos");
                            position += corector;
                            corTm++;
                        } else break;
                    }
                }
                return position;
            }
						
			/* 
			* Metoda zwraca klase zawierajaca przetworzony string (zlamany 
			* po ilosci max znakow w wierszu oraz ilosc wierszow i tablice 
			* znakow dodanych. 
			*/ 
			function ta_getConvertedString(el, text){
				var w = el.cols_;
				var h = el.rows_;
				var textToWrite = new Array();
				var start = 0;
				var end = 0;
				var length = text.length;
				var posCorrection = 1;
				var specialChars = new Array();
				var newLineCor = true;
				var rows = 0;
				
				text = text.replace(/\r/g,'');		
				
				do {
					newLineCor = false;
					end = text.indexOf("\n", start);
					if(end < 0) end = length;
					else newLineCor = true;
					
					//sprawdzamy czy na końcu linni występuje \r\n
					if((end - start - w == 1)&&(text.charAt(end-1)=='\r')){
						end++;
					}else if(end - start > w){
						end = start + w;
						specialChars[specialChars.length] = end + posCorrection++;
						newLineCor = false;
					}
					debug("wyciamy: "+start+":"+end+";"+newLineCor);
					textToWrite[rows] = text.substring(start, end);
					if(newLineCor){
						end++;
						textToWrite[++rows] = '';
					} else rows++;
					start = end;
				} while (end < length);
				debug("textLangth: "+length);
				debug("rowsCount: "+textToWrite.length);
				return {textToWrite: textToWrite , specialChars: specialChars};
			}
			
			
			
            /*
            * Metoda zajmuje sie walidacja nowego tekstu i jesli jest on
            * poprawny umieszcza go w odpowiednich elementach z
            * textarea wlacznie.
            */
            function ta_validateAndShow(el, text, forceWriteCat){
                var h = el.rows_;
                var convertedString = ta_getConvertedString(el, text);
                if(convertedString.textToWrite.length <= h || forceWriteCat){
                    el.textEntered = text;
                    el.specialChars = convertedString.specialChars;
                    tmpVal = '';
                    for (i = 0;i<convertedString.textToWrite.length;i++) {
                        if( i >= h ) break;
                        if(i > 0) tmpVal += "\n";
                        tmpVal += convertedString.textToWrite[i];
                    }
                    el.value = tmpVal;
                    return true;
                } else {
                	
                	
                	el.specialChars = convertedString.specialChars;
                	tmpVal = '';
                	for (i = 0;i<convertedString.textToWrite.length;i++) {
                	if( i >= h ) break;
                	if(i > 0) tmpVal += "\n";
                	tmpVal += convertedString.textToWrite[i];
                	}
                	el.value = tmpVal;    
					
					el.textEntered = tmpVal.replace(/\r/g,'');			
                	return true; 
                    // blad w walidacji przetworzoneg...
                    // tu cos z tym robimy
                 //   debug("blad walidacji elementu, rows: "+convertedString.rows+" > "+h+"; pomijamy zmiane");
                  //  return false;
                }
            }

            function concatenateValue(fieldName, postFix1, postFix2, separator, defaultValue2) {
                var field1 = document.forms[0][fieldName + postFix1];
                var field2 = document.forms[0][fieldName + postFix2];
                var field0 = document.forms[0][fieldName];
                if (field2.value == '') {
                    field2.value = defaultValue2;
                }
                field0.value = field1.value + separator + field2.value;
            }

function ta_textLimit(field, maxlen, maxlines) {
    var val = field.value.replace(/\r/g,'').split('\n');
    if (val.length > maxlines ) {
        field.value = val.slice(0,-(val.length - maxlines)).join('\n');
    }
    if (isIE == 1) {
        if (field.value.length > maxlen) {
            field.value = field.value.substring(0, maxlen);
        }
    } else {
       val = field.value.replace(/\r/g,'').split('\n')
       if (val.length > 0) {
               field.value = field.value.substring(0, maxlen-val.length+1);
       } else {
            field.value = field.value.substring(0, maxlen);
       }
    }
}