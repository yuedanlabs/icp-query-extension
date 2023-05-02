<p align="center">
  <!-- Set your project logo image here -->
  <img src="./assets/icon.png" height="128" />
</p>
<p align="center">
<!-- Fill in your project slogan here, preferably a short sentence. -->
Browser Extension for ICP Query
</p>
<p align="center">
<a href="https://github.com/yuedanlabs/icp-query-extension/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/yuedanlabs/icp-query-extension?style=flat-square"/></a>
</p>

<span id="nav-1"></span>

<!-- ## Internationalization -->

<!-- Here is the multilingual list -->

<!-- [English](README.md) | [简体中文](README.zh-Hans.md) -->

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

## Introductions

<!-- Fill in the detailed introduction about your project here -->
Browser Extension for ICP Query, Chrome is supported for now.

> 👏 Now we can install the app in the chrome webstore: 👉 [ICP Query Extension](https://chrome.google.com/webstore/detail/icp-query-extension/plmfnmaihcmijdanpbondfejclejejfa)

<span id="nav-3-1"></span>

<!-- ### Official Website -->

<!-- Fill in the official website address of your project here, including homepage, documentation, etc. -->

<span id="nav-3-2"></span>

<!-- ### Background -->

<!-- Fill in the project creation background here -->

<span id="nav-4"></span>

## Graphic Demo

<!-- Place the demo of your project here, which can be a specific visit address, picture screenshot, Gif or video, etc. -->
Display the ICP info of current tab's domain, only when you click the extension icon.

<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-05.jpg" height="128" />
  <br>
  (0. Main Page)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut.png" height="128" />
  <br>
  (1. Main Page)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-02.png" height="128" />
  <br>
  (2. Main Page with no API)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-03.png" height="128" />
  <br>
  (3. Options Page)
</p>
<p align="center">
  <!-- Set your project logo image here -->
  <img src="./images/shortcut-06.png" height="128" />
  <br>
  (4. Options Page)
</p>

<span id="nav-5"></span>

<!-- ## Features -->

<!-- Fill in the features of your project here, usually a list. -->

<span id="nav-6"></span>

<!-- ## Architecture -->

<!-- Fill in your project architecture diagram or description here, and you can place the project directory description -->

<span id="nav-7"></span>

## Getting Started

<!-- Write the detailed instructions for the project here, and tell users how to use your project. -->
- Build the extension from the [source code](https://github.com/yuedanlabs/icp-query-extension.git)
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
      then you can check the dist files in `build/chrome-mv3-prod` directory, and use it in Chrome.
  3. Install the extension.
      - open `chrome://extensions/` in your Chrome browser.
      - open the `Developer Mode` in the top right corner.
      - click the `Load unpacked extension...` button.
      - select the `icp-query-extension/build/chrome-mv3-prod` folder.
      - click the `Load` button.
      - Pin the extension to the `Toolbar`, if needed.
      - Set the API URL in the `Options` page.
  4. Enjoy!

- Optional: you can download the release package directly to install it.

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

<!-- ## Sponsors -->

<!-- Fill in the list of sponsors here -->

<span id="nav-14"></span>

<!-- ## Special Thanks -->

<!-- Fill in the list of special thanks here, which can be anything or a person. -->

<span id="nav-15"></span>

## About the API

- API URL

  the api url has a query parameter:
    - url: the domain name to be queried.

  for example:
    - `https://your-domain/release/icp?url=www.baidu.com`

- API Response Data

  ```json
  [
    {
      "subject": {
        "name": "北京百度网讯科技有限公司",
        "nature": "企业",
        "license": "京ICP证030173号",
        "updateTime": "2022-10-11 09:27:57"
      },
      "website": {
        "domain": "baidu.com",
        "license": "京ICP证030173号-1"
      }
    }
  ]
  ```

## TODO

- [x] whois
- [ ] DNS
- [ ] GongAn Record

## License

[License MIT](LICENSE)