export type ApiDateTime = string | number[] | null

function padDatePart(value: number) {
  return String(value).padStart(2, '0')
}

export function toDateInputValue(value: unknown) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value.slice(0, 10)
  }

  if (Array.isArray(value)) {
    const [year, month, day] = value

    if (
      typeof year === 'number' &&
      typeof month === 'number' &&
      typeof day === 'number'
    ) {
      return `${year}-${padDatePart(month)}-${padDatePart(day)}`
    }
  }

  return ''
}

export function formatDateLabel(value: unknown) {
  const dateInputValue = toDateInputValue(value)

  if (!dateInputValue) {
    return '등록된 일정이 없습니다.'
  }

  return dateInputValue.replaceAll('-', ' / ')
}
