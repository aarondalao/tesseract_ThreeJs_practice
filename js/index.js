import * as THREE from 'three'

// Set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the vertices of the tesseract
var vertices = [
  [-1, -1, -1, -1],
  [-1, -1, -1, 1],
  [-1, -1, 1, -1],
  [-1, -1, 1, 1],
  [-1, 1, -1, -1],
  [-1, 1, -1, 1],
  [-1, 1, 1, -1],
  [-1, 1, 1, 1],
  [1, -1, -1, -1],
  [1, -1, -1, 1],
  [1, -1, 1, -1],
  [1, -1, 1, 1],
  [1, 1, -1, -1],
  [1, 1, -1, 1],
  [1, 1, 1, -1],
  [1, 1, 1, 1]
];

// Create a geometry for the tesseract
var geometry = new THREE.BufferGeometry();

// Generate the tesseract points by projecting the 4D vertices onto 3D space
for (var i = 0; i < vertices.length; i++) {
  var vertex = vertices[i];
  var x = vertex[0];
  var y = vertex[1];
  var z = vertex[2];
  var w = vertex[3];

  // Project the 4D point to 3D space
  var point = new THREE.Vector4(x, y, z, w);
  var projectedPoint = camera.updateProjectionMatrix(point)

  // Add the projected 3D point to the geometry
  geometry.vertices.push(new THREE.Vector3(projectedPoint.x, projectedPoint.y, projectedPoint.z));
}

// Create a material for the tesseract
var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

// Create a mesh using the tesseract geometry and material
var tesseract = new THREE.Mesh(geometry, material);

// Add the tesseract to the scene
scene.add(tesseract);

// Set up camera position
camera.position.z = 5;

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  tesseract.rotation.x += 0.01;
  tesseract.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();