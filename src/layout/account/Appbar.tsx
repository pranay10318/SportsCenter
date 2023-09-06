/* eslint-disable @typescript-eslint/no-unused-vars */
// appbar.tsx
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Logo from "../../assets/images/logo.png";
import { CogIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import PreferencesDialog from "../../components/PreferencesDialog";

const loggedInuserNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/logout" },
];
const casualUserNavigation = [
  { name: "Sign in", href: "/signin" },
  { name: "Sign up", href: "/signup" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {

  //just doing it with localstorage   i dunno how to do the stuff with authContext
  // TODO:  -> authentication using authContext
  let userNavigation = casualUserNavigation;
  if (localStorage.getItem("authToken")) userNavigation = loggedInuserNavigation;
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const handleDialog = () => {
    setIsPreferencesOpen(!isPreferencesOpen);
  }


  return (
    <>
      <Disclosure
        as="nav"
        className="border-b border-slate-200 fixed top-0 w-full bg-white"
      >
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8" src={Logo} alt="sports center" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Sports Center</h1>
              </div>
              <div className="md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {localStorage.getItem("authToken") && (
                    <div className="md:block">
                      <button onClick={handleDialog}>
                        <CogIcon
                          className="w-6 h-6 text-gray-500"
                        />
                      </button>
                      {isPreferencesOpen && <PreferencesDialog/>}
                    </div>
                  )}

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
