### Web setup
##### Install dependencies
```
npm i
```

##### Start dev server
```
npm run dev
```

##### Test heroku setup locally
```
heroku local web
```

### Scripts setup
##### Install dependencies
```
pipenv install
```

### Run tests
```
pipenv run python -m unittest scripts/test/*.py
```

## Vis 1 gapminder.html

##### Features
* Hover over a circle to show the name of the country it represents.
* Move the slider to manually change year.
* Play/pause button to animate between years

##### Extra Feature
* Click chart legend to show/hide regions.
	* Countries from a hidden region will not be selectable.

## Vis 2 worldmap.html

##### Features
* Hover over bars in barchart to only show countries with selected government
* Slide slider to change year value.
* Play/pause button
* Switch between full dataset and reduce dataset
