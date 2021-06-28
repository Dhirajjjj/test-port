import React, { Component } from "react";
import Draggable from 'react-draggable';
import './skills.css'

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "skills",
    };
  }

  onTrigger = (event) => {
    this.props.parentCallback(false, "showHideSkills");
    event.preventDefault();
  }

  onTriggerTwo = (event) => {
    this.props.parentCallbackTwo(1, 0, 0);
    event.preventDefault();
  }

  render() {
    return (
      <Draggable handle="#top_border_skills" bounds="body">
        <div id="skills_window" onClick={this.onTriggerTwo} style={{zIndex: this.props.data}}>
          <div id="top_border_skills">
            <p>Skills.exe</p>
          </div>
            <button id="close_btn" onClick={this.onTrigger} alt="close">
               &#x2715;
            </button>
          <div id="content_skills">
            <ul class="list">
              <li>Python</li>
              <li>C</li>
              <li>React</li>
              <li>Node</li>
              <li>Java</li>
              <li>Android Studio</li>
            </ul>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Skills;
