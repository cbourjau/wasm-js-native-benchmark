# Using wasm for numeric computations

This is a small experiment to use wasm for numerical
computations. This crate computes π using an outlandishly inefficient
Monte Carlo algorithm (requiring a PRNG). The point is to get a rough
idea of the execution speeds. The algorithm used generates 2e8 random
floating point numbers. This is also the part of the program where
most time is spend, but it is a common think in scientific computing,
so I left it in the benchmarks. 

I am quite surprised to see such stark difference between Firefox
(wasm & js), Chrome (wasm & js), and native compilation for my
platform (x86_64-unknown-linux-gnu). All benchmarks where performed
with `lto=true` on rustc 1.38.

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
  - wasm avg. of 5 runs: 8568.8 ms
  - js avg. of 5 runs: 1241.1 ms
- Chromium 76 (Note: Chromium was considerably slower on a "cold" run
  in wasm than in the following warm ones):
  - wasm avg. of 5 runs: 1239.3 ms (warm)
  - js avg. of 5 runs: 5598.0 ms
- Native
  - avg. of 5 runs: 981.8 ms

