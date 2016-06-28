/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

// var mycondition = condition;  // these two variables are passed by the psiturk server process
// var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to

var mycondition = psiTurk.taskdata.get('condition');  // these two variables are passed by the psiturk server process
var mycounterbalance = psiTurk.taskdata.get('counterbalance'); ;  // they tell you which condition you have been assigned to


// All pages to be loaded
// var pages = [
// "instructions/base-inst-1.html",
// "instructions/inst-ready.html",
// "stage.html",
// "postquestionnaire.html",
// "instructions/nbs-inst-stim.html",
// "instructions/nbs-inst-ready.html",
// "instructions/nbr-inst-stim.html",
// "instructions/nbr-inst-ready.html",
// "instructions/cpt-inst-stim.html",
// "instructions/cpt-inst-ready.html"
// ];

var pages = [
"stage.html",
"postquestionnaire.html"
];

var instructionPages = [
"instructions/base-inst-1.html",
"instructions/inst-ready.html"
];

// // NBS
// var instructionPagesNBS2 = [
// "instructions/nbs-inst-stim.html",
// "instructions/nbs-inst-2f.html",
// "instructions/nbs-inst-ready.html"
// ];

// //NBR
// var instructionPagesNBR2 = [
// "instructions/nbr-inst-stim.html",
// "instructions/nbr-inst-ready.html"
// ];

// //CPT
// var instructionPagesCPT = [
// "instructions/cpt-inst-stim.html",
// "instructions/cpt-inst-ready.html"
// ];

// NBS2
var instructionPagesNBS2 = [
"instructions/nbs-inst-stim.html"
];

// NBS3
var instructionPagesNBS3 = [
"instructions/nbs-inst-stim.html"
];

//NBR2
var instructionPagesNBR2 = [
"instructions/nbr-inst-stim.html"
];

//NBR3
var instructionPagesNBR3 = [
"instructions/nbr-inst-stim.html"
];

//CPT
var instructionPagesCPT = [
"instructions/cpt-inst-stim.html"
];



// alert(mycondition, mycounterbalance);

// alert(mycounterbalance);

//if psiturk's variables for counterbalancing fail for some reason
//selecting condition (task order) and counterbalance (targetkey)
//randomly should be close to true counterbalance with all the participants
// if (mycondition===0) {
// 	mycondition = 1 + Math.floor(Math.random() * 6);
// }

// if (mycounterbalance===0) {
// 	mycounterbalance = 1 + Math.floor(Math.random() * 2);
// }

// mycondition = 1;
// mycounterbalance = 2;

//counterbalancing task order; 6 'conditions' 
switch (mycondition) {
	case 1:
	var taskorder = [1, 2, 3];
	break;
	case 2:
	var taskorder = [1, 3, 2];
	break;
	case 3:
	var taskorder = [2, 1, 3];
	break;
	case 4:
	var taskorder = [2, 3, 1];
	break;
	case 5:
	var taskorder = [3, 1, 2];
	break;
	case 6:
	var taskorder = [3, 2, 1];
	break;
	default:
	var taskorder = [1, 2, 3];
	break;
}

switch (mycounterbalance) {
	case 1: //f is target
	var Fresp 		= "target";
	var Frespsame 	= 1; 
	var Jresp 		= "nontarget";
	var Jrespsame 	= 0;
	var tarkey 		= "f";

	//NBS2
	instructionPagesNBS2 = instructionPagesNBS2.concat([
		"instructions/nbs-inst-2f.html"
		]);

	//NBS3
	instructionPagesNBS3 = instructionPagesNBS3.concat([
		"instructions/nbs-inst-3f.html"
		]);

	//NBR2
	instructionPagesNBR2 = instructionPagesNBR2.concat([
		"instructions/nbr-inst-2f.html"
		]);

	//NBR3
	instructionPagesNBR3 = instructionPagesNBR3.concat([
		"instructions/nbr-inst-3f.html"
		]);

	//CPT
	instructionPagesCPT = instructionPagesCPT.concat([
		"instructions/cpt-inst-f.html"
		]);


	break;
	case 2: //j is target
	var Fresp 		= "nontarget";
	var Frespsame 	= 0; 
	var Jresp 		= "target";
	var Jrespsame 	= 1;
	var tarkey 		= "j";

	//NBS2
	instructionPagesNBS2 = instructionPagesNBS2.concat([
		"instructions/nbs-inst-2j.html"
		]);

	//NBS3
	instructionPagesNBS3 = instructionPagesNBS3.concat([
		"instructions/nbs-inst-3j.html"
		]);

	//NBR2
	instructionPagesNBR2 = instructionPagesNBR2.concat([
		"instructions/nbr-inst-2j.html"
		]);

	//NBR3
	instructionPagesNBR3 = instructionPagesNBR3.concat([
		"instructions/nbr-inst-3j.html"
		]);

	//CPT
	instructionPagesCPT = instructionPagesCPT.concat([
		"instructions/cpt-inst-j.html"
		]);

	break;
	default:
	var Fresp 		= "target";
	var Frespsame 	= 1; 
	var Jresp 		= "nontarget";
	var Jrespsame 	= 0;
	var tarkey 		= "f";

	// pages.push("instructions/nbs-inst-2f.html");
	// instructionPagesNBS2.push("instructions/nbs-inst-2f.html");
	//NBS2
	instructionPagesNBS2 = instructionPagesNBS2.concat([
		"instructions/nbs-inst-2f.html"
		]);

	//NBS3
	instructionPagesNBS3 = instructionPagesNBS3.concat([
		"instructions/nbs-inst-3f.html"
		]);

	//NBR2
	instructionPagesNBR2 = instructionPagesNBR2.concat([
		"instructions/nbr-inst-2f.html"
		]);

	//NBR3
	instructionPagesNBR3 = instructionPagesNBR3.concat([
		"instructions/nbr-inst-3f.html"
		]);

	//CPT
	instructionPagesCPT = instructionPagesCPT.concat([
		"instructions/cpt-inst-f.html"
		]);
	break;
}

// //NBS2
// 	instructionPagesNBS2 = instructionPagesNBS2.concat([
// 		"instructions/nbs-inst-ready.html"
// 		]);

// 	//NBS3
// 	instructionPagesNBS3 = instructionPagesNBS3.concat([
// 		"instructions/nbs-inst-3f.html"
// 		]);

// 	//NBR2
// 	var instructionPagesNBR2 = instructionPagesNBR2.concat([
// 		"instructions/nbr-inst-ready.html"
// 		]);

// 	//NBR3
// 	instructionPagesNBR3 = instructionPagesNBR3.concat([
// 		"instructions/nbr-inst-3f.html"
// 		]);

// 	//CPT
// 	var instructionPagesCPT = instructionPagesCPT.concat([
// 		"instructions/cpt-inst-ready.html"
// 		]);

	//NBS2
	instructionPagesNBS2 = instructionPagesNBS2.concat([
		"instructions/inst-prac.html"
		]);

	//NBS3
	instructionPagesNBS3 = instructionPagesNBS3.concat([
		"instructions/inst-prac.html"
		]);

	//NBR2
	instructionPagesNBR2 = instructionPagesNBR2.concat([
		"instructions/inst-prac.html"
		]);

	//NBR3
	instructionPagesNBR3 = instructionPagesNBR3.concat([
		"instructions/inst-prac.html"
		]);

	//CPT
	instructionPagesCPT = instructionPagesCPT.concat([
		"instructions/inst-prac.html"
		]);

	interludePages = ["instructions/inst-interlude.html"];

pages = pages.concat(
	instructionPages,
	instructionPagesNBS2,
	instructionPagesNBR2,
	instructionPagesCPT,
	interludePages);

// alert(instructionPagesNBS2);
// alert(pages);

//after everything has been setup, preload all the pages we're actually going to use
psiTurk.preloadPages(pages);

// alert(pages);
// alert(instructionPagesNBS2);
/*
// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/inst-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/inst-ready.html"
]; 
*/
//var testpagevar = [	"instructions/NBS-instruct-1.html","instructions/NBS-instruct-2.html"];



/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

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
	var stimtime 		= 25; // CHANGEBACK 250;
	var ISI 			= 25; // CHANGEBACK 2500;

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//EXPT CONTROL VARIABLES:
	var nlevel          //instantiate for full scope
	// var nlevelblocks 	= [2, 3, 4]; //CHANGEBACK [2, 2, 3, 3, 4, 4];
	var ntargets 		= 2; //CHANGEBACK 6;
	var nnontargets 	= 2; //CHANGEBACK 12;
	

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

			var tmpphase = "blocksetup";
			psiTurk.recordTrialData({	'phase': 	tmpphase,
				'task': 	curtask,
				'block': 	curblock,
				'stimID': 	stimID,
				'letterID': letterID
			});
                                     	// 'tmpar1': 	tmpar1,
                                     	// 'tmpar2': 	tmpar2,
                                     	// 'tmpar3': 	tmpar3,
                                     	// 'tmpar4': 	tmpar4,
			nexttrial(); //runs every trial
		} //else
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		//var keyCode = e.keyCode,
		//	response;
		var keyCode = e.keyCode;

		// f = 70, j = 74
		// space = 32
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
			}
			if (response.length>0) {
				listening 	= false;
				gotresp 	= 1;
				hit 		= response == stim[1];
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

		// after ISI ms, record the current trial data, move to next trial
		setTimeout(function() {
			psiTurk.recordTrialData([curphase,curtask,curblock,curtrial,stim[0],stim[1],stim[2],stim[3],response,respsame,lettertime,hit,rt,isprac]);
			nexttrial();
		}, ISI);
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	//basic task reminder at top
	temptest = '<p id="prompt">2-back. F = Target, J = Non-Target.</p>';
	d3.select("#query").html(temptest);

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	nextblock();
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
	var stimtime 		= 25; // CHANGEBACK 250;
	var ISI 			= 25; // CHANGEBACK 2500;

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//EXPT CONTROL VARIABLES:
	var nlevel          //instantiate for full scope
	// var nlevelblocks 	= [2, 3, 4]; //= [2, 3]; //CHANGEBACK [2, 2, 3, 3, 4, 4];
	var ntargets 		= 2; //CHANGEBACK 6;
	var nnontargets 	= 2; //CHANGEBACK 12;
	
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

			var tmpphase = "blocksetup";
			psiTurk.recordTrialData({	'phase': 	tmpphase,
				'task': 	curtask,
				'block': 	curblock,
				'stimID': 	stimID,
				'letterID': letterID
			});
                                     	// 'tmpar1': 	tmpar1,
                                     	// 'tmpar2': 	tmpar2,
                                     	// 'tmpar3': 	tmpar3,
                                     	// 'tmpar4': 	tmpar4,
			nexttrial(); //runs every trial
		} //else
	};
	
	var do_reset = function() {
			// re-setup remainder of stimulus presentations
			var tmpar1		= new Array(ntargets-ntargetsans).fill(1);
			var tmpar2		= new Array(nnontargets-nnontargetsans).fill(2);
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

			var tmpphase = "reset";
			psiTurk.recordTrialData({	'phase': 	tmpphase,
				'task': 	curtask,
				'block': 	curblock,
				'stimID': 	stimID,
				'letterID': letterID,
				'nresets': 	nresets
			});
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
			}
			if (response.length>0) {
				listening 	= false;
			rt 			= new Date().getTime() - letteron; //still want RT as is even on RESET

			if (respsame===-2) {  //RESET RESPONSE
				gotresp = -2;
				hit 	= -2;
				nresets = nresets + 1;
				nseqlength = 0;
			}//if
			else {
				nseqlength  = nseqlength + 1; //another answered in a row
				gotresp 	= 1;
				hit 		= response == stim[1];

				if (stim[3]===1) {//target trial
					ntargetsans = ntargetsans + 1;
				}//if
				else { //nontarget trial
					nnontargetsans = nnontargetsans + 1;
				}
			}//else

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

		// after ISI ms, record the current trial data, move to next trial
		//THIS IS IN JSON FORMAT
		setTimeout(function() {
			psiTurk.recordTrialData([curphase,curtask,curblock,curtrial,stim[0],stim[1],stim[2],stim[3],
				response,respsame,lettertime,hit,rt,nresets,nseqlength,ntargetsans,nnontargetsans]);
			if (respsame===-2) {
				do_reset();
       			}//if
       			nexttrial();
       		}, ISI);
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	//basic task reminder at top
	//d3.select("#query").html('<p id="prompt">2-back. F = Target, J = Non-Target.</p>');
	var shortinst = '<p id="prompt">2-back. F = Target, J = Non-Target.</p>'
	d3.select("#query").html(shortinst);

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	nextblock();
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
	var stimtime 		= 15; // CHANGEBACK 250;
	var ISI 			= 15; // CHANGEBACK 1000;

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//TRIAL TYPES:
	// 1 - target 			A->X	
 	// 2 - non-target lure	A->Y
	// 3 - non-target X  	B->X
	// 4 - pure distractor	B->Y
	
	//var trialtypes = [42, 6, 6, 6]; //CHANGEBACK
	// var trialtypes = [4, 1, 1, 1];

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

	// var maxblocks   = 6; //CHANGEBACK 6
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

			// $("body").unbind("keydown", response_handler); // Unbind keys

			// psiTurk.doInstructions(
	  //   		interludePages, // a list of pages you want to display in sequence
	  //   		function() { nextblock(); } // what you want to do when you are done with instructions
	  //   		);
		}
		else {
			// trial begin (reset everything)
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
	};

	//CONTROLS BLOCKS
	var nextblock = function() {
		if (curblock===maxblocks) {
			finish();
		}
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
						ttype2 = "target";
						break;
					case 3: 	//  non-target X  	B->X
					letterID1[i] = Math.floor(2 + Math.random() * (nletters - 2));
						letterID2[i] = 1; //X
						ttype1 = "nontarget";
						ttype2 = "target";
						break;
					case 4: 	//  pure distractor	B->Y
					letterID1[i] = Math.floor(2 + Math.random() * (nletters - 2));
					letterID2[i] = Math.floor(2 + Math.random() * (nletters - 2));
					ttype1 = "nontarget";
					ttype2 = "target";
					break;
					default:
					letterID1[i] = -1;
					letterID2[i] = -1;
					ttype1 = "broken";
					ttype2 = "broken";
					break;
				}

				// stims.push([ 	stimletters[letterID1[i]] , stimletters[letterID2[i]],
				//  				ttype, letterID1[i], letterID2[i], stimID[i] ]);
				stims.push([ stimletters[letterID1[i]], ttype1, letterID1[i], stimID[i] ]);
				stims.push([ stimletters[letterID2[i]], ttype2, letterID2[i], stimID[i] ]);

			} //for

			var tmpphase = "blocksetup";
			psiTurk.recordTrialData({	'phase': 	tmpphase,
				'task': 	curtask,
				'block': 	curblock,
				'stimID': 	stimID,
				'letterID1': letterID1,
				'letterID2': letterID2
			});
                                     	// 'tmpar1': 	tmpar1,
                                     	// 'tmpar2': 	tmpar2,
                                     	// 'tmpar3': 	tmpar3,
                                     	// 'tmpar4': 	tmpar4,
			nexttrial(); //runs every trial
		} //else
	};

	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode;

		/// f = 70, j = 74
		// space = 32
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
			}
			if (response.length>0) {
				listening 	= false;
				gotresp 	= 1;
				hit 		= response == stim[1];
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

		// after ISI ms, record the current trial data, move to next trial
		setTimeout(function() {
			psiTurk.recordTrialData([curphase,curtask,curblock,curtrial,trialphase,stim[0],stim[1],stim[2],stim[3],
				response,respsame,lettertime,hit,rt]);
			nexttrial();
		}, ISI);
	};

	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	//basic task reminder at top
	d3.select("#query").html('<p id="prompt">2-back. F = Target, J = Non-Target.</p>');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	nextblock();
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
	//var taskorder = [1, 2, 3];

	if (taskorder.length===0 && donewtask===1) {
			currentview = new Questionnaire(); //done!
		}
		else {
		if (donewtask===1)
			donewtask = 0;
			isprac = 1;
			dointerlude = 0;
			curtaskIndex 	= curtaskIndex + 1;  //increment task counter
			curtaskID 		= taskorder.shift(); //get next task
			taskblockindex 	= -1;
		}
		// block begin (prepare everything)

		//always start with practice
		// if (isprac===0) {
		// isprac = 1;
		// curtaskIndex 	= curtaskIndex + 1;  //increment task counter
		// curtaskID 		= taskorder.shift(); //get next task
		// dointerlude 	= 1;
		// }
		if (isprac===1) {
		isprac = 0;
		dointerlude = 1;
		taskblockindex 	= 1;
		// curtaskIndex 	= curtaskIndex + 1;  //increment task counter
		// curtaskID 		= taskorder.shift(); //get next task
		}
		else {
			dointerlude = 1;
			taskblockindex++;
		}

		// psiTurk.doInstructions(
  //   		instructionPages, // a list of pages you want to display in sequence
  //   		function() { currentview = new Task_Controller(); } // what you want to do when you are done with instructions
  //   	);


  switch (curtaskID) {
  		case 1:
  			curtask = "NBS";
			// currentview = new NBS_Task();

			if (isprac===1) {
				nlevelblocks = [2]; // one block of 2-back

				psiTurk.doInstructions(
	    		instructionPagesNBS2, // a list of pages you want to display in sequence
	    		function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
	    		);
			}

			else {
				nbs2ind++;
				if (nbs2ind>nbs2blocks) {
					donewtask = 1;
					currentview = new Task_Controller();
				}
				else {
					nlevelblocks = [2];
					psiTurk.doInstructions(
		    		instructionPagesNBS2, // a list of pages you want to display in sequence
		    		function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
		    		);
				}
			}

			break;

		case 2:
			curtask = "NBR";
			// currentview = new NBR_Task();
			if (isprac===1) {
				nlevelblocks = [2]; // one block of 2-back

				psiTurk.doInstructions(
    			instructionPagesNBR2, // a list of pages you want to display in sequence
    			function() { currentview = new NBR_Task(); } // what you want to do when you are done with instructions
    			);
			}//if
			else {
				nlevelblocks = [2];
				donewtask = 1;
				psiTurk.doInstructions(
	    		instructionPagesNBR2, // a list of pages you want to display in sequence
	    		function() { currentview = new NBR_Task(); } // what you want to do when you are done with instructions
	    		);
			}//else
		break;

		case 3:
		curtask = "CPT";

			if (isprac===1) {

				//var trialtypes = [42, 6, 6, 6]; //CHANGEBACK
				trialtypes = [4, 1, 1, 1]
				maxblocks   = 1; //CHANGEBACK 6

				psiTurk.doInstructions(
	    		instructionPagesCPT, // a list of pages you want to display in sequence
	    		function() { currentview = new CPT_Task(); } // what you want to do when you are done with instructions
	    		);
			}//if
			else {

				//var trialtypes = [42, 6, 6, 6]; //CHANGEBACK
				trialtypes = [4, 1, 1, 1]
				maxblocks   = 1; //CHANGEBACK 6

				donewtask = 1;

				psiTurk.doInstructions(
	    		instructionPagesCPT, // a list of pages you want to display in sequence
	    		function() { currentview = new CPT_Task(); } // what you want to do when you are done with instructions
	    		);
			}//else

			break;
			default:
			curtask = "Broken";
			currentview = new Questionnaire();
			break;
		}//switch
	// }//else
}; //Task_Controller


// Task management variables ()
var currentview;
var curtask
var curtaskID
var curphase 	 = "Main";
var curtaskIndex = 0;

var nlevelblocks
var trialtypes
var maxblocks
var isprac 		 = 0;
var dointerlude  = 0;
var donewtask

// var nbs2blocks 	 = [2, 2];
// var nbs3blocks 	 = [3, 3];
// var nbr2blocks   = [2, 2];
// var nbr3blocks 	 = [3, 3];
var taskblockindex

var nbs2blocks 	 = 2;
var nbs2ind		 = 0;
var nbs3blocks 	 = 2;
var nbs3ind 	 = 0;
var nbr2blocks   = 2;
var nbr2ind 	 = 0;
var nbr3blocks 	 = 2;
var nbr3ind 	 = 0;

var cptTTprac 	= [4, 1, 1, 1]; //CHANGEBACK [8, 2, 2, 2]
var cptTT 		= [4, 1, 1, 1]; //[42, 6, 6, 6] //var trialtypes = [42, 6, 6, 6]; //CHANGEBACK
var cptInd 		= 0;
var cptblocks 	= 6;
 
taskorder = [1, 2, 3]; //CHANGEBACK --REMOVEME!


/*******************
 * Run Task
 ******************/
 $(window).load( function(){
 	psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new Task_Controller(); } // what you want to do when you are done with instructions
    	);
 });
