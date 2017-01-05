import { Meteor } from 'meteor/meteor';
/*
Meteor.methods({
  'importData': function() {
    this.unblock();
    var jsonParamObject = {'page':1,'quality':'bronze,silver,gold,rare_bronze,rare_silver,rare_gold','ovr':'70:99','position':'LF,CF,RF,ST,LW,LM,CAM,CDM,CM,RM,RW,LWB,LB,CB,RB,RWB'};
    var urlString = 'https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=';
    var sum = 0;
    try {
      for(var i = 1; i < 167 + 1; i++) {
          jsonParamObject['page'] = i;
          var result = JSON.parse(HTTP.call('GET', urlString + JSON.stringify(jsonParamObject) ).content);
          var playerToInsert = {};
          result.items.forEach(function(playerItem) {
            playerToInsert.acceleration=playerItem.acceleration;
            playerToInsert.age=playerItem.age;
            playerToInsert.aggression=playerItem.aggression;
            playerToInsert.agility=playerItem.agility;
            playerToInsert.atkWorkRate=playerItem.atkWorkRate;
            playerToInsert.attributes=playerItem.attributes;
            playerToInsert.balance=playerItem.balance;
            playerToInsert.ballcontrol=playerItem.ballcontrol;
            playerToInsert.baseId=playerItem.baseId;
            playerToInsert.commonName=playerItem.commonName;
            playerToInsert.crossing=playerItem.crossing;
            playerToInsert.curve=playerItem.curve;
            playerToInsert.defWorkRate=playerItem.defWorkRate;
            playerToInsert.dribbling=playerItem.dribbling;
            playerToInsert.finishing=playerItem.finishing;
            playerToInsert.firstName=playerItem.firstName;
            playerToInsert.fitness=playerItem.fitness;
            playerToInsert.foot=playerItem.foot;
            playerToInsert.freekickaccuracy=playerItem.freekickaccuracy;
            playerToInsert.gkdiving=playerItem.gkdiving;
            playerToInsert.gkhandling=playerItem.gkhandling;
            playerToInsert.gkkicking=playerItem.gkkicking;
            playerToInsert.gkpositioning=playerItem.gkpositioning;
            playerToInsert.gkreflexes=playerItem.gkreflexes;
            playerToInsert.headingaccuracy=playerItem.headingaccuracy;
            playerToInsert.headshotImgUrl=playerItem.headshotImgUrl;
            playerToInsert.height=playerItem.height;
            playerToInsert.interceptions=playerItem.interceptions;
            playerToInsert.isGK=playerItem.isGK;
            playerToInsert.jumping=playerItem.jumping;
            playerToInsert.lastName=playerItem.lastName;
            playerToInsert.longpassing=playerItem.longpassing;
            playerToInsert.longshots=playerItem.longshots;
            playerToInsert.marking=playerItem.marking;
            playerToInsert.name=playerItem.name;
            playerToInsert.penalties=playerItem.penalties;
            playerToInsert.position=playerItem.position;
            playerToInsert.positioning=playerItem.positioning;
            playerToInsert.rating=playerItem.rating;
            playerToInsert.reactions=playerItem.reactions;
            playerToInsert.shortpassing=playerItem.shortpassing;
            playerToInsert.shotpower=playerItem.shotpower;
            playerToInsert.skillMoves=playerItem.skillMoves;
            playerToInsert.slidingtackle=playerItem.slidingtackle;
            playerToInsert.specialImages=playerItem.specialImages;
            playerToInsert.specialities=playerItem.specialities;
            playerToInsert.sprintspeed=playerItem.sprintspeed;
            playerToInsert.stamina=playerItem.stamina;
            playerToInsert.standingtackle=playerItem.standingtackle;
            playerToInsert.strength=playerItem.strength;
            playerToInsert.traits=playerItem.traits;
            playerToInsert.vision=playerItem.vision;
            playerToInsert.volleys=playerItem.volleys;
            playerToInsert.weakFoot=playerItem.weakFoot;
            playerToInsert.weight=playerItem.weight;

            Players.insert(playerToInsert);
          });
          console.log(i + '     ' + result.items.length);
      }
      return true;
    } catch (e) {
      console.log(e);
    }
  }
});
*/
