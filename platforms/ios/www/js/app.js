//Variables et fonctions globales

	//Declaration des variables

		//variables de l'entrée du toucher
			var touchEntryX = 0,
				touchEntryY = 0;

		//variables de la sortie du toucher
			var	touchOutX = 0,
				touchOutY = 0;

		//variables lors de mouvements
			var touchX = 0,
				touchY = 0;

		//temps maximum pour avoir un swipe "glissé"
			var touchXeachMaxTime = 0,
				touchYeachMaxTime = 0;

		//variable du timer necessaire au swipe horizontal sur #general_swipeShow
			var	general_swipeShowTimer; 

		//autres variables necessaires au swipe horizontal
			var general_swipeShowScrollLeftPosition = 0,
				f = 0,
				actualPanel = 0;

		//variables qui contiennent en tableau les infos qui circulent...
			var CURRGroups = new Array(20),
				CURRProofs = new Array(10),
				CURRActiveProofs = new Array(10),
				CURRComments = new Array(10).fill(new Array(5));

		//autres variables
			var general_swipeShowBool = false,
				posted;

		//variable disant la location de la vue et le z-index de la vue
			var viewSuperpositionTab = new Array(1),
				viewZIndex = 0;

	//Declaration des constantes

		ScreenWidth = window.innerWidth;
		ScreenHeight = window.innerHeight; 

		horizontalSwipeVerticalBorder = 100;
		horizontalSwipeMinimumDistance = 30;
		horizontalSwipeMaximumTime = 300;

	//Quelques méthodes sur les opbjets prototype même si on est nuls 

		//Sur les strings
			String.prototype.replaceAt = function(ind,chara) { 
				return this.substring(0,ind) + chara + this.substring(ind+chara.length);
			}

	//Declaration des fonctions 

		//Fonctions pour le debugage et le developpement
			//fonction qui alerte les superpositions des panels
				function alertSuperpositions() { 
					var str = "";
					for(var i = 0; i < viewSuperpositionTab.length; i++) { 
						str = str + "," + viewSuperpositionTab[i].id;
					}
					alert(str);
				}

		//Fonctions pour detecter le device
				function detectDevice() {
			       var uagent = navigator.userAgent.toLowerCase();
						if (uagent.search("iphone") > -1)
							return "iphone";
						else if (uagent.search("ipad") > -1)
							return "ipad";
						else if(uagent.search("nexus") > -1)
							return "nexus";
						else if(uagent.search("galaxy") > -1)
							return "galaxy";
						else
							return "other";
			    }

		//Fonctions pour les touchEvents
			function setTouchEntryX(e) { 
				touchEntryX = e.changedTouches[0].pageX;
			}
			function setTouchEntryY(e) { 
				touchEntryY = e.changedTouches[0].pageY;
			}

			function setTouchX(e) { 
				touchX = e.changedTouches[0].pageX;
			}
			function setTouchY(e) { 
				touchY = e.changedTouches[0].pageY;
			}

			function setTouchOutX(e) { 
				touchOutX = e.changedTouches[0].pageX;
			}
			function setTouchOutY(e) { 
				touchOutY = e.changedTouches[0].pageY;
			}

		//Fonctions pour les animations du scroll horizontal
			function goScrollLeft(scrollingElement,scrollLeftDestination,timeTaken,pixelPerFrame) { 
				var scrollLeftPosition = scrollingElement.scrollLeft;
				var dist = scrollLeftDestination-scrollLeftPosition;
				var animationSpeed = (timeTaken*pixelPerFrame)/(dist);
				var intervalId = setInterval(frame, animationSpeed);
				function frame() { 
					if(scrollingElement.scrollLeft == scrollLeftDestination) { 
						clearInterval(intervalId);
					}
					else if(dist>=0) {
						if(scrollingElement.scrollLeft >= (scrollLeftDestination - pixelPerFrame)) { 
							scrollingElement.scrollLeft = scrollLeftDestination;
						}
						else { 
						scrollLeftPosition = scrollLeftPosition + pixelPerFrame;
						scrollingElement.scrollLeft = scrollLeftPosition;
						}
					}
					else if (dist<0) { 
						if(scrollingElement.scrollLeft <= (scrollLeftDestination + pixelPerFrame)) { 
							scrollingElement.scrollLeft = scrollLeftDestination;
						}
						else { 
						scrollLeftPosition = scrollLeftPosition - pixelPerFrame;
						scrollingElement.scrollLeft = scrollLeftPosition;
						}				
					}
					else {}
				}
			}

		//Fonctions pour les animations de collapse (utilisant des classes CSS), tout ça tout ça
			
			function animateOnOff(DOMElement,classOn,classOff) { 
				if(!hasClass(DOMElement,classOn)) { 
					DOMElement.style.zIndex = viewZIndex + 10;
					DOMElement.classList.remove(classOff);		
					DOMElement.classList.add(classOn);
					viewZIndex = viewZIndex + 10;
					viewSuperpositionTab.length += 1;
					viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
				}
				else { 
					DOMElement.classList.remove(classOn);
					DOMElement.classList.add(classOff);
					setTimeout(function() { 
						DOMElement.style.zIndex = viewZIndex - 20;
					} ,650);
					viewZIndex = viewZIndex - 10;
					viewSuperpositionTab.length -= 1;
				}
			}			

			function topCollapse(DOMElement) { 
				DOMElement.style.top = "-100%";
				DOMElement.style.zIndex = viewZIndex + 10;
				DOMElement.classList.remove("topHiding");		
				DOMElement.classList.add("topCollapsing");
				viewZIndex = viewZIndex + 10;
				viewSuperpositionTab.length += 1;
				viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
			}

			function topHide(DOMElement) { 
				DOMElement.classList.remove("topCollapsing");
				DOMElement.classList.add("topHiding");
				setTimeout(function() { 
					DOMElement.style.zIndex = viewZIndex - 20;
					DOMElement.style.top = "0%";
				} ,650);
				viewZIndex = viewZIndex - 10;
				viewSuperpositionTab.length -= 1;
			}

			function bottomCollapse(DOMElement) { 
				DOMElement.style.top = "100%";
				DOMElement.style.zIndex = viewZIndex + 10;
				DOMElement.classList.remove("bottomHiding");		
				DOMElement.classList.add("bottomCollapsing");
				viewZIndex = viewZIndex + 10;
				viewSuperpositionTab.length += 1;
				viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
			}

			function bottomHide(DOMElement) { 
				DOMElement.classList.remove("bottomCollapsing");
				DOMElement.classList.add("bottomHiding");
				setTimeout(function() { 
					DOMElement.style.zIndex = viewZIndex - 20;
					DOMElement.style.top = "0%";
				} ,650);
				viewZIndex = viewZIndex - 10;
				viewSuperpositionTab.length -= 1;
			}

			function rightCollapse(DOMElement) { 
				DOMElement.style.left = "100%";
				DOMElement.style.zIndex = viewZIndex + 10;
				DOMElement.classList.remove("rightHiding");		
				DOMElement.classList.add("rightCollapsing");
				viewZIndex = viewZIndex + 10;
				viewSuperpositionTab.length += 1;
				viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
			}

			function rightHide(DOMElement) { 
				DOMElement.classList.remove("rightCollapsing");
				DOMElement.classList.add("rightHiding");
				setTimeout(function() { 
					DOMElement.style.zIndex = viewZIndex - 20;
					DOMElement.style.left = "0%";
				} ,650);
				viewZIndex = viewZIndex - 10;
				viewSuperpositionTab.length -= 1;
			}

			function leftCollapse(DOMElement) { 
				DOMElement.style.left = "-100%";
				DOMElement.style.zIndex = viewZIndex + 10;
				DOMElement.classList.remove("leftHiding");		
				DOMElement.classList.add("leftCollapsing");
				viewZIndex = viewZIndex + 10;
				viewSuperpositionTab.length += 1;
				viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
			}

			function leftHide(DOMElement) { 
				DOMElement.classList.remove("leftCollapsing");
				DOMElement.classList.add("leftHiding");
				setTimeout(function() { 
					DOMElement.style.zIndex = viewZIndex - 20;
					DOMElement.style.left = "0%";
				} ,650);
				viewZIndex = viewZIndex - 10;
				viewSuperpositionTab.length -= 1;
			}

			function zIndexShow(DOMElement) { 
				DOMElement.style.left = "0%";
				DOMElement.style.top = "0%";
				DOMElement.style.zIndex = viewZIndex + 10;
				viewZIndex = viewZIndex + 10;
				viewSuperpositionTab.length += 1;
				viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
			}

			function zIndexHide(DOMElement) { 
				DOMElement.style.left = "0%";
				DOMElement.style.top = "0%";
				DOMElement.style.zIndex = viewZIndex - 20;
				viewZIndex = viewZIndex - 10;
				viewSuperpositionTab.length -= 1;
			}

		//Fonctions pratiques pour gérer les classes et le CSS d'un élément

			function hasClass(DOMElement,classToCheck) { 
				return DOMElement.classList.contains(classToCheck);
			}

			function switchClass(DOMElement,classOn,classOff) { 
				if(hasClass(DOMElement,classOn)) { 
					DOMElement.classList.remove(classOn);
					DOMElement.classList.add(classOff);
				}
				else { 
					DOMElement.classList.remove(classOff);
					DOMElement.classList.add(classOn);
				}
			}

			function switchCSS(DOMElement,CSSProperty,valueOn,valueOff) {
				if(DOMElement.style["backgroundColor"] == valueOff){
					DOMElement.style[CSSProperty] = valueOn;
				} 
				else { 
					DOMElement.style[CSSProperty] = valueOff;
				}
			}

		//Fonctions qui calculent les heights et width d'élements 
			function calcHeight(DOMElement) { 
				var schmurz = window.getComputedStyle(DOMElement).height;
				return parseFloat(schmurz);
			}

			function calcWidth(DOMElement) { 
				var schmurz = window.getComputedStyle(DOMElement).width;
				return parseFloat(schmurz);
			}
			function getCSSNumberProperty(DOMElement,CSSProperty) { 
				var schmurz = window.getComputedStyle(DOMElement);
				return parseFloat(schmurz[CSSProperty]);
			}
			function getCSSNaNProperty(DOMElement,CSSProperty) { 
				var schmurz = window.getComputedStyle(DOMElement);
				return schmurz[CSSProperty];
			}

		//Fonction qui retourne un tableau avec tous les éléments d'une classe

			function classTab(className) { 
				return document.getElementsByClassName(className);
			}
	 
		//Fonction qui swipe le html de deux elements
			function swipeHTML(DOMElement1,DOMElement2) { 
				var innerHTML1 = DOMElement1.innerHTML,
					innerHTML2 = DOMElement2.innerHTML;
				DOMElement1.innerHTML = innerHTML2;
				DOMElement2.innerHTML = innerHTML1;
			}

	//Fonctions AJAX pour le côté serveur...
		//Fonctions de tests back-end
			function showUser(str) { 
				if(str == "") { 
					document.getElementById("txtHint").innerHTML = "";
				}
				else { 
					var request = new XMLHttpRequest();
					request.open("GET",'http://www.crabbix.fr/getUser.php?q='+str, true);
					request.onreadystatechange = function(ajaxEvt) { 
						if(request.readyState == 4) { 
							if(request.status == 200)
								document.getElementById("txtHint").innerHTML = request.responseText;
							else
								alert("Chargement de la page a echoué");
						}
					};
					request.send(null);
				}
			}

		//Fonctions de tests back-end
			function changeUser(userID) { 
				var request = new XMLHttpRequest();
				request.open("GET",'http://www.crabbix.fr/changeUser.php', true);
				request.onreadystatechange = function(ajaxEvt) { 
					if(request.readyState == 4) { 
						if(request.status == 200)
							alert("c'est cool ça marche !" + request.responseText.trim());
						else
							alert("Chargement de la page a echoué");
					}
				};
				request.send(null);
			}

	//Création de la classe User et d'autres classes...

		function User(identity,completeName,password) { 
			this.identity = identity;
			this.completeName = completeName;
			this.password = password;
			this.groups = [];
			this.proofs = [];
		}

//Corps du script
	document.addEventListener('DOMContentLoaded', function() {

	//Variables de selecteurs ids
		var body = document.querySelector("body"),
			loadCircle = document.getElementById("loadCircle"),
			app = document.getElementById("app"),
			general = document.getElementById("general");

		var	general_swipeShow = document.getElementById("general_swipeShow"),
			TABgeneral_swipeShow_elements = classTab("general_swipeShow_element"),
			TABgeneral_swipeShow_element_commentsDivs = classTab("general_swipeShow_element_comments"),
			TABgeneral_swipeShow_elements_comments = new Array(TABgeneral_swipeShow_element_commentsDivs.length);
			viewSuperpositionTab[0] = general_swipeShow;

		var	general_leftSnippet = document.getElementById("general_leftSnippet"),
			general_leftSnippet_bigButton = document.getElementById("general_leftSnippet_bigButton"),
			general_leftSnippet_elements = document.getElementById("general_leftSnippet_elements"),
			general_leftSnippet_options = document.getElementById("general_leftSnippet_options"),
			general_leftSnippet_profile = document.getElementById("general_leftSnippet_profile"),
			general_leftSnippet_bets = document.getElementById("general_leftSnippet_bets"),
			general_rightSnippet = document.getElementById("general_rightSnippet"),
			general_rightSnippet_bigButton = document.getElementById("general_rightSnippet_bigButton"),
			general_rightSnippet_elements = document.getElementById("general_rightSnippet_elements"),
			general_rightSnippet_video = document.getElementById("general_rightSnippet_video"),
			general_rightSnippet_mic = document.getElementById("general_rightSnippet_mic"),
			general_rightSnippet_file = document.getElementById("general_rightSnippet_file");

		var commentForm = document.getElementById("commentForm"),
			commentForm_head = document.getElementById("commentForm_head"),
			commentForm_comments = document.getElementById("commentForm_comments"),
			TABcommentForm_comments = classTab("commentForm_comment"),
			commentForm_form = document.getElementById("commentForm_form"),
			commentForm_form_input = document.getElementById("commentForm_form_input"),
			commentForm_form_submit = document.getElementById("commentForm_form_submit");

		var heightHelper = document.getElementById("heightHelper");
			responsiveFormsHelper = document.getElementById("responsiveFormsHelper");

		var	lastPanel = TABgeneral_swipeShow_elements.length - 1,
			help = false,
			videoSwitch = new Array(TABgeneral_swipeShow_elements.length),
			count = 1;

		var profile = document.getElementById("profile"),
			profile_close = document.getElementById("profile_close"),
			profile_cover = document.getElementById("profile_cover"),
			profile_avatar = document.getElementById("profile_avatar"),
			profile_shadow = document.getElementById("profile_shadow"),
			profile_bets = document.getElementById("profile_bets");

		var options = document.getElementById("options");

		var bets = document.getElementById("bets");

		var	device = detectDevice();

	//Valeurs de base de certaines variables de tableaux
		videoSwitch[0] = true;
		for(var i = 1; i < videoSwitch.length; i++) { 
			videoSwitch[i] = false;
		}

	//Fonctions sur #general

		//Fonctions de déplacement des panels de #general_swipeShow
			function nextPanel(e,time,ppf) {
				goScrollLeft(general_swipeShow,(actualPanel+1)*ScreenWidth, time, ppf);
				actualPanel = actualPanel+1;
			}
			function currentPanel(e,time,ppf) {
				goScrollLeft(general_swipeShow,(actualPanel)*ScreenWidth, time, ppf);
				actualPanel = actualPanel;
			}
			function prevPanel(e,time,ppf) {
				goScrollLeft(general_swipeShow,(actualPanel-1)*ScreenWidth, time, ppf);
				actualPanel = actualPanel-1;
			}

		//Fonction pour lancer les videos de #general_swipeShow ou pas si on est dessus ou non...

			function playVideo(e,panelNumber) { 
				var video = TABgeneral_swipeShow_elements[panelNumber].querySelector("video");
				if(video) {
					if (video.paused)
						video.play();
					else
						video.pause();
				}
			}

		//Fonction pour lancer les videos quand il faut, tout en lancant le défilement des commentaires

			function switchPlayVideo(e,panelNumber) {
				if(panelNumber == 0) { 
					el = TABgeneral_swipeShow_elements[0];
					if(el.querySelector("video")) { 
						el.querySelector("video").play();
						videoSwitch[0] = true;
						if(TABgeneral_swipeShow_elements[1].querySelector("video")) { 
							TABgeneral_swipeShow_elements[1].querySelector("video").pause();
							videoSwitch[1] = false;
						}
					}	
					clearInterval(CURRActiveProofs[1]);
					CURRActiveProofs[0] = setInterval(function() { 
						slideComments(0);
					},3000);
				}
				else if(panelNumber == lastPanel) { 
					el = TABgeneral_swipeShow_elements[lastPanel];
					if(el.querySelector("video")) { 
						el.querySelector("video").play();
						videoSwitch[lastPanel] = true;
						if(TABgeneral_swipeShow_elements[lastPanel - 1].querySelector("video")) { 
							TABgeneral_swipeShow_elements[lastPanel - 1].querySelector("video").pause();
							videoSwitch[lastPanel-1] = false;
						}
					}
					clearInterval(CURRActiveProofs[lastPanel-1]);
					CURRActiveProofs[panelNumber] = setInterval(function() { 
						slideComments(panelNumber);
					},3000);
				}
				else { 
					el = TABgeneral_swipeShow_elements[panelNumber];
					elBefore = TABgeneral_swipeShow_elements[panelNumber - 1];
					elAfter = TABgeneral_swipeShow_elements[panelNumber + 1];
					if(el.querySelector("video")) { 
						el.querySelector("video").play();
						videoSwitch[panelNumber] = true;
						if(elBefore.querySelector("video")) { 
							elBefore.querySelector("video").pause();
							videoSwitch[panelNumber-1] = false;
						}
						if(elAfter.querySelector("video")) { 
							elAfter.querySelector("video").pause();
							videoSwitch[panelNumber+1] = false;
						}
					}
					clearInterval(CURRActiveProofs[panelNumber-1]);
					clearInterval(CURRActiveProofs[panelNumber+1]);
					CURRActiveProofs[panelNumber] = setInterval(function() { 
						slideComments(panelNumber);
					},3000);
				}
			}

		/*Fonction pour bouger les panels qui se lance après l'evènement "touchend" sur #general_swipeShow,
		et qui utilise les fonctions au dessus pour lancer ou arrêter les vidéos*/
			function swipePlayVideo(e) {
				if ((touchXeachMaxTime - touchOutX>horizontalSwipeMinimumDistance) && (actualPanel<lastPanel)) {
					nextPanel(e,80,ScreenWidth*0.066);
					switchPlayVideo(e,actualPanel); 
				}
				else if (touchOutX - touchXeachMaxTime>horizontalSwipeMinimumDistance && (actualPanel>0)) { 
					prevPanel(e,80,ScreenWidth*0.066);
					switchPlayVideo(e,actualPanel);  
				}
				else { 
					playVideo(e,actualPanel);
				}
			}

		//Fonctions pour le slide des commentaires et leur bon placement

			function slideComments(elementNumber) { 
				var TABLength = TABgeneral_swipeShow_elements_comments[elementNumber].length;
				if(count == 0) { 
					TABgeneral_swipeShow_elements_comments[elementNumber][TABLength-1].style.webkitTransform = "translate3d("+ (-TABLength)*100 +"%,0%,0)";
					for(var i = 0; i < TABLength-1; i++) {
					TABgeneral_swipeShow_elements_comments[elementNumber][i].style.webkitTransform = "translate3d(0%,0%,0)";
					}
					setTimeout(function() { 
						TABgeneral_swipeShow_elements_comments[elementNumber][TABLength-1].style.display = "none"; 
					},500);
					setTimeout(function() { 
						TABgeneral_swipeShow_elements_comments[elementNumber][TABLength-1].style.webkitTransform = "translate3d(0%,0%,0)";
					},500);
				}
				else { 
					for(var i = 0; i < TABLength; i++) {
						TABgeneral_swipeShow_elements_comments[elementNumber][i].style.webkitTransform = "translate3d(" + (-count*100) + "%,0%,0)";
					}
					TABgeneral_swipeShow_elements_comments[elementNumber][TABLength-1].style.display = "inline";
				}
				if(count < TABLength - 1) { 
					count++;
				}
				else { 
					count = 0;
					for(var i = 0; i < TABLength-1; i++) { 
						TABgeneral_swipeShow_elements_comments[elementNumber][i].style.display = "none";
						TABgeneral_swipeShow_elements_comments[elementNumber][i].style.webkitTransform = "translate3d("+ (i+1)*100 +"%,0%,0)"; 
					}
					setTimeout(function() { 
						for(var i = 0; i < TABLength-1; i++) { 
							TABgeneral_swipeShow_elements_comments[elementNumber][i].style.display = "inline";
						}
					},500);
				}
			}

			function calcSubstringer(stringDiv) { 
				var divHeight = calcHeight(stringDiv),
					divWidth = calcWidth(stringDiv),
					fontSize = getCSSNumberProperty(stringDiv,"font-size"),
					stringToCut = stringDiv.innerHTML,
					subStringer = 1,
					heightCounter = 0;
				heightHelper.style.visibility = "hidden";
				heightHelper.style.width = divWidth + "px";
				heightHelper.style.position = "absolute";
				while(heightCounter < divHeight - fontSize*2) { 
					heightHelper.innerHTML = stringToCut.substring(0,subStringer);
					heightCounter = calcHeight(heightHelper);
					subStringer++;
				}
				heightHelper.innerHTML = "";
				return subStringer;
			}

			function centerPosTopContent(divToEqualize) { 
				var divHeight = calcHeight(divToEqualize),
					thingToPlace = divToEqualize.innerHTML;
				heightHelper.innerHTML = thingToPlace;
				thingHeight = calcHeight(heightHelper);
				posTopForCenteredPosition = 0.5*(divHeight - thingHeight);
				heightHelper.innerHTML = "";
				divToEqualize.style.top = posTopForCenteredPosition + "px"; 
			}

			function reduceStringDiv(stringDiv,subStringer) { 
				var stringToCut = stringDiv.innerHTML;
				if(subStringer < stringToCut.length) { 
					stringToCut = stringToCut.substring(0,subStringer);
					for(var i = subStringer - 3; i < subStringer; i++) { 
						stringToCut = stringToCut.replaceAt(i,".");
					}
					stringDiv.innerHTML = stringToCut;
				}
			}

		//Fonctions qui contiennent les events listeners de #general_swipeShow
			function ELTOUCHSTARTgeneral_swipeShow(e) { 
				setTouchEntryX(e);
				setTouchEntryY(e);
				touchXeachMaxTime = touchEntryX;
				touchYeachMaxTime = touchEntryY;
				general_swipeShowTime = setInterval(function(){ 
					touchXeachMaxTime = touchX;
					touchYeachMaxTime = touchY;
				},horizontalSwipeMaximumTime);
			}

			function ELTOUCHMOVEgeneral_swipeShow(e) { 
				setTouchX(e);
				setTouchY(e);
			}

			function ELTOUCHENDgeneral_swipeShow(e) { 
				clearInterval(general_swipeShowTime);
				general_panelsScrollLeftPosition = general_swipeShow.scrollLeft;
				setTouchOutX(e);
				setTouchOutY(e);
				swipePlayVideo(e); 
				touchEntryX = 0;
				touchEntryY = 0;
				touchX = 0;
				touchY = 0;
				touchXeachMaxTime = 0;
				touchYeachMaxTime = 0;
			}

		/*Fonction pour ajouter et enlever d'un seul coup tous les events listeners pour le swipe horizontal,
		retourne true si il y a le swipe horizontal, sinon false*/
			function horizontalSwipeForSwipeShow(bool) { 
				if(bool) { 
					general_swipeShow.addEventListener("touchstart", ELTOUCHSTARTgeneral_swipeShow, false);

					general_swipeShow.addEventListener("touchmove", ELTOUCHMOVEgeneral_swipeShow, false);

					general_swipeShow.addEventListener("touchend", ELTOUCHENDgeneral_swipeShow, false);
				}
				else { 
					general_swipeShow.removeEventListener("touchstart", ELTOUCHSTARTgeneral_swipeShow, false);

					general_swipeShow.removeEventListener("touchmove", ELTOUCHMOVEgeneral_swipeShow, false);

					general_swipeShow.removeEventListener("touchend", ELTOUCHENDgeneral_swipeShow, false);				
				}
			}

	//Fonctions sur #commentForm

		//Fonctions à utiliser en event listeners pour avoir une height sympathique et amicale sur portable lors du remplissage de forms
			function ELKEYUPadaptFormHeight(textareaOrInput,maxHeight) { 
				var fontSize = getCSSNumberProperty(textareaOrInput,"font-size"),
					inputHeight = calcHeight(textareaOrInput),
					inputWidth = calcWidth(textareaOrInput),
					formHeight = 0,
					inputValue = "";
				responsiveFormsHelper.style.fontSize = fontSize + "px"; 
				responsiveFormsHelper.style.width = inputWidth + "px";
				responsiveFormsHelper.style.position = "absolute";
				responsiveFormsHelper.style.visibility = "hidden";
				//responsiveFormsHelper.style.top = "0px";
				responsiveFormsHelper.style.wordWrap = "break-word";
				//responsiveFormsHelper.style.backgroundColor = "red";
				responsiveFormsHelper.style.zIndex = 100;
				responsiveFormsHelper.innerHTML = textareaOrInput.value;
				if((calcHeight(responsiveFormsHelper) > inputHeight + 5) && (calcHeight(responsiveFormsHelper) < maxHeight)) {
					//alert(calcHeight(responsiveFormsHelper) + "," + inputHeight);
					//alert("hu");
					formHeight = (calcHeight(responsiveFormsHelper) + Math.floor(fontSize/3));
					commentForm_form.style.top = (calcHeight(commentForm) - formHeight) + "px";
					textareaOrInput.style.height = formHeight + "px"; 
					commentForm_form.style.height = formHeight + "px";
				}
			}

	//Fonctionnalités en fonction du device sur lequel on est

		if(device == "nexus") { 
			for(var i = 0; i < TABgeneral_swipeShow_elements.length; i++) { 
				el = TABgeneral_swipeShow_elements[i];
				video = el.querySelector("video");
				if(video) { 
					video.classList.add("rotate180");
				}
			}
		}

	//Une fois que tout est chargé, on affiche
		loadCircle.style.display = "none";

	//#general_leftSnippet et #general_rightSnippet

		general_leftSnippet_bigButton.addEventListener("click", function() {
			switchClass(general_leftSnippet_elements,"rotate-90left","rotate0left");
			switchCSS(general_leftSnippet_bigButton,"backgroundColor","rgba(230, 230, 230, 0.498039)","rgba(70, 70, 70, 0.498039)");
		},false);

		general_leftSnippet_profile.addEventListener("click", function() { 
			animateOnOff(profile,"rotatePanelAppear90left","rotatePanelDisappear90left");
			//changeUser();
		},false);

		general_leftSnippet_options.addEventListener("click", function() { 
			animateOnOff(options,"rotatePanelAppear90left","rotatePanelDisappear90left");
		},false);

		general_leftSnippet_bets.addEventListener("click", function() { 
			animateOnOff(bets,"rotatePanelAppear90left","rotatePanelDisappear90left");
		},false);

		general_rightSnippet_bigButton.addEventListener("click", function() {
			switchClass(general_rightSnippet_elements,"rotate90right","rotate0right");
			switchCSS(general_rightSnippet_bigButton,"backgroundColor","rgba(230, 230, 230, 0.498039)","rgba(70, 70, 70, 0.498039)");
		},false);

	//#general_swipeShow

		/*Definition de tableaux qui contiennent les commentaires .general_swipeShow_element_comment
		de chaque div .general_swipeShow_element_comments*/
			
			for(var i = 0; i < TABgeneral_swipeShow_element_commentsDivs.length; i++) { 
				TABgeneral_swipeShow_elements_comments[i] = TABgeneral_swipeShow_element_commentsDivs[i].querySelectorAll(".general_swipeShow_element_comment");
			}

		//Mise en place du style des éléments de #general_swipeShow, position, divs centrées etc...

			var commentSubstringer = calcSubstringer(TABgeneral_swipeShow_elements_comments[0][0].querySelector(".general_swipeShow_element_comment_text")); 
			for(var j = 0; j < TABgeneral_swipeShow_element_commentsDivs.length; j++) { 
				for(var i = 0; i < TABgeneral_swipeShow_elements_comments[j].length; i++) { 
					TABgeneral_swipeShow_elements_comments[j][i].style.left = i*ScreenWidth + "px";
					reduceStringDiv(TABgeneral_swipeShow_elements_comments[j][i].querySelector(".general_swipeShow_element_comment_text"),commentSubstringer);
					centerPosTopContent(TABgeneral_swipeShow_elements_comments[j][i].querySelector(".general_swipeShow_element_comment_text"));
				}
			}
			for(var i = 0; i < TABgeneral_swipeShow_elements.length; i++) { 
				el = TABgeneral_swipeShow_elements[i];
				el.style.left = i*100 + "%";
			}

			//On lance la video du premier panel et le slide de ses commentaires 
			TABgeneral_swipeShow_elements[0].querySelector("video").play();
			CURRActiveProofs[0] = setInterval(function() { 
				slideComments(0);
			},3000);

		//event listeners pour le scrolling horizontal et que les videos se jouent quand on arrive dessus sur #general_swipeShow

			horizontalSwipeForSwipeShow(true);

		//Events listeners pour la gestion du mouvement auto des commentaires de chaque div .general_swipeShow_element_comments 

			for(var i = 0; i < TABgeneral_swipeShow_elements.length; i++) { 
				TABgeneral_swipeShow_element_commentsDivs[i].addEventListener("click", function(e) { 
					horizontalSwipeForSwipeShow(false);
					e.stopPropagation();
					bottomCollapse(commentForm);
					general_swipeShow_blackFilter.style.visibility = "visible";
				},false);

				TABgeneral_swipeShow_element_commentsDivs[i].addEventListener("touchend", function(e) { 
					e.stopPropagation();
				},false);
			}

			commentForm_head.addEventListener("click", function(e) { 
				horizontalSwipeForSwipeShow(true);
				e.stopPropagation();
				bottomHide(commentForm);
				general_swipeShow_blackFilter.style.visibility = "hidden";
			},false);

			commentForm.addEventListener("touchend", function(e) { 
				e.stopPropagation();
			},false);

	//#commentForm
		
		//Event listeners pour que le form ait bien une height responsive
			commentForm_form_input.addEventListener("focus", function() { 
				commentForm_form.style.top = "20px"; 
				commentForm_form.style.height = "calc(100% - 20px)";
				commentForm_form_input.style.height = "calc(100% - 20px)";
			},false);

			commentForm_form_input.addEventListener("focusout", function() { 
				commentForm_form_input.value = "";
				commentForm_form.style.top = "calc(100% - 50px)"; 
				commentForm_form.style.height = "50px";
				commentForm_form_input.style.height = "50px";
				commentForm_form_input.style.top = "10px";
			},false);

		//Style dynamique de #comment_forms

	//#profile 

		//Event listeners pour fermer la page, d'autres trucs...
			profile_close.addEventListener("click", function() { 
				animateOnOff(profile,"rotatePanelAppear90left","rotatePanelDisappear90left");
			},false);

			profile_bets.addEventListener("scroll", function() {
				t = profile_bets.scrollTop
				if(t > 50) { 
					//profile_profileBets.style.top
					profile_cover.classList.add("profile_cover-scrollAnim");

					profile_shadow.classList.remove("profile_shadow-scrollAnim2");
					profile_shadow.classList.add("profile_shadow-scrollAnim");

					profile_avatar.classList.remove("profile_avatar-scrollAnim2");
					profile_avatar.classList.add("profile_avatar-scrollAnim");

					profile_name.classList.remove("profile_name-scrollAnim2");
					profile_name.classList.add("profile_name-scrollAnim");

					profile_bets.classList.remove("profile_bets-scrollAnim2");
					profile_bets.classList.add("profile_bets-scrollAnim");
				}
				else { 
					profile_cover.classList.remove("profile_cover-scrollAnim");

					profile_shadow.classList.remove("profile_shadow-scrollAnim");
					profile_shadow.classList.add("profile_shadow-scrollAnim2");

					profile_avatar.classList.remove("profile_avatar-scrollAnim");
					profile_avatar.classList.add("profile_avatar-scrollAnim2");

					profile_name.classList.remove("profile_name-scrollAnim");
					profile_name.classList.add("profile_name-scrollAnim2");

					profile_bets.classList.remove("profile_bets-scrollAnim");
					profile_bets.classList.add("profile_bets-scrollAnim2");
				}
			},false);

	//#options

		//Events listeners sur #options pour fermer, et autres
			options_close.addEventListener("click", function() { 
				animateOnOff(options,"rotatePanelAppear90left","rotatePanelDisappear90left");
			},false);

	//#bets

		//Events listeners sur #bets pour fermer, et autres sympaticités !
			bets_close.addEventListener("click", function() { 
				animateOnOff(bets,"rotatePanelAppear90left","rotatePanelDisappear90left");
			},false);

	});


             
