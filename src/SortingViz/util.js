export default function framerize(array) {
  const framedAnimations = [];
  for (const frame of array) {
    framedAnimations.push(frame.comparison);
    framedAnimations.push(frame.comparison);
    framedAnimations.push(frame.swap);
  }
  return framedAnimations;
}
