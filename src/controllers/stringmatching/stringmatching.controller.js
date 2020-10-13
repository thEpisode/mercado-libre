function stringmatchingController (dependencies) {
  /**
   * https://medium.com/@sumn2u/string-similarity-comparision-in-js-with-examples-4bae35f13968
   * @param {string} s1 Is the first value to compare
   * @param {string} s2 Is the second value to compare
   */
  const jaroWrinker = (s1, s2) => {
    var m = 0

    // Exit early if either are empty.
    if (s1.length === 0 || s2.length === 0) {
      return 0
    }

    // Exit early if they're an exact match.
    if (s1 === s2) {
      return 1
    }

    var range = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1
    var s1Matches = new Array(s1.length)
    var s2Matches = new Array(s2.length)

    for (var i = 0; i < s1.length; i++) {
      var low = (i >= range) ? i - range : 0
      var high = (i + range <= s2.length) ? (i + range) : (s2.length - 1)

      for (var j = low; j <= high; j++) {
        if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
          ++m
          s1Matches[i] = s2Matches[j] = true
          break
        }
      }
    }

    // Exit early if no matches were found.
    if (m === 0) {
      return 0
    }

    // Count the transpositions.
    var k = 0
    var nTrans = 0

    for (i = 0; i < s1.length; i++) {
      if (s1Matches[i] === true) {
        for (j = k; j < s2.length; j++) {
          if (s2Matches[j] === true) {
            k = j + 1
            break
          }
        }

        if (s1[i] !== s2[j]) {
          ++nTrans
        }
      }
    }

    var weight = (m / s1.length + m / s2.length + (m - (nTrans / 2)) / m) / 3
    var l = 0
    var p = 0.1

    if (weight > 0.7) {
      while (s1[l] === s2[l] && l < 4) {
        ++l
      }

      weight = weight + l * p * (1 - weight)
    }

    return weight
  }

  return {
    jaroWrinker
  }
}

module.exports = stringmatchingController
