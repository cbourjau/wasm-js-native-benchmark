import("../pkg")
    .then(wasm => {
	self.onmessage = function(ev) {
	    var pi;
	    if (ev.data === 'wasm') {
		console.time("pi-ing in wasm");
		pi = wasm.mc_pi();
		console.timeEnd("pi-ing in wasm");
	    } else if (ev.data === 'js') {
		console.time("pi-ing in js");
		pi = mc_pi_js();
		console.timeEnd("pi-ing in js");
	    } else {
		console.error("Unexpected data", ev.data);
		return;
	    }
	    postMessage(pi);
	};
    });


function mc_pi_js() {
    var n_tot = 1e8;
    var hits = 0;
    for (var i=0; i<n_tot; i++) {
	var x = Math.random();
	var y = Math.random();
        if (Math.sqrt(x * x + y * y) <= 1.0) {
            hits += 1;
        }
    }
    var pi = 4.0 * hits / n_tot;
    return pi;
}
