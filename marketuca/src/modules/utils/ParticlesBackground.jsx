import Particles from "react-tsparticles";
import React from "react";

const ParticlesBackground = () => {
  return(
      <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: '#f0f4f8'
              }
            },
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 700
                }
              },
              color: {
                value: ['#007BFF', '#FFFFFF', '#00C4B4']
              },
              shape: {
                type: 'circle'
              },
              opacity: {
                value: 0.6,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.2,
                  sync: false
                }
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.5,
                  sync: false
                }
              },
              line_linked: {
                enable: false
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse'
                },
                onclick: {
                  enable: true,
                  mode: 'push'
                },
                resize: true
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                }
              }
            },
            retina_detect: true
          }}
          className="absolute inset-0 z-0 pointer-events-none"
      />
  )
}

export default ParticlesBackground;