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

// select the website theme

let theme = "fire"
// let theme = "simple"

let k
function toggleTheme() {
  console.log("toggled");
  if (theme === "simple") {
    theme = "fire"
  } else {
    theme = "simple"
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

  let fire = [0xDBF227,0xF37203,0xF01706,0xA60600]
  let simple = [0xF000DB,0x0BC4CF,0x133DC9,0x621882]
  let colors

  console.log(theme);

  if (theme === "fire") {
    colors = fire
    document.getElementById('logo').src = "/frontend/assests/logos/pheonixLogo.png"
  } else {
    colors = simple
    document.getElementById('logo').src = "/frontend/assests/logos/logo.png"
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
  console.log("click");
  hyperspeed_mode = true;
  console.log(cylinder);
}

function onRelease(event) {
  console.log("release");
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
    outId = inId
    inId = Id
    divSwitcher(inId, outId)
    document.getElementById(inId+"nav").classList.add("active")
    document.getElementById(outId+"nav").classList.remove("active")
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