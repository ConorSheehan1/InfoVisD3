[![Build Status](https://github.com/ConorSheehan1/InfoVisD3/workflows/ci/badge.svg)](https://github.com/ConorSheehan1/InfoVisD3/actions/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# InfoVisD3
Information visualization project using d3.js

This project uses [nodenv](https://github.com/nodenv/nodenv) and [pyenv](https://github.com/pyenv/pyenv) to manage language versions, and [npm](https://github.com/npm/cli) and [pipenv](https://github.com/pypa/pipenv) to manage dependencies.

### Web setup (JavaScript)
```
# Install dependencies
npm i

# Tests
npm run e2eHeadlessTest

# Linter
npm run lint

# Start dev server
npm run dev

# Test heroku setup locally
heroku local web
```

### Scripts setup (python)
The scripts are used to manipulate the csv data for presentation.

****
```
# Install dependencies
pipenv install

# Tests
pipenv run tests

# Linter: note black is still in pre-release stage, needed pipenv install --dev --pre black
pipenv run lint
```

## Vis 1 /

**Features**
* Hover over a circle to show the name of the country it represents.
* Move the slider to manually change year.
* Play/pause button to animate between years

**Extra Feature**
* Click chart legend to show/hide regions.
	* Countries from a hidden region will not be selectable.

## Vis 2 /worldmap

**Features**
* Hover over bars in barchart to only show countries with selected government
* Slide slider to change year value.
* Play/pause button
* Switch between full dataset and reduce dataset
