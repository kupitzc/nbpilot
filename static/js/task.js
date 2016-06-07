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
};

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
	var stimtime 		= 250;
	var ISI 			= 500; // CHANGEBACK 2500;
	//var resptimeout		= 100; // how long before they can respond

	// PRESENTATION VARIABLES:
	var stimsize		= 80;
	var stimcolor		= "black";

	//EXPT CONTROL VARIABLES:
	var nlevel          //instantiate for full scope
	var nlevelblocks 	= [2, 3]; //CHANGEBACK [2, 2, 3, 3, 4, 4];
	var ntargets 		= 2; //CHANGEBACK 6;
	var nnontargets 	= 2; //CHANGEBACK 12;
	var ntrials			= ntargets + nnontargets;

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

	//STIMULUS VARIABLES
	var stimletters = ["C","D","K","P","Q","T","V"]; //from Jaeggi & Buschkuehl's
	var nletters = stimletters.length;
	//instantiating these here allows for manipulation in a block manager function
	//without losing them to changes in scope
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

			stim = stims.shift();
			show_word( stim[0], stimcolor );
			letteron = new Date().getTime();
			listening = true; //essentially activates the response_handler()

			//executes the code inside the anonymous function after a specified time
			//e.g. this clears the stimulus after 'stimtime' ms
			setTimeout(function() {
    			remove_word();
			}, stimtime);
		}
	};

	//CONTROLS BLOCKS
	var nextblock = function() {
		if (nlevelblocks.length===0) {
			finish();
		}
		else {
			// block begin (prepare everything)

			//extracts the nlevel of the block to be run
			nlevel = nlevelblocks.shift();

			// easy setup of stimulus presentations
			var tmpar1		= new Array(ntargets).fill(1);
			var tmpar2		= new Array(nnontargets).fill(2);
			var tmpar3	 	= tmpar1.concat(tmpar2);
			tmpar3 			= _.shuffle(stimID);

			// prepend nlevel non-targets to the sequence after randomizing
			var tmpar4 		= new Array(nlevel).fill(2);

			// not using var - these are task scope variables
			stimID 			= tmpar4.concat(tmpar3);
			letterID		= new Array(stimID.length).fill(0); //prefer number IDs for data 
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
	    currentview = new Questionnaire();
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
		setTimeout(function() {
    			psiTurk.recordTrialData({	'phase': 		curphase,
                                    		'letter': 		stim[0],
                                     		'stimType': 	stim[1],
                                     		'letterID': 	stim[2],
                                     		'stimID': 		stim[3],
                                     		'response': 	response,
                                     		'respsame': 	respsame,
                                     		'lettertime': 	lettertime,
                                     		'hit': 			hit,
                                     		'rt': 			rt}
                                   );
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
                psiTurk.computeBonus('compute_bonus', function(){finish()}); 
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
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;
var curphase = "NBS_Task";

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new NBS_Task(); } // what you want to do when you are done with instructions
    );
});
