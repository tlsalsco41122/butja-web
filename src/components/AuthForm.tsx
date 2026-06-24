type AuthField = {
  id: string
  label: string
  type?: 'text' | 'password'
  autoComplete?: string
}

type AuthFormProps = {
  title: string
  description: string
  fields: AuthField[]
  submitText: string
  footerText: string
  footerActionText: string
  onFooterAction: () => void
}

function AuthForm({
  title,
  description,
  fields,
  submitText,
  footerText,
  footerActionText,
  onFooterAction,
}: AuthFormProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-5 py-10">
      <form className="flex w-full max-w-[526px] shrink-0 flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-[Pretendard] text-[clamp(38px,8vw,48px)] font-semibold leading-normal text-[#444]">
            {title}
          </h1>
          <p className="font-[Pretendard] text-base font-medium leading-normal text-[#828282]">
            {description}
          </p>
        </header>

        <div className="flex w-full flex-col gap-5">
          {fields.map((field) => (
            <label key={field.id} className="flex w-full flex-col gap-2">
              <span className="font-[Pretendard] text-[15px] font-light leading-normal text-[#888]">
                {field.label}
              </span>
              <input
                id={field.id}
                name={field.id}
                type={field.type ?? 'text'}
                autoComplete={field.autoComplete}
                className="h-[67px] w-full rounded-lg border border-[#D9D9D9] px-5 font-[Pretendard] text-base text-[#444] outline-none transition focus:border-[#67CDFF] focus:ring-2 focus:ring-[#67CDFF]/20"
              />
            </label>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <button
            type="button"
            className="flex h-[66px] w-full items-center justify-center rounded-lg bg-[#67CDFF] font-[Pretendard] text-base font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2caee8]"
          >
            {submitText}
          </button>
          <p className="font-[Pretendard] text-sm font-medium leading-normal text-[#828282]">
            {footerText}
            <button
              type="button"
              onClick={onFooterAction}
              className="ml-1 font-[Pretendard] text-sm font-medium leading-normal text-[#67CDFF] underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67CDFF]"
            >
              {footerActionText}
            </button>
          </p>
        </div>
      </form>
    </main>
  )
}

export default AuthForm
