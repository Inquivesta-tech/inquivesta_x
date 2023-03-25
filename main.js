var camera, scene, renderer;
var cylinder;
var texture;
var normal_speed = 0.0008;
var hyperspeed = 53;
var hyperspeed_mode = true;
var hyperspeed_upratio = 1.2;
// var hyperspeed_Transition_mode = false;
// var hyperspeed_Transition_upratio = 1.2;
var hyperspeed_downratio = 1.3;
var current_speed = hyperspeed;

var hyperspeed_upscale = 1.03;
var hyperspeed_downscale = 1.3;
var current_scale = 0.1;

// select the initial website theme
// let theme = "fire"
// let theme = "simple"

let theme
if (localStorage.getItem("theme")) {
  theme = localStorage.getItem("theme")
  console.log(theme);
}else{
  theme = "fire"
}

function toggleTheme() {
  console.log("toggled");
  if (theme === "simple") {
    theme = "fire"
    localStorage.setItem("theme", theme);
  } else {
    theme = "simple"
    localStorage.setItem("theme", theme);
  }
  init()
}

init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Our Javascript will go here.
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(0, 0, 7);
  camera.lookAt(scene.position);
  scene.add(camera);

  let fire = [0xDBF227, 0xF37203, 0xF01706, 0xA60600]
  let simple = [0xF000DB, 0x0BC4CF, 0x133DC9, 0x621882]
  let colors

  console.log(theme);

  if (theme === "fire") {
    colors = fire
    document.getElementById('logo').src = "/assests/logos/pheonixLogo.png"
  } else {
    colors = simple
    document.getElementById('logo').src = "/assests/logos/logo.png"
  }

  var light = new THREE.DirectionalLight(colors[0], 0.5);
  light.position.set(1, 1, 0).normalize();
  scene.add(light);

  var light = new THREE.DirectionalLight(colors[1], 0.5);
  light.position.set(-1, 1, 0).normalize();
  scene.add(light);

  var light = new THREE.PointLight(colors[2], 10, 25);
  light.position.set(0, -3, 0);
  scene.add(light);

  var light = new THREE.PointLight(colors[3], 15, 30);
  light.position.set(3, 3, 0);
  scene.add(light);

  scene.fog = new THREE.FogExp2(0x000000, 0.15);
  THREE.TextureLoader.prototype.crossOrigin = '';
  '';
  texture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/water.jpg");
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;

  var material = new THREE.MeshLambertMaterial({ color: 0xffffff, opacity: 1, map: texture });
  var cylinder_geometry = new THREE.CylinderGeometry(1, 1, 30, 32, 1, true);

  cylinder = new THREE.Mesh(cylinder_geometry, material);
  material.side = THREE.BackSide;
  cylinder.rotation.x = Math.PI / 2;
  scene.add(cylinder);

  window.addEventListener('resize', onWindowResize, false);
  // document.addEventListener( 'keydown', temp, true );
  // document.addEventListener('touchstart', temp, true);
  // document.addEventListener('mousedown', onClick, false);
  // document.addEventListener('mouseup', onRelease, false);
  // document.addEventListener( 'keyup', onRelease, true );
  // document.addEventListener('touchstart', onClick, false);
  // document.addEventListener('touchend', onRelease, false);
  // document.addEventListener('wheel', onClick, false);
  // document.addEventListener( 'scrolldown', onRelease, false );
  // document.addEventListener( 'scrollup', onRelease, false );
}

function onKeyDown(event) {
  console.log("keydown");
}

function onClick(event) {
  // console.log("click");
  hyperspeed_mode = true;
  // console.log(cylinder);
}

function onRelease(event) {
  // console.log("release");
  hyperspeed_mode = false;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();

}

function render() {
  if (hyperspeed_mode) {
    current_speed = current_speed >= hyperspeed ? hyperspeed : current_speed * hyperspeed_upratio;
    current_scale = current_scale <= 0.2 ? 0.2 : current_scale / hyperspeed_upscale;
  } else {
    current_speed = current_speed <= 1 ? 1 : current_speed / hyperspeed_downratio;
    current_scale = current_scale >= 1 ? 1 : current_scale * hyperspeed_downscale;
  }
  cylinder.scale.set(current_scale, 1, current_scale);
  texture.offset.y -= normal_speed * current_speed;
  texture.offset.y %= 1;
  texture.needsUpdate = true;

  // move the camera back and forth
  var seconds = Date.now() / 1000;
  var radius = 0.70;
  var angle = 0.2 * seconds;
  // angle	= (seconds*Math.PI)/4;
  // camera.position.x	= Math.cos(angle*10 - Math.PI/2) * radius;
  // camera.position.y	= Math.sin(angle*10 - Math.PI/2) * radius;
  camera.rotation.z = angle;

  renderer.render(scene, camera);

}

setTimeout(
  () => {
    document.getElementById("0").classList.remove("displaynone")
    document.getElementById("0").classList = ["zoom1 child"]
    setTimeout(onRelease(), 100)
  }, 1600
)

// function zoomearth() {
//   document.getElementById("earth").classList = ["finalEarth"]
//   document.getElementById("butterfly").classList = ["displayNone"]
//   setTimeout(
//       ()=>{
//           document.getElementById("earth").classList = ["displayNone"]
//           document.getElementById("earthContainer").classList = ["displayNone"]
//           setTimeout(
//             () => {
//               document.getElementById("0").classList = ["zoom1"]
//               setTimeout(onRelease(), 100)
//             }, 1600
//           )
//       },900
//   )
// }


// Navigation logic

inId = 0
outId = "blank"
current = 0

function divSwitcher(inId, outId) {

  onClick()
  setTimeout(() => {
    onRelease()
  }, 700);

  document.getElementById(inId).classList.remove("zoom2")
  document.getElementById(outId).classList.add("zoom2")
  document.getElementById(outId).classList.remove("zoom1")
  setTimeout(() => {
    document.getElementById(inId).classList.remove("displaynone")
    document.getElementById(outId).classList.add("displaynone")
    document.getElementById(inId).classList.add("zoom1")
  }, 700);
}

function switchDivTo(Id) {
  if (inId != Id) {

    if (inId != 1) {
      document.getElementById("1nav").classList.remove("active")
    }

    outId = inId
    inId = Id
    divSwitcher(inId, outId)
    if (inId != 4 | outId != 1) {
      document.getElementById(inId + "nav").classList.add("active")
      if (outId != 4) {
        document.getElementById(outId + "nav").classList.remove("active")
      }
    }
  }
}

// function temp(event) {
//   length = document.getElementsByClassName("child").length;
//   current+=1
//   outId = inId
//   inId = current
//   if (current === 4) {
//     current = 0
//     inId = 0
//   }
//   console.log(inId, outId);
//   divSwitcher(String(inId),String(outId))
// }

let data
let scienceEvents, headlineEvents, culturalEvents

var importdata = $.getJSON("./assests/data.json", function () {
  data = importdata.responseJSON
  initializeEventsPg(data)
})

function initializeEventsPg(data) {

  // categorize data
  let scienceEvents = data.filter((item) => item["Category"] === "Science Events");
  let headlineEvents = data.filter((item) => item["Category"] === "Headlines Events");
  console.log(headlineEvents);
  let culturalEvents = data.filter((item) => item["Category"] === "Culturals");

  // create events page
  scienceEvents.forEach(element => {
    document.getElementById("ScienceEvents").innerHTML += `<div class="eventIconContainer glassyDiv" onclick="openEvent('${element["Event Name"]}')" >${element["Event Name"]}</div>`
  });
  headlineEvents.forEach(element => {
    document.getElementById("Popular").innerHTML += `<div class="eventIconContainer glassyDiv" onclick="openEvent('${element["Event Name"]}')" >${element["Event Name"]}</div>`
  });
  culturalEvents.forEach(element => {
    document.getElementById("Culturals").innerHTML += `<div class="eventIconContainer glassyDiv" onclick="openEvent('${element["Event Name"]}')" >${element["Event Name"]}</div>`
  });

}

// events page navigation
function openEvent(eventname) {
  let event = data.filter((item) => item["Event Name"] === eventname);
  makeEventPage(event[0]);
  switchDivTo('4')
}

function makeEventPage(data) {
  console.log(data["Event Name"]);

  document.getElementById('4').innerHTML = `
    <div class="glassyDiv glassyEventContainer">

      <div style="overflow: auto;margin-bottom: 11vh;">
          <h1 style="width: 100%;text-align: center;">${data["Event Name"]}</h1>
          <div style="height: max-content;scroll-behavior: smooth;">
              <div>
                  <h2>About</h2>
                  <p>
                    ${data["Description"]}
                  </p>
              </div>
              <div>
                  <h2>Rules</h2>
                  <p>
                    ${data["Rules and Regulations"]}
                  </p>
              </div>
              <div>
                  <h2>Schedule</h2>
                  <h3>
                      Date : ${data["Date"]}
                  </h3>
                  <h3>
                      Time : ${data["Time"]}
                  </h3>
                  <h3>
                      Venue : ${data["Location"]}
                  </h3>
              </div>
              <div>
                  <h2>Prizes</h2>
                  <p>
                    ${data["Prizes"]}
                  </p>
              </div>
              <div>
                  <h2>Registration Closes</h2>
                  <p>
                    ${data["Registration Deadline"]}
                  </p>
              </div>
              <div>
                  <h2>Contact Event Organizers</h2>
                  <p>
                    ${data["Contact Details"]}
                  </p>
              </div>
          </div>
      </div>
      <div style=" position: absolute;bottom: 0;display: flex;flex-direction: row;">
          <button id="addButton" class="glassyDiv registerButton" style="width:120px;"
              onclick="switchDivTo('1')">
              <h3>back</h3>
          </button>
          <div style="width:40px;"></div>` + 
          (data["onspot"]==="0"?
          `<a href="${data["Registration"]}" target="_blank" rel="noopener noreferrer">
            <button id="addButton" class="glassyDiv registerButton" style="width:120px;">
                <h3>Register</h3>
            </button>
          </a>
      </div>

  </div>
  `
  :
  `<button id="addButton" class="glassyDiv registerButton" onclick="onspotAlert('${data["Registration"]}')" style="width:120px;">
                <h3>Register</h3>
            </button>
      </div>

  </div>
  `)
}

function onspotAlert(alertPrompt) {
  // alert("You can register onspot for this event :)");
  alert(alertPrompt);
}

setTimeout(() => {
  // switchDivTo('4')
}, 1200);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}