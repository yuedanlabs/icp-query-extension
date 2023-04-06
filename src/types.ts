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
}

export interface Options {
  api_url?: string
  show_feedback?: boolean
}
