# ThinkWAM project website

[Project page](https://thinkwam-project.github.io/)

A static academic project page hosted by GitHub Pages from the `main` branch.

## Edit

- `index.html`: page structure, abstract, resource buttons, and BibTeX.
- `site-data.js`: author order, affiliations, demo selection, benchmark tables, inference timings, and figure captions.
- `app.js`: camera switching, galleries, comparison tabs, figure zoom, and citation copying.
- `academic.css`: presentation and responsive layout; `styles.css` supplies the base styles.
- `assets/`: published images, videos, and the downloadable benchmark comparison CSV.

Preview with `python3 -m http.server 4173`, then open `http://localhost:4173`.
Push changes to `main` to update GitHub Pages. No build step is required. Bump the asset query version in `index.html` when updating CSS or JavaScript to refresh cached assets.

## Pending resources

Set `arxivUrl` in `site-data.js` after the preprint is available and update the BibTeX in `index.html`. The arXiv button keeps its icon when activated. Project GitHub links point to `https://github.com/HaoyunT/Thinkwam`.

The real-world results table is configured in `realWorldComparison`, alongside its RTX 4080 SUPER latency values. Fill `success_rate` only when the measured values are supplied; the success-rate column stays hidden while all values are null. The A100 simulation timings and native chunk specifications are shown separately from `latency`.

## Media and results

Real-world demonstrations retain each full selected recording. Simulation camera buttons select synchronized views of the same episode; no frames are synthesized. RoboTwin examples replay archived policy actions at 25 fps and are presented at 3× simulation speed. RoboCasa24 examples are from a fixed-scene adaptation run and are separate from the benchmark aggregates. Selected demonstrations are qualitative examples, not a success-rate estimate.

The six real-world videos come from the supplied `real AIZ.zip`, with one shared instruction: “Put the green objects into the nearby box.” Two recordings include human target repositioning. The gallery presents two demonstrations per scene-condition tab. Each original 1280×480 recording contains two adjacent camera panels; the website presents the complete 640×480 scene and wrist panels through synchronized view buttons, using H.264 High/yuv420p at CRF 17. No task-region zoom, timeline trimming, frame interpolation, or playback-rate change is applied. Original dual-view recordings remain available in the assets directory.

LIBERO-family and RoboTwin keyframe comparisons are laid out from the original paper PDFs: four frames touch within each lettered case, while neighboring cases retain a 20 pt gap. Source imagery, annotations, and branch labels are retained. Mechanism figures form three desktop rows: memory with horizon allocation, latent correction with closed-loop trajectories, and LIBERO-family keyframes with RoboTwin keyframes. These pairs stack on mobile. Author links without a known URL render as ordinary text. Brand-icon source notices are in `THIRD_PARTY_NOTICES.txt`.

Comparison values follow the project manuscript. Timing notes distinguish model-call latency from simulator time and describe the different native chunk configurations.
