import React, { Component } from "react";
import Draggable from 'react-draggable';
import "./contact.css";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "about",
    };
  }


  onTrigger = (event) => {
    this.props.parentCallback(false, "showHideAbout");
    event.preventDefault();
  }

  onTriggerTwo = (event) => {
    this.props.parentCallbackTwo(0, 0, 1);
    event.preventDefault();
  }

  render() {
    return (
      <Draggable handle="#top_border_contact" bounds="body"> 
        <div id="contact_window" onClick={this.onTriggerTwo} style={{zIndex: this.props.data}}>
          <div id="top_border_contact">
            <p>Contact.exe</p>
          </div>
          <button id="close_btn" onClick={this.onTrigger}>
              &#x2715;
            </button>
          <div id="content_contact">
            <p>sorry , can't contact me yet</p>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default About;
