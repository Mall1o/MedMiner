import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const Graph = ({ initialElements, fetchMoreElements }) => {
  const cyRef = useRef(null);
  const [elements, setElements] = useState(initialElements);

  useEffect(() => {
    cyRef.current = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#0074D9',
            'label': 'data(label)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#0074D9',
            'target-arrow-color': '#0074D9',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'grid',
        rows: 1
      },
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      minZoom: 0.1,
      maxZoom: 3,
    });

    // Rendering Incrementale
    const loadMore = () => {
      const newElements = fetchMoreElements();
      if (newElements.length > 0) {
        cyRef.current.add(newElements);
        cyRef.current.layout({ name: 'grid' }).run(); // Ricalcola il layout
        setElements(prev => [...prev, ...newElements]);
      }
    };

    const intervalId = setInterval(loadMore, 1000); // Carica nuovi elementi ogni secondo

    // Tooltip su Archi
    cyRef.current.edges().forEach(edge => {
      const tip = tippy(document.createElement('div'), {
        content: `From: ${edge.data('source')}<br>To: ${edge.data('target')}<br>Label: ${edge.data('label')}`,
        allowHTML: true,
      });

      edge.on('mouseover', (event) => {
        const target = event.target;
        const ref = target.renderedPosition();
        tip.setProps({
          getReferenceClientRect: () => ({
            width: 0,
            height: 0,
            top: ref.y,
            left: ref.x,
            bottom: ref.y,
            right: ref.x,
          }),
        });
        tip.show();
      });

      edge.on('mouseout', () => {
        tip.hide();
      });
    });

    return () => {
      clearInterval(intervalId);
      cyRef.current.destroy(); // Pulizia
    };
  }, [elements, fetchMoreElements]);

  return <div ref={cyRef} style={{ width: '100%', height: '600px' }} />;
};

export default Graph;
