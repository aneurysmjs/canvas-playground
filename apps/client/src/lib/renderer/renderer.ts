export default function renderer() {}

export const mount = (targetNode: Element, htmlString: string) => {
  // Check if the targetNode is a valid DOM element
  if (!(targetNode instanceof Element)) {
    throw new Error("Target node must be a valid DOM element.");
  }

  // Set the inner HTML of the target node
  targetNode.innerHTML = htmlString;
};
