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

### Search filters and score system

So, there are some solutions for that described in [3], but like in the description of the challenge, I decided to implement one by myself to have more code to present. The idea is to have an engine which can be configured with the filters to eliminate some results, e.g. we don't want to return suggestions for Quebec if the user is querying by Vancouver, right? So the filters of the engine works for this purpose. And also, we can configure the engine with some score params, that will not filter the result, but used to calculate the score so they can be ordered by this score.
This engine class receives a repository instance. The repository is the class responsible to fetch the items from where they are stored and apply the filters. In this solution, the repository takes the data from the in memory array, filter them based on the filters configured in the search engine and return them to the engine.
With the filtered results, the engine can apply the scores params and order the items to return them for the service.

## Tests

### Unit
 
For the tests I use [Sinon](expectedResult), [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/). I can't really discuss why them and not others, it's just because I'm used to them in the projects I worked.

Tu run the tests:
```bash
npm run test
```

The tests structure and file names respect the same structure as the code

### Integration

No integration/acceptance test were created

## Improvements to be considered
[1] - The application has only one route, so it's pretty simple but what about if we need to add more routes. Would it be possible to divide it into multiple files to have a better division of the routes? Also, is there a way to map directly in the controller my routes and also the possible parameters it has?

[2] - Of course an in memory array is not good, so the suggestions should be probably keep in a database. If it's should be relational or nosql, that'll depend on the other requirements of the system. For the information we have now, probably a NoSql DB would be good.

[3] - This problems seems to be a good one to use some solution like Elastic Search. We need to filter some entries based on a text param, so we should probably not consider some typu mistake, grammar, etc, and we need to order/classify them based on a score considering others filters. I've already worked with Elastic Search in the past and it was pretty good doing something like this, but, it's had to configure and I never did it by myself from scratch, so it would take me some good days.