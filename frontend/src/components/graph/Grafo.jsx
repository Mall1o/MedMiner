import React, { useEffect, useState } from 'react';
import { Graph } from '@visx/network';
import { hierarchy } from 'd3-hierarchy';

function Grafo({ graphData }) {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        console.log("Dati ricevuti dal backend:", graphData);

        const nodes = graphData.nodes.map((node, index) => ({
            id: node.code,
            name: node.code,
            radius: 15,
        }));

        const links = graphData.relationships.map((rel, index) => ({
            source: rel.codice_fiscale_assistito,
            target: rel.codice_regionale_medico,
        }));

        setNodes(nodes);
        setLinks(links);
    }, [graphData]);

    const data = {
        nodes,
        links,
    };

    console.log("Dati formattati per visx:", data);

    return (
        <svg width={800} height={600} style={{ border: '1px solid black' }}>
            <Graph
                root={hierarchy(data)}
                size={[800, 600]}
                linkComponent={({ link }) => (
                    <line
                        x1={link.source.x}
                        y1={link.source.y}
                        x2={link.target.x}
                        y2={link.target.y}
                        stroke="#999"
                        strokeWidth="2"
                    />
                )}
                nodeComponent={({ node }) => (
                    <circle
                        r={node.data.radius}
                        cx={node.x}
                        cy={node.y}
                        fill="#76c7c0"
                        stroke="#f39c12"
                        strokeWidth="2"
                    />
                )}
            />
        </svg>
    );
}

export default Grafo;
S