import logo from "data-base64:~assets/favicon.png"

import Options from "./options"
import ApplyToken from "./apply-token"

import "~base.css"
import "~style.css"

export default function IndexOptions() {
  return (
    <main className="mx-auto my-0 px-32 py-4 text-center p-4">
      <div className="m-auto flex items-center justify-center gap-4">
        <img src={logo} alt="logo" />
        <span className="max-w-[14rem] text-base uppercase text-[#2ee0cf]">
          ICP Query
        </span>
      </div>

      <Options />

      <ApplyToken />
    </main>
  )
}
