LeagueCreationForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    let formLeagueName = React.findDOMNode(this.refs.leagueName).value.trim();
    let formLeagueIsDivisions = React.findDOMNode(this.refs.leagueIsDivisions).checked;
    let formLeagueSize = React.findDOMNode(this.refs.leagueSize).value;
    let formLeagueNumberOfDivisionGames = React.findDOMNode(this.refs.leagueDivisionGames).value;
    let formLeagueNumberOfDivisions = React.findDOMNode(this.refs.leagueNumberOfDivisions).value;

    try {
      formLeagueSize = parseInt( formLeagueSize );
      formLeagueNumberOfDivisionGames = parseInt( formLeagueNumberOfDivisionGames );
      formLeagueNumberOfDivisions = parseInt( formLeagueNumberOfDivisions );
    } catch(e) {
      throw new Meteor.Error("NaN", "Not a Number");
    }

    if (!formLeagueName ||
        !formLeagueIsDivisions ||
        !formLeagueSize ||
        !formLeagueNumberOfDivisionGames ||
        !formLeagueNumberOfDivisions) {
      return;
    }

    // Save to Server
    Meteor.call("CreateLeague", formLeagueName, formLeagueIsDivisions, formLeagueSize, formLeagueNumberOfDivisionGames, formLeagueNumberOfDivisions);

    // RESET FORM
    React.findDOMNode(this.refs.leagueName).value = "";
    React.findDOMNode(this.refs.leagueIsDivisions).checked = true;
    React.findDOMNode(this.refs.leagueSize).value = 4;
    React.findDOMNode(this.refs.leagueDivisionGames).value = 1;
    React.findDOMNode(this.refs.leagueNumberOfDivisions).value = 2;

    if(this.props.doneCallback) {
      this.props.doneCallback();
    }
    return;
  },
  render: function() {
    return (

      <form className="leagueCreationForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="leagueName">League name</label>
          <input type="text" id="leagueName" ref="leagueName" className="form-control" placeholder="e.g., Romeo Rumble" maxLength="30"/>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" defaultChecked="true" ref="leagueIsDivisions"/> Divisions
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="leagueSize">Size of League</label>
          <input type="number" min="4" max="128" step="1" defaultValue="4" className="form-control" id="leagueSize" ref="leagueSize" />
        </div>
        <div className="form-group">
          <label htmlFor="leagueDivisionGames">Number of Division Games</label>
          <input type="number" min="1" max="10" step="1" defaultValue="1" className="form-control" id="leagueDivisionGames" ref="leagueDivisionGames" />
          <p className="help-block">Ignore if not doing divisions</p>
        </div>
        <div className="form-group">
          <label htmlFor="leagueNumberOfDivisions">Number of divisions</label>
          <input type="number" min="2" max="8" step="1" defaultValue="2" className="form-control" id="leagueNumberOfDivisions" ref="leagueNumberOfDivisions" />
          <p className="help-block">Ignore if not doing divisions</p>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-default" onClick={this.props.doneCallback}>Close</button>
      </form>
    );
  }
});
