# Diagrams

This folder contains Mermaid sources for the project's architecture, sequence flow, and ER model. You can generate PNG or SVG images from these sources.

## Files

- `architecture.mmd` — System architecture diagram
- `login-sequence.mmd` — Login flow sequence diagram
- `er-model.mmd` — Database ER model

## Generate Images (PNG)

Prerequisite: Mermaid CLI

```bash
npm install -g @mermaid-js/mermaid-cli
```

Generate all PNGs (run from repository root):

```bash
mmdc -i docs/diagrams/architecture.mmd -o docs/diagrams/architecture.png -t neutral -b transparent
mmdc -i docs/diagrams/login-sequence.mmd -o docs/diagrams/login-sequence.png -t neutral -b transparent
mmdc -i docs/diagrams/er-model.mmd -o docs/diagrams/er-model.png -t neutral -b transparent
```

To generate SVGs, change the output extension to `.svg`.

```bash
mmdc -i docs/diagrams/architecture.mmd -o docs/diagrams/architecture.svg -t neutral -b transparent
```

You can then embed the images in markdown like:

```markdown
![Architecture](docs/diagrams/architecture.png)
```
