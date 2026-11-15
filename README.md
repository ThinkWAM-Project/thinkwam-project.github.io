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
Push changes to `main` to update GitHub Pages. No build step is required.

## Pending resources

Set `arxivUrl` in `site-data.js` after the preprint is available, update the arXiv resource text and BibTeX in `index.html`, and replace the GitHub organization link with the public code repository when released. Real-world timings are measured on the same NVIDIA RTX 4080 SUPER; keep their hardware context separate from the A100 simulation table.

## Media and results

Real-world demonstrations retain each full selected recording. Simulation camera buttons select synchronized views of the same episode; no frames are synthesized. RoboTwin examples replay archived policy actions at 25 fps and are presented at 3× simulation speed. RoboCasa24 examples are from a fixed-scene adaptation run and are separate from the benchmark aggregates. Selected demonstrations are qualitative examples, not a success-rate estimate.

Comparison values follow the project manuscript. Timing notes distinguish model-call latency from simulator time and describe the different native chunk configurations.
