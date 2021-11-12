/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SelectProps {
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  colors?: {
    bg: string;
    subtleText: string;
    text: string;
    activeText: string;
    activeBg: string;
  };
}

export function Select({
  options,
  selected,
  setSelected,
  colors,
}: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button
              className={`flex flex-row items-center relative w-full bg-${
                colors ? colors.bg : "darkBlue"
              } border border-${
                colors ? colors.subtleText : "champagne"
              } rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <Listbox.Label
                className={`block text-sm font-medium text-${
                  colors ? colors.subtleText : "champagne"
                }`}
              >
                Sort by:
              </Listbox.Label>
              <span className="flex items-center">
                <span
                  className={`ml-3 block truncate text-${
                    colors ? colors.text : "background"
                  }`}
                >
                  {selected}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className={`h-5 w-5 text-${
                    colors ? colors.subtleText : "champagne"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute z-10 mt-1 w-full bg-${
                  colors ? colors.bg : "darkBlue"
                } shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-regBlue ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classNames(
                        active
                          ? `text-${
                              colors ? colors.activeText : "midnightBlue"
                            } bg-${colors ? colors.activeBg : "champagne"}`
                          : `text-${colors ? colors.text : "background"}`,
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? `text-${
                                    colors ? colors.activeText : "midnightBlue"
                                  }`
                                : `text-${colors ? colors.text : "background"}`,
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
