/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the nback code but may be useful to you

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
	"instructions/instruct-1.html",
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
var NBExperiment = function() {

	// Experiment Control Variables (timing in ms)
	var stimtime 		= 250;
	var ISI 			= 500; // CHANGE ME BACK TO 2500;
	//var resptimeout		= 100; // how long before they can respond

	var stimsize		= 80;
	var stimcolor		= "black";

	var numblocks		= 1;
	var nlevel			= 2;
	var ntargets 		= 6;
	var nnontargets 	= 12;
	var ntrials			= ntargets + nnontargets;

	// array of stimulus presentations
	var tmpar1			= new Array(ntargets).fill(1);
	var tmpar2			= new Array(nnontargets).fill(2);

	var stimarray 		= tmpar1.concat(tmpar2);

	//set target, non-target keys

	// these are variables in the entire NBExperiment function
	var letteron 	// time letter is presented
	var letteroff	// time letter is removed
	var lettertime  // total time letter is shown
	var gotresp 	= false;
	var respsame 	= -1;
	var response 	= "noresp";
	var listening 	= false;
	var hit 		= -1;
	var rt 			= -1; 

/*
	var stims = [
			["C", "nontarget"],
			["D", "nontarget"],
			["K", "nontarget"],
			["P", "target"],
			["Q", "target"],
			["T", "target"],
			["V", "target"]
		];
		*/
		var stims = [
			["C", "nontarget"],
			["V", "target"]
		];

	stims = _.shuffle(stims);

	var stimletters = [
			"C",
			"D",
			"K",
			"P",
			"Q",
			"T",
			"V"
		];

	var nletters = stimletters.length;

	// array of stimulus presentations
	var tmpar1			= new Array(ntargets).fill(1);
	var tmpar2			= new Array(nnontargets).fill(2);

	// sequence of targets and nontargets
	var stimarray 		= tmpar1.concat(tmpar2);
	stimarray 			= _.shuffle(stimarray);

	// prepend nlevel non-targets to the sequence after randomizing
	var tmpar3 			= new Array(nlevel).fill(2);
	var stimarray 		= tmpar3.concat(stimarray);

	var letterID		= new Array(stimarray.length).fill(0);

	// set up the stims to present; instantiate empty array
	var stims = [];


	for (i = 0; i < stimarray.length; i++) {

		letterID[i] = Math.floor(Math.random() * nletters);

		//target
		if (stimarray[i]===1) {
			// stims.push(["A", "target"]);
			letterID[i] = letterID[i - nlevel];
			stims.push([ stimletters[letterID[i]] , "target", letterID[i] ]);
		} //if
		//notarget
		else { 
			// stims.push(["A", "target"]);
			if (i > (nlevel-1)) { 
				while (letterID[i]===letterID[i-nlevel]) {
					letterID[i] = Math.floor(Math.random() * nletters);
				}
			}
			stims.push([ stimletters[letterID[i]] , "nontarget", letterID[i] ]);
		} //else
	} //for
	

	var next = function() {
		if (stims.length===0) {
			finish();
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
			listening = true;

			//executes the code inside the anonymous function after a specified time
			//e.g. this clears the stimulus after 'stimtime' ms
			setTimeout(function() {
    			remove_word();
			}, stimtime);
		}
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
				response="target";
				respsame=1; 
				break;
			case 74: 	// "J"
				response="nontarget";
				respsame=0;
				break;
			/* case 32: 	// "Spacebar"
				response="blue";
				break; */
			default:
				response = "";
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

		// after ISI ms
		setTimeout(function() {
    			psiTurk.recordTrialData({	'phase':"TEST",
                                    		'letter':stim[0],
                                     		'trialtype':stim[1],
                                     		'response':response,
                                     		'respsame':respsame,
                                     		'lettertime':lettertime,
                                     		'hit':hit,
                                     		'rt':rt}
                                   );
    			next();
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
	next();
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

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new NBExperiment(); } // what you want to do when you are done with instructions
    );
});
