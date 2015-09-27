Accounts.onCreateUser(function(options, user) {
  options.profile = options.profile || {};

  // Can only have one team/draft per user this way.
  options.profile.team = {
    teamName: "defaultTeamName",
    players: []
  };
  options.profile.draftMoney = 100; // TODO: hardcoded to 100


  /*
  options.profile.leagues = [];
  options.profile.leagues.push({
    leagueId: -1,
    teams: [],
    draftMoney: -1
  });
  */

  if (options.profile)
    user.profile = options.profile;
  return user;
});
