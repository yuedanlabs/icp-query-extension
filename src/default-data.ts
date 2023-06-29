import type { Data, Options } from "~types"

export const DEFAULT_DEMO_DATA: Data = {
  "icp": {
    "subject": {
      "name": "北京百度网讯科技有限公司",
      "nature": "企业",
      "license": "京ICP证030173号",
      "updateTime": "2023-05-29 08:20:36"
    },
    "website": {
      "domain": "baidu.com",
      "license": "京ICP证030173号-1"
    }
  },
  "whois": {
    "Domain Status": [
      "clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited",
      "clientTransferProhibited https://icann.org/epp#clientTransferProhibited",
      "clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited",
      "serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited",
      "serverTransferProhibited https://icann.org/epp#serverTransferProhibited",
      "serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited"
    ],
    "Name Server": [
      "NS1.BAIDU.COM",
      "NS2.BAIDU.COM",
      "NS3.BAIDU.COM",
      "NS4.BAIDU.COM",
      "NS7.BAIDU.COM"
    ],
    "Created Date": "1999-10-11T11:05:17Z",
    "Updated Date": "2022-09-01T03:54:43Z",
    "Expiry Date": "2026-10-11T11:05:17Z",
    "Registrar": "MarkMonitor Inc."
  },
  "dns": {
    "A": [
      "180.101.50.242",
      "180.101.50.188"
    ],
    "AAAA": [],
    "CNAME": [
      "www.a.shifen.com"
    ],
    "NS": [],
    "GEO": {
      "isp": "电信",
      "area": "中国 江苏 南京"
    }
  }
}

export const DEFAULT_OPTIONS: Options = {
  api_url: process.env.PLASMO_PUBLIC_API_URL,
  show_feedback: true,
  show_whois: true,
  show_dns: true,
  show_icp: true,
}
