import React from 'react';
import { SOCKET_URL } from '../../../config';
import { Button, Progress, Alert } from 'reactstrap';
import { io } from 'socket.io-client';

import './SeatChooser.scss';

class SeatChooser extends React.Component {
    
  componentDidMount() {
    const { loadSeats, updateSeats } = this.props;
    this.socket = io(SOCKET_URL);
    this.socket.on('seatBooked', (seats) => {
      console.log('Somebody took seat: ', seats);
      updateSeats(seats);
    });    
    loadSeats();
    //Wprowadzenie socket kasuje konieczność tego odświeżania w interwale
    //const intervalId = setInterval(() => {loadSeats(); console.log('Seats were reloaded');}, 2 *60 * 1000);
    //this.setState({intervalId});
  } 
  /*
  componentWillUnmount() {
   clearInterval(this.state.intervalId);
  }
  */
  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }
  freeSeats = () => {
    const { seats, chosenDay } = this.props;
    const takenSeats = seats.filter(seat => seat.day === chosenDay).length;
    return `${50 - takenSeats}/50`;
  }
  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  render() {

    const { prepareSeat } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        <p>Free seats: {this.freeSeats()}</p>
      </div>
    )
  };
}

export default SeatChooser;