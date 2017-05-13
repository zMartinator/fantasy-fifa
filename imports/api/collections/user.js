import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';

// const UserProfile = Class.create({
//   name: 'UserProfile',
//   fields: {
//     team: {
//       type: Object,
//       default() {
//         return {};
//       },
//     },
//     draftMoney: Number,
//   },
// });

const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    createdAt: Date,
    emails: {
      type: [Object],
      default() {
        return [];
      },
    },
    profile: {
      type: Object,
      default() {
        return {
          team: {
            name: 'defaultTeamName',
            players: [],
          },
          draftMoney: 100, // TODO: hardcoded to 100
        };
      },
    },
  },
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: Object,
    },
  });
}

export default User;
