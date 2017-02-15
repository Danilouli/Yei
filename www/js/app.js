//Variables et constantes globales, objets currentUser et currentLang (qui dépendent de functionsAndClasses.js), et fonctions de récupération d'URL
	//variables disant la location de la vue et le z-index de la vue
		var viewSuperpositionTab = new Array(1),
			viewZIndex = 0;

	//Declaration des constantes
		ScreenWidth = window.innerWidth;
		ScreenHeight = window.innerHeight; 
		globalURL = window.URL || window.webkitURL; 
		singleAjaxUploadURL = "http://www.crabbix.fr/singleAjaxUpload.php";

	//Definition des langues de l'app

		var	french = new Lang("français");

		var	english = new Lang("english");

			//Propriétés des objets Lang french et english pour leurs unités de temps et autres dans leur langue... 
				french.longTimeUnits = {
				 	years : "an",
				 	months : "mois",
				 	weeks : "semaine",
				 	days : "jour",
				 	hours : "heure",
				 	minutes : "minute",
				 	seconds : "seconde"
				};
				french.shortTimeUnits = {
					years : "an",
					days : "j",
					hours : "h",
					minutes : "m",
					seconds : "s"
				};
				french.timeWords = {
					intro : "Il y a",
					concl : undefined,
					introFuture : "Termine dans ",
					conclFuture : undefined,
					longFuture : "Termine le ",
					longPast : "Terminé le ",
					ifPassed : "Terminé",
					ifNoTime : "A l'instant"
				};
				french.timeFormate = "d/m/y";
				french.dayNames = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
				french.monthNames = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","decembre"];
				french.logicWords = {
					and : "et ",
					or : "ou ",
					otherSingle : "autre ",
					otherPlur : "autres "
				}

				english.longTimeUnits  = {
					years : "year",
					months : "month",
					weeks : "week",
					days : "day",
					hours : "hour",
					minutes : "minute",
					seconds : "second"
				};
				english.shortTimeUnits = {
					years : "y",
					days : "d ",
					hours : "h ",
					minutes : "m ",
					seconds : "s "
				};
				english.timeWords = {
					intro : "",
					concl : "ago",
					introFuture : "Finishes in ",
					conclFuture : undefined,
					longFuture : "Finishes the ",
					longPast : "Finished the ",
					ifPassed : "Finished",
					ifNoTime : "Just now"
				};
				english.timeFormate = "y/m/d";
				english.dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
				english.monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
				english.logicWords = {
					and : "and ",
					or : "or ",
					otherSingle : "other ",
					otherPlur : "other "
				}

	//Declaration des variables Objet qui vont contenir l'user et la langue courante
	var	currentUser = new User(undefined,undefined,undefined,undefined,undefined);

	var	currentLang = french;

	//Fonctions de récupération d'urls des éléments à afficher
		function getProfPictUrl(user) {
			return "http://www.crabbix.fr/profPicts/profPict"+user.ID+user.profPictExt;
		}

		function getProofUrl(proof) {
			if(proof.type == "image")
				return "http://www.crabbix.fr/proofs/proof"+proof.ID+proof.extension;
			else if(proof.type == "video")
				return "http://www.crabbix.fr/proofs/proof"+proof.ID+proof.extension;
			else
				return "";
		} 

		function getBetPictUrl(bet) {
			return "http://www.crabbix.fr/betPicts/betPict"+bet.ID+bet.betPictExt;
		}

//Corps du script
	window.addEventListener('load', function() {

	//Variables de balises (pas d'id, ça se fait seul :p) et de tableaux de classes
		var body = document.querySelector("body");

		var	TABgeneral_swipeShow_element = classTab("general_swipeShow_element"),
			TABgeneral_swipeShow_element_presText = classTab("general_swipeShow_element_presText"),
			TABgeneral_swipeShow_element_content = classTab("general_swipeShow_element_content"),
			TABgeneral_swipeShow_element_comments = classTab("general_swipeShow_element_comments");

		var	DTABgeneral_swipeShow_element_comment = new Array(12);

		var TABcommentForm_comment = classTab("commentForm_comment"),
			TABcommentForm_comment_text = classTab("commentForm_comment_text"),
			TABcommentForm_comment_infos_time = classTab("commentForm_comment_infos_time");

		var TABfileProof_form_betModal_betResult = classTab("fileProof_form_betModal_betResult"),
			TABfileProof_form_betModal_betResult_name = classTab("fileProof_form_betModal_betResult_name"),
			TABfileProof_form_betModal_betResult_time = classTab("fileProof_form_betModal_betResult_time"),
			TABfileProof_form_betModal_betResult_players = classTab("fileProof_form_betModal_betResult_players"),
			TABfileProof_form_betModal_betResult_image = classTab("fileProof_form_betModal_betResult_image");

		var TABfriends_result = classTab("friends_result"),
			TABfriends_result_name = classTab("friends_result_name"),
			TABfriends_result_avatar = classTab("friends_result_avatar");

	/*Definition de tableaux qui contiennent les commentaires .general_swipeShow_element_comment
	de chaque div .general_swipeShow_element_comments*/
		
		for(var i = 0; i < TABgeneral_swipeShow_element_comments.length; i++) { 
			DTABgeneral_swipeShow_element_comment[i] = TABgeneral_swipeShow_element_comments[i].querySelectorAll(".general_swipeShow_element_comment");
		}

		for(var i = 0; i < TABgeneral_swipeShow_element.length; i++) { 
			el = TABgeneral_swipeShow_element[i];
			el.style.left = i*100 + "%";
			for(var j = 0; j < DTABgeneral_swipeShow_element_comment[i].length; j++) {
				DTABgeneral_swipeShow_element_comment[i][j].style.left = j*ScreenWidth + "px";		
			}
		}

	//Fonctions de design qui utilisent ces variables (surtout heightHelper)
		function calcHeightSubstringer(wantedHeight,wantedWidth,fontSize) { 
			var subStringer = 1,
				heightCounter = 0;
			heightHelper.style.width = wantedWidth + "px";
			heightHelper.style.position = "absolute";
			heightHelper.style.fontSize = fontSize + "px";
			heightHelper.innerHTML = "";
			while(heightCounter < (wantedHeight - fontSize*0.5)) { 
				heightHelper.innerHTML = heightHelper.innerHTML + "a";
				heightCounter = calcHeight(heightHelper);					
				subStringer++;
			}
			heightHelper.innerHTML = "";
			return subStringer;
		}

		function calcWidthSubstringer(wantedWidth,fontSize) { 
			var subStringer = 1,
				widthCounter = 0;
			heightHelper.style.width = wantedWidth + "px";
			heightHelper.style.position = "absolute";
			heightHelper.style.fontSize = fontSize + "px";
			heightHelper.innerHTML = "a";
			originHeight = calcHeight(heightHelper);
			while(calcHeight(heightHelper) <= originHeight) { 
				heightHelper.innerHTML = heightHelper.innerHTML + "a";				
				subStringer++;
			}
			heightHelper.innerHTML = "";
			return subStringer;
		}
		
		function centerPosTopContent(divToEqualize,textContent) { 
			var divHeight = calcHeight(divToEqualize);
			heightHelper.innerHTML = textContent;
			thingHeight = calcHeight(heightHelper);
			posTopForCenteredPosition = 0.5*(divHeight - thingHeight);
			heightHelper.innerHTML = "";
			divToEqualize.style.paddingTop = posTopForCenteredPosition + "px";
			divToEqualize.style.paddingBottom = posTopForCenteredPosition + "px"; 
		}

		function calcStringWidth(string,fontSize) {
			heightHelper.innerHTML = string;
			heightHelper.style.fontSize = fontSize + "px";
			return calcWidth(heightHelper);
			heightHelper.innerHTML = "";
		}

		function reduceString(stringToCut,subStringer) {
			if(subStringer < stringToCut.length) { 
				while(!(/\s/.test(stringToCut.charAt(subStringer)))) {
					subStringer = subStringer - 1;
				}
				return {
					finalValue : stringToCut.substring(0,subStringer)+"...",
					wasCut : true
				}
			}
			else return {
					finalValue : stringToCut,
					wasCut : false
				}
		}

		function reduceStringInWidth(stringToCut,fontSize,wantedWidth) {
			subStringer = calcWidthSubstringer(wantedWidth,fontSize);
			return reduceString(stringToCut,subStringer);
		}

	/**********************************************************************************/

	//Fonctions back-end sur #log
		//Objet AjaxFunction pour lancer la requête vers le serveur lors du signUp et y insérer les données
			var signUp = new AjaxFunction("POST","http://www.crabbix.fr/signUp.php",["firstName","lastName","mail","password"],10000,{ 
				success : function() { receiveUserInfosOnSignUp.launchReception(); },
				wait : function() { log_subscribe_loading.style.visibility = "visible"; }
			});
		//Objet JSONReception pour la reception et l'insertion de données dans le HTML en retour du serveur après le signUp
			var receiveUserInfosOnSignUp = new JSONReception(signUp,function() {signUp.go(log_subscribe_form_firstName.value,log_subscribe_form_lastName.value,log_subscribe_form_mail.value,log_subscribe_form_password.value);},100,{
				success : function() {
					currentUser = receiveUserInfosOnSignUp.dataReceived;
					log_subscribe_loading.style.visibility = "hidden";
					log.style.visibility = "hidden";
					console.log("On a un nouvel user ! Son ID est "+currentUser.ID+", il s'appelle "+currentUser.firstName+" "+currentUser.lastName+", et son mot de passe haché, c'est "+currentUser.password);
					insertInProfile();
				} 
			});

		//Objet AjaxFunction pour lancer la requête vers le serveur lors du log in et y insérer les données 
			var logIn = new AjaxFunction("POST","http://www.crabbix.fr/logIn.php",["mail","password"],10000,{
				success : function() { receiveUserInfosOnLogIn.launchReception(); },
				wait : function() { log_connect_loading.style.visibility = "visible"; }
			});
		//Objet JSONReception pour la reception et l'insertion de données dans le HTML en retour du serveur après le log in
			var receiveUserInfosOnLogIn = new JSONReception(logIn,function() {logIn.go(log_connect_form_mail.value,log_connect_form_password.value,true);},50,{
				success : function() {
					currentUser = receiveUserInfosOnLogIn.dataReceived;
					log_connect_loading.style.visibility = "hidden";
					log.style.visibility = "hidden";
					console.log("On a affaire avec l'user d'ID "+currentUser.ID+", il s'appelle "+currentUser.firstName+" "+currentUser.lastName+", et son mot de passe haché, c'est "+currentUser.password);
					insertInProfile();	
				}
			});

	//Variables, constantes et fonctions globales sur #general
		//Variables et constantes pour le swipe
			//Variables de l'entrée et sortie du toucher, de localisation du toucher en mouvement, 
				var touchEntryX = 0,
					touchEntryY = 0,
					touchEntryTime,
					touchOutX = 0,
					touchOutY = 0,
					touchOutTime,
					touchX = 0,
					touchY = 0;

			//temps maximum pour avoir un swipe "glissé"
				var touchXeachMaxTime = 0,
					touchYeachMaxTime = 0;

			//variable du timer necessaire au swipe horizontal sur #general_swipeShow
				var	general_swipeShowTimer, 
					general_swipeShowScrollLeftPosition = 0;

			//Variables globales pour le que chaque panel soit actif quand il faut
				var	videoSwitch = new Array(TABgeneral_swipeShow_element.length),
					CURRActiveProofs = new Array(TABgeneral_swipeShow_element.length), //va contenir des intervalles pour lancer le slide des coms quand on est sur le bon panel
					actualPanel = 0;

				for(var i = 0; i<TABgeneral_swipeShow_element.length; i++) {
					TABgeneral_swipeShow_element[i].slideCommentsCounter = 1;					
				}

			//Constantes pour le swipe sur #general
				horizontalSwipeVerticalBorder = 150;
				horizontalSwipeMinimumDistance = 30;
				horizontalSwipeMaximumTime = 350;
				clickMinimalTime = 200;

		//Constantes pour le CSS dynamique sur #general
			slideCommentHeight = calcHeight(DTABgeneral_swipeShow_element_comment[0][0].querySelector(".general_swipeShow_element_comment_text"));
			slideCommentWidth = calcWidth(DTABgeneral_swipeShow_element_comment[0][0].querySelector(".general_swipeShow_element_comment_text"));
			slideCommentFontSize = getCSSNumberProperty(DTABgeneral_swipeShow_element_comment[0][0].querySelector(".general_swipeShow_element_comment_text"),"font-size");
			commentSubstringer = calcHeightSubstringer(slideCommentHeight,slideCommentWidth,slideCommentFontSize);
			maxProofs = TABgeneral_swipeShow_element.length;

		//Fonctions front-end ou d'event listeners sur #general_swipeShow pour le swipe horizontal
			//Fonctions pour détecter la position du toucher et la mettre dans ses variables touchEvents
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

			//Fonctions de déplacement des panels de #general_swipeShow
				function generalSlidingTo(panelNumber) {
					for(var i = 0; i<TABgeneral_swipeShow_element.length; i++) {
						TABgeneral_swipeShow_element[i].style.webkitTransform = "translate3d("+(-panelNumber*100)+"%,0%,0)"
					}			
				}

				function nextPanel(e,time,ppf) {
					generalSlidingTo(actualPanel+1);
					actualPanel = actualPanel+1;
				}
				function currentPanel(e,time,ppf) {
					generalSlidingTo(actualPanel);
					actualPanel = actualPanel;
				}
				function prevPanel(e,time,ppf) {
					generalSlidingTo(actualPanel-1);
					actualPanel = actualPanel-1;
				}

			//Fonction pour lancer les videos de #general_swipeShow ou pas si on est dessus ou non...

				function playVideo(e,panelNumber) { 
					var video = TABgeneral_swipeShow_element[panelNumber].querySelector("video");
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
						el = TABgeneral_swipeShow_element[0];
						if(el.querySelector("video")) { 
							el.querySelector("video").play();
							TABgeneral_swipeShow_element[0].isActiveVideo = true;
						}	
						if(TABgeneral_swipeShow_element[1].querySelector("video")) { 
							TABgeneral_swipeShow_element[1].querySelector("video").pause();
							TABgeneral_swipeShow_element[1].isActiveVideo = false;
						}
						clearInterval(TABgeneral_swipeShow_element[1].commentsInterval);
						TABgeneral_swipeShow_element[0].commentsInterval = setInterval(function() { 
							slideComments(0);
						},3000);
					}
					else if(panelNumber == lastPanel) { 
						el = TABgeneral_swipeShow_element[lastPanel];
						if(el.querySelector("video")) { 
							el.querySelector("video").play();
							TABgeneral_swipeShow_element[lastPanel].isActiveVideo = true;
						}
						if(TABgeneral_swipeShow_element[lastPanel - 1].querySelector("video")) { 
							TABgeneral_swipeShow_element[lastPanel - 1].querySelector("video").pause();
							TABgeneral_swipeShow_element[lastPanel-1].isActiveVideo = false;
						}
						clearInterval(TABgeneral_swipeShow_element[lastPanel-1].commentsInterval);
						TABgeneral_swipeShow_element[panelNumber].commentsInterval = setInterval(function() { 
							slideComments(panelNumber);
						},3000);
					}
					else { 
						el = TABgeneral_swipeShow_element[panelNumber];
						elBefore = TABgeneral_swipeShow_element[panelNumber - 1];
						elAfter = TABgeneral_swipeShow_element[panelNumber + 1];
						if(el.querySelector("video")) { 
							el.querySelector("video").play();
							TABgeneral_swipeShow_element[panelNumber].isActiveVideo = true;
						}
						if(elBefore.querySelector("video")) { 
							elBefore.querySelector("video").pause();
							TABgeneral_swipeShow_element[panelNumber-1].isActiveVideo = false;
						}
						if(elAfter.querySelector("video")) { 
							elAfter.querySelector("video").pause();
							TABgeneral_swipeShow_element[panelNumber+1].isActiveVideo = false;
						}
						clearInterval(TABgeneral_swipeShow_element[panelNumber-1].commentsInterval);
						clearInterval(TABgeneral_swipeShow_element[panelNumber+1].commentsInterval);
						TABgeneral_swipeShow_element[panelNumber].commentsInterval = setInterval(function() { 
							slideComments(panelNumber);
						},3000);
					}
				}

			/*Fonction pour bouger les panels qui se lance après l'evènement "touchend" sur #general_swipeShow,
			et qui utilise les fonctions au dessus pour lancer ou arrêter les vidéos*/
				function swipePlayVideo(e) {
					if((touchXeachMaxTime - touchOutX>horizontalSwipeMinimumDistance) && (Math.abs(touchYeachMaxTime - touchOutY)<horizontalSwipeVerticalBorder) && (actualPanel<lastPanel)) {
						nextPanel();
						switchPlayVideo(e,actualPanel);
					}
					else if(touchOutX - touchXeachMaxTime>horizontalSwipeMinimumDistance && (Math.abs(touchYeachMaxTime - touchOutY)<horizontalSwipeVerticalBorder) && (actualPanel>0)) { 
						prevPanel();
						switchPlayVideo(e,actualPanel); 
					}
					else if(touchOutTime - touchEntryTime < clickMinimalTime) { 
						playVideo(e,actualPanel);
					}
				}

			//Fonctions qui sont les events listeners de #general_swipeShow
				function ELTOUCHSTARTgeneral_swipeShow(e) {
					touchEntryTime = e.timeStamp;
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
					touchOutTime = e.timeStamp; 
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

		//Gestion du back-end sur #general
			//Objet AjaxFunction pour lancer la requête vers le serveur justeAprès le log in ou sign up et y récupérer les données de l'User
				var getCurrProofs = new AjaxFunction("GET","http://www.crabbix.fr/getCurrProofs.php",["ID"],10000,{
					success : function() { receiveCurrProofs.launchReception(); }
				});
			//Objet JSONReception pour la reception et l'insertion de données dans le HTML en retour du serveur après qu'on ait bien reçu les proofs à insérer
				var receiveCurrProofs = new JSONReception(getCurrProofs,function() {getCurrProofs.go(currentUser.ID,true);},150,{
					success : function() {
						currentUser.proofs = receiveCurrProofs.dataReceived;
						insertProofsInGeneral();
						launchApp();
					}
				});		
			//Fonctions d'insertion et d'actualisation des données dans #general
				function slideComments(elementNumber) { 
					try {
						var TABLength = Math.min(currentUser.proofs[elementNumber].comments.length,5);
						if(TABgeneral_swipeShow_element[elementNumber].slideCommentsCounter == 0) { 
							DTABgeneral_swipeShow_element_comment[elementNumber][TABLength-1].style.webkitTransform = "translate3d("+ (-TABLength)*100 +"%,0%,0)";
							for(var i = 0; i < TABLength-1; i++) {
								DTABgeneral_swipeShow_element_comment[elementNumber][i].style.webkitTransform = "translate3d(0%,0%,0)";
							}
							setTimeout(function() { 
								DTABgeneral_swipeShow_element_comment[elementNumber][TABLength-1].style.display = "none"; 
							},500);
							setTimeout(function() { 
								DTABgeneral_swipeShow_element_comment[elementNumber][TABLength-1].style.webkitTransform = "translate3d(0%,0%,0)";
							},500);
						}
						else { 
							for(var i = 0; i < TABLength; i++) {
								DTABgeneral_swipeShow_element_comment[elementNumber][i].style.webkitTransform = "translate3d(" + (-TABgeneral_swipeShow_element[elementNumber].slideCommentsCounter*100) + "%,0%,0)";
							}
							DTABgeneral_swipeShow_element_comment[elementNumber][TABLength-1].style.display = "inline";
						}
						if(TABgeneral_swipeShow_element[elementNumber].slideCommentsCounter < TABLength - 1) { 
							TABgeneral_swipeShow_element[elementNumber].slideCommentsCounter++;
						}
						else { 
							TABgeneral_swipeShow_element[elementNumber].slideCommentsCounter = 0;
							for(var i = 0; i < TABLength-1; i++) { 
								DTABgeneral_swipeShow_element_comment[elementNumber][i].style.display = "none";
								DTABgeneral_swipeShow_element_comment[elementNumber][i].style.webkitTransform = "translate3d("+ (i+1)*100 +"%,0%,0)"; 
							}
							setTimeout(function() { 
								for(var i = 0; i < TABLength-1; i++) { 
									DTABgeneral_swipeShow_element_comment[elementNumber][i].style.display = "inline";
								}
							},500);
						}
					}
					catch(err){}
				}	
				function insertProofsInGeneral() {
					lastPanel = (currentUser.proofs.length<12)? currentUser.proofs.length-1 : 11;
					min = Math.min(currentUser.proofs.length,maxProofs);
					proofsToInsert = currentUser.proofs;
					console.log(proofsToInsert);
					for(var i = 0; i < min; i++) {
						var proofType = proofsToInsert[i].type,
							proofID = proofsToInsert[i].ID,
							parentElement = TABgeneral_swipeShow_element[i],
							proofMarkup = parentElement.querySelector("video") || parentElement.querySelector("img");
						TABgeneral_swipeShow_element_presText[i].innerHTML = proofsToInsert[i].presText;
						proofUrl = getProofUrl(proofsToInsert[i]);
						if(parentElement.querySelector("video")) {
							if(proofType == "video") {
								proofMarkup.style.height = ScreenHeight + "px";
								proofMarkup.style.top = 0 + "px";							
								proofMarkup.setAttribute("src",proofUrl);
							} 
							else if(proofType == "image") {
								var imageMarkup = document.createElement("img"),
									presTextMarkup = TABgeneral_swipeShow_element_presText[i];
								imageMarkup.classList.add("general_swipeShow_element_content");
								imageMarkup.setAttribute("src",proofUrl);
								parentElement.removeChild(proofMarkup);
								parentElement.insertBefore(imageMarkup,presTextMarkup);
								imageMarkup.style.height = proofsToInsert[i].proofHeight*((ScreenWidth-80)/proofsToInsert[i].proofWidth) + "px";
								imageMarkup.style.top = 0.5*(ScreenHeight - 80 - calcHeight(imageMarkup)) + "px";
							}						
						}
						else if(parentElement.querySelector("img")) {
							if(proofType == "image") {
								proofMarkup.style.height = proofsToInsert[i].proofHeight*((ScreenWidth-80)/proofsToInsert[i].proofWidth) + "px";
								proofMarkup.style.top = 0.5*(ScreenHeight - 80 - calcHeight(proofMarkup)) + "px";
								proofMarkup.setAttribute("src",proofUrl);
							} 
							else if(proofType == "video") {
								var videoMarkup = document.createElement("video"),
									presTextMarkup = TABgeneral_swipeShow_element_presText[i];
								videoMarkup.classList.add("general_swipeShow_element_content");
								videoMarkup.setAttribute("src",proofUrl);
								parentElement.removeChild(proofMarkup);
								parentElement.insertBefore(videoMarkup,presTextMarkup);
								videoMarkup.style.height = proofsToInsert[i].proofHeight*((ScreenWidth-80)/proofsToInsert[i].proofWidth) + "px";
								videoMarkup.style.top = 0.5*(ScreenHeight - 80 - calcHeight(imageMarkup)) + "px";
							}							
						}
						else {
							console.log("erreur de type de proof");
						}
						insertInCommentSwipeShow(i);
					}
					console.log("toutes les proofs ont été insérées");
				}
				function insertInCommentSwipeShow(proofNumber) {
					if(currentUser.proofs[proofNumber].comments.length>0) {
						var commentsToInsert = currentUser.proofs[proofNumber].comments,
							min = Math.min(currentUser.proofs[proofNumber].comments.length,5);
						for(var i = 0; i < min; i++) {
							textMarkup = DTABgeneral_swipeShow_element_comment[proofNumber][i].querySelector(".general_swipeShow_element_comment_text");
							stringToInsert = reduceString(commentsToInsert[i].value,commentSubstringer);
							textMarkup.innerHTML = stringToInsert.finalValue;
							centerPosTopContent(DTABgeneral_swipeShow_element_comment[proofNumber][i].querySelector(".general_swipeShow_element_comment_text"),stringToInsert.finalValue);							
						}
					}
					else {
						DTABgeneral_swipeShow_element_comment[proofNumber][0].querySelector(".general_swipeShow_element_comment_text").innerHTML = "";
					} 					
				}

	//Constantes et fonctions globales de l'app sur #app
		//Constantes globales de l'app
			device = detectDevice();

		//Fonction d'insertion qui contient toutes les choses à faire après avoir chargé toutes les données de départ pour le swipe des proofs et coms, et en fonction du device actuel
		//ATTENTION, se lance APRES insertProofsInGeneral
			function launchApp() {
				viewSuperpositionTab[0] = general_swipeShow;
				if(TABgeneral_swipeShow_element[0].querySelector("video")) {
					TABgeneral_swipeShow_element[0].querySelector("video").play();
					TABgeneral_swipeShow_element[0].isActiveVideo = true;
				}
				for(var i = 1; i < TABgeneral_swipeShow_element.length; i++) { 
					TABgeneral_swipeShow_element[i].isActiveVideo = false;
				}
				horizontalSwipeForSwipeShow(true);
				TABgeneral_swipeShow_element[0].commentsInterval = setInterval(function() { 
					slideComments(0);
				},3000);
				if(device == "nexus") { 
					for(var i = 0; i < TABgeneral_swipeShow_element.length; i++) { 
						el = TABgeneral_swipeShow_element[i];
						video = el.querySelector("video");
						if(video) { 
							video.classList.add("rotate180");
						}
					}
				}	
			}

	//Constantes et fonctions globales sur #profile
		//Constantes sur #profile_avatarForm, un objet Image pour la preview de la photo de profil
			profilePreviewLoad = new Image();	

		//Fonction d'eventListener sur #profile, pour avoir la preview de l'image lors du choix de la pp
			function ELCHANGEupdateAvatarPreview() {
				var chosenImg = profile_avatarForm_input.files[0];
				if(chosenImg) {
					profilePreviewLoad.src = URL.createObjectURL(chosenImg);
					profile_avatarForm_preview.style.backgroundImage = "url("+profilePreviewLoad.src+")";
					console.log("Nom de l'image selectionnée:",chosenImg.name);
				}
				else {
					console.log("Erreur de chargement de l'image");
				}
			}

		//Gestion du back-end sur #profile
			//Objet AjaxFunction pour poster les infos sur la pp de l'user lors de son upload
				var postProfPictInfos = new AjaxFunction("GET","http://www.crabbix.fr/postProfPictInfos.php",["userID","profPictName"],10000,{
					success : function() { receiveProfPictInfos.launchReception(); },
					wait : function() { waitForFriends(); }
				});
			//Objet JSONReception pour recevoir les infos en retour du serveur concernant la pp (son extension..)
				var receiveProfPictInfos = new ClassicReception(postProfPictInfos, function() {postProfPictInfos.go(currentUser.ID,profile_avatarForm_input.files[0].name,true);},75,{
					success : function() {
						currentUser.profPictExt = receiveProfPictInfos.dataReceived;
					}
				});	
			//Objet SingleAjaxUpload pour l'upload de la pp sur #profile_avatarForm
				var profPictUpl = new SingleAjaxUpload(profile_avatarForm,"avatar","profPicts",[".png",".jpg",".jpeg"],5000000,900000,{
					success : function() {
						console.log("Upload de la pp reussi, maintenant on poste ses infos dans la db et on en récupère...");
						postProfPictInfos.go(currentUser.ID,profile_avatarForm_input.files[0].name,true);
						switchClass(profile_avatarForm,"show","hide");
						profile_avatarFormModalShade.style.visibility = "hidden";
					},
					error : function() {console.log("Erreur dans l'upload de la pp");}
				});
			//Fonction d'insertion et d'actualisation des données dans #profil après le log in
				function insertInProfile() { 
					profile_avatar.querySelector("img").setAttribute("src",getProfPictUrl(currentUser));
					profile_name.innerHTML = currentUser.firstName + " " + currentUser.lastName;
				}

	//Constantes et fonctions globales sur #friends 
		//Constantes sur #friends
			maxFriendsResults = 24;

		//Gestion du back-end sur #friends
			//Objet AjaxFunction pour recevoir les amis concernés à chaque changement dans l'input friends_search
				var searchFriends = new AjaxFunction("GET","http://www.crabbix.fr/searchFriends.php",["userID","search"],10000,{
					success : function() { receiveSearchedFriends.launchReception(); }
				});
			//Objet JSONReception pour recevoir les users cherchés 
				var receiveSearchedFriends = new JSONReception(searchFriends, function() {searchFriends.go(currentUser.ID,friends_search.value);},100,{
					success : function() {
						console.log(receiveSearchedFriends.dataReceived);
						insertInFriendsResults();
					}
				});
			//Fonction d'insertion dans #friends
				function insertInFriendsResults() {
					friendsToInsert = receiveSearchedFriends.dataReceived;
					min = Math.min(friendsToInsert.length,24);
					console.log("nombre de users à insérer",min);
					if(min==0) {
						friends_profPage.currUser = JSON.parse("[]");
						TABfriends_result_name[0].innerHTML = "Aucun résultat";
						TABfriends_result_avatar[0].querySelector("img").setAttribute("src","img/interrogation.png");
						for(var i = 1; i<maxFriendsResults; i++) {
							try{friends_results.removeChild(TABfriends_result[i])}catch(err){}
						}
					}
					if(min<maxFriendsResults && min>0) {
						for(var i = min; i<maxFriendsResults; i++) {
							try{friends_results.removeChild(TABfriends_result[i])}catch(err){}
						}
						for(var i = TABfriends_result.length; i < min; i++) {
							divToAppend = TABfriends_result[0].cloneNode(true);
							friends_results.appendChild(divToAppend);
						}
						TABfriends_result = classTab("friends_result");
						TABfriends_result_name = classTab("friends_result_name");
						TABfriends_result_avatar = classTab("friends_result_avatar");
					}
					for(var i = 0; i < TABfriends_result.length; i++) {
						try {
							nameToInsert = friendsToInsert[i].firstName+" "+friendsToInsert[i].lastName;
							profPictURLToInsert = getProfPictUrl(friendsToInsert[i]);
							TABfriends_result_name[i].innerHTML = nameToInsert;
							TABfriends_result_avatar[i].querySelector("img").setAttribute("src",profPictURLToInsert);
							function chooseFriend(friendNumber) {
								TABfriends_result[friendNumber].addEventListener("click",function() {
									removeAddClass(friends_profPage,"leftReplace","leftCollapsing");
									friends_profPage.currUser = friendsToInsert[friendNumber];
									if(inJSONID(currentUser.friendsIDser,friends_profPage.currUser.ID)) {
										friends_profPage.isFriend = true;
										friends_profPage.action = "remove";
									}
									else if(friends_profPage.currUser.ID == currentUser.ID) {
										friends_profPage.isFriend = "same";
									}
									else if(inJSONID(currentUser.friendsReqIDser,friends_profPage.currUser.ID)) {
										friends_profPage.isFriend = "waiting";
										friends_profPage.action = "removeReq";
									}
									else if(inJSONID(friends_profPage.currUser.friendsReqIDser,currentUser.ID)) {
										friends_profPage.isFriend = "accept";
										friends_profPage.action = "accept";
									}
									else {
										friends_profPage.isFriend = false;
										friends_profPage.action = "demand";
									}
									insertInFriendsProfPage(friendNumber);
								},false);
							}
							chooseFriend(i); 
						} 
						catch(err){console.log("Erreur d'insertion des users")}
					}
				}
				function insertInFriendsProfPage(friendNumber) { 
					friends_profPage_avatar.querySelector("img").setAttribute("src",getProfPictUrl(friends_profPage.currUser));
					friends_profPage_name.innerHTML = friends_profPage.currUser.firstName + " " + friends_profPage.currUser.lastName;
					if(friends_profPage.isFriend == true) {
						friends_profPage_beFriend_button.querySelector("i").setAttribute("class","fa fa-check");
						friends_profPage_beFriend_button_situation.innerHTML = " Ami";
						friends_profPage_beFriend_button.style.backgroundColor = "rgb(11,113,115)";
						friends_profPage_beFriend_button.style.borderColor = "rgb(18,176,178)";		
					} 
					else if(friends_profPage.isFriend == "same") {
						friends_profPage_beFriend_button.querySelector("i").setAttribute("class","fa fa-chevron-right");
						friends_profPage_beFriend_button_situation.innerHTML = " Mon profil";
					} 
					else if(friends_profPage.isFriend == "accept") {
						friends_profPage_beFriend_button.querySelector("i").setAttribute("class","fa fa-question");
						friends_profPage_beFriend_button_situation.innerHTML = " Accepter";
						friends_profPage_beFriend_button.style.backgroundColor = "rgb(18,176,178)";
					} 
					else if(friends_profPage.isFriend == "waiting") {
						friends_profPage_beFriend_button.querySelector("i").setAttribute("class","fa fa-hourglass-o");
						friends_profPage_beFriend_button_situation.innerHTML = " En attente";
						friends_profPage_beFriend_button.style.backgroundColor = "rgb(18,176,178)";
					} 
					else {
						friends_profPage_beFriend_button.querySelector("i").setAttribute("class","fa fa-plus");
						friends_profPage_beFriend_button_situation.innerHTML = " Ajouter";
						friends_profPage_beFriend_button.style.borderColor = "rgb(11,113,115)";
						friends_profPage_beFriend_button.style.backgroundColor = "rgb(18,176,178)";						
					}
				}
				function waitForFriends() {
					for(var i = 0; i<TABfriends_result_avatar.length; i++) {
						TABfriends_result_avatar.querySelector("img").setAttribute("src","img/loads/ripple.gif");
					}
				}

			//Objet AjaxFunction pour ajouter un ami
				var addFriend = new AjaxFunction("GET","http://www.crabbix.fr/addFriend.php",["userID","friendID","action"],10000,{
					success : function() { receiveUpdatedUserInfos.launchReception(); }
				})
			//Objet JSONReception pour recevoir les infos de notre user updatées 
				var receiveUpdatedUserInfos = new JSONReception(addFriend, function() {addFriend.go(currentUser.ID,friends_profPage.currUser.ID);},100,{
					success : function() {
						console.log("amis updatés");
					}
				})
	
	//Constantes et fonctions gloables sur #commentForm
		//Constantes pour le CSS dynamique sur #commentForm
			maxProofComments = 24;

		//Gestion du front-end et fonctions event listeners sur #commentForm
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
				responsiveFormsHelper.style.wordWrap = "break-word";
				responsiveFormsHelper.style.zIndex = 100;
				responsiveFormsHelper.innerHTML = textareaOrInput.value;
				if((calcHeight(responsiveFormsHelper) > inputHeight + 5) && (calcHeight(responsiveFormsHelper) < maxHeight)) {
					formHeight = (calcHeight(responsiveFormsHelper) + Math.floor(fontSize/3));
					commentForm_form.style.top = (calcHeight(commentForm) - formHeight) + "px";
					textareaOrInput.style.height = formHeight + "px"; 
					commentForm_form.style.height = formHeight + "px";
				}
			}

		//Gestion du back-end sur #commentForms
			//Objet AjaxFunction pour lancer la requête vers le serveur juste après le post d'un com sur une preuve et y récupérer les coms updatés
				var postProofCommentAndUpdate = new AjaxFunction("POST","http://www.crabbix.fr/postProofCommentAndUpdate.php",["comment","userID","proofID","numberOfComments"],10000,{
					success : function() { receiveUpdatedAndPostedComments.launchReception(); }
				});
			//Objet JSONReception pour la reception et l'insertion de données dans le HTML en retour du serveur après qu'on ait bien reçu les coms updatés à insérer avec le notre 
				var receiveUpdatedAndPostedComments = new JSONReception(postProofCommentAndUpdate,
					function() {postProofCommentAndUpdate.go(commentForm_form_input.value,currentUser.ID,currentUser.proofs[actualPanel].ID,currentUser.proofs[actualPanel].comments.length,true);},
					100,{
					success : function() {
						currentUser.proofs[actualPanel].comments = receiveUpdatedAndPostedComments.dataReceived;
						insertInCommentForm(actualPanel);
						insertInCommentSwipeShow(actualPanel);
						goScrollTop(commentForm_comments,0,500,ScreenHeight*0.1);
					}
				},true);			

			//Objet AjaxFunction pour lancer la requête vers le serveur quand on déroule les coms d'une proof de #commentForm et y récupérer les coms updatés
				var updateProofComments = new AjaxFunction("GET","http://www.crabbix.fr/updateProofComments.php",["proofID"],10000,{
					success : function() { receiveUpdatedComments.launchReception(); }
				});
			//Objet JSONReception pour la reception et l'insertion de données dans le HTML en retour du serveur après qu'on ait bien reçu les coms updatés à insérer
				var receiveUpdatedComments = new JSONReception(updateProofComments, function() {updateProofComments.go(currentUser.proofs[actualPanel].ID,true);},100,{
					success : function() {
						currentUser.proofs[actualPanel].comments = receiveUpdatedComments.dataReceived;
						insertInCommentForm(actualPanel);
					}
				});
			//Fonction d'insertion dans #commentForm lors de son déroulement
				function insertInCommentForm(proofNumber) {
					var commentsToInsert = currentUser.proofs[proofNumber].comments,
						min = Math.min(commentsToInsert.length,maxProofComments);
					if(min==0) {
						TABcommentForm_comment_text[0].innerHTML = "Commentez !";
					}
					else {
						if(min<maxProofComments && min>0) {
							for(var i = min; i<maxProofComments; i++) {
								try{commentForm_comments.removeChild(TABcommentForm_comment[i])}catch(err){}
							}
							for(var i = TABcommentForm_comment.length; i < min; i++) {
								divToAppend = TABcommentForm_comment[0].cloneNode(true);
								commentForm_comments.appendChild(divToAppend);
							}
						    TABcommentForm_comment = classTab("commentForm_comment");
							TABcommentForm_comment_text = classTab("commentForm_comment_text");
							TABcommentForm_comment_infos_time = classTab("commentForm_comment_infos_time");
						}
						for(var i = 0; i < TABcommentForm_comment.length; i++) {
							try{
								TABcommentForm_comment_text[i].innerHTML = commentsToInsert[i].value;
								commentTime = commentsToInsert[i].timePosted;
								timeToInsert = whenHappened(commentTime); 
								TABcommentForm_comment_infos_time[i].innerHTML = timeToInsert;							
							}
							catch(err){console.log("erreur d'insertion des commentaires")}
						}					
					}
				}

	//Variables, constantes et fonctions globales sur #fileProof
		//Variables et constantes pour le CSS dynamique sur #fileProof_form_betModal_betResult
			nameFontSize = getCSSNumberProperty(TABfileProof_form_betModal_betResult_name[0],"font-size");
			timeFontSize = getCSSNumberProperty(TABfileProof_form_betModal_betResult_time[0],"font-size");
			widthForBetName = 0.45*(ScreenWidth-60);
			widthForBetTime = 0.55*(ScreenWidth-60);
			betNameWidthSubstringer = calcWidthSubstringer(widthForBetName,nameFontSize);
			betTimeWidthSubstringer = calcWidthSubstringer(widthForBetTime,timeFontSize);
			maxBetResults = 24;
			proofPreviewLoad = new Image();	

		//Gestion du front-end et fonctions event listeners sur #fileProof
			//Fonction pour savoir, avec un objet de type file, et son attribut type, si c'est une video ou photo, ou autre
				function getType(chosenFile) {
					var cut = 0;
					if(chosenFile.type.lastIndexOf("/")>-1) {
						cut = chosenFile.type.lastIndexOf("/");
						return chosenFile.type.substring(0,cut);
					}
					else return false;
				}

				function getExt(chosenFile) {
					var cut = 0;
					if(chosenFile.type.lastIndexOf("/")>-1) {
						cut = chosenFile.type.lastIndexOf("/");
						result = chosenFile.type.substring(cut).replaceAt(0,".");
						if (result == ".jpeg") return ".jpg";
						else return result;
					}
					else return false;				
				}

			//Fonction d'eventListener sur #profile, pour avoir la preview de l'image lors du choix de la pp
				function ELCHANGEupdateProofPreview() {
					var chosenProof = fileProof_form_proofInput.files[0];
					if(chosenProof) {
						loadSource = URL.createObjectURL(chosenProof);
						if(getType(chosenProof) == "video") {
							fileProof_form_preview_image.style.visibility = "hidden";
							fileProof_form_preview_image.removeAttribute("src");
							fileProof_form_preview_video.removeAttribute("poster");
							fileProof_form_preview_video.setAttribute("src",loadSource);
							fileProof_form_preview_video.style.visibility = "visible";
						} 
						else if(getType(chosenProof) == "image") {
							proofPreviewLoad.src = loadSource;
							fileProof_form_preview_video.style.visibility = "hidden";
							fileProof_form_preview_video.removeAttribute("src");
							fileProof_form_preview_video.removeAttribute("poster");
							fileProof_form_preview_image.setAttribute("src",loadSource);
							fileProof_form_preview_image.style.visibility = "visible";
						}
					fileProof_form_preview_presTextInput.style.visibility = "visible"; 
					}
					else {
						console.log("Erreur de chargement de la preuve");
					}
					console.log(chosenProof.type,getExt(chosenProof));
				}

			//Fonction d'EventListener pour debloquer le submit quand la proof est load
				function ELLOADunlockProofSubmit() {
					fileProof_form_submit.removeAttribute("disabled");
				}

		//Gestion du back-end sur #fileProof
			//Objet AjaxFunction pour lancer la requête vers le serveur quand on déroule les bets actuels pour les choisir lors du post d'une proof ou qu'on fait une recherche de bets
				var getCurrSearchedBets = new AjaxFunction("GET","http://www.crabbix.fr/getCurrSearchedBets",["userID","search"],10000,{
					success : function() { receiveCurrSearchedBets.launchReception(); }
				});
			//Objet JSONRecption pour recevoir et insérer les bets actuels en retour du serveur, avec la selection due à la recherche
				var receiveCurrSearchedBets = new JSONReception(getCurrSearchedBets, function() {getCurrSearchedBets.go(currentUser.ID,"",true);},150,{
					success : function() {
						currentUser.bets = receiveCurrSearchedBets.dataReceived;
						currentUser.searchedBets = receiveCurrSearchedBets.dataReceived;
						insertInBetResults();
					}
				});

			//Objet AjaxFunction pour avoir les infos sur l'ID de la dernière proof avant le post de la proof
				var getLastProofID = new AjaxFunction("GET","http://www.crabbix.fr/getLastProofID.php",[],10000,{
					success : function() {
						receiveLastProofID.launchReception();
					}
				})
			//Objet ClassicReception pour avoir l'ID de la dernière proof
				var receiveLastProofID = new ClassicReception(getLastProofID, function() {getLastProofID.go();},50,{
					success : function() {
						currentUser.hiddenInfos.lastProofID = receiveLastProofID.dataReceived;
					}
				})

			//Objet AjaxFunction pour poster les infos de la preuve choisie par l'user lors de son upload
				var postProofInfos = new AjaxFunction("POST","http://www.crabbix.fr/postProofInfos.php",["userID","parentBetID","type","extension","presText","proofWidth","proofHeight"],10000,{
					success : function() {
						receiveProofInfos.launchReception();
					}
				});
			//Objet JSONReception pour recevoir les infos en retour du serveur concernant la proof postée (extension, etc..)
				var receiveProofInfos = new ClassicReception(postProofInfos, function() {
						proofToUpload = fileProof_form_proofInput.files[0];
						betIDToPost = fileProof_form_betChoice.selectedBet.ID;
						proofWidthToPost = (getType(proofToUpload) == "video")? ScreenWidth:proofPreviewLoad.width; 
						proofHeightToPost = (getType(proofToUpload) == "video")? ScreenHeight:proofPreviewLoad.height; 
						postProofInfos.go(currentUser.ID,betIDToPost,
						getType(proofToUpload),getExt(proofToUpload),
						fileProof_form_preview_presTextInput.value,
						proofWidthToPost,proofHeightToPost);
					},50,{
					success : function() {
						currentUser.lastProofPostedID = receiveProofInfos.dataReceived; 
						proofUpl.launchUpload("proof"+parseInt(currentUser.lastProofPostedID),false,true);
					}
				});
			//Objet SingleAjaxUpload pour l'upload de la proof
				var proofUpl = new SingleAjaxUpload(fileProof_form,"proof","proofs",[".png",".jpg",".jpeg",".mp4",".wmw",".mpeg",".gif"],150000000,1800000,{
					success : function() {
						betIDToPost = fileProof_form_betChoice.selectedBet.ID;
						console.log("Upload de la proof reussi");
						fileProof_form_preview_image.removeAttribute("src");
						fileProof_form_preview_video.removeAttribute("src");
						fileProof_form_preview_presTextInput.style.visibility = "hidden";
						removeAddMultipleClasses(fileProof_form_submitButton.querySelector("i"),["fa-spinner","fa-pulse","fa-fw"],["fa-share"]);
						updateProofsAfterUpload.go(currentUser.lastProofPostedID,betIDToPost);
					},
					wait : function() {
						removeAddMultipleClasses(fileProof_form_submitButton.querySelector("i"),["fa-share"],["fa-spinner","fa-pulse","fa-fw"]);
					}
				});

			//Objet AjaxFunction pour déposer les infos finales de la proof postée, et updater les autres tables liées
				var updateProofsAfterUpload = new AjaxFunction("GET","http://crabbix.fr/updateProofsAfterUpload.php",["proofID","betID"],10000,{
					success : function() {
						console.log("Proof bien insérée partout !! miam, maintenant on update");
						getCurrProofs.go(currentUser.ID,true);
						animateOnOff(fileProof,"rotate0right","rotate-90right",225);
						generalSlidingTo(0);
					}
				});
			//Fonctions qui insèrent les données des paris en cours reçues dans le formulaire de selection de paris pour poster une preuve
				function insertBetTime(DOMElement,betDeadline) {
					if(typeof betDeadline != "number") betDeadline = Date.parse(betDeadline);
					betDeadlineTimestamp = betDeadline-Date.now();

					if(betDeadlineTimestamp > 1000*3600*24*15) {
						timeToInsert = currentLang.timeWords.longFuture + formateDate(betDeadline);
					}
					else timeToInsert = reduceString(timeToArriveAt(betDeadline),betTimeWidthSubstringer).finalValue;

					DOMElement.innerHTML = timeToInsert;
				}

				function insertBetPlayers(DOMElement,betPlayers) {
					var playersToInsert = "";
					min = Math.min(betPlayers.length,3);
					for(var i = 0; i<min-1; i++) {
						playersToInsert = playersToInsert + betPlayers[i].firstName + ", ";
					}
					if(min==3) {
						playersToInsert = playersToInsert +betPlayers[min-1].firstName + " " + currentLang.logicWords.and + (betPlayers.length-3) + " " +((min>4)?currentLang.logicWords.otherPlur:currentLang.logicWords.otherSingle) + "...";
					}
					else playersToInsert = playersToInsert  + currentLang.logicWords.and + betPlayers[min-1].firstName;
					
					DOMElement.innerHTML = playersToInsert;
				}

				function insertInBetResults() {
					betsToInsert = currentUser.searchedBets;
					min = Math.min(betsToInsert.length,maxBetResults);
					fileProof_form_betModal_betResultsLoader.style.visibility = "visible";
					if(min==0) {
						TABfileProof_form_betModal_betResult_name[0].innerHTML = "Aucun pari en cours...";
						fileProof_form_betChoice.selectedBet = JSON.parse("[]");
					}
					if(min<maxBetResults && min>0) {
						for(var i = min; i<maxBetResults; i++) {
							try{fileProof_form_betModal_betResults.removeChild(TABfileProof_form_betModal_betResult[i])}catch(err){} 
						}
						for(var i = TABfileProof_form_betModal_betResult.length; i < min;i++) {
							divToAppend = TABfileProof_form_betModal_betResult[0].cloneNode(true);
							fileProof_form_betModal_betResults.appendChild(divToAppend);
						}
						TABfileProof_form_betModal_betResult = classTab("fileProof_form_betModal_betResult");
						TABfileProof_form_betModal_betResult_name = classTab("fileProof_form_betModal_betResult_name");
						TABfileProof_form_betModal_betResult_time = classTab("fileProof_form_betModal_betResult_time");
						TABfileProof_form_betModal_betResult_players =classTab("fileProof_form_betModal_betResult_players");
						TABfileProof_form_betModal_betResult_image = classTab("fileProof_form_betModal_betResult_image");
					}
					for(var i = 0; i < TABfileProof_form_betModal_betResult.length; i++) {
						try {
							nameToInsert = reduceString(betsToInsert[i].name,betNameWidthSubstringer).finalValue;
							TABfileProof_form_betModal_betResult_name[i].innerHTML = nameToInsert;
							betDeadline = betsToInsert[i].deadline;
							insertBetTime(TABfileProof_form_betModal_betResult_time[i],betDeadline);
							insertBetPlayers(TABfileProof_form_betModal_betResult_players[i],betsToInsert[i].players);
							TABfileProof_form_betModal_betResult_image[i].querySelector("img").setAttribute("src",getBetPictUrl(betsToInsert[i]));
							function chooseBet(betNumber) {
								TABfileProof_form_betModal_betResult[betNumber].addEventListener("click",function() {
									fileProof_form_betModal.classList.remove("rightCollapsing");
									fileProof_form_betModal.classList.add("rightReplace");
									fileProof_form_betChoice_betName.innerHTML = betsToInsert[betNumber].name;
									fileProof_form_betChoice.selectedBet = betsToInsert[betNumber];
									fileProof_form_betChoice_betImage.querySelector("img").setAttribute("src",getBetPictUrl(betsToInsert[betNumber]));
								},false);
							}
							chooseBet(i);						
						}
						catch(err){console.log("erreur pour l'insertion des paris")}
					}
					fileProof_form_betModal_betResultsLoader.style.visibility = "hidden";
				}

	/**********************************************************************************/

	//Events listeners sur chaque partie de l'application

		//EventListeners sur #log
			log_connect_toSubscribe.addEventListener("click", function() {
				goScrollLeft(log,ScreenWidth,100,ScreenWidth*0.07);
			},false);

			log_connect_form_submit.addEventListener("click", function() {
				logIn.go(log_connect_form_mail.value,log_connect_form_password.value,true);
				logIn.request.addEventListener("readystatechange", function waiting() {
					if(logIn.request.status == 0 && logIn.request.readyState == 0) {
						logIn.request.removeEventListener("readystatechange", waiting, false);
						if(currentUser.ID) getCurrProofs.go(currentUser.ID,true);
					}
				},false);
			},false);

			log_subscribe_toConnect.addEventListener("click", function() {
				goScrollLeft(log,0,100,ScreenWidth*0.07);
			},false);

			log_subscribe_form_submit.addEventListener("click", function() {
				signUp.go(log_subscribe_form_firstName.value,log_subscribe_form_lastName.value,log_subscribe_form_mail.value,log_subscribe_form_password.value);
			},false);	

		//EventListeners sur #general
			//#general_leftSnippet et #general_rightSnippet
				general_leftSnippet_bigButton.addEventListener("click", function() {
					switchClass(general_leftSnippet_elements,"rotate-90left","rotate0left");
					switchCSS(general_leftSnippet_bigButton,"backgroundColor","rgba(230, 230, 230, 0.498039)","rgba(70, 70, 70, 0.498039)");
				},false);

				general_leftSnippet_profile.addEventListener("click", function() { 
					animateOnOff(profile,"rotate0left","rotate90left",225);
				},false);

				general_leftSnippet_friends.addEventListener("click", function() { 
					animateOnOff(friends,"rotate0left","rotate90left",225);
				},false);

				general_leftSnippet_bets.addEventListener("click", function() { 
					animateOnOff(bets,"rotate0left","rotate90left",225);
				},false);

				general_rightSnippet_bigButton.addEventListener("click", function() {
					switchClass(general_rightSnippet_elements,"rotate90right","rotate0right");
					switchCSS(general_rightSnippet_bigButton,"backgroundColor","rgba(230, 230, 230, 0.498039)","rgba(70, 70, 70, 0.498039)");
				},false);

			//eventListeners sur #general_swipeShow
				//Event listeners pour le scrolling horizontal et que les videos se jouent quand on arrive dessus sur #general_swipeShow
					horizontalSwipeForSwipeShow(true);

				//Event listeners pour la gestion du déroulement auto des commentaires de chaque div .general_swipeShow_element_comments, et leur non interférance avec le scroll horizontal 
					for(var i = 0; i < TABgeneral_swipeShow_element.length; i++) { 
						TABgeneral_swipeShow_element_comments[i].addEventListener("click", function(e) { 
							horizontalSwipeForSwipeShow(false);
							e.stopPropagation();
							bottomCollapse(commentForm);
							general_swipeShow_blackFilter.style.zIndex = "20";
							general_swipeShow_blackFilter.style.visibility = "visible";
							updateProofComments.go(currentUser.proofs[actualPanel].ID,true);
						},false);

						TABgeneral_swipeShow_element_comments[i].addEventListener("touchend", function(e) { 
							e.stopPropagation();
						},false);
					}

					function rechargeEL(proofNumber) {
						TABgeneral_swipeShow_element_content[proofNumber].addEventListener("abort", function() {
							TABgeneral_swipeShow_element_content[proofNumber].setAttribute("src",getProofUrl(currentUser.proofs[proofNumber]));
						},false);
						TABgeneral_swipeShow_element_content[proofNumber].addEventListener("error", function() {
							TABgeneral_swipeShow_element_content[proofNumber].setAttribute("src",getProofUrl(currentUser.proofs[proofNumber]));
						},false);
					}
					for(var i = 0; i < TABgeneral_swipeShow_element_content.length; i++) {
						rechargeEL(i);
					}

		//EventListeners sur #commentForm
			//Event listeners pour que le form ait bien une height responsive
				commentForm_head.addEventListener("click", function(e) { 
					horizontalSwipeForSwipeShow(true);
					e.stopPropagation();
					bottomHide(commentForm);
					general_swipeShow_blackFilter.style.zIndex = "-100";
					general_swipeShow_blackFilter.style.visibility = "hidden";
					commentForm_form_input.value = "";
				},false);

				commentForm_form_input.addEventListener("focus", function() { 
					commentForm_form.style.top = "20px"; 
					commentForm_form.style.height = "calc(100% - 20px)";
					commentForm_form_input.style.height = "calc(100% - 20px)";
				},false);

				commentForm_form_input.addEventListener("focusout", function() { 
					commentForm_form.style.top = "calc(100% - 50px)"; 
					commentForm_form.style.height = "50px";
					commentForm_form_input.style.height = "50px";
					commentForm_form_input.style.top = "10px";
					horizontalSwipeForSwipeShow(true);
				},false);

			//Event listeners pour le post des commentaires
				commentForm_submitButton.addEventListener("click", function(ev) {
					ev.preventDefault();
					console.log(commentForm_form_input.value,currentUser.ID,currentUser.proofs[actualPanel].ID,currentUser.proofs[actualPanel].comments.length);
					postProofCommentAndUpdate.go(commentForm_form_input.value,currentUser.ID,currentUser.proofs[actualPanel].ID,currentUser.proofs[actualPanel].comments.length,true);
					postProofCommentAndUpdate.request.addEventListener("readystatechange", function reinitInput() {
						if(postProofCommentAndUpdate.request.status == 0 && postProofCommentAndUpdate.request.readyState == 0) {
							postProofCommentAndUpdate.request.removeEventListener("readystatechange", reinitInput, false);
							commentForm_form_input.value = "";
						}
					},false);
				},false);
			
		//EventListeners sur #profile 
			//Event Listener pour avoir les dimesions de l'image choisie en pp par l'user avant son uplaod et débloquer le submit quand elle est chargée
				profilePreviewLoad.addEventListener("load", function() {
					console.log("Infos sur l'image qui va être uploadée en pp:",this.width,this.height);
					profile_avatarForm_submit.removeAttribute("disabled");
				},false);

			//Event listeners pour fermer la page, d'autres trucs concernant un beau scroll animé...
				profile_close.addEventListener("click", function() { 
					animateOnOff(profile,"rotate0left","rotate90left",225);
				},false);

				profile_bets.addEventListener("scroll", function() {
					t = profile_bets.scrollTop
					if(t > 50) { 
						profile_cover.classList.add("profile_cover-scrollAnim");

						profile_shadow.classList.remove("profile_shadow-scrollAnimReverse");
						profile_shadow.classList.add("profile_shadow-scrollAnim");

						profile_avatar.classList.remove("profile_avatar-scrollAnimReverse");
						profile_avatar.classList.add("profile_avatar-scrollAnim");

						profile_name.classList.remove("profile_name-scrollAnimReverse");
						profile_name.classList.add("profile_name-scrollAnim");

						profile_bets.classList.remove("profile_bets-scrollAnimReverse");
						profile_bets.classList.add("profile_bets-scrollAnim");
					}
					else { 
						profile_cover.classList.remove("profile_cover-scrollAnim");

						profile_shadow.classList.remove("profile_shadow-scrollAnim");
						profile_shadow.classList.add("profile_shadow-scrollAnimReverse");

						profile_avatar.classList.remove("profile_avatar-scrollAnim");
						profile_avatar.classList.add("profile_avatar-scrollAnimReverse");

						profile_name.classList.remove("profile_name-scrollAnim");
						profile_name.classList.add("profile_name-scrollAnimReverse");

						profile_bets.classList.remove("profile_bets-scrollAnim");
						profile_bets.classList.add("profile_bets-scrollAnimReverse");
					}
				},false);

			//Event listeners sur profile_avatarForm, formulaire pour la photo de profil, pour lancer l'upload de la pp
				profile_avatar.addEventListener("click", function() {
					profile_avatarForm.classList.remove("hide");
					profile_avatarForm.classList.add("show");
					profile_avatarFormModalShade.style.visibility = "visible";
				},false);

				profile_avatarForm_close.addEventListener("click", function() {
					profile_avatarForm.classList.remove("show");
					profile_avatarForm.classList.add("hide");
					profile_avatarFormModalShade.style.visibility = "hidden";
				},false);

				profile_avatarForm_input.addEventListener("change", ELCHANGEupdateAvatarPreview, false);

				profile_avatarForm.addEventListener("submit", function(ev) {
					ev.preventDefault();
					profPictUpl.launchUpload("profPict"+currentUser.ID,true,true);			
				},false);

		//EventListeners sur #friends
			//Events listeners sur #friends pour fermer, et autres
				friends_head_close.addEventListener("click", function() { 
					animateOnOff(friends,"rotate0left","rotate90left",225);
				},false);

				friends_profPage_close.addEventListener("click", function() {
					removeAddClass(friends_profPage,"leftCollapsing","leftReplace");
				},false);

				friends_search.onkeyup = function ELKEYDOWNsearchFriends(ev) {
					inputVal = friends_search.value;
					if(inputVal == "") {
						console.log("vide");
						for(var i = 1; i < 24; i++) {
							try{friends_results.removeChild(TABfriends_result[i])}catch(err){};
						}
						friends_profPage.currUser = JSON.parse("[]");
						TABfriends_result_name[0].innerHTML = "Qui cherchez vous ?";
						TABfriends_result_avatar[0].querySelector("img").setAttribute("src","img/interrogation.png");
					}
					else {
						searchFriends.harshAbort();
						searchFriends.go(currentUser.ID,inputVal);	
					}					
				};

				friends_search.onchange = function ELCHANGEsearchFriends(ev) {
					inputVal = friends_search.value;
					if(inputVal == "") {
						console.log("vide");
						for(var i = 1; i < 24; i++) {
							try{friends_results.removeChild(TABfriends_result[i])}catch(err){};
						}
						friends_profPage.currUser = JSON.parse("[]");
						TABfriends_result_name[0].innerHTML = "Qui cherchez vous ?";
						TABfriends_result_avatar[0].querySelector("img").setAttribute("src","img/interrogation.png");
					}
					else {
						searchFriends.harshAbort();
						searchFriends.go(currentUser.ID,inputVal);	
					}				
				};

				friends_profPage_bets.addEventListener("scroll", function() {
					t = friends_profPage_bets.scrollTop
					if(t > 50) { 
						friends_profPage_cover.classList.add("friends_profPage_cover-scrollAnim");

						friends_profPage_shadow.classList.remove("friends_profPage_shadow-scrollAnimReverse");
						friends_profPage_shadow.classList.add("friends_profPage_shadow-scrollAnim");

						friends_profPage_avatar.classList.remove("friends_profPage_avatar-scrollAnimReverse");
						friends_profPage_avatar.classList.add("friends_profPage_avatar-scrollAnim");

						friends_profPage_name.classList.remove("friends_profPage_name-scrollAnimReverse");
						friends_profPage_name.classList.add("friends_profPage_name-scrollAnim");

						friends_profPage_beFriend.classList.remove("friends_profPage_beFriend-scrollAnimReverse");
						friends_profPage_beFriend.classList.add("friends_profPage_beFriend-scrollAnim");

						friends_profPage_bets.classList.remove("friends_profPage_bets-scrollAnimReverse");
						friends_profPage_bets.classList.add("friends_profPage_bets-scrollAnim");
					}
					else { 
						friends_profPage_cover.classList.remove("friends_profPage_cover-scrollAnim");

						friends_profPage_shadow.classList.remove("friends_profPage_shadow-scrollAnim");
						friends_profPage_shadow.classList.add("friends_profPage_shadow-scrollAnimReverse");

						friends_profPage_avatar.classList.remove("friends_profPage_avatar-scrollAnim");
						friends_profPage_avatar.classList.add("friends_profPage_avatar-scrollAnimReverse");

						friends_profPage_name.classList.remove("friends_profPage_name-scrollAnim");
						friends_profPage_name.classList.add("friends_profPage_name-scrollAnimReverse");

						friends_profPage_beFriend.classList.remove("friends_profPage_beFriend-scrollAnim");
						friends_profPage_beFriend.classList.add("friends_profPage_beFriend-scrollAnimReverse");

						friends_profPage_bets.classList.remove("friends_profPage_bets-scrollAnim");
						friends_profPage_bets.classList.add("friends_profPage_bets-scrollAnimReverse");
					}
				},false);

				friends_profPage_beFriend_button.addEventListener("click",function() {
					addFriend.go(currentUser.ID,friends_profPage.currUser.ID,friends_profPage.action);
				},false);

		//EventListeners sur #bets
			//Events listeners sur #bets pour fermer, et autres sympaticités !
				bets_close.addEventListener("click", function() { 
					animateOnOff(bets,"rotate0left","rotate90left",225);
				},false);

		//EventListeners sur #fileProof
			general_rightSnippet_file.addEventListener("click", function() {
				animateOnOff(fileProof,"rotate0right","rotate-90right",225);
			},false);

			fileProof_close.addEventListener("click", function() { 
				animateOnOff(fileProof,"rotate0right","rotate-90right",225);
			},false);

			fileProof_form_betChoice.addEventListener("click", function() {
				fileProof_form_betModal.classList.remove("rightReplace");
				fileProof_form_betModal.classList.add("rightCollapsing");
				getCurrSearchedBets.go(currentUser.ID,"",true);
				console.log(viewSuperpositionTab);
			},false);

			fileProof_form_betModal_close.addEventListener("click", function() {
				fileProof_form_betModal.classList.remove("rightCollapsing");
				fileProof_form_betModal.classList.add("rightReplace");
			},false);

			fileProof_form_proofInput.addEventListener("change", function() {
				ELCHANGEupdateProofPreview();
				ELLOADunlockProofSubmit();
			}, false);

			proofPreviewLoad.addEventListener("load", function() {
				console.log(calcHeight(fileProof_form_preview),proofPreviewLoad.height);
				fileProof_form_preview_presTextInput.style.visibility = "visible"; 
				if(proofPreviewLoad.height*(calcWidth(fileProof_form_preview)/proofPreviewLoad.width)<calcHeight(fileProof_form_preview)) {
					fileProof_form_preview_image.style.top = (calcHeight(fileProof_form_preview)-proofPreviewLoad.height*(calcWidth(fileProof_form_preview)/proofPreviewLoad.width))*0.5 + "px";				
				}
			}, false);

			fileProof_form_submitButton.addEventListener("click", function() {
				fileProof_form_submit.click();
			},false);

			fileProof_form.addEventListener("submit", function(ev) {
				ev.preventDefault();
				proofToUpload = fileProof_form_proofInput.files[0];
				betIDToPost = fileProof_form_betChoice.selectedBet.ID;
				proofWidthToPost = (getType(proofToUpload) == "video")? ScreenWidth:proofPreviewLoad.width; 
				proofHeightToPost = (getType(proofToUpload) == "video")? ScreenHeight:proofPreviewLoad.height; 
				console.log("infos envoyées:",currentUser.ID,fileProof_form_betChoice.selectedBet.ID,getType(proofToUpload),getExt(proofToUpload),proofHeightToPost);
				postProofInfos.go(currentUser.ID,betIDToPost,getType(proofToUpload),getExt(proofToUpload),fileProof_form_preview_presTextInput.value,proofWidthToPost,proofHeightToPost);
			},false);

	/**********************************************************************************/

	//Une fois que tout ça est chargé, on affiche
		loadCircle.style.display = "none";

	});


             
