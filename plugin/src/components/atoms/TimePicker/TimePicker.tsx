import React, { memo } from 'react'

interface TimePickerProps {
  id?: string
  label?: string
  value?: string | number
  min?: string | number
  max?: string | number
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  labelClassName?: string[] | string
  inputClassName?: string[] | string
  onChange?: (value: string) => void
}

export const TimePicker = memo(function TimePicker({
  id = 'time-picker',
  label,
  value,
  min,
  max,
  required,
  disabled,
  readonly,
  labelClassName = '',
  inputClassName = '',
  onChange,
}: TimePickerProps) {
  return (
    <>
      {label != null && label !== '' && (
        <label
          htmlFor='time'
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white
        ${Array.isArray(labelClassName) ? labelClassName.join(' ') : labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className='relative'>
        <div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              // fill-rule="evenodd"
              d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z'
              // clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type='time'
          id={id}
          className={`bg-gray-50 border
           leading-none border-gray-300 text-gray-900
           text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500
           block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          ${Array.isArray(inputClassName) ? inputClassName.join(' ') : inputClassName}`}
          min={min}
          max={max}
          value={value}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          onChange={(_e) => {
            if (_e.target.value && onChange) {
              onChange(_e.target.value)
            }
          }}
        />
      </div>
    </>
  )
})
