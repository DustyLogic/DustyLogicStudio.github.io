THREE.SimpleOBJLoader = function() {
  this.load = function(url, onLoad, onProgress, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var object = parseOBJ(xhr.responseText);
            if (onLoad) onLoad(object);
          } catch (error) {
            if (onError) onError(error);
          }
        } else {
          if (onError) onError(new Error('Failed to load ' + url));
        }
      }
    };
    xhr.send();
  };

  function parseOBJ(text) {
    var vertices = [];
    var faces = [];
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.startsWith('v ')) {
        var parts = line.split(/\s+/);
        vertices.push(
          parseFloat(parts [1]),
          parseFloat(parts [2]),
          parseFloat(parts [3])
        );
      } else if (line.startsWith('f ')) {
        var parts = line.split(/\s+/);
        // Simple triangulation for faces
        for (var j = 2; j < parts.length - 1; j++) {
          faces.push(
            parseInt(parts [1]) - 1,
            parseInt(parts[j]) - 1,
            parseInt(parts[j + 1]) - 1
          );
        }
      }
    }

    var geometry = new THREE.Geometry();
    
    // Add vertices
    for (var i = 0; i < vertices.length; i += 3) {
      geometry.vertices.push(new THREE.Vector3(
        vertices[i],
        vertices[i + 1],
        vertices[i + 2]
      ));
    }

    // Add faces
    for (var i = 0; i < faces.length; i += 3) {
      geometry.faces.push(new THREE.Face3(
        faces[i],
        faces[i + 1],
        faces[i + 2]
      ));
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var material = new THREE.MeshLambertMaterial({ color: 0x00aaff });
    var mesh = new THREE.Mesh(geometry, material);
    
    var group = new THREE.Group();
    group.add(mesh);
    return group;
  }
};