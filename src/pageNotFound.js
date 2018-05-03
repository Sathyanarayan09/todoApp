import React from 'react'
import './todoContainer.css';


export default class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
      this.state = {

      }
  }

  render() {
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
       <label> Todo not found </label>
    </div>
      )
    }
}
