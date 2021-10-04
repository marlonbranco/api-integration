export default function delayBetweenRequests(delayTime: number) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('') }, delayTime);
  })
}
