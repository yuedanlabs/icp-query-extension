import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import { DEFAULT_DEMO_DATA } from "~default-data"
import type { Data, Options } from "~types"
import Loader from "./loader"

export default function Table() {
  const [data, setData] = useState<Data>(null)
  const [showFeedback, setShowFeedback] = useState(true)

  const fetch_data = async (API: string, domain: string) => {
    const url = new URL(API)
    url.searchParams.append("url", domain)
    const res = await fetch(url)
    if (res.ok || res.status === 429) {
      return res.json()
    }
  }

  const init_demo = () => {
    setData(DEFAULT_DEMO_DATA)
  }

  const init_data = async () => {
    const storage = new Storage()

    const options: Options = await storage.get("options")
    if (options && options.api_url != "") {
      setShowFeedback("show_feedback" in options ? options.show_feedback : true)
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          let domain = new URL(tabs[0].url).hostname
          const result = await fetch_data(options.api_url, domain)
          setData(Array.isArray(result) ? result[0] : result)
        }
      )
    } else {
      setData({ msg: "请先配置API" })
    }
  }

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.PLASMO_PUBLIC_DEBUG === "true"
    ) {
      init_demo()
    } else {
      init_data()
    }
  }, [])

  if (!data) {
    return (
      <div className="m-auto">
        <Loader />
        <p>...waiting...</p>
      </div>
    )
  }

  return (
    <div className="m-auto">
      {data.msg ? (
        <p className="p-4">{data.msg}</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td
                className="w-14 text-justify"
                style={{ textAlignLast: "justify" }}>
                备案类型
              </td>
              <td className="text-xs opacity-60">{data.subject.nature}</td>
            </tr>
            <tr>
              <td
                className="w-14 text-justify"
                style={{ textAlignLast: "justify" }}>
                主办方
              </td>
              <td className="text-xs opacity-60">{data.subject.name}</td>
            </tr>
            <tr>
              <td
                className="w-14 text-justify"
                style={{ textAlignLast: "justify" }}>
                备案号
              </td>
              <td className="text-xs opacity-60">{data.subject.license}</td>
            </tr>
            <tr>
              <td
                className="w-14 text-justify"
                style={{ textAlignLast: "justify" }}>
                备案日期
              </td>
              <td className="text-xs opacity-60">
                {new Date(data.subject.updateTime).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {showFeedback && (
        <>
          <hr className="my-2" />
          <div className="text-xs text-blue-700 opacity-60">
            <span>结果不满意？</span>
            <a
              className="underline"
              href="mailto:yuedan.work+feedback@gmail.com?subject=Feedback%20for%20ICP%20Query%20Extension&body=Email%3A%20%3Cyour%20email%20address%2C%20optional%3E%0A*Token%3A%20%3Cyour%20token%20in%20use%3E%0A*Content%3A%20%3Cinput%20your%20suggestions%20or%20feedback%20here%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))">
              点击反馈
            </a>
          </div>
        </>
      )}
    </div>
  )
}
