export interface Data {
  warn?: string
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
    Registrar: string
    "Registrant Organization"?: string
    "Registrant Country"?: string
  }
  dns?: {
    A: string[]
    AAAA: string[]
    CNAME: string[]
    NS: string[]
  }
}

export interface Options {
  api_url?: string
  show_feedback?: boolean
  show_whois?: boolean
  show_dns?: boolean
}
