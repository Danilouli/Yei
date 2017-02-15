//Quelques méthodes sur les objets prototype même si on est nuls 

	//Sur les strings
		String.prototype.replaceAt = function(ind,chara) { 
			return this.substring(0,ind) + chara + this.substring(ind+chara.length);
		}

	//Sur les Dates
		/*nouvelles methodes prototypes sur des objets de type date (qui ont donc leur timestamp...), pareil, ces fonctions renvoient de même,
		les heures, min et sec passées entre cette date et maintenant*/
			//La fonction en dessous met une date sous un format du style "d/m/y" "m-y-d"...
				Date.prototype.putInFormat = function(order) {
					result = "";
					for(var i = 0; i<order.length; i++) {
						if(order.charAt(i) == "d") result = result + this.getDate();
						else if(order.charAt(i) == "m") result = result + (this.getMonth()+1);
						else if(order.charAt(i) == "y") result = result + this.getFullYear();
						else result = result + order.charAt(i);
					}
					return result;
				}

			//Les trois fonctions en dessous ramènent la partie entière du nombre d'heures passées depuis la date (dans le getter getTime()) de l'objet Date concerné
				Date.prototype.getHoursTillNow = function() {
					translatedTimeStamp = Date.now()-this.getTime();
					if(translatedTimeStamp>0) {
						hoursPassed = Math.floor(translatedTimeStamp/1000/60/60);
						return hoursPassed;
					}
					else return 0;
				}

				Date.prototype.getMinutesTillNow = function() {
					translatedTimeStamp = Date.now()-this.getTime();
					if(translatedTimeStamp>0) {
						minutesPassed = Math.floor(translatedTimeStamp/1000/60);
						return minutesPassed;
					}
					else return 0;
				}

				Date.prototype.getSecondsTillNow = function() {
					translatedTimeStamp = Date.now()-this.getTime();
					if(translatedTimeStamp>0) {
						secondsPassed = Math.floor(translatedTimeStamp/1000);
						return secondsPassed;
					}
					else return 0;
				}

			//Les trois fonctions en dessous ramènent la partie entière du nombre d'heures, min et sec pour arriver la date mise en paramètre dans futureTime
				Date.prototype.getHoursToArrive = function() {
					futureTimeStamp = this.getTime()-Date.now();
					if(futureTimeStamp>0) {
						hoursToPass = Math.floor(futureTimeStamp/1000/60/60);
						return hoursToPass;
					}
					else return 0;
				}

				Date.prototype.getMinutesToArrive = function() {
					futureTimeStamp = this.getTime()-Date.now();
					if(futureTimeStamp>0) {
						minutesToPass = Math.floor(futureTimeStamp/1000/60);
						return minutesToPass;
					}
					else return 0;
				}

				Date.prototype.getSecondsToArrive = function() {
					futureTimeStamp = this.getTime()-Date.now();
					if(futureTimeStamp>0) {
						secondsToPass = Math.floor(futureTimeStamp/1000);
						return secondsToPass;
					}
					else return 0;
				}

			//Cette fonction ramène un objet qui contient les valeurs "coupées" du temps passé jusqu'à maintenant en années, mois etc...
				Date.prototype.cutTimeTillNow = function(little) {
					translatedTimeStamp = Date.now()-this.getTime();
					if(little == undefined) little = false;
					if(translatedTimeStamp>0) {
						if(!little) {
							totalYears = translatedTimeStamp/1000/60/60/24/7/4.3/12;
								residualYears = totalYears-Math.floor(totalYears);
							totalMonths = residualYears*12;
								residualMonths = totalMonths-Math.floor(totalMonths);
							totalWeeks = residualMonths*4.3;
								residualWeeks = totalWeeks-Math.floor(totalWeeks);
							totalDays = residualWeeks*7;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);
						}
						else {
							totalYears = 0;
							totalMonths = 0;
							totalWeeks = 0;
							totalDays = translatedTimeStamp/1000/60/60/24;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);								
						}
						return {
							years : Math.floor(totalYears),
							months : Math.floor(totalMonths),
							weeks : Math.floor(totalWeeks),
							days : Math.floor(totalDays),
							hours : Math.floor(totalHours),
							minutes : Math.floor(totalMinutes),
							seconds : Math.floor(totalSeconds),
						}
					}
					else return undefined;	
				}

			//Cette fonction ramène un objet qui contient les valeurs "coupées" du temps qui va s'écouler entre maintenant et futureTime en années, mois etc...
				Date.prototype.cutTimeToArrive = function(little) {
					futureTimeStamp = this.getTime()-Date.now();
					if(little == undefined) little = false;
					if(futureTimeStamp>0) {
						if(!little) {
							totalYears = translatedTimeStamp/1000/60/60/24/7/4.3/12;
								residualYears = totalYears-Math.floor(totalYears);
							totalMonths = residualYears*12;
								residualMonths = totalMonths-Math.floor(totalMonths);
							totalWeeks = residualMonths*4.3;
								residualWeeks = totalWeeks-Math.floor(totalWeeks);
							totalDays = residualWeeks*7;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);
						}
						else {
							totalYears = 0;
							totalMonths = 0;
							totalWeeks = 0;
							totalDays = translatedTimeStamp/1000/60/60/24;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);								
						}
						return {
							years : Math.floor(totalYears),
							months : Math.floor(totalMonths),
							weeks : Math.floor(totalWeeks),
							days : Math.floor(totalDays),
							hours : Math.floor(totalHours),
							minutes : Math.floor(totalMinutes),
							seconds : Math.floor(totalSeconds),
						}
					}
					else return undefined;	
				}

		/*nouvelles variables fonctions de l'objet Date (qui est la date courante) pour avoir le temps passé en heures, min ou sec depuis une autre date
		originTime peut soit être un timestamp, soit une string contenant une date transtypable en timestamp par Date.parse*/
			//Utilise la méthode prototype pour mettre une date sous un format :
				Date.formateIn = function(dateToFormate,order) {
					dateObj = new Date(dateToFormate);
					return dateObj.putInFormat(order);
				}

			//Les trois fonctions en dessous ramènent la partie entière du nombre d'heures, min et sec passées depuis la date mise en paramètre dans originTime
				Date.getHoursFrom = function(originTime) {
					if(typeof originTime != "number") originTime = Date.parse(originTime);
					translatedTimeStamp = Date.now()-originTime;
					if(translatedTimeStamp>0) {
						hoursPassed = Math.floor(translatedTimeStamp/1000/60/60);
						return hoursPassed;
					}
					else return 0;
				}

				Date.getMinutesFrom = function(originTime) {
					if(typeof originTime != "number") originTime = Date.parse(originTime);
					translatedTimeStamp = Date.now()-originTime;
					if(translatedTimeStamp>0) {
						minutesPassed = Math.floor(translatedTimeStamp/1000/60);
						return minutesPassed;
					}
					else return 0;
				}

				Date.getSecondsFrom = function(originTime) {
					if(typeof originTime != "number") originTime = Date.parse(originTime);
					translatedTimeStamp = Date.now()-originTime;
					if(translatedTimeStamp>0) {
						secondsPassed = Math.floor(translatedTimeStamp/1000);
						return secondsPassed;
					}
					else return 0;
				}

			//Les trois fonctions en dessous ramènent la partie entière du nombre d'heures, min et sec pour arriver la date mise en paramètre dans futureTime
				Date.getHoursTo = function(futureTime) {
					if(typeof futureTime != "number") futureTime = Date.parse(futureTime);
					futureTimeStamp = futureTime-Date.now();
					if(futureTimeStamp>0) {
						hoursToPass = Math.floor(futureTimeStamp/1000/60/60);
						return hoursToPass;
					}
					else return 0;
				}

				Date.getMinutesTo = function(futureTime) {
					if(typeof futureTime != "number") futureTime = Date.parse(futureTime);
					futureTimeStamp = futureTime-Date.now();
					if(futureTimeStamp>0) {
						minutesToPass = Math.floor(futureTimeStamp/1000/60);
						return minutesToPass;
					}
					else return 0;
				}

				Date.getSecondsTo = function(futureTime) {
					if(typeof futureTime != "number") futureTime = Date.parse(futureTime);
					futureTimeStamp = futureTime-Date.now();
					if(futureTimeStamp>0) {
						secondsToPass = Math.floor(futureTimeStamp/1000);
						return secondsToPass;
					}
					else return 0;
				}

			//Cette fonction ramène un objet qui contient les valeurs "coupées" du temps passé entre originTime et maintenant en années, mois etc...
				Date.cutPassedTimeFrom = function(originTime,little) {
					if(typeof originTime != "number") originTime = Date.parse(originTime);
					translatedTimeStamp = Date.now()-originTime;
					if(little == undefined) little = false;
					if(translatedTimeStamp>0) {
						if(!little) {
							totalYears = translatedTimeStamp/1000/60/60/24/7/4.3/12;
								residualYears = totalYears-Math.floor(totalYears);
							totalMonths = residualYears*12;
								residualMonths = totalMonths-Math.floor(totalMonths);
							totalWeeks = residualMonths*4.3;
								residualWeeks = totalWeeks-Math.floor(totalWeeks);
							totalDays = residualWeeks*7;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);
						}
						else {
							totalYears = 0;
							totalMonths = 0;
							totalWeeks = 0;
							totalDays = translatedTimeStamp/1000/60/60/24;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);								
						}
						return {
							years : Math.floor(totalYears),
							months : Math.floor(totalMonths),
							weeks : Math.floor(totalWeeks),
							days : Math.floor(totalDays),
							hours : Math.floor(totalHours),
							minutes : Math.floor(totalMinutes),
							seconds : Math.floor(totalSeconds),
						}
					}
					else return undefined;	
				}

			//Cette fonction ramène un objet qui contient les valeurs "coupées" du temps qui va s'écouler entre maintenant et futureTime en années, mois etc...
				Date.cutTimeToGoTo = function(futureTime,little) {
					if(typeof futureTime != "number") futureTime = Date.parse(futureTime);
					futureTimeStamp = futureTime-Date.now();
					if(little == undefined) little = false;
					if(futureTimeStamp>0) {
						if(!little) {
							totalYears = translatedTimeStamp/1000/60/60/24/7/4.3/12;
								residualYears = totalYears-Math.floor(totalYears);
							totalMonths = residualYears*12;
								residualMonths = totalMonths-Math.floor(totalMonths);
							totalWeeks = residualMonths*4.3;
								residualWeeks = totalWeeks-Math.floor(totalWeeks);
							totalDays = residualWeeks*7;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);
						}
						else {
							totalYears = 0;
							totalMonths = 0;
							totalWeeks = 0;
							totalDays = futureTimeStamp/1000/60/60/24;
								residualDays = totalDays-Math.floor(totalDays);
							totalHours = residualDays*24;
								residualHours = totalHours-Math.floor(totalHours);
							totalMinutes = residualHours*60;
								residualMinutes = totalMinutes-Math.floor(totalMinutes);
							totalSeconds = Math.floor(residualMinutes*60);								
						}
						return {
							years : Math.floor(totalYears),
							months : Math.floor(totalMonths),
							weeks : Math.floor(totalWeeks),
							days : Math.floor(totalDays),
							hours : Math.floor(totalHours),
							minutes : Math.floor(totalMinutes),
							seconds : Math.floor(totalSeconds),
						}
					}
					else return undefined;	
				}

/**********************************************************************************/

//Classes dont on a besoin pour le backend..

	//Création de la classe AjaxFunction qui contient une fonction qui doit faire une requète ajax, ses paramètres sont:
	//-request : l'objet XMLHTTPRequest avec lequel on fait notre requète, on peut accéder à son status par .request.status du coup
	//-HTTPMethod : POST ou GET, ne gère pas le reste
	//-serverPageUrl : l'url distante de la page (souvent php) qui est utilisée en back sur le serveur
	//-args : les arguments qu'il faut mettre dans la fonction et qui seront dans les reqètes HTTP, du style ["mail","password"]
	/*-instructions : une fonction anonyme à éxécuter quand la request est prête (readyState == 4) et qu'on a bien les datas (status == 200)
	va souvent changer la valeur d'un variable globale*/
		function AjaxFunction(HTTPmethod,serverPageUrl,args,maxTime,instructions) { 
			this.request = new XMLHttpRequest();
			this.HTTPmethod = HTTPmethod;
			this.serverPageUrl = serverPageUrl;
			this.args = args;
			this.maxTime = maxTime;
			if(instructions == undefined) instructions = function() {};
			else this.instructions = instructions;
			if(this.HTTPmethod == "POST"){
				var dataString = "",
					maxTimeout;
				function POSTRequest(){
					if((this.readyState !=4) || (this.status != 200)) {
						if(infos) console.log("Avancement de la requête AJAX vers",serverPageUrl,"en methode",HTTPmethod,"! readyState :",this.readyState,"status:",this.status);
						if(instructions.wait) instructions.wait();
						if((this.readyState == 4) && (this.status == 0)) {
							if(infos) console.log("La reqûete",HTTPmethod,"a échoué mais on retente...");
							this.abort();
							this.open("POST",serverPageUrl,true);
							this.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							this.send(dataString);
						}
					}
					else if((this.readyState == 4) && (this.status == 200)) {
						if(infos) console.log("Requete terminée, ça a pris :",(Date.now()-beginning),"ms");
						this.removeEventListener("readystatechange", POSTRequest, false);
						clearTimeout(maxTimeout);
						if(instructions.success) instructions.success();
						if(abortOrNot) this.abort();									
					}
				}
				this.go = function() {
					var xhr = this.request;
					deadTime = this.maxTime;
					beginning = Date.now();
					abortOrNot = (typeof arguments[arguments.length-2] != "boolean")? true : arguments[arguments.length-2];
					infos = (typeof arguments[arguments.length-1] != "boolean")? true : arguments[arguments.length-1];
					dataString = this.args[0]+"="+arguments[0];
					for(var i = 1; i < this.args.length; i++) {
						dataString = dataString+"&"+this.args[i]+"="+arguments[i];
					}
					xhr.addEventListener("readystatechange", POSTRequest ,false);
					xhr.open("POST",serverPageUrl,true);
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(dataString);
					maxTimeout = setTimeout(function() {
						if(infos) console.log("Le temps de requête a été depassé après",(Date.now()-beginning),"ms, on va abort la requête...");
						if(instructions.error) instructions.error();
						xhr.removeEventListener("readystatechange", POSTRequest, false);
						xhr.abort();
					},deadTime);
				};
				this.harshAbort = function() {
					clearTimeout(maxTimeout);
					var xhr = this.request;
					xhr.removeEventListener("readystatechange",POSTRequest,false);
					xhr.abort();
				};
			}
			if(this.HTTPmethod == "GET"){
				var dataString = "",
					maxTimeout;
				function GETRequest(){
					if((this.readyState !=4) || (this.status != 200)) {
						if(infos) console.log("Avancement de la requête AJAX vers",serverPageUrl,"en methode",HTTPmethod,"! readyState :",this.readyState,"status:",this.status);
						if(instructions.wait) instructions.wait();
						if((this.readyState == 4) && (this.status == 0))  {
							if(infos) console.log("La reqûete",HTTPmethod,"a échoué mais on retente...");
							this.abort();	
							this.open("GET",serverPageUrl+"?"+dataString,true);
							this.send(null);
						}
					}
					else if((this.readyState == 4) && (this.status == 200)) {
						if(infos) console.log("Requete terminée, ça a pris :",(Date.now()-beginning),"ms");
						this.removeEventListener("readystatechange", GETRequest, false);
						clearTimeout(maxTimeout);
						if(instructions.success) instructions.success();
						if(abortOrNot) this.abort();								
					}
				}
				this.go = function() {
					var xhr = this.request;
					deadTime = this.maxTime;
					beginning = Date.now();
					abortOrNot = (typeof arguments[arguments.length-2] != "boolean")? true : arguments[arguments.length-2];
					infos = (typeof arguments[arguments.length-1] != "boolean")? true : arguments[arguments.length-1];
					dataString = this.args[0]+"="+arguments[0];
					for(var i = 1; i < this.args.length; i++) {
						dataString = dataString+"&"+this.args[i]+"="+arguments[i];
					}
					xhr.addEventListener("readystatechange", GETRequest ,false);
					xhr.open("GET",serverPageUrl+"?"+dataString,true);
					xhr.send(null);
					maxTimeout = setTimeout(function() {
						if(infos) console.log("Le temps de requête a été depassé après",(Date.now()-beginning),"ms, on va abort la requête...");
						if(instructions.error) instructions.error();
						xhr.removeEventListener("readystatechange", GETRequest, false);
						xhr.abort();
					},deadTime);
				};
				this.harshAbort = function() {
					clearTimeout(maxTimeout);
					var xhr = this.request;
					xhr.removeEventListener("readystatechange",GETRequest,false);
					xhr.abort();
				};
			}
		}

	//Création des classes JSONReception et ClassicReception qui contient une fonction qui est à mettre en instructions d'un objet AjaxFunction, si on reçoit du JSON, ses paramètres :
	//-ajaxFunction : la fonction de classe AjaxFunction dont on veut prendre les données
	//-goMethod : à remttre la fonction ajaxFunction.go() avec ses paramètres quand on veut relancer la requete si les données ne sont pas trouvées
	//-maxAttemps : le nombre max d'essais aveant de s'arreter d'essayer d'avoir les données
	//-instructions : les instructions à faire quand les données sont reçues
	//-infos : à true, on a des infos de debuggage
		function JSONReception(ajaxFunction,goMethod,maxAttempts,instructions,infos) {
			this.counter = 0;
			this.maxAttempts = maxAttempts;
			this.instructions = instructions;
			this.dataReceived = false;
			if(infos == undefined) infos = true;
			this.launchReception = function() {
				if(infos) console.log("On va commencer la recherche de Jason perdu dans le labyrinthe de",ajaxFunction.serverPageUrl);
				if(ajaxFunction.request.responseText.trim() != "" ) {
					repTxt = ajaxFunction.request.responseText.trim();
					while(!isJSON(repTxt) && this.counter<maxAttempts) {
						this.counter++;
						if(infos) console.log("tentative de recupération n°..",this.counter);
						if(instructions.wait) instructions.wait();
						goMethod();
					}
					if(isJSON(repTxt)) {
						this.dataReceived = JSON.parse(repTxt);
						if(infos) console.log("Jason est arrivé!");
						if(instructions.success) instructions.success();
						this.counter = 0;					
					}
					else {
						if(infos) console.log("Trop de connexions en meme temps ou erreur de serveur pour récupérer Jason");
						if(instructions.error) instructions.error();
					}
				}
				else {
					if(infos) console.log("Erreur réseau ou client pour se connecter"); 
				}					
			}
		}
		function ClassicReception(ajaxFunction,goMethod,maxAttempts,instructions,infos) {
			this.counter = 0;
			this.maxAttempts = maxAttempts;
			this.instructions = instructions;
			this.dataReceived = false;
			if(infos == undefined) infos = true;
			this.launchReception = function() {
				if(infos) console.log("On va commencer la recherche de Texton, le cousin de Jason, perdu au milieu de",ajaxFunction.serverPageUrl);
				if(ajaxFunction.request.responseText.trim()) {
					repTxt = ajaxFunction.request.responseText.trim();
					while(repTxt=="" && counter<maxAttempts) {
						counter++;
						if(infos) console.log("tentative de connexion n°.."+counter);
						if(instructions.wait) instructions.wait();
						goMethod();
					}
					if(repTxt!="") {
						this.dataReceived = repTxt;
						if(infos) console.log("Texton est arrivé! : ",repTxt);
						if(instructions.success) instructions.success();
						counter = 0;					
					}
					else {
						if(infos) console.log("Rien dans le texte de réponse, erreur de serveur sans doute");
						if(instructions.error) instructions.error();
					}
				}
				else {
					if(infos) console.log("Erreur réseau ou serveur pour se connecter"); 
				}					
			}
		}

	//Création de la classe SingleAjaxUpload qui se charge d'uploader un fichier précis qui est dans le form formToUpload en POST, ATTENTION :
	//°le form doit etre de method POST absolument
	//°le form doit avoir comme attribut enctype="multipart/form-data"
	//°bien noter que tous ces uploads utiliseront le meme script php coté serveur, à savoir singleAjaxUpload.php
	//°Au niveau de ce constructeur, il faut lui donner ABSOLUMENT (pour pas faire des uploads absurdes) :
	//-formToUpload : le nom du form dans lequel est le file à uploader
	//-fileInputName : l'attribut "name" de l'input de type file dans lequel l'user choisit le file qu'il veut upload
	//-uploadDirectory : le nom du dossier dans lequel sera placé l'upload
	//-acceptedExts : un tableau ou on met les ectensions dans lesquels le file sera accepté ["image/png","image/jpg"...]
	//-maxSize : la taille max que l'user peut uploader sur ce file
	/*-instructions : mettre au moins un objet vide {}, ou sinon on peut mettre un objet de paramètres success,error,wait,finish,
	chacuns étant des fonctions qui donnent des infos sur le statut de l'upload*/
	//°Ensuite on lance la méthode launchUpload, avec en paramètre l'event le nom du file qui sera sur le serveur, ce qui fait launchUpload(ev,nouveauNom,replace,abortOrNot,progress), avec arguments :
	//-replace : à true, le dernier fichier remplace si jamais il y en a un du même nom sur le serveur
	//-abortOrNot : à true, on abort la requete XMLHttp après que l'upload soit terminé
	//-progress : à true, l'objet SingleAjaxUpload aura dans sa propriété progressRate le taux de progression de l'upload, entre 0 et 1
			//singleAjaxUploadURL = "http://www.crabbix.fr/singleAjaxUpload.php";

			function SingleAjaxUpload(formToUpload,fileInputName,uploadDirectory,acceptedExts,maxSize,maxTime,instructions,errorMessage,successMessage,infos) {
				
				this.formToUpload = formToUpload;
				this.fileInputName = fileInputName;
				this.uploadDirectory = uploadDirectory;
				this.acceptedExts = JSON.stringify(acceptedExts);
				this.maxSize = maxSize;
				this.instructions = instructions;
				this.progressRate = 0;
				this.errorMessage = errorMessage? errorMessage:"";
				this.successMessage = successMessage? successMessage:"";
				this.request = new XMLHttpRequest();
				if(infos == undefined) infos = true;	

				this.launchUpload = function(newName,replace,abortOrNot,progress) {

					var data = new FormData(this.formToUpload);
					beginning = Date.now();
					replace = replace? 1:0;
					data.append("fileInputName", this.fileInputName);
				  	data.append("uploadDirectory", this.uploadDirectory);
				  	data.append("acceptedExts", this.acceptedExts);
				  	data.append("maxSize", this.maxSize);
				  	data.append("newName", newName);
				  	data.append("replace", replace);
				  	data.append("errorMessage", this.errorMessage);
				  	data.append("successMessage", this.successMessage);
				  	if(abortOrNot == undefined) abortOrNot = true;
				  	if(progress == undefined) progress = false;
					this.request.addEventListener("readystatechange", function uploadListener() {
						if(((this.readyState !=4) || (this.status != 200)) && ((Date.now() - beginning)<maxTime)) {
							if(infos) console.log("Avancement de l'upload de",newName,"! readyState :",this.readyState,"status:",this.status);
							if(instructions.wait) instructions.wait();
							if((this.readyState == 4) && (this.status == 0)){
								if(infos) console.log("L'upload a été abort mais on retente...");
								this.abort();	
								this.request.open("POST", singleAjaxUploadURL, true);
								this.request.send(data);
							}
						}
						else if((this.readyState == 4) && (this.status == 200)) {
							if(infos) console.log("Upload terminé, ça a pris :",(Date.now()-beginning),"ms");
						  	this.removeEventListener("readystatechange", uploadListener, false);
							if(instructions.success) instructions.success();
							if(abortOrNot) this.abort();
							console.log(this.readyState,this.status);	
						}
						else if((Date.now() - beginning)>maxTime) {
							if(infos) console.log("Le temps pour l'upload a été depassé après",(Date.now()-beginning),"ms, on va abort la requête...");
							if(instructions.error) instructions.error();
							this.removeEventListener("readystatechange", getRequest, false);
							this.abort();
						}
					},false);

				  	if(progress) {
						this.request.onprogress = function(e) {
							if(e.lengthComputable && e.total > 0) {
								this.progressRate = e.loaded/data.get("avatar").size;
							}
						};	
					}

					this.request.open("POST", singleAjaxUploadURL, true);
					this.request.send(data);
				}
			}

//Classes pour la gestion du produit : User et Langues

	//Création de la classe User et instanciation de l'User de l'app !!
		function User(ID,mail,firstName,lastName,password) { 
			this.ID = ID;
			this.mail = mail;
			this.firstName = firstName;
			this.lastName = lastName;
			this.password = password;
		}

	//Classe Lang et objet currentLang pour la langue, et instanciation des langues...
		function Lang(name) {
			this.name = name;
		}

/**********************************************************************************/

//Declaration des fonctions pour changer le CSS, animer, d'autres choses

	//Fonctions pour le debugage et le developpement
		function alertSuperpositions() { 
			var str = "";
			for(var i = 0; i < viewSuperpositionTab.length; i++) { 
				str = str + "," + viewSuperpositionTab[i].id;
			}
			alert(str);
		}

	//Fonction pour detecter le device
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

	//Fonctions pour les animations du scroll horizontal ou vertical
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

		function goScrollTop(scrollingElement,scrollTopDestination,timeTaken,pixelPerFrame) { 
			var scrollTopPosition = scrollingElement.scrollTop;
			var dist = scrollTopDestination-scrollTopPosition;
			var animationSpeed = (timeTaken*pixelPerFrame)/(dist);
			var intervalId = setInterval(frame, animationSpeed);
			function frame() { 
				if(scrollingElement.scrollTop == scrollTopDestination) { 
					clearInterval(intervalId);
				}
				else if(dist>=0) {
					if(scrollingElement.scrollTop >= (scrollTopDestination - pixelPerFrame)) { 
						scrollingElement.scrollTop = scrollTopDestination;
					}
					else { 
					scrollTopPosition = scrollTopPosition + pixelPerFrame;
					scrollingElement.scrollTop = scrollTopPosition;
					}
				}
				else if (dist<0) { 
					if(scrollingElement.scrollTop <= (scrollTopDestination + pixelPerFrame)) { 
						scrollingElement.scrollTop = scrollTopDestination;
					}
					else { 
					scrollTopPosition = scrollTopPosition - pixelPerFrame;
					scrollingElement.scrollTop = scrollTopPosition;
					}				
				}
				else {}
			}
		}

	//Fonctions pour les animations de collapse (utilisant des classes CSS), tout ça tout ça
		function animateOnOff(DOMElement,classOn,classOff,timeHiding) { 
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
				viewZIndex = viewZIndex - 10;
				setTimeout(function() { 
					DOMElement.style.zIndex = viewZIndex - 20;
				} ,timeHiding);
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
			} ,500);
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
			else if(hasClass(DOMElement,classOff)) { 
				DOMElement.classList.remove(classOff);
				DOMElement.classList.add(classOn);
			}
			else {
				DOMElement.classList.remove(classOn);
				DOMElement.classList.add(classOff);				
			}
		}

		function removeAddClass(DOMElement,classToRemove,classToAdd) {
			DOMElement.classList.remove(classToRemove);
			DOMElement.classList.add(classToAdd);		
		}

		function addRemoveClass(DOMElement,classToAdd,classToRemove) {
			DOMElement.classList.add(classToAdd);
			DOMElement.classList.remove(classToRemove);		
		}

		function removeAddMultipleClasses(DOMElement,classesToRemove,classesToAdd) {
			for(var i = 0; i < classesToRemove.length; i++) {
				DOMElement.classList.remove(classesToRemove[i]);
			}
			for(var i = 0; i < classesToAdd.length; i++) {
				DOMElement.classList.add(classesToAdd[i]);
			}
		}

		function addRemoveMultipleClasses(DOMElement,classesToAdd,classesToRemove) {
			for(var i = 0; i < classesToAdd.length; i++) {
				DOMElement.classList.add(classesToAdd[i]);
			}
			for(var i = 0; i < classesToRemove.length; i++) {
				DOMElement.classList.remove(classesToRemove[i]);
			}
		}

		function switchCSS(DOMElement,CSSProperty,valueOn,valueOff) {
			if(DOMElement.style[CSSProperty] == valueOff){
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
			return document.querySelectorAll("."+className);
		}
 
	//Fonction qui swipe le html de deux elements
		function swipeHTML(DOMElement1,DOMElement2) { 
			var innerHTML1 = DOMElement1.innerHTML,
				innerHTML2 = DOMElement2.innerHTML;
			DOMElement1.innerHTML = innerHTML2;
			DOMElement2.innerHTML = innerHTML1;
		}

/**********************************************************************************/

//Fonctions sur des objets, JSON, Dates...
	//Fonctions pour la gestion du JSON
		function isJSON(str) {
			try {
			    JSON.parse(str);
			} 
			catch (e) {
			    return false;
			}
			return true;
		}

		function inJSON(JSONstring,value) {
			jsonArr = JSON.parse(JSONstring);
			return (jsonArr.indexOf(value)>-1)? true:false;
		}

		function inJSONID(JSONstring,IDnumber) {
			jsonArr = JSON.parse(JSONstring);
			return (jsonArr.indexOf(parseInt(IDnumber))>-1)? true:false;
		}

	//Fonctions pour retourner une string contenant le temps passé depuis une date !
		//Fonctions qui vont faire passer une date en string
			function timePassedToString(originTime,introText,conclText,ifNoTimeText,units,precision,plur) {
				if(introText == undefined) introText = "";
				if(conclText == undefined) conclText = "";
				if(plur == undefined) plur = false;
				if(units == undefined) {
					units = {
						years : "years",
						months : "months",
						weeks : "weeks",
						days : "days",
						hours : "hours",
						minutes : "minutes",
						seconds : "seconds"
					}
				}
				if(precision == true) precision = "seconds";
				var tString = introText;
				consequentTimePassed = (Date.getSecondsFrom(originTime)>60); 
				if(consequentTimePassed) {
					if((precision == "days") || (precision == "hours") || (precision == "minutes") || (precision == "seconds")) tObj = Date.cutPassedTimeFrom(originTime,true);
					else tObj = Date.cutTimeToGoTo(originTime,false);
					for(timeUnit in tObj) {
						if(tObj[timeUnit] > 0) {
							if(tObj[timeUnit]>1 && plur) tString = tString + tObj[timeUnit] + " " + units[timeUnit]+"s ";								
							else tString = tString + " " + tObj[timeUnit] + " " + units[timeUnit];	
						 	if(precision == undefined || precision == false || timeUnit == precision) break;
						}
					}
					return tString + conclText;	
				}
				else return ifNoTimeText;
			}

			function futureTimeToString(futureTime,futureIntroText,futureConclText,ifPassedText,units,precision,plur) {
				if(futureIntroText == undefined) introText = "";
				if(futureConclText == undefined) conclText = "";
				if(plur == undefined) plur = false;
				if(units == undefined) {
					units = {
						years : "years",
						months : "months",
						weeks : "weeks",
						days : "days",
						hours : "hours",
						minutes : "minutes",
						seconds : "seconds"
					}
				}
				if(precision == true) precision = "seconds";
				var tString = futureIntroText;
				consequentTimePassed = (Date.getSecondsTo(futureTime)>60); 
				if(consequentTimePassed) {
					if((precision == "days") || (precision == "hours") || (precision == "minutes") || (precision == "seconds")) tObj = Date.cutTimeToGoTo(futureTime,true);
					else tObj = Date.cutTimeToGoTo(false);
					for(timeUnit in tObj) {
						if(tObj[timeUnit] > 0) {
							if(tObj[timeUnit]>1 && plur) tString = tString + tObj[timeUnit] + " " + units[timeUnit]+"s ";								
							else tString = tString + tObj[timeUnit] + " " + units[timeUnit];
						 	if(precision == undefined || precision == false || timeUnit == precision) break;
						}
					}
					return tString + conclText;	
				}
				else return ifPassedText;
			}

			function whenHappened(originTime) {
				return timePassedToString(originTime,currentLang.timeWords.intro,currentLang.timeWords.concl,currentLang.timeWords.ifNoTime,currentLang.shortTimeUnits,"days",false);
			}

			function timeToArriveAt(deadline) {
				return futureTimeToString(deadline,currentLang.timeWords.introFuture,currentLang.timeWords.conclFuture,currentLang.timeWords.ifPassed,currentLang.shortTimeUnits,"days",false);
			}

			function formateDate(dateToFormate) {
				return Date.formateIn(dateToFormate,currentLang.timeFormate);
			}

			function formateDateInString(dateToFormate) {
				dateObj = new Date(dateToFormate);
				timePassed = dateObj.getTime-Date.now();
				if(Math.abs(timePassed)>1000*3600*24*365) {
					return currentLang.dayNames[dateObj.getDay()] + " " + dateObj.getDate() + " " + currentLang.monthNames[dateObj.getMonth()] + " " + dateObj.getFullYear();
				}
				else {
					return currentLang.dayNames[dateObj.getDay()] + " " + dateObj.getDate() + " " + currentLang.monthNames[dateObj.getMonth()];
				}
			}