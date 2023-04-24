import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon} from '@heroicons/react/20/solid'

function Filter({ options, category, selectedOptions, onChange }) {
  const handleOptionChange = (optionValue) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(value => value !== optionValue)
      : [...selectedOptions, optionValue];
      onChange(newSelectedOptions);
   }; 
      return (
        <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-800">{category}</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <label key={option.value} className="flex items-center">
                   <input
                     type="checkbox"
                     className="form-checkbox h-5 w-5 text-purple-600"
                     value={option.value}
                     checked={selectedOptions.includes(option.value)}
                     onChange={() => handleOptionChange(option.value)}
                   />
                   <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                 </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}

export default Filter