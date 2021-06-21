
import React, { Component } from "react";
import * as THREE from "three";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import logo_skills from "./components/skills.png"
import logo_about from "./components/project_img.png"
import logo_contact from "./components/contact.png"
import About from "./components/About";
import './App.css';

class App extends Component {

 constructor() {
    super();
    this.state = {
      name: "React",
      showHideSkills: false,
      showHideProjects: false,
      showHideAbout: false,
      z_skills: 0,
      z_about: 0,
      z_projects: 0
    };
     this.hideComponent = this.hideComponent.bind(this);
  }

   hideComponent(name) {
    switch (name) {
      case "showHideSkills":
        this.setState({ showHideSkills: !this.state.showHideSkills, z_skills: 1, z_projects: 0, z_about: 0 });
        break;
      case "showHideProjects":
        this.setState({ showHideProjects: !this.state.showHideProjects, z_skills: 0, z_projects: 1, z_about: 0 });
        break;
      case "showHideAbout":
        this.setState({ showHideAbout: !this.state.showHideAbout, z_skills: 0, z_projects: 0, z_about: 1 });
        break;
      default:
        break;
    }
  }

   handleCallback = (childData, name) =>{
      switch (name) {
        case "showHideSkills":
          this.setState({showHideSkills: childData});
          break;
        case "showHideProjects":
          this.setState({showHideProjects: childData});
          break;
        case "showHideAbout":
          this.setState({showHideAbout: childData});
          break;
        default:
          break;
        }
    }

    handleCallbackTwo = (val_skills, val_projects, val_about) => {
      this.setState({z_skills: val_skills, z_projects: val_projects, z_about: val_about});
    }

  componentDidMount() {
    var scene = new THREE.Scene();
      scene.background = new THREE.Color( 0x23272a );

      var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 20, 200);
      camera.lookAt(scene.position);

      var renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      var division = 50;
      var limit = 250;
      var grid = new THREE.GridHelper(limit * 2, division, "grey", "grey");
      var grid_two = new THREE.GridHelper(limit * 2, division, "grey", "grey");

      var moveable = [];
      for (let i = 0; i <= division; i++) {
        moveable.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
      }
      grid.geometry.addAttribute('moveable', new THREE.BufferAttribute(new Uint8Array(moveable), 1));
      grid.material = new THREE.ShaderMaterial({
        uniforms: {
          time: {
            value: 0
          },
          limits: {
            value: new THREE.Vector2(-limit, limit)
          },
          speed: {
            value: 5
          }
        },
        vertexShader: `
          uniform float time;
          uniform vec2 limits;
          uniform float speed;
          
          attribute float moveable;
          
          varying vec3 vColor;
        
          void main() {
            vColor = color;
            float limLen = limits.y - limits.x;
            vec3 pos = position;
            if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1 
              float dist = speed * time;
              float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
              pos.z = currPos;
            } 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
        
          void main() {
            gl_FragColor = vec4(vColor, 1.);
          }
        `,
        vertexColors: THREE.VertexColors
      }); 


      // FOR SECOND GRID //

      
      var moveable_two = [];
      for (let i = 0; i <= division; i++) {
        moveable_two.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
      }

      grid_two.geometry.addAttribute('moveable_two', new THREE.BufferAttribute(new Uint8Array(moveable_two), 1));
      grid_two.material = new THREE.ShaderMaterial({
        uniforms: {
          time: {
            value: 0
          },
          limits: {
            value: new THREE.Vector2(-limit, limit)
          },
          speed: {
            value: 5
          }
        },
        vertexShader: `
          uniform float time;
          uniform vec2 limits;
          uniform float speed;
          
          attribute float moveable_two;
          
          varying vec3 vColor;
        
          void main() {
            vColor = color;
            float limLen = limits.y - limits.x;
            vec3 pos = position;
            if (floor(moveable_two + 0.5) > 0.5){ // if a point has "moveable_two" attribute = 1 
              float dist = speed * time;
              float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
              pos.z = currPos;
            } 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
        
          void main() {
            gl_FragColor = vec4(vColor, 1.0);
          }
        `,
        vertexColors: THREE.VertexColors
      });  

      grid_two.position.set(0, 35, 0);

      scene.add(grid);
      console.log(grid.position);
      scene.add(grid_two);
      console.log(grid_two.position);

      var clock = new THREE.Clock();
      var time = 0;

      render();

      function render() {
        requestAnimationFrame(render);
        time += clock.getDelta();
        grid.material.uniforms.time.value = time;
        grid_two.material.uniforms.time.value = time;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
      }

    }

  render() {
     const { showHideSkills, showHideProjects, showHideAbout, z_skills, z_about, z_projects } = this.state;
    return (
    <div className="App">
      <div ref={ref => (this.mount = ref)} />
      <div class="nav">
        <ul>
          <li>
            <button id="skills_btn" onClick={() => this.hideComponent("showHideSkills")}><img src={logo_skills} alt="SKILLS" /></button>
          </li>
          <li>
            <button id="projects_btn" onClick={() => this.hideComponent("showHideProjects")}><img src={logo_about} alt="PROJECTS" /></button>
          </li>
          <li>
            <button id="contact_btn" onClick={() => this.hideComponent("showHideAbout")}><img src={logo_contact} alt="CONTACT" /></button>
          </li>
        </ul>
      </div>
          {showHideSkills && <Skills parentCallback = {this.handleCallback} data={z_skills} parentCallbackTwo={this.handleCallbackTwo} />}
          {showHideProjects && <Projects parentCallback = {this.handleCallback} data={z_projects} parentCallbackTwo={this.handleCallbackTwo}/>}
          {showHideAbout && <About parentCallback = {this.handleCallback} data={z_about} parentCallbackTwo={this.handleCallbackTwo} />}
    </div>
    )
  }
}


export default App;