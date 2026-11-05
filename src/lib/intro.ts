// Petit signal global : les éléments du hero et le header attendent
// la fin de l'introduction pour faire leur entrée.
let done = false;
const listeners = new Set<() => void>();

export const isIntroDone = () => done;

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroDone(fn: () => void) {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
