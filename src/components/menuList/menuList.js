import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function MenuList({ children, menus, position="origin-top-right",buttonClicked, btnStyle,logout }) {
    const router = useRouter();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                {children}
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items style={{ zIndex:1000 }} className={classNames(position, "absolute z-10 px-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none")} >
                    {menus.map((menu) => (
                        <Menu.Item key={menu.id} className={classNames(btnStyle ? btnStyle : "")}>
                            {({ active }) => (
                                <button
                                style={{width:"100%", padding:"10px", display:"flex"}}
                                    key={menu.id}
                                    // href={menu.link}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm space-x-3'
                                    )}
                                    onClick={() => {
                                        if(menu.name === "Save tabs"){
                                            router.push("/save-tabs")
                                        }else if(menu.name === "Upload file"){
                                          router.push("/")
                                        }else if(menu.name === "Add highlights"){
                                            router.push('/highlights')
                                        }
                                        else if(menu.name === "Logout"){
                                            logout()
                                        }else{
                                            buttonClicked(menu.id)
                                        }
                                    }}
                                >
                                    {menu?.icon && <img src={`/icons/${menu.icon}`} alt={menu.alt || "Curateit menu item"} className="h-5 w-5" aria-hidden="true" />
                                    }
                                    {menu.iconComponent && menu.iconComponent}
                                    <span className='whitespace-nowrap ml-1'>
                                        {menu.name}
                                    </span>
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}