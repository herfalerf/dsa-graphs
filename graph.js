class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    let adjacentList = vertex.adjacent;
    for (let adjVer of adjacentList) {
      this.removeEdge(vertex, adjVer);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let result = [];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      result.push(current.value);
      for (let adj of current.adjacent) {
        if (!seen.has(adj)) {
          toVisitStack.push(adj);
          seen.add(adj);
        }
      }
    }
    return result;
  }
  // depthFirstSearch(start, seen = new Set([start]), result = [start.value]) {
  //   for (let adj of start.adjacent) {
  //     if (!seen.has(adj)) {
  //       seen.add(adj);
  //       result.push(adj.value);
  //       this.depthFirstSearch(adj, seen, result);
  //     }
  //   }
  //   return result;
  // }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let result = [start.value];
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      for (let adj of current.adjacent) {
        if (!seen.has(adj)) {
          toVisitQueue.push(adj);
          seen.add(adj);
          result.push(adj.value);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };
