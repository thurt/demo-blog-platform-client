export function disableInputs(f: HTMLFormElement) {
  const ins = Array.from(f.getElementsByTagName('input'));
  for (let i of ins) {
    i.setAttribute('disabled', 'true');
  }
}

export function enableInputs(f: HTMLFormElement) {
  const ins = Array.from(f.getElementsByTagName('input'));
  for (let i of ins) {
    i.removeAttribute('disabled');
  }
}

export function getInputByName(f: HTMLFormElement, name: string) {
  const ins = Array.from(f.getElementsByTagName('input'));
  return ins.find(i => i.name === name);
}
