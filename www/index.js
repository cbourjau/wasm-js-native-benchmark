import * as wasm from "pi-mc";

if (window.Worker) {
    console.log('Starting worker');
    var worker = new Worker('./worker.js');
    // Beware: We wait a moment to make sure the worker is ready!
    window.setTimeout(() => {
	console.log('Sending message');
	for (var i=0; i<5; i++) {
	    worker.postMessage('wasm');
	}
	for (var i=0; i<5; i++) {
	    worker.postMessage('js');
	}
	worker.onmessage = function(e) {
	    console.log('Message received from worker', e.data);
	};
	console.log(worker);
    }, 1000);
}
