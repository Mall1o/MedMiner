// utils/GraphMetrics.js

export default class GraphMetrics {
    static async applyBetweenness(graphData, betweennessData) {
      return graphData.nodes.map(node => {
        if (node.type === 'Malattia') {
          const nodeBetweenness = betweennessData.find(item => item.icd9cm === node.properties.codice);
          const newSize = nodeBetweenness ? nodeBetweenness.betweeness * 0.04 : 25; // Scala la dimensione in base alla betweenness
          return {
            ...node,
            size: newSize,
          };
        }
        return node;
      });
    }
  }
  