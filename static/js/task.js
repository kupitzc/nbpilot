/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to

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
	case 1:
		var Fresp = "target";
		var Frespsame = 1; 
		var Jresp = "nontarget";
		var Jrespsame = 0;
		break;
	case 2:
		var Fresp = "nontarget";
		var Frespsame = 0; 
		var Jresp = "target";
		var Jrespsame = 1;
		break;
	default:
		var Fresp = "target";
		var Frespsame = 1; 
		var Jresp = "nontarget";
		var Jrespsame = 0;
		break;
}

/*
// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
]; 
*/
// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-ready.html"
];

/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* nback TEST       *
********************/
var NBS_Task = function() {

	// Experiment Control Variables
	// TIMING VARIABLES (in ms):
	var stimtime 		= 50; // CHANGEBACK 250;
	var ISI 			= 50; // CHANGEBACK 2500;
	//var resptimeout		= 100; // how long before they can respond

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//EXPT CONTROL VARIABLES:
	var nlevel          //instantiate for full scope
	var nlevelblocks 	= [2, 3]; //CHANGEBACK [2, 2, 3, 3, 4, 4];
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

	var remove_word = function() {
		// the 'letter' attribute is set in the show_word function
		d3.select("#letter").remove();
		letteroff = new Date().getTime();
		lettertime = letteroff - letteron;

		// after ISI ms, record the current trial data, move to next trial
		//THIS IS IN JSON FORMAT
		setTimeout(function() {
    			// psiTurk.recordTrialData({	'phase': 		curphase,
    			// 							'task': 		curtask,
    			// 							'block': 		curblock,
    			// 							'trial': 		curtrial,
       //                              		'letter': 		stim[0],
       //                               		'stimType': 	stim[1],
       //                               		'letterID': 	stim[2],
       //                               		'stimID': 		stim[3],
       //                               		'response': 	response,
       //                               		'respsame': 	respsame,
       //                               		'lettertime': 	lettertime,
       //                               		'hit': 			hit,
       //                               		'rt': 			rt
       //                               	});
       
       psiTurk.recordTrialData([curphase,curtask,curblock,curtrial,stim[0],stim[1],stim[2],stim[3],response,respsame,lettertime,hit,rt]);
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

	if (taskorder.length===0) {
			currentview = new Questionnaire(); //done!
		}
	else {
		// block begin (prepare everything)

		curtaskIndex 	= curtaskIndex + 1;  //increment task counter
		curtaskID 		= taskorder.shift(); //get next task

		switch (curtaskID) {
		case 1:
			curtask = "NBS";
			currentview = new NBS_Task();
			break;
		case 2:
			curtask = "NBR";
			currentview = new NBR_Task();
			break;
		case 3:
			curtask = "CPT";
			currentview = new CPT_Task();
			break;
		default:
			curtask = "Broken";
			currentview = new Questionnaire();
			break;
		}//switch
	}//else

	


}; //Task_Controller


// Task management variables
var currentview;
var curtask
var curtaskID
var curphase 	 = "Main";
var curtaskIndex = 0;

taskorder = [1, 1]; //CHANGEBACK --REMOVEME!

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
    );
});
