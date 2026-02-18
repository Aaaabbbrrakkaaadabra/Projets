import React, { useState } from "react";
import { Delaunay } from "d3-delaunay";

function Polygones() {
  const [imageSrc, setImageSrc] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [triangles, setTriangles] = useState([]);
  const [isClosed, setIsClosed] = useState(false);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e) => {
    if (isClosed) return;
    const svg = e.target.closest("svg");
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPolygon([...polygon, [x, y]]);
  };

  // Vérifie si un point est dans le polygone
  function pointInPolygon(point, vs) {
    const [x, y] = point;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const [xi, yi] = vs[i];
      const [xj, yj] = vs[j];
      const dy = yj - yi;
      const xIntersect =
        ((xj - xi) * (y - yi)) / (dy === 0 ? 1e-12 : dy) + xi;

      const cond1 = (yi > y) !== (yj > y);
      const cond2 = x < xIntersect;
      if (cond1 && cond2) inside = !inside;
    }
    return inside;
  }

  // Fermer le polygone et générer des triangles réguliers (~60 max)
  const finalizePolygon = () => {
    if (polygon.length < 3) return;

    const points = [];
    const step = 60; // règle la taille des triangles
    for (let x = 0; x < 500; x += step) {
      for (let y = 0; y < 500; y += step) {
        if (pointInPolygon([x, y], polygon)) {
          points.push([x, y]);
        }
      }
    }

    const allPoints = [...points, ...polygon];

    const delaunay = Delaunay.from(allPoints);
    const newTriangles = [];
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
      const t = [
        allPoints[delaunay.triangles[i]],
        allPoints[delaunay.triangles[i + 1]],
        allPoints[delaunay.triangles[i + 2]],
      ];
      const centroid = [
        (t[0][0] + t[1][0] + t[2][0]) / 3,
        (t[0][1] + t[1][1] + t[2][1]) / 3,
      ];
      if (pointInPolygon(centroid, polygon)) {
        newTriangles.push(t);
      }
    }

    setTriangles(newTriangles);
    setIsClosed(true);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Low Poly Découpe</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {imageSrc && (
        <>
          {/* Image avec polygone/triangles */}
          <svg
            width={500}
            height={500}
            className="mt-4 border"
            onClick={handleClick}
          >
            <image href={imageSrc} x="0" y="0" width="500" height="500" />

            {/* polygone en cours */}
            {polygon.length > 0 && (
              <polyline
                points={polygon.map((p) => p.join(",")).join(" ")}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
            )}

            {/* triangles */}
            {isClosed &&
              triangles.map((triangle, idx) => (
                <polygon
                  key={idx}
                  points={triangle.map((p) => p.join(",")).join(" ")}
                  fill="url(#imgPattern)"
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}

            <defs>
              <pattern
                id="imgPattern"
                patternUnits="userSpaceOnUse"
                width="500"
                height="500"
              >
                <image href={imageSrc} x="0" y="0" width="500" height="500" />
              </pattern>
            </defs>
          </svg>

          {!isClosed && polygon.length >= 3 && (
            <button
              onClick={finalizePolygon}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Valider le polygone
            </button>
          )}

          {/* Galerie des triangles */}
          {isClosed && (
            <div className="mt-6 grid grid-cols-6 gap-4">
              {triangles.map((triangle, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <svg width={80} height={80} viewBox="0 0 500 500">
                    <defs>
                      <clipPath id={`clip-${idx}`}>
                        <polygon
                          points={triangle.map((p) => p.join(",")).join(" ")}
                        />
                      </clipPath>
                    </defs>
                    <image
                      href={imageSrc}
                      x="0"
                      y="0"
                      width="500"
                      height="500"
                      clipPath={`url(#clip-${idx})`}
                    />
                  </svg>
                  <span className="text-xs mt-1">#{idx + 1}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Polygones;
