### Local setup
vis1 and vis2 require resources in the root directory (css and js).  
In order to run this locally you'll need to start a webserver in the root of this repo. e.g.  
```
python3 -m http.server
```

## Vis 1 channelling\_hans.html 
### Available at: [https://conorsgapminder.herokuapp.com/](https://conorsgapminder.herokuapp.com/)

##### Features
* Hover over a circle to show the name of the country it represents.
* Move the slider to manually change year.
* Play/pause button to animate between years

##### Extra Feature
* Click chart legend to show/hide regions. 
	* Countries from a hidden region will not be selectable.

## Vis 2 gdp\_by\_gov.html
### Available at: [https://conorsworldmap.herokuapp.com/](https://conorsworldmap.herokuapp.com/)

##### Features
* Hover over bars in barchart to only show countries with selected government	
* Slide slider to change year value.
* Play/pause button
* Switch between full dataset and reduce dataset
