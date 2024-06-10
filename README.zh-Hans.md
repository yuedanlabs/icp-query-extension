<p align="center">
  <img src="./assets/icon.png" height="128" />
</p>
<p align="center">
Browser Extension for ICP, DNS, Whois & GEO Queries
</p>
<p align="center">
<a href="https://github.com/yuedanlabs/icp-query-extension/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/yuedanlabs/icp-query-extension?style=flat-square"/></a>
</p>

[English](README.md) | [简体中文](README.zh-Hans.md)

## 简介

ICP Query Extension 是一款开源的浏览器扩展程序,可方便地查询以下相关信息：

  - ICP
  - DNS
  - Whois
  - 服务器位置和ISP

## 安装

1. [Chrome 应用商店](https://chrome.google.com/webstore/detail/icp-query-extension/plmfnmaihcmijdanpbondfejclejejfa): 直接从 Chrome 商店安装。 (推荐)
2. [发布的源代码](https://github.com/yuedanlabs/icp-query-extension/releases): 下载 zip 发布包进行手动安装。
3. 从源代码构建，流程见下面

## 图像演示

仅在点击扩展图标时显示当前标签页域名的 ICP 等信息，也仅仅只需一点。

<p align="center">
  <img src="./images/shortcut-05.jpg" height="128" />
  <br>
  (主页面)
</p>
<p align="center">
  <img src="./images/shortcut.png" height="128" />
  <br>
  (主页面)
</p>
<p align="center">
  <img src="./images/shortcut-02.png" height="128" />
  <br>
  (无 API 时的主页面)
</p>
<p align="center">
  <img src="./images/shortcut-03.png" height="128" />
  <br>
  (选项页面)
</p>
<p align="center">
  <img src="./images/shortcut-06.png" height="128" />
  <br>
  (选项页面)
</p>

## 源码构建

从源代码构建扩展程序:

  1. 克隆本仓库代码到本地机器。
      ```bash
      $ git clone https://github.com/yuedanlabs/icp-query-extension.git
      ```
  2. 构建扩展程序。
      ```bash
      $ cd icp-query-extension
      $ pnpm install
      $ pnpm run build
      ```
      构建产物将位于 `build/chrome-mv3-prod` 目录下。
  3. 在 Chrome 中安装扩展程序。
      - 打开 Chrome 浏览器并访问 `chrome://extensions/`。
      - 启用右上角的"开发者模式"。
      - 点击"加载已解压的扩展程序"按钮。
      - 选择 `icp-query-extension/build/chrome-mv3-prod` 文件夹。
      - 点击"加载"按钮。
      - 如需要,可将扩展程序固定到工具栏。
      - 在"选项"页面设置 API URL。
  4. 尽情享用!

## 赞助商

<!-- Fill in the list of sponsors here -->

<a href="https://github.com/labring/laf"><img alt="labring/laf" src="https://img.shields.io/badge/laf.run-red?logo=github&label=labring%2Flaf&color=%2300beb1&link=https%3A%2F%2Fgithub.com%2Flabring%2Flaf&link=https%3A%2F%2Flaf.run"/></a>

## 关于 API

该扩展程序设计为与任何符合以下数据结构的 API 兼容:

- API URL

  API URL 应包含查询参数 `url`,用于指定要查询的域名。

  示例: `https://your-domain/release/icp?url=www.baidu.com`

- API 响应数据

  API 应返回符合以下结构的 JSON 响应

  - API V2
  ```json
  {
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
  ```

  - API V1
  ```json
  [
    {
      "subject": {
        "name": "北京百度网讯科技有限公司",
        "nature": "企业",
        "license": "京ICP证030173号",
        "updateTime": "2023-01-10 09:43:35"
      },
      "website": {
        "domain": "baidu.com",
        "license": "京ICP证030173号-1"
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
        "A": ["110.242.68.66", "39.156.66.10"],
        "AAAA": [],
        "CNAME": [],
        "NS": [
          "ns3.baidu.com",
          "dns.baidu.com",
          "ns4.baidu.com",
          "ns7.baidu.com",
          "ns2.baidu.com"
        ],
        "GEO": {
          "isp": "中国移动",
          "area": "中国 北京市 北京市"
        }
      }
    }
  ]
  ```

## 待办事项

- [x] whois
- [x] DNS
- [ ] GongAn Record
- [x] GEO & ISP
- [x] ICP
- [ ] Other domains under the same subject
- [ ] Options API and custom API

## 许可证

[License MIT](LICENSE)