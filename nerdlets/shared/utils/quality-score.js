import { roundToTwoDigits } from './number-formatter'

export const metricQualityScore = (metric, threshold, strategy) => {
  switch (strategy) {
    case 'clampMinZeroMaxOne':
      if (threshold) return metric >= threshold ? 0 : 1
      else return 1
    case 'zeroOrOne':
      if (metric && metric > 0) return 0
      else return 1
    default:
      throw `Unknown quality score strategy: ${strategy}`
  }
}

export const viewQualityScore = (view, qualityScoreDef) => {
  const included = []
  qualityScoreDef.include.forEach(q => {
    view.details.forEach(d => {
      if (d.def.id === q) {
        included[d.def.id] = d.qualityScore
      }
    })
  })

  return qualityScoreDef.formula(included)
}
