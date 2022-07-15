# fetching census data

This directory houses a jupyter notebook to transform U.S. census data on the great migration into geojson data.

The final dataset exists at `$PROJECT_ROOT/src/data/great-migration-places-topo.json`. The GeoJSON output from this notebook was converted to TopoJSON via [mapshaper](https://mapshaper.org/)

## Requirements

- Python 3.5+
- [Poetry](https://python-poetry.org/)

## Quickstart

```bash
cd tasks/census

# with poetry installed
poetry install # installs deps

# run jupyter notebook
poetry run jupyter lab

# see `place-data-etl.ipynb` for pipeline logic
```