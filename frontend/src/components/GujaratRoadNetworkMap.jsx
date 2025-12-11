import { useEffect, useRef, useState } from "react";
import anime from "animejs";

export default function GujaratRoadNetworkMap() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredCity, setHoveredCity] = useState(null);

  // Geographically inspired city positions with realistic spacing
  const cities = [
    // Center Hub - Ahmedabad
    {
      id: "ahmedabad",
      name: "Ahmedabad",
      x: 480,
      y: 380,
      connections: ["gandhinagar", "mehsana", "anand", "vadodara", "rajkot", "bhavnagar"],
      region: "center",
      importance: "hub",
    },
    // North Belt
    {
      id: "gandhinagar",
      name: "Gandhinagar",
      x: 475,
      y: 300,
      connections: ["ahmedabad", "mehsana"],
      region: "north",
      importance: "major",
    },
    {
      id: "mehsana",
      name: "Mehsana",
      x: 430,
      y: 260,
      connections: ["ahmedabad", "gandhinagar"],
      region: "north",
      importance: "regional",
    },
    // East Belt (south-east curve)
    {
      id: "anand",
      name: "Anand",
      x: 540,
      y: 360,
      connections: ["ahmedabad", "vadodara"],
      region: "east",
      importance: "regional",
    },
    {
      id: "vadodara",
      name: "Vadodara",
      x: 610,
      y: 390,
      connections: ["ahmedabad", "anand", "bharuch", "surat"],
      region: "east",
      importance: "major",
    },
    {
      id: "bharuch",
      name: "Bharuch",
      x: 680,
      y: 420,
      connections: ["vadodara", "surat"],
      region: "east",
      importance: "regional",
    },
    {
      id: "surat",
      name: "Surat",
      x: 730,
      y: 500,
      connections: ["vadodara", "bharuch", "navsari", "vapi"],
      region: "east",
      importance: "major",
    },
    {
      id: "navsari",
      name: "Navsari",
      x: 720,
      y: 560,
      connections: ["surat", "vapi"],
      region: "east",
      importance: "regional",
    },
    {
      id: "vapi",
      name: "Vapi",
      x: 750,
      y: 600,
      connections: ["surat", "navsari"],
      region: "east",
      importance: "regional",
    },
    // West Belt (curved southwest)
    {
      id: "rajkot",
      name: "Rajkot",
      x: 360,
      y: 480,
      connections: ["ahmedabad", "jamnagar", "junagadh", "morbi"],
      region: "west",
      importance: "major",
    },
    {
      id: "jamnagar",
      name: "Jamnagar",
      x: 250,
      y: 440,
      connections: ["rajkot", "porbandar"],
      region: "west",
      importance: "major",
    },
    {
      id: "porbandar",
      name: "Porbandar",
      x: 200,
      y: 580,
      connections: ["jamnagar", "junagadh"],
      region: "west",
      importance: "regional",
    },
    {
      id: "junagadh",
      name: "Junagadh",
      x: 320,
      y: 560,
      connections: ["rajkot", "amreli", "porbandar"],
      region: "southwest",
      importance: "major",
    },
    {
      id: "morbi",
      name: "Morbi",
      x: 320,
      y: 520,
      connections: ["rajkot"],
      region: "west",
      importance: "regional",
    },
    // South-Central
    {
      id: "bhavnagar",
      name: "Bhavnagar",
      x: 550,
      y: 520,
      connections: ["ahmedabad", "rajkot", "amreli"],
      region: "southwest",
      importance: "major",
    },
    {
      id: "amreli",
      name: "Amreli",
      x: 480,
      y: 580,
      connections: ["bhavnagar", "junagadh"],
      region: "southwest",
      importance: "regional",
    },
  ];

  // Generate roads with Bezier curve control points
  const roads = [];
  cities.forEach((city) => {
    city.connections.forEach((connId) => {
      const existingRoad = roads.find(
        (r) => (r.from === city.id && r.to === connId) || (r.from === connId && r.to === city.id)
      );
      if (!existingRoad) {
        const fromCity = cities.find((c) => c.id === city.id);
        const toCity = cities.find((c) => c.id === connId);
        if (fromCity && toCity) {
          // Calculate curve control point for smooth Bezier curves
          const midX = (fromCity.x + toCity.x) / 2;
          const midY = (fromCity.y + toCity.y) / 2;
          const dx = toCity.x - fromCity.x;
          const dy = toCity.y - fromCity.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const curvature = Math.min(distance * 0.3, 60);

          // Perpendicular offset for curve
          const perpX = -dy / distance;
          const perpY = dx / distance;

          roads.push({
            from: city.id,
            to: connId,
            curveControl: {
              x: midX + perpX * curvature,
              y: midY + perpY * curvature,
            },
          });
        }
      }
    });
  });

  // Get city coordinates
  const getCity = (id) => cities.find((c) => c.id === id);

  // Get curved road path using Bezier curves
  const getRoadPath = (road) => {
    const fromCity = getCity(road.from);
    const toCity = getCity(road.to);
    if (!fromCity || !toCity) return "";

    if (road.curveControl) {
      return `M ${fromCity.x} ${fromCity.y} Q ${road.curveControl.x} ${road.curveControl.y} ${toCity.x} ${toCity.y}`;
    }
    return `M ${fromCity.x} ${fromCity.y} L ${toCity.x} ${toCity.y}`;
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      // Responsive adjustments if needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate on mount
  useEffect(() => {
    if (svgRef.current) {
      // Animate city nodes with stagger
      anime({
        targets: svgRef.current.querySelectorAll(".city-node"),
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(100),
        easing: "easeOutElastic(1, .8)",
      });

      // Animate road lines
      anime({
        targets: svgRef.current.querySelectorAll(".road-line"),
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 0.9],
        duration: 1500,
        delay: anime.stagger(50, { start: 800 }),
        easing: "easeOutExpo",
      });

      // Continuous flow animation
      const flowPaths = svgRef.current.querySelectorAll(".flow-line");
      anime({
        targets: flowPaths,
        strokeDashoffset: [0, -40],
        duration: 4000,
        loop: true,
        easing: "linear",
      });
    }
  }, []);

  return (
    <div className="w-full py-8 md:py-12 lg:py-16 relative">
      {/* Light golden halo at bottom for white page integration */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[rgba(255,249,230,0.4)] via-[rgba(255,249,230,0.2)] to-transparent pointer-events-none rounded-b-3xl"></div>

      {/* Premium Map Container */}
      <div
        ref={containerRef}
        className="relative w-full mx-auto rounded-3xl overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "1400px",
          aspectRatio: "16/9",
          minHeight: "400px",
          background: "radial-gradient(circle at center, #0E0E0E 0%, #1C1C1C 80%)",
          boxShadow: "0 6px 20px rgba(255, 179, 0, 0.25), 0 0 0 1px rgba(255, 179, 0, 0.15)",
        }}
      >
        {/* Inner golden glow around center (Ahmedabad hub effect) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#FFB300]/15 via-[#FFB300]/5 to-transparent pointer-events-none rounded-full blur-3xl"></div>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none"></div>

        <svg
          ref={svgRef}
          viewBox="0 0 1000 700"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{
            touchAction: "pan-x pan-y pinch-zoom",
          }}
        >
          <defs>
            {/* Road gradient */}
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD65A" />
              <stop offset="50%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>

            {/* City gradient */}
            <linearGradient id="cityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#FF7B00" />
            </linearGradient>

            {/* Hub glow (Ahmedabad) */}
            <radialGradient id="hubGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFB300" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFB300" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFB300" stopOpacity="0" />
            </radialGradient>

            {/* Glow filter for roads */}
            <filter id="roadGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* City glow filter */}
            <filter id="cityGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Road Lines */}
          <g className="roads">
            {roads.map((road, index) => {
              const path = getRoadPath(road);
              const fromCity = getCity(road.from);
              const toCity = getCity(road.to);
              const isMainRoute =
                fromCity?.id === "ahmedabad" || toCity?.id === "ahmedabad";
              const isHovered = hoveredCity && (road.from === hoveredCity || road.to === hoveredCity);

              return (
                <g key={`road-${road.from}-${road.to}-${index}`}>
                  {/* Main road line with glow */}
                  <path
                    d={path}
                    className="road-line"
                    fill="none"
                    stroke="url(#roadGradient)"
                    strokeWidth={isMainRoute ? "3" : "2.5"}
                    opacity={isHovered ? "1" : isMainRoute ? "0.85" : "0.65"}
                    style={{
                      filter: "url(#roadGlow)",
                      transition: "opacity 0.3s ease",
                    }}
                  />

                  {/* Animated flow effect (for all routes) */}
                  <path
                    d={path}
                    className="flow-line"
                    fill="none"
                    stroke="#FFD65A"
                    strokeWidth={isMainRoute ? "4" : "3"}
                    strokeDasharray="25,15"
                    opacity={isHovered ? "0.8" : "0.5"}
                    style={{
                      filter: "drop-shadow(0 0 6px #FFB300)",
                    }}
                  />
                </g>
              );
            })}
          </g>

          {/* City Nodes */}
          <g className="cities">
            {cities.map((city) => {
              const isHub = city.id === "ahmedabad";
              const isHovered = hoveredCity === city.id;

              // Responsive node sizing based on importance
              const nodeSize = isHub
                ? 30
                : city.importance === "major"
                ? 24
                : 20;

              return (
                <g
                  key={city.id}
                  className="city-node group"
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Outer glow ring */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={nodeSize + 8}
                    fill="none"
                    stroke="#FFB300"
                    strokeWidth="2"
                    opacity={isHovered ? "0.6" : "0.3"}
                    className="transition-opacity duration-300"
                    style={{
                      filter: "blur(5px)",
                    }}
                  />

                  {/* Hub special glow (Ahmedabad) */}
                  {isHub && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={nodeSize + 15}
                      fill="url(#hubGlow)"
                      opacity="0.4"
                      style={{
                        filter: "blur(8px)",
                      }}
                    />
                  )}

                  {/* City node - illuminated beacon */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={nodeSize}
                    fill="url(#cityGradient)"
                    className="transition-all duration-300"
                    style={{
                      filter: isHub
                        ? "drop-shadow(0 0 20px rgba(255, 179, 0, 0.8)) drop-shadow(0 0 10px rgba(255, 179, 0, 0.6))"
                        : "drop-shadow(0 0 15px rgba(255, 179, 0, 0.6)) drop-shadow(0 0 8px rgba(255, 179, 0, 0.4))",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                      transformOrigin: `${city.x}px ${city.y}px`,
                    }}
                  />

                  {/* Inner highlight (3D effect) */}
                  <circle
                    cx={city.x - nodeSize * 0.25}
                    cy={city.y - nodeSize * 0.25}
                    r={nodeSize * 0.45}
                    fill="rgba(255, 255, 255, 0.4)"
                    opacity="0.7"
                  />

                  {/* City name label */}
                  <text
                    x={city.x}
                    y={city.y + nodeSize + 26}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontWeight="700"
                    className="font-inter select-none pointer-events-none"
                    style={{
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.95)) drop-shadow(0 0 6px rgba(255, 179, 0, 0.4))",
                      fontSize: isHub ? "16" : city.importance === "major" ? "14" : "12",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}



