# CountryFlags
NodeJS script to convert country flags SVG files named by their country, to react components named by each country code.

# Prerequisite
1. nodejs + npm installed
2. [svgr](https://react-svgr.com/docs/cli/) cli installed globally
```
npm install @svgr/cli -g
```

# How to run
```
> npm i
> node index.js
```

output will be under `output` folder

# Get to know the folder structure
```
flags --> SVG files, named by "flag-<country-name>.svg"
countries_data --> JSON files that map country code to country name
    |__ countries.json --> ensured mapping.
    |__ external_countries.json --> mapping from external sources, shouldn't be 100% trusted.
configs
    |__ config.json --> react components prettier configs
    |__ template.js --> template for creating a react component JS file for each SVG file
output
    |__ flags --> all react components
    |__ index.js --> all react components exported by their country code
utils --> utils.. basically all the logic sits there
```