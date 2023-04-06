import logo from "data-base64:~assets/favicon.png"

import Table from "./table"

import "~base.css"
import "~style.css"

export default function IndexPopup() {
  return (
    <main className="mx-auto my-0 min-w-[240px] p-4 text-center">
      <div className="m-auto flex items-center justify-center gap-4">
        <img src={logo} alt="logo" />
        <span className="max-w-[14rem] text-base uppercase text-[#2ee0cf]">
          ICP Query
        </span>
      </div>

      <Table />
    </main>
  )
}
