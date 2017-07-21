/**
 
Referenced starter code from https://github.com/Donohue/alexa
 
*/

'use strict';

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
         
    // if (event.session.application.applicationId !== "amzn1.ask.skill.0cd4b3e7-74f9-472d-b929-c05c05d8eb58") {
    //     context.fail("Invalid Application ID");
    //  }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    var cardTitle = "Find a restaurant";
    var speechOutput = "I can help you find a restaurant. Just say 'find me a place to eat.'";
    callback(session.attributes,
        buildSpeechletResponse(cardTitle, speechOutput, "", true));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    switch (intent.name) {
        case "LaunchIntent":
            handleLaunchRequest(intent, session, callback);
            break;
        case "EnterFoodTypeIntent":
            handleEnterFoodTypeRequest(intent, session, callback);
            break;
        case "AddLocationIntent":
            handleAddLocationRequest(intent, session, callback);
            break;
        case "EnterLocationIntent":
            handleEnterLocationRequest(intent, session, callback);
            break;
        default:
            throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

function handleLaunchRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("What type of food do you want to eat?", "false"));
}

function handleEnterFoodTypeRequest(intent, session, callback) {
    var sessionAttributes = {
        "foodType": intent.slots.FoodType.value
    };
    session.attributes = sessionAttributes;
    callback(sessionAttributes,
        buildSpeechletResponseWithoutCard("Ok. Would you like to search now, or add your location as well?", "false"));
}

function handleAddLocationRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Ok. Please specify a city name.", "false"));
}

function handleEnterLocationRequest(intent, session, callback) {
    var sessionAttributes = {
        "foodType": session.attributes.foodType,
        "location": intent.slots.Location.
    };
    session.attributes = sessionAttributes;
    callback(sessionAttributes,
        buildSpeechletResponseWithoutCard("Ok. Would you like to search now, or add filters?", "false"));
}

function handleAddFiltersRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Ok. You can add one or more of the following filters: sort by, price, and open now. Which would you like to filter by?", "false"));
}

function handleAddRatingsFilterRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Ok. Please specify a minimum star rating.", "false"));
}

// ------- Helper functions to build responses -------

function buildSpeechletResponse(title, output, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}