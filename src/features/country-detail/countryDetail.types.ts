export interface ClimateRecord {
  country: string
  year: number
  gdp: number | null
  population: number | null
  co2: number | null
}

export interface CountryLatest {
  country: string
  year: number
  gdp: number | null
  population: number | null
  co2: number | null
}

export interface CountryTrend {
  period: string
  gdpGrowth: number | null
  populationGrowth: number | null
  co2Change: number | null
}
