export default (user, league) =>
  user.profile.draftMoney -
  (league.maxTeamSize - user.profile.team.players.length - 1);
