import useMount from "@/lib/renderer/hooks/useMount/index.js";

interface Link {
  source: string;
  target: string;
}

interface Node {
  id: string;
  x: number;
  y: number;
}

const PageGraphs = () => {
  useMount(() => {
    const canvas = document.querySelector("canvas");

    if (!canvas) {
      throw new Error("canvas not found");
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("ctx not found");
    }

    // Define canvas dimensions
    const width = (canvas.width = 800);
    const height = (canvas.height = 600);

    // Data
    const nodes = [
      { id: "A", x: 100, y: 100 },
      { id: "B", x: 300, y: 200 },
      { id: "C", x: 500, y: 100 },
    ];

    const links = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
    ];

    // Function to draw a node
    function drawNode(node: Node) {
      ctx?.beginPath();
      ctx?.arc(node.x, node.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "lightblue";
      ctx?.fill();
      ctx?.stroke();
    }

    // Function to draw a link
    function drawLink(link: Link) {
      const source = nodes.find((n) => n.id === link.source);
      const target = nodes.find((n) => n.id === link.target);

      ctx?.beginPath();
      ctx?.moveTo(source?.x ?? 0, source?.y ?? 0);
      ctx?.lineTo(target?.x ?? 0, target?.y ?? 0);
      ctx?.stroke();
    }

    // Draw the initial graph
    function drawGraph() {
      ctx?.clearRect(0, 0, width, height);

      links.forEach(drawLink);
      nodes.forEach(drawNode);
    }

    let isDragging = false;
    let selectedNode: Node | null = null;

    canvas.addEventListener("mousedown", (event) => {
      const mouseX = event.clientX - canvas.offsetLeft;
      const mouseY = event.clientY - canvas.offsetTop;

      nodes.forEach((node) => {
        const distance = Math.sqrt(
          Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)
        );

        if (distance <= 10) {
          // Check if mouse is within node radius
          isDragging = true;
          selectedNode = node;
        }
      });
    });

    canvas.addEventListener("mousemove", (event) => {
      if (isDragging && selectedNode) {
        selectedNode.x = event.clientX - canvas.offsetLeft;
        selectedNode.y = event.clientY - canvas.offsetTop;
        drawGraph();
      }
    });

    canvas.addEventListener("mouseup", () => {
      isDragging = false;
      selectedNode = null;
    });

    // Initial draw
    drawGraph();
  });

  return `
    <div class="flex justify-center">
      <canvas id="canvas" width="400" height="400" class="bg-neutral-500"></canvas>
    <div />
  `;
};

export default PageGraphs;
