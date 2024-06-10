<p align="center">
  <!-- Set your project logo image here -->
  <img src="./assets/icon.png" height="128" />
</p>
<p align="center">
<!-- Fill in your project slogan here, preferably a short sentence. -->
Browser Extension for ICP, DNS, Whois & GEO Queries
</p>
<p align="center">
<a href="https://github.com/yuedanlabs/icp-query-extension/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/yuedanlabs/icp-query-extension?style=flat-square"/></a>
</p>

<span id="nav-1"></span>

<!-- ## Internationalization -->

<!-- Here is the multilingual list -->

[English](README.md) | [简体中文](README.zh-Hans.md)

<span id="nav-2"></span>

<!-- ## Table of Contents

<details open="open">
  <summary>Click me to Open/Close the directory listing</summary>

- [Internationalization](#nav-1)
- [Table of Contents](#nav-2)
- [Introductions](#nav-3)
  - [Official Website](#nav-3-1)
  - [Background](#nav-3-2)
- [Graphic Demo](#nav-4)
- [Features](#nav-5)
- [Architecture](#nav-6)
- [Getting Started](#nav-7)
- [Maintainer](#nav-8)
- [Contributors](#nav-9)
- [Community Exchange](#nav-10)
- [Part Of Users](#nav-11)
- [Release History](CHANGE.md)
- [Donators](#nav-12)
- [Sponsors](#nav-13)
- [Special Thanks](#nav-14)
- [License](#nav-15)

</details> -->

<span id="nav-3"></span>

## Introduction

<!-- Fill in the detailed introduction about your project here -->
ICP Query Extension is an open-source browser extension that allows you to conveniently query details for the current website you're visiting, including:
 - ICP
 - DNS
 - Whois
 - GEO (geographic location and ISP) 

<!-- > 👏 Now we can install the app in the chrome webstore: 👉 [ICP Query Extension](https://chrome.google.com/webstore/detail/icp-query-extension/plmfnmaihcmijdanpbondfejclejejfa) -->

<span id="nav-3-1"></span>

<!-- ### Official Website -->

<!-- Fill in the official website address of your project here, including homepage, documentation, etc. -->

<span id="nav-3-2"></span>

<!-- ### Background -->

<!-- Fill in the project creation background here -->

<span id="nav-4"></span>

## Installation

1. [Chrome Web Store](https://chrome.google.com/webstore/detail/icp-query-extension/plmfnmaihcmijdanpbondfejclejejfa): Install directly from the Chrome Web Store (Recommended).
2. [Source Releases](https://github.com/yuedanlabs/icp-query-extension/releases): Download the zip release package for manual installation.
3. Build from source code (follow the instructions in the "Getting Started" section).

## Graphic Demo

<!-- Place the demo of your project here, which can be a specific visit address, picture screenshot, Gif or video, etc. -->
Display the ICP info of current tab's domain, with only just one click on the extension icon.

<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-05.jpg" height="128" />
  <br>
  (Main Page)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut.png" height="128" />
  <br>
  (Main Page)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-02.png" height="128" />
  <br>
  (Main Page with no API)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-03.png" height="128" />
  <br>
  (Options Page)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-06.png" height="128" />
  <br>
  (Options Page)
</p>

<span id="nav-5"></span>

<!-- ## Features -->

<!-- Fill in the features of your project here, usually a list. -->

<span id="nav-6"></span>

<!-- ## Architecture -->

<!-- Fill in your project architecture diagram or description here, and you can place the project directory description -->

<span id="nav-7"></span>

## Getting Started

To build the extension from the source code:

  1. Clone this repository to your local machine.
      ```bash
      $ git clone https://github.com/yuedanlabs/icp-query-extension.git
      ```
  2. Build the extension.
      ```bash
      $ cd icp-query-extension
      $ pnpm install
      $ pnpm run build
      ```
      The `dist` files will be available in the `build/chrome-mv3-prod` directory.
  3. Install the extension in Chrome.
      - Open `chrome://extensions/` in your Chrome browser.
      - Enable "Developer Mode" in the top right corner.
      - Click the "Load unpacked extension..." button.
      - Select the `icp-query-extension/build/chrome-mv3-prod` folder.
      - Click the "Load" button.
      - Pin the extension to the toolbar if desired.
      - Set the API URL in the "Options" page.
  4. Enjoy!

<span id="nav-8"></span>

<!-- ## Maintainer -->

<!-- Fill in the relevant information of the project author here -->

<span id="nav-9"></span>

<!-- ## Contributors -->

<!-- Fill in the list of contributors to the project here, usually a list, of course, you can also use pictures instead. -->

<span id="nav-10"></span>

<!-- ## Community Exchange -->

<!-- Fill in the online and offline communication address of the project here, which can be an instant messaging group, a community, or a discussion group, etc. -->

<span id="nav-11"></span>

<!-- ## Part Of Users -->

<!-- Fill in the user list of the project here, and tell visitors which users are using your project. -->

<span id="nav-12"></span>

<!-- ## Donators -->

<!-- Fill in the list of donors here -->

<span id="nav-13"></span>

## Sponsors

<!-- Fill in the list of sponsors here -->

<a href="https://github.com/labring/laf"><img alt="labring/laf" src="https://img.shields.io/badge/laf.run-red?logo=github&label=labring%2Flaf&color=%2300beb1&link=https%3A%2F%2Fgithub.com%2Flabring%2Flaf&link=https%3A%2F%2Flaf.run"/></a>

<span id="nav-14"></span>

<!-- ## Special Thanks -->

<!-- Fill in the list of special thanks here, which can be anything or a person. -->

<span id="nav-15"></span>

## About the API

This extension is designed to work with any API that conforms to the following data structure:

- API URL
  The API URL should include a query parameter `url` for the domain to be queried.
  Example: `https://your-domain/release/icp?url=www.baidu.com`

- API Response Data
  The API should return a JSON response with the following structure:

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

## TODO

- [x] whois
- [x] DNS
- [ ] GongAn Record
- [x] GEO & ISP
- [x] ICP
- [ ] Other domains under the same subject
- [ ] Options API and custom API

## License

[License MIT](LICENSE)