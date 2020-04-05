# Coveo Backend Coding Challenge Solution

Description of the solution implemented for the Coveo challenge (https://github.com/coveo/backend-coding-challenge)

## Install & run

git clone the project, then:

```bash
npm install
npm run dev
```

## Solution Description

### Structure and language

I choose node to create the server and run the system because it's pretty simple to start a web application and do a small development. I never used it in a real large case scenario but it seems to have  a good structure and community, so it's something to be considered.

With [Node Express](https://expressjs.com/) it's simple to map the api routes, so I could quickly setup my GET route and continue with the development of the business class, although there are some improvements that could be done [1].

The files are distributed in folder per "feature". So we have one folder "suggestions" that holds the controller class, business class, repository class. It's different from the traditional MVP structure where we have those classes in different folders to divide each layer, but what I like in this structure is that if someday we want to remove a feature or need to understand how it works, all files will be in one place. You don't need to scroll down and up in the directory to search for where the file for that feature is.

### Storage

I didn't use any database or storage lib to store the suggestions (cities). Instead, I created a huge in memory array in a separated file. This was just a matter to gain some velocity in the challenge, some other solutions are described in [2]

The cities was exported from [this file](https://github.com/busbud/coding-challenge-backend-c/blob/master/data/cities_canada-usa.tsv), I only converted it to a javascript array of objects instead of tsv.

### Search filters and score system

So, there are some solutions for that described in [3], but like in the description of the challenge, I decided to implement one by myself to have more code to present. The idea is to have an engine which can be configured with the filters to eliminate some results, e.g. we don't want to return suggestions for Quebec if the user is querying by Vancouver, right? So the filters of the engine works for this purpose. And also, we can configure the engine with some score params, that will not filter the result but be used to calculate the score so they can be ordered by this score.
This engine class receives a repository instance. The repository is the class responsible to fetch the items from where they are stored and apply the filters. In this solution, the repository takes the data from the in memory array, filter them based on the filters configured in the search engine and return them to the engine.
With the filtered results, the engine can apply the scores params and order the items to return them for the service.

For the problem, I'm implemented the filter by query (name of the city. I considered the property ascii of the object in the database, just to disconsider accents and cases). I also added an extra filter by country to demonstrate how easy it is to add a new filter.
For the score classification, I implemented the lat/long score, and to add a new one is just as easy like adding a new filter. When passing two properties to be considered in the score, the final score will be the average of the two properties score.

## Tests

### Unit
 
For the tests I use [Sinon](expectedResult), [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/). I can't really discuss why them and not others, it's just because I'm used to them in the projects I worked.

Tu run the tests:
```bash
npm run test
```

The tests structure and file names respect the same structure as the code. [4]

### Integration

No integration/acceptance test were created

## Improvements to be considered
[1] - The application has only one route, so it's pretty simple but what about if we need to add more routes. Would it be possible to divide it into multiple files to have a better division of the routes? Also, is there a way to map directly in the controller my routes and also the possible parameters it has?

[2] - Of course an in memory array is not good, so the suggestions should be probably keep in a database. If it's should be relational or nosql, that'll depend on the other requirements of the system. For the information we have now, probably a NoSql DB would be good.

[3] - This problems seems to be a good one to use some solution like Elastic Search. We need to filter some entries based on a text param, so we should probably not consider some typu mistake, grammar, etc, and we need to order/classify them based on a score considering others filters. I've already worked with Elastic Search in the past and it was pretty good doing something like this, but, it's had to configure and I never did it by myself from scratch, so it would take me some good days.

[4] - Should definitely add more tests to cover the main class like searcher and location score. What I did was wrong, created all the class and then adding tests. I should used a better approach like TDD or at least adding tests for each class/methods before continue the implementation of the next class, but I left everything for the end :(

## Results

### Only filter by query

- Url: http://localhost:8080/suggestions?q=London

```json
[
   {
      "name":"London",
      "country":"CA",
      "latitude":42.98339,
      "longitude":-81.23304
   },
   {
      "name":"London",
      "country":"US",
      "latitude":37.12898,
      "longitude":-84.08326
   },
   {
      "name":"Londontowne",
      "country":"US",
      "latitude":38.93345,
      "longitude":-76.54941
   },
   {
      "name":"London",
      "country":"US",
      "latitude":39.88645,
      "longitude":-83.44825
   },
   {
      "name":"New London",
      "country":"US",
      "latitude":41.35565,
      "longitude":-72.09952
   },
   {
      "name":"Londonderry",
      "country":"US",
      "latitude":42.86509,
      "longitude":-71.37395
   },
   {
      "name":"New London",
      "country":"US",
      "latitude":44.39276,
      "longitude":-88.73983
   }
]
```

### Filtering by query and score lat/log

- Url: http://localhost:8080/suggestions?q=London&latitude=43.70011&longitude=-79.4163

```json
[
   {
      "score":0.83,
      "name":"London",
      "country":"CA",
      "latitude":42.98339,
      "longitude":-81.23304
   },
   {
      "score":0.46,
      "name":"London",
      "country":"US",
      "latitude":39.88645,
      "longitude":-83.44825
   },
   {
      "score":0.42,
      "name":"Londontowne",
      "country":"US",
      "latitude":38.93345,
      "longitude":-76.54941
   },
   {
      "score":0.35,
      "name":"New London",
      "country":"US",
      "latitude":41.35565,
      "longitude":-72.09952
   },
   {
      "score":0.34,
      "name":"Londonderry",
      "country":"US",
      "latitude":42.86509,
      "longitude":-71.37395
   },
   {
      "score":0.25,
      "name":"New London",
      "country":"US",
      "latitude":44.39276,
      "longitude":-88.73983
   },
   {
      "score":0.17,
      "name":"London",
      "country":"US",
      "latitude":37.12898,
      "longitude":-84.08326
   }
]
```

### Filtering by query and country and score lat/log

- Url: http://localhost:8080/suggestions?q=London&latitude=43.70011&longitude=-79.4163&country=CA

```json
[
   {
      "score":0.83,
      "name":"London",
      "country":"CA",
      "latitude":42.98339,
      "longitude":-81.23304
   }
]
```