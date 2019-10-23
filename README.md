# Using wasm for numeric computations

This is a small experiment to use wasm for numerical
computations. This crate computes π using an outlandishly inefficient
Monte Carlo algorithm (requiring a PRNG). The point is to get a rough
idea of the execution speeds. The algorithm used generates 2e8 random
floating point numbers. This is also the part of the program where
most time is spend, but it is a common thing in scientific computing,
so I left it in the benchmarks. Also note that the PRNG implementations in the js and Rust code are different! So take these numbers with a pack of salt.

~~I am quite surprised to see such stark difference between Firefox
(wasm & js), Chrome (wasm & js), and native compilation for my
platform (x86_64-unknown-linux-gnu)~~. **Edit**: Seems like I ran the test with a cached wasm file on Firefox. After clearing the cache, the results are more as I expected, i.e. native < wasm < js.

All benchmarks were performed with `lto=true` compiled in release mode with on rustc 1.38.

## Execution

After cloning this repository do the following to run the "benchmarks" locally.
``` shell
# Native "benchmark"
cargo t --release -- --nocapture
# Wasm/js
wasm-pack build --release
cd www
npm install
npm run start
# Navigate to the given page in your browser of choice and check the consol log
```

## Results
- Firefox 69:
  - wasm avg. of 5 runs: ~~8568.8 ms~~ 1340ms
  - js avg. of 5 runs: ~~1241.1 ms~~ 1400ms
- Chromium 76 (Note: Chromium was considerably slower on a "cold" run
  in wasm than in the following warm ones):
  - wasm avg. of 5 runs: 1240 ms (warm)
  - js avg. of 5 runs: 5600 ms
- Native
  - avg. of 5 runs: 982 ms

