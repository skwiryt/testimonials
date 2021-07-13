import React from 'react';
import { Alert, Progress } from 'reactstrap';
class Lineup extends React.Component {

  componentDidMount() {
    const { loadConcerts } = this.props;
    loadConcerts();
  }

  render() {

    const { request, concerts, children } = this.props;
    const childrenWithConcerts = React.Children.map(children, child => {
      if(React.isValidElement(child)) {
        return React.cloneElement(child, {concerts});
      }
      return child;
    })

    if(request.pending) return <Progress animated color="primary" value={50} />; 
    else if(request.error) return <Alert color="warning">{request.error}</Alert>;
    else if(!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
    /*
    else if(request.success) return (
      <>
        <Concerts concerts={concerts} />
      </>
    )
   */
  else if(request.success) return (
    <div>{childrenWithConcerts}</div>
  )
  } 
}

export default Lineup;