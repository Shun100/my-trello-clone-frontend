export const utils = {
  saveToken: (token: string) => localStorage.setItem('token', token),
  loadToken: () => localStorage.getItem('token'),
  deleteToken: () => localStorage.removeItem('token'),
  resort<T>(
    elements: T[],
    src: number,
    dst: number,
    getPosition: (elem: T) => number): T[] {

    const delta = Math.sign(src - dst);
    const resorted = elements.map(elem =>
      getPosition(elem) === src
        ? { ...elem, position: dst }
        : getPosition(elem) >= Math.min(src, dst) && getPosition(elem) <= Math.max(src, dst)
          ? { ...elem, position: getPosition(elem) + delta }
          :elem
    );

    return resorted;
  }
}