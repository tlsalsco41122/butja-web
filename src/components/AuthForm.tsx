import { Eye, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'

type AuthField = {
  id: string
  placeholder: string
  icon: LucideIcon
  type?: 'text' | 'password'
  autoComplete?: string
}

type AuthFormProps = {
  title: string
  description: string
  fields: AuthField[]
  submitText: string
  submittingText?: string
  isSubmitting?: boolean
  errorMessage?: string
  successMessage?: string
  footerText: string
  footerActionText: string
  onSubmit: (values: Record<string, string>) => void | Promise<void>
  onFooterAction: () => void
}

function InputField({
  id,
  icon: Icon,
  placeholder,
  type = 'text',
  autoComplete,
}: AuthField) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type
  const ToggleIcon = isPasswordVisible ? EyeOff : Eye

  const handleTogglePassword = () => {
    setIsPasswordVisible((current) => !current)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <label className="flex h-[67px] w-full items-center gap-3 rounded-lg border border-[#D9D9D9] px-5 transition hover:border-[#BDBDBD] focus-within:border-[#67CDFF] focus-within:ring-2 focus-within:ring-[#67CDFF]/20">
      <Icon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-[#888]"
        strokeWidth={1.8}
      />
      <span className="sr-only">{placeholder}</span>
      <input
        ref={inputRef}
        id={id}
        name={id}
        type={inputType}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="h-full min-w-0 flex-1 bg-transparent font-[Pretendard] text-base text-[#444] outline-none placeholder:text-[#888] placeholder:font-light"
      />
      {isPassword ? (
        <button
          type="button"
          aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
          aria-pressed={isPasswordVisible}
          onClick={handleTogglePassword}
          className="-mr-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#888] transition hover:bg-[#F5F5F5] hover:text-[#444] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67CDFF]"
        >
          <ToggleIcon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
        </button>
      ) : null}
    </label>
  )
}

function AuthForm({
  title,
  description,
  fields,
  submitText,
  submittingText,
  isSubmitting = false,
  errorMessage,
  successMessage,
  footerText,
  footerActionText,
  onSubmit,
  onFooterAction,
}: AuthFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const values = fields.reduce<Record<string, string>>((result, field) => {
      result[field.id] = String(formData.get(field.id) ?? '').trim()
      return result
    }, {})

    void onSubmit(values)
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-5 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[526px] shrink-0 flex-col items-center gap-10"
      >
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
            <InputField
              key={field.id}
              id={field.id}
              icon={field.icon}
              placeholder={field.placeholder}
              type={field.type}
              autoComplete={field.autoComplete}
            />
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-[66px] w-full items-center justify-center rounded-lg bg-[#67CDFF] font-[Pretendard] text-base font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2caee8] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
          >
            {isSubmitting ? (submittingText ?? submitText) : submitText}
          </button>
          {errorMessage ? (
            <p className="text-center font-[Pretendard] text-sm font-medium text-[#FF5A5A]">
              {errorMessage}
            </p>
          ) : null}
          {successMessage ? (
            <p className="text-center font-[Pretendard] text-sm font-medium text-[#4CAF50]">
              {successMessage}
            </p>
          ) : null}
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
