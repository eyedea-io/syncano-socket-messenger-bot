let startClock = null
const DEBUG = true

const getNow = () => {
  return new Date()
}

const getNowString = (date) => {
  return date.toISOString()
    .replace(/T/, ' ')      // replace T with a space
    .replace(/\..+/, '')    // delete the dot and everything after
}

const calculateDiff = (t1, t2) => {
  return (t2.getTime() - t1.getTime()) / 1000
}

export const printDebug = function (...args) {
  if (ARGS.DEBUG || DEBUG) {
    const now = getNow()
    const diff = calculateDiff(startClock, now)
    console.log(getNowString(now), args.join(' '), `+${diff}`)
  }
}

export const debug = (...args) => {
  if (!startClock) {
    startClock = getNow()
  }
  printDebug(...args)
}
