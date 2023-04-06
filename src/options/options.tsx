import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import { DEFAULT_OPTIONS } from "~default-data"
import type { Options } from "~types"

export default function Options() {
  const [options, setOptions] = useState<Options>(null)
  const [status, setStatus] = useState("")
  const [validation, setValidation] = useState("")

  const init_data = async () => {
    const storage = new Storage()

    const saved_options: Options = await storage.get("options")
    setOptions(saved_options ? saved_options : DEFAULT_OPTIONS)
  }

  function handleAPIURLChange(e) {
    setValidation("")
    const api_url: string = e.target.value
    if (!api_url || api_url.length < 8) {
      setValidation("Please enter a valid URL")
    }
    if (
      api_url.substring(0, 7) != "http://" &&
      api_url.substring(0, 8) != "https://"
    ) {
      setValidation("Please enter a valid URL")
    }
    setOptions({
      ...options,
      api_url
    })
  }

  function handleShowFeedback(e) {
    setOptions({
      ...options,
      show_feedback: e.target.checked
    })
  }

  const save_options = async () => {
    const storage = new Storage()
    await storage.set("options", options)
    setStatus("Options saved.")
    setTimeout(() => {
      setStatus("")
    }, 750)
  }

  useEffect(() => {
    init_data()
  }, [])

  return (
    <main className="my-10">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex flex-col text-start">
            <span className="text-base">ICP API URL</span>
            <span className="w-80 text-ellipsis break-words text-xs text-red-400">
              Set API To: {options?.api_url || "null"}
            </span>
          </div>
          <div className="flex flex-col">
            <textarea
              className={`border ${
                validation ? "border-red-500 focus:outline-red-500" : ""
              }`}
              cols={33}
              rows={3}
              value={options?.api_url}
              onChange={handleAPIURLChange}
            />
            <span className="text-xs text-red-500">{validation}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-base">Show feedback</span>
          </div>
          <div className="">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={options?.show_feedback === true}
                onChange={handleShowFeedback}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute  after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2ee0cf] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="m-8 text-xs text-red-500">{status}</p>
        <button
          className="rounded bg-[#2ee0cf] px-4 py-2 text-white hover:bg-teal-500 active:bg-teal-600"
          onClick={save_options}>
          Save
        </button>
      </div>
    </main>
  )
}
