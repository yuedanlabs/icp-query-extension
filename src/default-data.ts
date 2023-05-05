import type { Data, Options } from "~types"

export const DEFAULT_DEMO_DATA: Data = {
  subject: {
    name: "北京百度网讯科技有限公司",
    nature: "企业",
    license: "京ICP证030173号",
    updateTime: "2022-10-11 09:27:57"
  },
  website: {
    domain: "baidu.com",
    license: "京ICP证030173号-1"
  }
}

export const DEFAULT_OPTIONS: Options = {
  api_url: process.env.PLASMO_PUBLIC_API_URL,
  show_feedback: true,
  show_whois: true,
  show_dns: true,
}
