export default function framerize(array) {
  const framedAnimations = [];
  for (const frame of array) {
    framedAnimations.push(animation.comparison);
    framedAnimations.push(animation.comparison);
    framedAnimations.push(animation.swap);
  }
  return framedAnimations;
}
