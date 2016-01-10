import { React } from 'react';
import { Row, Col} from 'react-bootstrap';

const DraftStatusBanner = React.createClass({

  getMessage(isDone) {
    if(this.props.isDone === null) return "Draft underway!";
    else if (this.props.isDone === false) return "Awaiting league creator to start";
    else if(this.props.isDone === true ) return "Draft Done! We did it!";
    return null;
  },

  render() {
    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <h5 className="text-center" >{this.getMessage(this.props.isDone)}</h5>
        </Col>
      </Row>
    );
  }
});

export default DraftStatusBanner;
