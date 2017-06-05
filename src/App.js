import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {
  addTrack(){
      const nameTrack = this.trackInput.value;
      if(nameTrack !== ''){
          this.props.onAddTrack(nameTrack)
      }
      this.trackInput.value = '';
  }

  findTrack(){
    const searchName = this.searchInput.value;
    this.props.onFilterTrack(searchName)
  }

  render() {
    var onDeleteTrack = this.props.onDeleteTrack;
    return (
      <div>
        <div>
            <input type="text" ref={(input) => {this.trackInput = input}}/>
            <button onClick={this.addTrack.bind(this)}>add track</button>
            <br/>
            <input type="text" onChange={this.findTrack.bind(this)} ref={(input) => {this.searchInput = input}}/>
            <ul>
                {
                    this.props.tracks.map(function(track){
                        return <li key={track.id} onClick={onDeleteTrack.bind(null,track.id)}>{track.name}</li>
                    })
                }
            </ul>
        </div>
      </div>
    );
  }
}

export default connect(
    state => ({
        tracks : state.tracks.filter(track => track.name.includes(state.filter))
    }),
    dispatch => ({
        onAddTrack: (trackName) => {
            const payload = {
                id : Date.now().toString(),
                name : trackName
            };
            dispatch({
                type : 'ADD_TRACK',
                payload: payload
            })
        },
        onDeleteTrack: (id) => {
            const payload = {
                id : id
            }
            dispatch({
                type: 'DELETE_TRACK',
                payload : payload
            })
        },
        onFilterTrack: (searchName) => {
            dispatch({
                type: 'FILTER_TRACK',
                name: searchName
            })
        }
    })
)(App);
