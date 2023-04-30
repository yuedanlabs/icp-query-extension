export interface Data {
  msg?: string
  subject?: {
    name: string
    nature: string
    license: string
    updateTime: string
  }
  website?: {
    domain: string
    license: string
  }
  whois?: {
    "Domain Status": string[]
    "Name Server": string[]
    "Created Date": string
    "Updated Date"?: string
    "Expiry Date": string
    "Registrar": string
    "Registrant Organization"?: string
    "Registrant Country"?: string
  }
}

export interface Options {
  api_url?: string
  show_feedback?: boolean
  show_whois?: boolean
}
