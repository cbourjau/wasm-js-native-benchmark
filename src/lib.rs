extern crate web_sys;

use std::f64;

use rand::prelude::*;
use wasm_bindgen::prelude::*;

mod utils;

#[wasm_bindgen]
pub fn mc_pi() -> f64 {
    utils::set_panic_hook();
    let n_tot: u64 = 100_000_000;
    let mut hits = 0;
    let mut rng = rand::rngs::SmallRng::seed_from_u64(42);
    for _ in 0..n_tot {
        let (x, y): (f64, f64) = rng.gen();
        if (x * x + y * y).sqrt() <= 1.0 {
            hits += 1;
        }
    }
    dbg!(hits as f64 / n_tot as f64 * 4.0)
}

#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn run() {
        use std::time::Instant;
        let result = (0..5)
            .map(|_| {
                let now = Instant::now();
                dbg!(mc_pi(), now.elapsed().as_millis())
            })
            .fold((0.0, 0), |acc, (pi_approx, dur)| {
                (acc.0 + pi_approx, acc.1 + dur)
            });
        println!("{:?}", result);
    }
}
