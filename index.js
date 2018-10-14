/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.222e82fb-0f5b-4cd6-8aec-9730a1f042a0';

const SKILL_NAME = 'Photo of the Day';
const GET_PHOTO_MESSAGE = "Here's your photo.";
const HELP_MESSAGE = 'You can say show me the photo of the day, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('ShowPhotoIntent');
    },
    'ShowPhotoIntent': function () {
        const speechOutput = GET_PHOTO_MESSAGE;
        const imageObj = {
            smallImageUrl: 'https://source.unsplash.com/daily',
            largeImageUrl: 'https://source.unsplash.com/daily',
        };

        if(supportsDisplay(this.event)) {
            this.response.speak(speechOutput).cardRenderer('Photo of the Day', '', imageObj);
        } else {
            this.response.speak('Sorry, this device does not have display. Try this skill on an Echo Show or on your phone in the Alexa app.');
        }

        
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

function supportsDisplay(event) {
    var hasDisplay =
    event.context &&
    event.context.System &&
    event.context.System.device &&
    event.context.System.device.supportedInterfaces &&
    event.context.System.device.supportedInterfaces.Display

    return hasDisplay;
}

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
