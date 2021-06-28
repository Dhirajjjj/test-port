import React, { Component } from "react";
import Draggable from 'react-draggable';
import './projects.css'

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "projects",
    };
  }


  onTrigger = (event) => {
    this.props.parentCallback(false, "showHideProjects");
    event.preventDefault();
  }

  onTriggerTwo = (event) => {
    this.props.parentCallbackTwo(0, 1, 0);
    event.preventDefault();
  }

  render() {
    return (
      <Draggable handle="#top_border_projects" bounds="body">
        <div id="projects_window" onClick={this.onTriggerTwo} style={{zIndex: this.props.data}}>
          <div id="top_border_projects">
            <p>Projects.exe</p>
          </div>
          <button id="close_btn" onClick={this.onTrigger}>
               &#x2715;
            </button>
          <div id="content">
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Projects;
