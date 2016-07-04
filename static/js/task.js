/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

// This magic prevents a crash if the user accepts the HIT but then immediately closes
psiTurk.recordTrialData({'phase':'mysqlsaver'});
psiTurk.recordUnstructuredData('empty', 'mysqlsaver');
psiTurk.saveData();

// var mycondition = condition;  // these two variables are passed by the psiturk server process
// var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to

var mycondition 		= psiTurk.taskdata.get('condition');  // these two variables are passed by the psiturk server process
var mycounterbalance 	= psiTurk.taskdata.get('counterbalance'); ;  // they tell you which condition you have been assigned to

mycondition++;
mycounterbalance++;

var isdebugrun 		= 1; 	//SET ME TO 0 FOR REAL RUN!
var istimedebugrun 	= 1;
var isrespdebugrun 	= 1;
//alert(mycondition);
//alert(mycounterbalance);

var pages = [
"stage.html",
"postquestionnaire.html"
];

var instructionPages = []; //setup
var instructionPagesNBS2 = []; // NBS2
var instructionPagesNBS3 = []; // NBS3
var instructionPagesNBR2 = []; //NBR2
var instructionPagesNBR3 = []; //NBR3
var instructionPagesCPT = []; //CPT

//if psiturk's variables for counterbalancing fail for some reason
//selecting condition (task order) and counterbalance (targetkey)
//randomly should be close to true counterbalance with all the participants
//if (mycondition===0) {
//	mycondition = 1 + Math.floor(Math.random() * 6);
//}
//if (mycounterbalance===0) {
//	mycounterbalance = 1 + Math.floor(Math.random() * 2);
//}

//counterbalancing task order (1/2 are both NBS, 3/4 are both NBR)
// switch (mycondition) {
// 	case 1:
// 	var taskorder = [1, 2, 3, 4, 5];
// 	break;
// 	case 2:
// 	var taskorder = [1, 2, 5, 3, 4];
// 	break;
// 	case 3:
// 	var taskorder = [3, 4, 1, 2, 5];
// 	break;
// 	case 4:
// 	var taskorder = [3, 4, 5, 1, 2];
// 	break;
// 	case 5:
// 	var taskorder = [5, 1, 2, 3, 4];
// 	break;
// 	case 6:
// 	var taskorder = [5, 3, 4, 1, 2];
// 	break;
// 	default:
// 	var taskorder = [1, 2, 3, 4, 5];
// 	break;
// }

//counterbalancing task order (1/2 are both NBS, 3/4 are both NBR)
switch (mycondition) {
	case 1:
	var taskorder = [5, 1, 2, 3, 4];
	break;
	case 2:
	var taskorder = [5, 3, 4, 1, 2];
	break;
	default:
	var taskorder = [5, 1, 2, 3, 4];
	break;
}

switch (mycounterbalance) {
	case 1: //f is target
	var Fresp 		= "target";
	var Frespsame 	= 1; 
	var Jresp 		= "nontarget";
	var Jrespsame 	= 0;
	var tarkey 		= "f"

	var tarquery 	= "Target Key = F; Non-Target Key = J";

	instructionPages = instructionPages.concat([
		"instructions/base-inst-f.html"]);

		//NBS2
		instructionPagesNBS2 = instructionPagesNBS2.concat([
			"instructions/nbs-inst-2f.html"]);

		//NBS3
		instructionPagesNBS3 = instructionPagesNBS3.concat([
			"instructions/nbs-inst-3f.html"]);

		//NBR2
		instructionPagesNBR2 = instructionPagesNBR2.concat([
			"instructions/nbr-inst-2f.html"]);

		//NBR3
		instructionPagesNBR3 = instructionPagesNBR3.concat([
			"instructions/nbr-inst-3f.html"]);

		//CPT
		instructionPagesCPT = instructionPagesCPT.concat([
			"instructions/cpt-inst-f.html"]);
		break;

	case 2: //j is target
	var Fresp 		= "nontarget";
	var Frespsame 	= 0; 
	var Jresp 		= "target";
	var Jrespsame 	= 1;
	var tarkey 		= "j";

	var tarquery 	= "Target Key = J; Non-Target Key = F";

	instructionPages = instructionPages.concat([
		"instructions/base-inst-j.html"]);

		//NBS2
		instructionPagesNBS2 = instructionPagesNBS2.concat([
			"instructions/nbs-inst-2j.html"]);

		//NBS3
		instructionPagesNBS3 = instructionPagesNBS3.concat([
			"instructions/nbs-inst-3j.html"]);

		//NBR2
		instructionPagesNBR2 = instructionPagesNBR2.concat([
			"instructions/nbr-inst-2j.html"]);

		//NBR3
		instructionPagesNBR3 = instructionPagesNBR3.concat([
			"instructions/nbr-inst-3j.html"]);

		//CPT
		instructionPagesCPT = instructionPagesCPT.concat([
			"instructions/cpt-inst-j.html"]);
		break;

		default:
		var Fresp 		= "target";
		var Frespsame 	= 1; 
		var Jresp 		= "nontarget";
		var Jrespsame 	= 0;
		var tarkey 		= "f";

		var tarquery 	= "Target Key = F; Non-Target Key = J";

		instructionPages = instructionPages.concat([
			"instructions/base-inst-f.html"]);

		//NBS2
		instructionPagesNBS2 = instructionPagesNBS2.concat([
			"instructions/nbs-inst-2f.html"]);

		//NBS3
		instructionPagesNBS3 = instructionPagesNBS3.concat([
			"instructions/nbs-inst-3f.html"
			]);

		//NBR2
		instructionPagesNBR2 = instructionPagesNBR2.concat([
			"instructions/nbr-inst-2f.html"]);

		//NBR3
		instructionPagesNBR3 = instructionPagesNBR3.concat([
			"instructions/nbr-inst-3f.html"]);

		//CPT
		instructionPagesCPT = instructionPagesCPT.concat([
			"instructions/cpt-inst-f.html"]);
		break;
	}
	//NBS2
	instructionPagesNBS2 = instructionPagesNBS2.concat([
		"instructions/inst-prac.html"]);

	//NBS3
	instructionPagesNBS3 = instructionPagesNBS3.concat([
		"instructions/inst-prac.html"]);

	//NBR2
	instructionPagesNBR2 = instructionPagesNBR2.concat([
		"instructions/inst-prac.html"]);

	//NBR3
	instructionPagesNBR3 = instructionPagesNBR3.concat([
		"instructions/inst-prac.html"]);

	//CPT
	instructionPagesCPT = instructionPagesCPT.concat([
		"instructions/inst-prac.html"]);

	interludePages = ["instructions/inst-interlude.html"];

	pages = pages.concat(
		instructionPages,
		instructionPagesNBS2,
		instructionPagesNBS3,
		instructionPagesNBR2,
		instructionPagesNBR3,
		instructionPagesCPT,
		interludePages);


//after everything has been setup, (MUST) preload pages we're going to use
psiTurk.preloadPages(pages);


var show_word = function(text, color) {
	d3.select("#stim")
	.append("div")
	.attr("id","letter")
	.style("color",color)
	.style("text-align","center")
	.style("font-size","150px")
	.style("font-weight","400")
	.style("margin","20px")
	.text(text);
};

var show_sentence = function(text, color, textsize) {
	d3.select("#stim")
	.append("div")
	.attr("id","letter")
	.style("color",color)
	.style("text-align","center")
	.style("font-size",textsize)
	.style("font-weight","400")
	.style("margin","20px")
	.text(text);
};

var show_query= function() { //(text, color) {
	d3.select("#query")
	.append("div")
	.attr("id","cquery")
	.style("color",querycolor) //color
	.style("text-align","center")
	.style("font-size","20px")
	.style("font-weight","200")
	.style("margin","20px")
	.text(curquery); //text
};

/**************************************
***************************************
***************************************
*****  		NBACK STANDARD  	  *****
***************************************
***************************************
**************************************/
var NBS_Task = function() {

	// Experiment Control Variables
	// TIMING VARIABLES (in ms):
	var stimtime 	= 500;
	var ISI 		= 2500;
	var ntargets 	=  nbsTAR;
	var nnontargets =  nbsNONTAR;

	if (isprac===1) { //override for practice
		ntargets =  nbsTARprac;
		nnontargets =  nbsNONTARprac;
	}

	if (istimedebugrun===1) { //override for debugging
		var stimtime 		= 25;
		var ISI 			= 25;
	//	var ntargets 		= 2; 
	//	var nnontargets 	= 2; 
	}


	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//EXPT CONTROL VARIABLES:
	var nlevel          //instantiate for full scope
	

	//TRIAL RECORDING VARIABLES
	var letteron 	// time letter is presented
	var letteroff	// time letter is removed
	var lettertime  // total time letter is shown
	var gotresp 	= false;
	var respsame 	= -1;
	var response 	= "noresp";
	var listening 	= false;
	var hit 		= -1;
	var rt 			= -1; 

	var curblock		= 0;
	var curtrial		= 0; //need my own trial counter

	//STIMULUS VARIABLES
	var stimletters = ["C","D","K","P","Q","T","V"]; //from Jaeggi & Buschkuehl's verbatim
	var nletters = stimletters.length;
	//instantiate to set task scope
	var stims 
	var stimID
	var letterID

	//CONTROLS INDIVIDUAL TRIALS
	var nexttrial = function() {
		if (stims.length===0) {
			nextblock();
		}
		else {
			// trial begin (reset everything)
			gotresp 	= 0;
			respsame 	= -1;
			response 	= "noresp";
			hit 		= -1;
			rt 			= -1; 

			curtrial 	= curtrial + 1; //increment trial

			stim = stims.shift();
			show_word( stim[0], stimcolor );
			letteron = new Date().getTime();
			listening = true; //essentially activates the response_handler()

			//executes the code inside the anonymous function after a specified time
			//e.g. this clears the stimulus after 'stimtime' ms
			setTimeout(function() {
				remove_word();
			}, stimtime);
		}//else
	};

	//CONTROLS BLOCKS
	var nextblock = function() {
		if (nlevelblocks.length===0) {
			finish();
		}
		else {
			// if (isprac===1) {
			// 	alert("Starting Prac");
			// }
			// else {
			// 	alert("Starting Nonprac");
			// }
			// block begin (prepare everything)

			curblock		= curblock + 1; 		//increment block counter
			curtrial 		= 0; 					//reset trial counter 
			nlevel 			= nlevelblocks.shift(); //get nlevel of this block

			// easy setup of stimulus presentations
			var tmpar1		= new Array(ntargets).fill(1);
			var tmpar2		= new Array(nnontargets).fill(2);
			var tmpar3	 	= tmpar1.concat(tmpar2);
			tmpar3 			= _.shuffle(tmpar3);

			// prepend nlevel non-targets to the sequence after randomizing
			var tmpar4 		= new Array(nlevel).fill(2);

			// not redeclaring vars - these are task scope variables
			stimID 			= tmpar4.concat(tmpar3);
			letterID		= new Array(stimID.length).fill(0); //prefer numbers for data 
			stims 			= []; // reset to empty array

			// selects stimulus letters for each trial; nontargets are chosen randomly
			for (i = 0; i < stimID.length; i++) {

				letterID[i] = Math.floor(Math.random() * nletters);

				//TARGET TRIAL
				if (stimID[i]===1) { 	
					letterID[i] = letterID[i - nlevel];
					stims.push([ stimletters[letterID[i]] , "target", letterID[i], stimID[i] ]);
				} //if
				//NONTARGET TRIAL
				else { 					
					if (i > (nlevel-1)) { 
						while (letterID[i]===letterID[i-nlevel]) {
							letterID[i] = Math.floor(Math.random() * nletters);
						}//while
					}//if
					stims.push([ stimletters[letterID[i]] , "nontarget", letterID[i], stimID[i] ]);
				} //else
			} //for

			tmpphase = "blocksetup";
			psiTurk.recordTrialData({'phase': tmpphase,
									'task': curtask,
									'curtaskindex': curtaskindex,
									'block': taskblockindex,
									'stimID': stimID,
									'letterID': letterID});
			blockstarttime = new Date().getTime();
			nexttrial(); //runs every trial
		} //else
	}; //nextblock
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode;

		// f = 70, j = 74, space = 32
		switch (keyCode) {
			case 70: 	// "F"
			response 	= Fresp;
			respsame 	= Frespsame;
				// response = "target";
				// respsame = 1;
				break;

			case 74: 	// "J"
			response 	= Jresp;
			respsame 	= Jrespsame;
				// response = "nontarget";
				// respsame = 0;
				break;

				default:
				response = "";
				respsame = -1; //redundant but w/e
				break;
		}//switch

		if (response.length>0) {
			listening 	= false;
			gotresp 	= 1;
			if (response==stim[1]) {
				hit 	= 1;
			} else {
				hit 	= 0;
			}
			rt 			= new Date().getTime() - letteron;
		} // if (response.length>0) {
	}; //response_handler

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Task_Controller();
	}; //finish

	var remove_word = function() {
		// the 'letter' attribute is set in the show_word function
		d3.select("#letter").remove();
		letteroff = new Date().getTime();
		lettertime = letteroff - letteron;

		if (isrespdebugrun===1){

			if (Math.random() > 0.5) {
				response 	= Jresp;
				respsame 	= Jrespsame;
			}
			else {
				response 	= Fresp;
				respsame 	= Frespsame;
			}
			listening 	= false;
			gotresp 	= 1;
			if (response==stim[1]) {
				hit 	= 1;
			} else {
				hit 	= 0;
			}
			rt 			= Math.floor(Math.random() * 500) + 250;
		}//isrespdebugrun

		// after ISI ms, record the current trial data, move to next trial
		setTimeout(function() {
			psiTurk.recordTrialData([curtask,curphase,TID,isprac,curtaskindex,taskblockindex,curtrial,stim[0],stim[1],stim[2],stim[3],response,respsame,lettertime,hit,rt]);
			nexttrial();
		}, ISI);
	}; //remove_word

	
	psiTurk.showPage('stage.html'); // Load the stage.html snippet into the body of the page

	//basic task reminder at top
	// temptest = '<p id="prompt">2-back. F = Target, J = Non-Target.</p>';
	// d3.select("#query").html(temptest);
	show_query();

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	setTimeout(function() {
		nextblock();
	}, begindelay);
};

/**************************************
***************************************
***************************************
*****  		NBACK RESET  	  *****
***************************************
***************************************
**************************************/
var NBR_Task = function() {

	// Experiment Control Variables
	// TIMING VARIABLES (in ms):
	var stimtime 	= 500;
	var ISI 		= 2500;
	var ntargets 	=  nbrTAR + nbrTARadjuster;
	var nnontargets =  nbrNONTAR;

	if (isprac===1) { //override for practice
		ntargets =  nbrTARprac;
		nnontargets =  nbrNONTARprac;
	}

	if (istimedebugrun===1) { //override for debugging
		var stimtime 		= 25;
		var ISI 			= 25;
	//	var ntargets 		= 2; 
	//	var nnontargets 	= 2; 
	}

//	if (isdebugrun===1) {
//		var stimtime 		= 25;
//		var ISI 			= 25;
//		var ntargets 		= NBRtar
//		var nnontargets 	= 2; 
//	}
//	else {
//		var stimtime 		= 250;
//		var ISI 			= 2500;
//		var ntargets 		= 6;
//		var nnontargets 	= 12;
//	}

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//EXPT CONTROL VARIABLES:
	var nlevel          //instantiate for full scope

	//N-BACK RESET SPECIAL VARIABLES:
	var ntargetsans		= 0;
	var nnontargetsans 	= 0;
	var nresets 		= 0;
	var nseqlength		= 0;

	//TRIAL RECORDING VARIABLES
	var letteron 	// time letter is presented
	var letteroff	// time letter is removed
	var lettertime  // total time letter is shown
	var gotresp 	= false;
	var respsame 	= -1;
	var response 	= "noresp";
	var listening 	= false;
	var hit 		= -1;
	var rt 			= -1; 

	var curblock		= 0;
	var curtrial		= 0; //need my own trial counter

	//STIMULUS VARIABLES
	var stimletters = ["C","D","K","P","Q","T","V"]; //from Jaeggi & Buschkuehl's verbatim
	var nletters = stimletters.length;
	//instantiate to set task scope
	var stims 
	var stimID
	var letterID

	//CONTROLS INDIVIDUAL TRIALS
	var nexttrial = function() {
		if (stims.length===0) {
			nbrTARadjuster = 0;
			nextblock();
		}
		else if (curtrial > nbrTrialLimit) {
			nbrTARadjuster = ntargets - ntargetsans;
			nextblock();
		}
		else {
			// trial begin (reset everything)
			gotresp 	= 0;
			respsame 	= -1;
			response 	= "noresp";
			hit 		= -1;
			rt 			= -1; 

			curtrial 	= curtrial + 1; //increment trial

			stim = stims.shift();
			show_word( stim[0], stimcolor );
			letteron = new Date().getTime();
			listening = true; //essentially activates the response_handler()

			//executes the code inside the anonymous function after a specified time
			//e.g. this clears the stimulus after 'stimtime' ms
			setTimeout(function() {
				remove_word();
			}, stimtime);
		}//else
	};

	//CONTROLS BLOCKS
	var nextblock = function() {
		if (nlevelblocks.length===0) {
			finish();
		} //if
		else {
			// block begin (prepare everything)

			curblock		= curblock + 1; 		//increment block counter
			curtrial 		= 0; 					//reset trial counter 
			nlevel 			= nlevelblocks.shift(); //get nlevel of this block

			ntargetsans		= 0;
			nnontargetsans 	= 0;
			nresets 		= 0;
			nseqlength		= 0;

			// easy setup of stimulus presentations
			var tmpar1		= new Array(ntargets).fill(1);
			var tmpar2		= new Array(nnontargets).fill(2);
			var tmpar3	 	= tmpar1.concat(tmpar2);
			tmpar3 			= _.shuffle(tmpar3);

			// prepend nlevel non-targets to the sequence after randomizing
			var tmpar4 		= new Array(nlevel).fill(2);

			// not redeclaring vars - these are task scope variables
			stimID 			= tmpar4.concat(tmpar3);
			letterID		= new Array(stimID.length).fill(0); //prefer numbers for data 
			stims 			= []; // reset to empty array

			// selects stimulus letters for each trial; nontargets are chosen randomly
			for (i = 0; i < stimID.length; i++) {

				letterID[i] = Math.floor(Math.random() * nletters);

				//TARGET TRIAL
				if (stimID[i]===1) { 	
					letterID[i] = letterID[i - nlevel];
					stims.push([ stimletters[letterID[i]] , "target", letterID[i], stimID[i] ]);
				} //if
				//NONTARGET TRIAL
				else { 					
					if (i > (nlevel-1)) { 
						while (letterID[i]===letterID[i-nlevel]) {
							letterID[i] = Math.floor(Math.random() * nletters);
						}//while
					}//if
					stims.push([ stimletters[letterID[i]] , "nontarget", letterID[i], stimID[i] ]);
				} //else
			} //for

			tmpphase = "blocksetup";
			psiTurk.recordTrialData({'phase': tmpphase,
									'task': curtask,
									'curtaskindex': curtaskindex,
									'block': taskblockindex,
									'stimID': stimID,
									'letterID': letterID});
			blockstarttime = new Date().getTime();
			nexttrial(); //runs every trial
		} //else
	};//nextblock
	
	var do_reset = function() {
			// re-setup remainder of stimulus presentations
			// d3.select("#letter").remove();
			show_sentence("Begin new Sub-sequence.",stimcolor,"60px");
			var newntars 	= ntargets - ntargetsans;
			// var newnnontars = Math.max( (nnontargets - nnontargetsans), Math.ceil((newntars * nbrTARtoNONTARratio)) );
			var newnnontars = Math.ceil(newntars * nbrTARtoNONTARratio);
			newnnontars = newnnontars - nlevel; //prevent growing sequence

			if (newnnontars < 1) { //never just finish with targets, but try and avoid growing seq
				newnnontars = 1;
			}

			if (newntars > 0) {
				var tmpar1		= new Array(newntars).fill(1);
				if (newnnontars > 0) {
					var tmpar2		= new Array(newnnontars).fill(2);
					var tmpar3	 	= tmpar1.concat(tmpar2);
				}
				else {
					var tmpar2		= [];
					var tmpar3 = tmpar1;
				}
			}
			else {
				var tmpar1		= [];
				if (newnnontars > 0) {
					var tmpar2		= new Array(newnnontars).fill(2);
					var tmpar3 = tmpar2;
				}
				else {
					var tmpar2		= [];
					var tmpar3 = [2];
				}
			}
			
			// var tmpar3	 	= tmpar1.concat(tmpar2);
			tmpar3 			= _.shuffle(tmpar3);

			// prepend nlevel non-targets to the sequence after randomizing
			var tmpar4 		= new Array(nlevel).fill(2);

			// not redeclaring vars - these are task scope variables
			stimID 			= tmpar4.concat(tmpar3);
			letterID		= new Array(stimID.length).fill(0); //prefer numbers for data 
			stims 			= []; // reset to empty array

			// selects stimulus letters for each trial; nontargets are chosen randomly
			for (i = 0; i < stimID.length; i++) {

				letterID[i] = Math.floor(Math.random() * nletters);

				//TARGET TRIAL
				if (stimID[i]===1) { 	
					letterID[i] = letterID[i - nlevel];
					stims.push([ stimletters[letterID[i]] , "target", letterID[i], stimID[i] ]);
				} //if
				//NONTARGET TRIAL
				else { 					
					if (i > (nlevel-1)) { 
						while (letterID[i]===letterID[i-nlevel]) {
							letterID[i] = Math.floor(Math.random() * nletters);
						}//while
					}//if
					stims.push([ stimletters[letterID[i]] , "nontarget", letterID[i], stimID[i] ]);
				} //else
			} //for

			tmpphase = "reset";
			psiTurk.recordTrialData({'phase': tmpphase,
									'task': curtask,
									'curtaskindex': curtaskindex,
									'block': taskblockindex,
									'stimID': stimID,
									'letterID': letterID,
									'nresets': nresets});

			setTimeout(function() {
				d3.select("#letter").remove();
				setTimeout(function() {
					nexttrial();
       			}, resetdelaypretrial);
       		}, resetdelaytext);


	}; //do_reset

	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode;

		// f = 70, j = 74
		// space = 32
		switch (keyCode) {
			case 32: 	// "spacebar"
			response 	= "reset";
			respsame 	= -2;
			break;

			case 70: 	// "F"
			response 	= Fresp;
			respsame 	= Frespsame;
				// response = "target";
				// respsame = 1;
				break;

			case 74: 	// "J"
			response 	= Jresp;
			respsame 	= Jrespsame;
				// response = "nontarget";
				// respsame = 0;
				break;

				default:
				response = "";
				respsame = -1; //redundant but w/e
				break;
		} //switch

		if (response.length>0) {
			listening 	= false;
			rt 			= new Date().getTime() - letteron; //still want RT as is even on RESET

			if (respsame===-2) {  //RESET RESPONSE
				gotresp = -2;
				hit 	= -2;
				nresets = nresets + 1;
				nseqlength = 0;
			}//if reset
			else {
				nseqlength  = nseqlength + 1; //another answered in a row
				gotresp 	= 1;
				if (response==stim[1]) {
				hit 	= 1;
			} else {
				hit 	= 0;
			}

				if (stim[3]===1) {//target trial
					ntargetsans = ntargetsans + 1;
				}//if
				else { //nontarget trial
					nnontargetsans = nnontargetsans + 1;
				}
			}//else reset

		} // if (response.length>0) {
	}; //response_handler

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Task_Controller();
	}; //finish

	var remove_word = function() {
		// the 'letter' attribute is set in the show_word function
		d3.select("#letter").remove();
		letteroff = new Date().getTime();
		lettertime = letteroff - letteron;

		if (isrespdebugrun===1){

			var tmprnd = Math.random();
			if (tmprnd < 0.4) {
				response 	= Jresp;
				respsame 	= Jrespsame;
			}
			else if (tmprnd < 0.8) {
				response 	= Fresp;
				respsame 	= Frespsame;
			}
			else {
				response 	= "reset";
				respsame 	= -2;
			}

			listening 	= false;
			rt 			= Math.floor(Math.random() * 500) + 250;

			if (respsame===-2) {  //RESET RESPONSE
				gotresp = -2;
				hit 	= -2;
				nresets = nresets + 1;
				nseqlength = 0;
			}//if reset
			else {
				nseqlength  = nseqlength + 1; //another answered in a row
				gotresp 	= 1;
				if (response==stim[1]) {
				hit 	= 1;
			} else {
				hit 	= 0;
			}

				if (stim[3]===1) {//target trial
					ntargetsans = ntargetsans + 1;
				}//if
				else { //nontarget trial
					nnontargetsans = nnontargetsans + 1;
				}
			}//else reset

		}//isrespdebugrun

		// after ISI ms, record the current trial data, move to next trial
		//THIS IS IN JSON FORMAT
		setTimeout(function() {
			psiTurk.recordTrialData([curtask,curphase,TID,isprac,curtaskindex,taskblockindex,curtrial,stim[0],stim[1],stim[2],stim[3],
			response,respsame,lettertime,hit,rt,nresets,nseqlength,ntargetsans,nnontargetsans]);
			if (respsame===-2) {
				do_reset();
			}//if
   			else {
				nexttrial();
			}
   		}, ISI);

	};

	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	//basic task reminder at top
	//d3.select("#query").html('<p id="prompt">2-back. F = Target, J = Non-Target.</p>');
	// var shortinst = '<p id="prompt">2-back. F = Target, J = Non-Target.</p>'
	// d3.select("#query").html(shortinst);
	show_query();

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 
	
	// Start the test
	setTimeout(function() {
		nextblock();
	}, begindelay);
};

/**************************************
***************************************
***************************************
*****  		  AXCPT TASK  	 	  *****
***************************************
***************************************
**************************************/
var CPT_Task = function() {

	// Experiment Control Variables
	// TIMING VARIABLES (in ms):
	if (istimedebugrun===1) {
		var stimtime 		= 15;
		var ISI 		= 15;
	}
	else {
		var stimtime 		= 300;
		var ISI 		= 1000;
	}

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//TRIAL TYPES:
	// 1 - target 			A->X	
 	// 2 - non-target lure	A->Y
	// 3 - non-target X  	B->X
	// 4 - pure distractor	B->Y

	//TRIAL RECORDING VARIABLES
	var letteron 	// time letter is presented
	var letteroff	// time letter is removed
	var lettertime  // total time letter is shown
	var gotresp 	= false;
	var respsame 	= -1;
	var response 	= "noresp";
	var listening 	= false;
	var hit 		= -1;
	var rt 			= -1;
	var trialphase  = 2; // each 'trial' is 2 consecutive letters; this keeps track

	var curblock	= 0;
	var curtrial	= 0; //need my own trial counter

	//STIMULUS VARIABLES
	var stimletters = ["A","X","B","C","D","E","F","G","H","I","J",
	"L","M","N","O","P","Q","R","S","T","U","V","W","Z"]; //from Jaeggi & Buschkuehl's verbatim
	var nletters = stimletters.length;
	//instantiate to set task scope
	var stims 
	var stimID
	var letterID1
	var letterID2

	//CONTROLS INDIVIDUAL TRIALS
	var nexttrial = function() {
		if (stims.length===0) {
			nextblock();
		} //if
		else { // trial begin (reset everything)
			gotresp 	= 0;
			respsame 	= -1;
			response 	= "noresp";
			hit 		= -1;
			rt 			= -1;

			if (trialphase===2) {
				trialphase = 1;
				curtrial++;//increment trial only on 'first' letter
			}
			else if (trialphase===1) {
				trialphase = 2;
			}
			else { trialphase = -1; } //something is broken if we get here

			stim = stims.shift();
			show_word( stim[0], stimcolor );
			letteron = new Date().getTime();
			listening = true; //essentially activates the response_handler()

			//executes the code inside the anonymous function after a specified time
			//e.g. this clears the stimulus after 'stimtime' ms
			setTimeout(function() {
				remove_word();
			}, stimtime);
		}//else
	}; //nextrial

	//CONTROLS BLOCKS
	var nextblock = function() {
		if (curblock===maxblocks) {
			finish();
		} //if
		else {

			// block begin (prepare everything)

			curblock		= curblock + 1; 		//increment block counter
			curtrial 		= 0; 					//reset trial counter 

			// easy setup of stimulus presentations
			var tmpar1		= new Array(trialtypes[0]).fill(1);
			var tmpar2		= new Array(trialtypes[1]).fill(2);
			var tmpar3	 	= new Array(trialtypes[2]).fill(3);
			var tmpar4	 	= new Array(trialtypes[3]).fill(4);

			// not redeclaring vars - these are task scope variables
			stimID 			= tmpar1.concat(tmpar2,tmpar3,tmpar4);
			stimID 			= _.shuffle(stimID);
			letterID1		= new Array(stimID.length).fill(0); //prefer numbers for data
			letterID2		= new Array(stimID.length).fill(0); //prefer numbers for data 
			stims 			= []; // reset to empty array

			var ttype1
			var ttype2

			// selects stimulus letters for each trial; nontargets are chosen randomly
			for (i = 0; i < stimID.length; i++) {

				letterID1[i] = Math.floor(2 + Math.random() * (nletters - 2));
				letterID2[i] = Math.floor(2 + Math.random() * (nletters - 2));

				//TRIAL TYPES:
				switch (stimID[i]) { 
					case 1: 	//  target 	A->X	
						letterID1[i] = 0; //A
						letterID2[i] = 1; //X
						ttype1 = "nontarget";
						ttype2 = "target";
						break;
					case 2: 	//  on-target lure	A->Y
						letterID1[i] = 0; //A
						letterID2[i] = Math.floor(2 + Math.random() * (nletters - 2));
						ttype1 = "nontarget";
						ttype2 = "nontarget";
						break;
					case 3: 	//  non-target X  	B->X
					letterID1[i] = Math.floor(2 + Math.random() * (nletters - 2));
						letterID2[i] = 1; //X
						ttype1 = "nontarget";
						ttype2 = "nontarget";
						break;
					case 4: 	//  pure distractor	B->Y
					letterID1[i] = Math.floor(2 + Math.random() * (nletters - 2));
					letterID2[i] = Math.floor(2 + Math.random() * (nletters - 2));
					ttype1 = "nontarget";
					ttype2 = "nontarget";
					break;
					default:
					letterID1[i] = -1;
					letterID2[i] = -1;
					ttype1 = "broken";
					ttype2 = "broken";
					break;
				}//switch

				stims.push([ stimletters[letterID1[i]], ttype1, letterID1[i], stimID[i] ]);
				stims.push([ stimletters[letterID2[i]], ttype2, letterID2[i], stimID[i] ]);

			} //for

			tmpphase = "blocksetup";
			psiTurk.recordTrialData({'phase': tmpphase, 
									'task': curtask,
									'curtaskindex': curtaskindex,
									'block': taskblockindex,
									'stimID': stimID,
									'letterID1': letterID1,
									'letterID2': letterID2});
			blockstarttime = new Date().getTime();
			nexttrial(); //runs every trial
		} //else
	}; //nextblock

	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode;

		/// f = 70, j = 74, space = 32
		switch (keyCode) {
			case 70: 	// "F"
			response 	= Fresp;
			respsame 	= Frespsame;
			break;

			case 74: 	// "J"
			response 	= Jresp;
			respsame 	= Jrespsame;
			break;

			default:
			response = "";
				respsame = -1; //redundant but w/e
				break;
			} //switch

			if (response.length>0) {
				listening 	= false;
				gotresp 	= 1;
				if (response==stim[1]) {
				hit 	= 1;
			} else {
				hit 	= 0;
			}
				rt 			= new Date().getTime() - letteron;
		} // if (response.length>0) {
	}; //response_handler

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Task_Controller();
	};

	var remove_word = function() {
		// the 'letter' attribute is set in the show_word function
		d3.select("#letter").remove();
		letteroff = new Date().getTime();
		lettertime = letteroff - letteron;

		if (isrespdebugrun===1){

			if (Math.random() > 0.5) {
				response 	= Jresp;
				respsame 	= Jrespsame;
			}
			else {
				response 	= Fresp;
				respsame 	= Frespsame;
			}
			listening 	= false;
			gotresp 	= 1;
			if (response==stim[1]) {
				hit 	= 1;
			} else {
				hit 	= 0;
			}
			rt 			= Math.floor(Math.random() * 500) + 250;
		}//isrespdebugrun
		
		// after ISI ms, record the current trial data, move to next trial
		setTimeout(function() {
			psiTurk.recordTrialData([curtask,curphase,TID,isprac,curtaskindex,taskblockindex,curtrial,trialphase,stim[0],stim[2],stim[3],response,respsame,lettertime,hit,rt]);
			nexttrial();
		}, ISI);
	}; //remove_word

	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	//basic task reminder at top
	// d3.select("#query").html('<p id="prompt">2-back. F = Target, J = Non-Target.</p>');
	show_query(curquery, querycolor);

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	setTimeout(function() {
		nextblock();
	}, begindelay);
};


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});
		//these are for checkboxes (I believe)
		// $('input').each( function(i, val) {
		// 	if (this.checked == true) {
		// 		psiTurk.recordUnstructuredData(this.name, this.value);		
		// 	}
		// });

	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);

		psiTurk.saveData({
			success: function() {
				clearInterval(reprompt);
				psiTurk.completeHIT();
                // psiTurk.computeBonus('compute_bonus', function(){finish()}); 
            }, 
            error: prompt_resubmit
        });
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

	$("#next").click(function () {
		record_responses();
		psiTurk.saveData({
			success: function(){
				psiTurk.completeHIT();
                // psiTurk.computeBonus('compute_bonus', function() { 
                // 	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                // });
            },
            error: prompt_resubmit});
	});
};

var Task_Controller = function() {

	psiTurk.saveData();

	if (taskorder.length===0 && donewtask===1) {
			currentview = new Questionnaire(); //done!
	}//if
	else {

		//record block end times
		if (curtaskindex>0) {
			blockendtime = new Date().getTime();
			blocktime = blockendtime - blockstarttime;

			tmpphase = "block-timing";
			psiTurk.recordTrialData({'phase': tmpphase, 
									'curtask': curtask,
									'curphase': curphase,
									'TID': TID,
									'isprac': isprac,
									'taskIndex':curtaskindex,
									'blockIndex': taskblockindex,
									'blockstarttime': blockstarttime,
									'blockendtime': blockendtime,
									'blocktime': blocktime});
		}

		if (donewtask===1) {
			donewtask 		= 0;
			isprac 			= 1;
			curtaskindex 	= curtaskindex + 1;  //increment task counter
			TID 			= taskorder.shift(); //get next task
			taskblockindex 	= -1;
		}
		else if (isprac===1) {
			isprac 			= 0;
			taskblockindex 	= 1;
		}
		else {
			taskblockindex++;
		}//else

		if (isprac===1) {
			curphase = "prac";
		}
		else {
			curphase = "main";
		}

		switch (TID) {
			case 1:
			curtask = "NBS2";

			curquery = "Target: Same Letter 2-Back. ";
			curquery = curquery.concat(tarquery);

			if (isprac===1) {
				nlevelblocks = [2]; // one block of 2-back

				psiTurk.doInstructions(
	    		instructionPagesNBS2, // a list of pages you want to display in sequence
	    		function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
	    		);
			}//if

			else {
				tblockind[TID]++;
				if (tblockind[TID]>tblocks[TID]) {
					donewtask = 1;
					currentview = new Task_Controller();
				} //if
				else {
					nlevelblocks = [2];
					psiTurk.doInstructions(
		    		interludePages, // a list of pages you want to display in sequence
		    		function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
		    		);
				} //else
			}//else
			break;

			case 2:
			curtask = "NBS3";

			curquery = "Target: Same Letter 3-Back. ";
			curquery = curquery.concat(tarquery);

			if (isprac===1) {
				nlevelblocks = [3]; // one block of 3-back

				psiTurk.doInstructions(
	    		instructionPagesNBS3, // a list of pages you want to display in sequence
	    		function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
	    		);
			}//if

			else {
				tblockind[TID]++;
				if (tblockind[TID]>tblocks[TID]) {
					donewtask = 1;
					currentview = new Task_Controller();
				} //if
				else {
					nlevelblocks = [3];
					psiTurk.doInstructions(
		    		interludePages, // a list of pages you want to display in sequence
		    		function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
		    		);
				} //else
			}//else
			break;

			case 3:
			curtask = "NBR2";

			curquery = "Target: Same Letter 2-Back. ";
			curquery = curquery.concat(tarquery, "; Unsure = Spacebar");

			if (isprac===1) {
				nlevelblocks = [2]; // one block of 2-back

				psiTurk.doInstructions(
	    		instructionPagesNBR2, // a list of pages you want to display in sequence
	    		function() { currentview = new NBR_Task(); } // what you want to do when you are done with instructions
	    		);
			}//if

			else {
				tblockind[TID]++;
				if (tblockind[TID]>tblocks[TID]) {
					donewtask = 1;
					currentview = new Task_Controller();
				} //if
				else {
					nlevelblocks = [2];
					psiTurk.doInstructions(
		    		interludePages, // a list of pages you want to display in sequence
		    		function() { currentview = new NBR_Task(); } // what you want to do when you are done with instructions
		    		);
				} //else
			}//else
			break;

			case 4:
			curtask = "NBR3";

			curquery = "Target: Same Letter 3-Back. ";
			curquery = curquery.concat(tarquery, "; Unsure = Spacebar");

			if (isprac===1) {
				nlevelblocks = [3]; // one block of 3-back

				psiTurk.doInstructions(
	    		instructionPagesNBR3, // a list of pages you want to display in sequence
	    		function() { currentview = new NBR_Task(); } // what you want to do when you are done with instructions
	    		);
			}//if

			else {
				tblockind[TID]++;
				if (tblockind[TID]>tblocks[TID]) {
					donewtask = 1;
					currentview = new Task_Controller();
				} //if
				else {
					nlevelblocks = [3];
					psiTurk.doInstructions(
		    		interludePages, // a list of pages you want to display in sequence
		    		function() { currentview = new NBR_Task(); } // what you want to do when you are done with instructions
		    		);
				} //else
			}//else
			break;

			case 5:
			curtask = "CPT";

			curquery = "Target: X that followed A. ";
			curquery = curquery.concat(tarquery);

			if (isprac===1) {

				trialtypes  = cptTTprac;
				maxblocks   = 1; 

				psiTurk.doInstructions(
	    		instructionPagesCPT, // a list of pages you want to display in sequence
	    		function() { currentview = new CPT_Task(); } // what you want to do when you are done with instructions
	    		);
			}//if
			else {
				tblockind[TID]++;
				if (tblockind[TID]>tblocks[TID]) {
					donewtask = 1;
					currentview = new Task_Controller();
				} //if
				else {

				trialtypes = cptTT;
				maxblocks   = 1;
				//donewtask = 1;

					psiTurk.doInstructions(
	    					interludePages, // a list of pages you want to display in sequence
	    					function() { currentview = new CPT_Task(); } // what you want to do when you are done with instructions
	    				);
				};//else
			}//else
			break;

			default:
			curtask = "Broken";
			currentview = new Questionnaire();
			break;
		}//switch
	}//else
}; //Task_Controller


// Task management variables ()
var currentview
var curtask
var TID
var curphase 	 = "Main";
var curtaskindex = 0;

var nlevelblocks
var trialtypes
var maxblocks
var isprac 		= 0;
var donewtask   = 1;

var curquery  	
var querycolor 	= "black"

var begindelay = 4000;
// var resetdelay = 2000;
var resetdelaypretrial = 1500;
var resetdelaytext = 1500;

if (istimedebugrun===1) {
	begindelay = 25;
	resetdelaypretrial = 25;
	resetdelaytext = 25;
}

var blocktime 		= -1;
var blockendtime 	= -1;
var blockstarttime 	= -1;

//Leading -1 to deal with 0-index of JS that I dislike
var tblockind  = [-1, 0, 0, 0, 0, 0];

//Holder that determines how many blocks are done for each task:
//  			  (blank)	NBS2, 	NBS3, 	NBR2, 	NBR3, 	CPT];
var tblocks	    = [-1, 5, 5, 5, 5, 4]; //CHANGEBACK!
//var tblocks = [-1, 1, 1, 1, 1, 1];


//4 trial types described in the CPT_Task function
var cptTTprac 	= [7, 1, 1, 1]; 	//matches python script
var cptTT 		= [42, 6, 6, 6]; 	//matches python script

//per block variables
var nbsTAR			= 6 //6;
var nbsNONTAR		= 12 //12;
var nbsTARprac		= 2;
var nbsNONTARprac	= 4;

var nbrTAR			= 6 // 6;
var nbrNONTAR		= 12 //12;
var nbrTARprac		= 2;
var nbrNONTARprac	= 4;

var nbrTARtoNONTARratio = 2;

var nbrTARadjuster  = 0;
var nbrTrialLimit 	= 36;

//overrides for debugging:
if (isdebugrun===1) {
	//Holder that determines how many blocks are done for each task:
	//  			  	(blank)		NBS2, 	NBS3, 	NBR2, 	NBR3, 	CPT];
	var tblocks	    	= [-1, 		2, 		2, 		2, 		2, 		2];
	var cptTTprac 		= [4, 1, 1, 1];
	var cptTT 			= [4, 1, 1, 1];
	var nbsTAR			= 2 //6;
	var nbsNONTAR		= 2 //12;
	var nbsTARprac		= 2;
	var nbsNONTARprac	= 2;

	var nbrTAR			= 2 // 6;
	var nbrNONTAR		= 2 //12;
	var nbrTARprac		= 2;
	var nbrNONTARprac	= 2;

	// taskorder 	= [1, 2, 3, 4, 5]; //override for debug purposes:
}//if

var tmpphase;

tmpphase = "debug-flag";
psiTurk.recordTrialData({'phase': tmpphase,
						'isdebugrun': isdebugrun,
						'istimedebugrun': istimedebugrun,
						'isrespdebugrun': isrespdebugrun});

tmpphase = "setup-experiment";
psiTurk.recordTrialData({'phase': tmpphase,
						'mycondition': mycondition,
						'mycounterbalance': mycounterbalance,
						'tarkey': tarkey,
						'tblocks': tblocks});

tmpphase = "setup-cpt";
psiTurk.recordTrialData({'phase': tmpphase,
						'cptTTprac': cptTTprac,
						'cptTT': cptTT});

tmpphase = "setup-nbs";
psiTurk.recordTrialData({'phase': tmpphase,
						'nbsTAR': nbsTAR,
						'nbsNONTAR': nbsNONTAR,
						'nbsTARprac': nbsTARprac,
						'nbsNONTARprac': nbsNONTARprac});

tmpphase = "setup-nbr";
psiTurk.recordTrialData({'phase': tmpphase,
						'nbrTAR': nbrTAR,
						'nbrNONTAR': nbrNONTAR,
						'nbrTARprac': nbrTARprac,
						'nbrNONTARprac': nbrNONTARprac,
						'nbrTARtoNONTARratio': nbrTARtoNONTARratio,
						'resetdelaypretrial': resetdelaypretrial,
						'resetdelaytext': resetdelaytext});
/*******************
 * Run Task
 ******************/
 $(window).load( function(){
 	psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new Task_Controller(); } // what you want to do when you are done with instructions
    	);
 });
