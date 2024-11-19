import React, { useState }              from 'react'
import { 
    EnvelopeIcon, 
    LockClosedIcon, 
    EyeIcon, 
    EyeSlashIcon, 
    UserIcon }                          from '@heroicons/react/24/outline'

const InputWithIcon = ({  type, name, placeholder, value, onChange, className="" }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType]       = useState(type);

    const togglePassVisibility = () => {
        if(name !== "password") return;

        if(showPassword){
            setInputType(type)
            setShowPassword(false)
        }else{
            setInputType("text")
            setShowPassword(true)
        }
    }
  return (
        <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {name === "email" && <EnvelopeIcon className="h-6 w-6 text-gray-500"  />}
                {(name === "first_name" || name === "f_name" || name === "l_name" || name === "last_name") && <UserIcon className="h-6 w-6 text-gray-500"  />}
                {(name === "password" || name==="confirm-password") && <LockClosedIcon className="h-6 w-6 text-gray-500"  />}
            </div>
            <input
              type={inputType}
                name={name}
                id={name}
                value={value}
                onChange = {(e) => {
                    e.preventDefault()
                    onChange(e.target.value)
                }}
                className={"block w-full outline-none rounded-xl border-[1px] border-gray-300 pl-12 focus:border-indigo-500 focus:ring-indigo-500 text-lg h-[48px] text-gray-500 " + className}
                placeholder={placeholder}
                autoComplete='off'
            />
          {(name === "password" || name==="confirm-password") && <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePassVisibility}>
              {showPassword ?
                  <EyeIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
                  : <EyeSlashIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />}
            </div>}
        </div>
  )
}

export default InputWithIcon;