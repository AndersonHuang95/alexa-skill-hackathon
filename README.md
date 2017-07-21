# Alexa Restaurant Finder 
Find the top restaurant spots tailored to your preference by simply asking. 

## Description
In a world with so many restaurat choices, it can be difficult, if not impossible, to narrow down your choices. Enter Alexa Restaurant Finder. Simply tell Alexa what kind of cuisine you are feeling and where you are located to get started. Alexa then delegates the work to a Lambda function, which calls the Yelp API behind the scenes. All the heavy lifting is done for you and a list of your top 3 recommended choices are recited back to you. But you don't have to stop there. Continue to filter by distance radius, rating, review count, price and availability. Finish it off by having Alexa call the restaurant so you can make a reservation. 

## The Stack

1. **Search**: Search for restaurants using [Yelp](https://www.yelp.com/developers/documentation/v3)
2. **Playback**: Playing the recommendations back through Alexa Skill "Restaurant Finder"

### Search 

### Playback

## Intents
1. Launch Intent - "Find me some restaurants"
2. EnterFoodTypeIntent - "I want Chinese food"
3. EnterLocationIntent - "In Seattle"
4. EnterFilterIntent - "I want to add filters"
5. AddSortByFilterIntent - "I want to sort the result by distance"
6. AddPriceFilterIntent - "Show me 2 dollar signs restaurants"
7. AddOpenNowFilterIntent - "Only show restaurants currently open
8. FindRestaurantIntent - "Search now"

## Utterances

## Usage

## Requirements

## Contribution
Anderson Huang - UCLA Undergraduate Computer Science
Ellen Hong - UCBerkeley Undergraduate Computer Science
Hexi Zilong Xiao - USC Undergraduate Computer Science

Enjoy!
