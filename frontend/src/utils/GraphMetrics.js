export default class GraphMetrics {
  static async applyBetweenness(graphData, betweennessData) {
    // Estrai tutti i valori di betweenness
    const betweennessValues = betweennessData.map(item => item.betweeness);

    // Trova il valore minimo e massimo della betweenness
    const minBetweenness = Math.min(...betweennessValues);
    const maxBetweenness = Math.max(...betweennessValues);

    // Definisci i limiti di dimensione del nodo
    const minSize = 25;
    const maxSize = 100;

    return graphData.nodes.map(node => {
        if (node.type === 'Malattia') {
            const nodeBetweenness = betweennessData.find(item => item.icd9cm === node.properties.codice);
            
            if (nodeBetweenness) {
                // Normalizza la betweenness tra minSize e maxSize
                const normalizedSize = ((nodeBetweenness.betweeness - minBetweenness) / (maxBetweenness - minBetweenness)) * (maxSize - minSize) + minSize;
                return {
                    ...node,
                    size: normalizedSize,
                    Betweenness: nodeBetweenness.betweeness
                };
            }
        }

        // Se il nodo non ha betweenness, usa una dimensione predefinita
        return {
            ...node,
            size: minSize,
        };
    });
}

  }
  