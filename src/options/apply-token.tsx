export default function ApplyToken() {
  return (
    <div className="mt-40">
      <p className="text-lg text-red-500">Notice:</p>
      <p className="my-2 text-red-500">
        The default API uses a trial token, which is only used for testing and
        when the usual usage is not large.
      </p>
      <p className="my-2 text-red-500">
        For a good experience, please click the link below to send an email to
        apply for your exclusive token.
      </p>
      <a
        className="text-base text-blue-600 underline"
        href="mailto:yuedan.work@gmail.com?subject=Apply%20Token%20for%20ICP%20Query%20Extension&body=Please%20include%20your%20email%20address%20here.%0A%0AEmail%3A%20%3Cyour%20email%20address%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))">
        Send mail to apply for your own token
      </a>
    </div>
  )
}
