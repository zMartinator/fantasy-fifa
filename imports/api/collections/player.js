import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  Players._ensureIndex({
    commonName: 'text',
    name: 'text',
    firstName: 'text',
    lastName: 'text',
  });
}

export default Players;
