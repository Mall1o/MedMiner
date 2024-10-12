export default class GraphMetrics {

    static normalizeValue(value, minValue, maxValue, minSize, maxSize) {
      return ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize) + minSize;
    }
  
    static async applyBetweenness(graphData, betweennessData) {
      const betweennessValues = betweennessData.map(item => item.betweeness);
      const minBetweenness = Math.min(...betweennessValues);
      const maxBetweenness = Math.max(...betweennessValues);
      const minSize = 25;
      const maxSize = 100;
  
      return graphData.nodes.map(node => {
        if (node.type === 'Malattia') {
          const nodeBetweenness = betweennessData.find(item => item.icd9cm === node.properties.codice);
          if (nodeBetweenness) {
            const normalizedSize = this.normalizeValue(nodeBetweenness.betweeness, minBetweenness, maxBetweenness, minSize, maxSize);
            return {
              ...node,
              size: normalizedSize,
              Betweenness: nodeBetweenness.betweeness
            };
          }
        }
        return { ...node, size: minSize };
      });
    }
  
    static async applyCloseness(graphData, closenessData) {
      const minSize = 25;  // Dimensione minima dei nodi
      const maxSize = 100; // Dimensione massima dei nodi
    
      return graphData.nodes.map(node => {
        if (node.type === 'Malattia') {
          const nodeCloseness = closenessData.find(item => item.icd9cm === node.properties.codice);
          if (nodeCloseness) {
            // Scala il valore di closeness tra minSize e maxSize
            const scaledSize = this.scaleValue(nodeCloseness.closeness_centrality, minSize, maxSize);
            return {
              ...node,
              size: scaledSize,
              Closeness: nodeCloseness.closeness_centrality
            };
          }
        }
        return { ...node, size: minSize }; // Nodo senza valore di Closeness
      });
    }
    
    // Funzione per scalare i valori tra minSize e maxSize
    static scaleValue(value, minSize, maxSize) {
      return value * (maxSize - minSize) + minSize;
    }
    static async applyPageRank(graphData, pageRankData) {
      const pageRankValues = pageRankData.map(item => item.score); // Usa il campo 'score' per calcolare i valori di PageRank
      const minPageRank = Math.min(...pageRankValues);
      const maxPageRank = Math.max(...pageRankValues);
      const minSize = 25;  // Dimensione minima dei nodi
      const maxSize = 100; // Dimensione massima dei nodi
    
      return graphData.nodes.map(node => {
        if (node.type === 'Malattia') {
          const nodePageRank = pageRankData.find(item => item.icd9cm === node.properties.codice);
          if (nodePageRank) {
            // Normalizza il valore di PageRank tra minSize e maxSize
            const normalizedSize = this.normalizeValue(nodePageRank.score, minPageRank, maxPageRank, minSize, maxSize);
            return {
              ...node,
              size: normalizedSize,
              PageRank: nodePageRank.score  // Assicurati di usare 'score' come valore per PageRank
            };
          }
        }
        return { ...node, size: minSize }; // Nodo senza valore di PageRank
      });
    }
    
    // Funzione di normalizzazione per scalare i valori di PageRank tra minSize e maxSize
    static normalizeValue(value, minValue, maxValue, minSize, maxSize) {
      return ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize) + minSize;
    }
    
  
    static async applyKcore(graphData, kcoreData) {
      const kcoreValues = kcoreData.map(item => item.core_value); // Usa core_value per il K-core
      const minKcore = Math.min(...kcoreValues);
      const maxKcore = Math.max(...kcoreValues);
      const minSize = 25;
      const maxSize = 100;
    
      console.log("Kcore data:", kcoreData); // Verifica se kcoreData è corretto
      console.log("Min Kcore:", minKcore, "Max Kcore:", maxKcore); // Verifica i valori minimo e massimo
    
      return graphData.nodes.map(node => {
        console.log("Processing node:", node); // Vedi i dati del nodo
        if (node.type === 'Malattia') {
          const nodeKcore = kcoreData.find(item => item.icd9cm === node.properties.codice);
          if (nodeKcore) {
            console.log("Node found with core_value:", nodeKcore.core_value); // Verifica se il nodo corrisponde
            const normalizedSize = this.normalizeValueKcore(nodeKcore.core_value, minKcore, maxKcore, minSize, maxSize);
            console.log("Normalized size:", normalizedSize); // Vedi la dimensione normalizzata
            return {
              ...node,
              size: normalizedSize,
              Kcore: nodeKcore.core_value // Usa core_value come valore per il K-core
            };
          } else {
            console.log("No core_value found for node:", node.properties.codice); // Vedi se il nodo non trova un core_value
          }
        }
        return { ...node, size: minSize };
      });
    }
    
    // Funzione di normalizzazione
    static normalizeValueKcore(value, minValue, maxValue, minSize, maxSize) {
      if (maxValue === minValue) {
        // Gestisce il caso in cui maxKcore e minKcore siano uguali
        return minSize;
      }
      return ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize) + minSize;
    }
    
    
  }
  