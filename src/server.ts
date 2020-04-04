import { SuggestionsController } from "./suggestions/suggestions-controller";
import { BadRequest } from "./types/errors";

const express = require( "express" );
const app = express();
const port = 8080;

app.get( "/suggestions", (req, res) => {
    try {
        const suggestions = new SuggestionsController().getSuggestions(req)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(suggestions));
    } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        console.log(e)
        if (e instanceof BadRequest) {
            // TODO - why not working the instanceof?
            res.status(400)
            res.sendS(e);
        } else {
            res.status(500)
            .send(JSON.stringify({
                message: e.message
            }));
        }
    }
} );

// start the Express server
app.listen(port, () => {
    console.log( `server started at http://localhost:${ port}`);
});