// utils/GraphFilter.js

export default class GraphFilter {
    static filterGraphByDate(graphData, selectedDate) {
      const filteredEdges = graphData.relationships.map((edge) => {
        if (edge.type === 'CURATA_CON') {
          const edgeYear = parseInt(edge.properties.data_prescrizione.substring(0, 4));
          return edgeYear <= selectedDate ? edge : null;
        } else if (edge.type === 'DIAGNOSTICATO_CON') {
          const edgeYear = parseInt(edge.properties.data_prima_diagnosi.substring(0, 4));
          return edgeYear <= selectedDate ? edge : null;
        } else {
          return edge;
        }
      }).filter(Boolean);
  
      const connectedNodes = new Set();
      filteredEdges.forEach(edge => {
        connectedNodes.add(edge.start_id);
        connectedNodes.add(edge.end_id);
      });
  
      const filteredNodes = graphData.nodes.filter(node => connectedNodes.has(node.id));
  
      return {
        ...graphData,
        nodes: filteredNodes,
        relationships: filteredEdges,
      };
    }
  }
  