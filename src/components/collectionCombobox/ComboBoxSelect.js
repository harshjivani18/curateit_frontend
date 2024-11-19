import { useState } from "react"
import { Combobox } from "@headlessui/react"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ComboBoxSelect({
  tweetData,
  onTweetChange,
  selectedTweet,
  error,
  inputShown,
  hideInput,
  disabled=false
}) {
  const [query, setQuery] = useState("")
  const [isQuery, setIsQuery] = useState(false)

  //Get collection list
  let filteredOptionData =
    query !== ""
      ? tweetData?.filter((data) => {
          return data?.name?.toLowerCase().includes(query.toLowerCase())
        })
      : tweetData

  const onChange = (e) => {
    onTweetChange(e?.value)
  }

  return (
    <>
      <Combobox as="div" value={selectedTweet} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <div className="relative">
            {selectedTweet?.id ? (
              selectedTweet?.selectedIcon
            ) : (
              <MagnifyingGlassIcon
                className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            )}
            <Combobox.Input
              disabled={disabled}
              className={`save-input-box w-full outline-none rounded-md border border-gray-300 bg-white pl-8 py-2 pr-6 shadow-sm text-sm ${
                inputShown ? "text-gray-400" : ""
              } ${disabled ? 'cursor-not-allowed type-combobox-input-disable': 'type-combobox-input'}`}
              onChange={(event) => setQuery(event.target.value)}
              onClick={() => {
                setIsQuery(true)
                hideInput(true)
              }}
              onBlur={() => {
                setIsQuery(false)
              }}
              placeholder={
                isQuery && query === "" ? "Search tweet type" : query
              }
              displayValue={(selectedTweet) =>
                isQuery ? query : selectedTweet?.name
              }
            />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-2 focus:outline-none" disabled={disabled}>
              {isQuery ? (
                <ChevronUpIcon
                  className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`}
                  aria-hidden="true"
                  disabled={disabled}
                />
              ) : (
                <ChevronDownIcon
                  className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`}
                  aria-hidden="true"
                  onClick={() => setIsQuery(true)}
                  disabled={disabled}
                />
              )}
            </Combobox.Button>
          </div>

          {error !== true ? (
            ""
          ) : selectedTweet && selectedTweet.id ? (
            ""
          ) : (
            <span className="error-label">Please select a tweet type</span>
          )}
          {(query?.length > 0 || filteredOptionData.length > 0) && (
            <Combobox.Options
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {filteredOptionData?.map((option) => (
                <Combobox.Option
                  disabled={disabled}
                  key={option.id}
                  value={option}
                  className="ct-relative cursor-default select-none py-2 pl-3 pr-9 text - gray - 900"
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex items-center">
                        {selected ? (
                          option.selectOptionIcon
                        ) : (
                          option.icon
                        )}
                        <span
                          className={classNames(
                            "ml-3 truncate text-sm",
                            selected && "text-gray-400"
                          )}
                        >
                          {option.name}
                        </span>
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </>
  )
}
