const leagueUpdatedSub = (parent, { id }, context, info) =>
  context.db.subscription.league(
    {
      where: {
        mutation_in: ['UPDATED'],
        node: { id },
      },
    },
    info
  );

module.exports = {
  leagueUpdated: { subscribe: leagueUpdatedSub },
};
