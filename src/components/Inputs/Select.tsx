/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { camelCaseToCapitalizedWords } from "src/utils/textUtils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const colors = {
  dark: {
    bg: "darkBlue",
    subtleText: "champagne",
    text: "background",
    activeText: "midnightBlue",
    activeBg: "champagne",
  },
  light: {
    bg: "background",
    subtleText: "subtleText",
    text: "darkBlue",
    activeText: "midnightBlue",
    activeBg: "champagne",
  },
};

interface SelectProps {
  options: string[];
  selected?: string;
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  variant?: "light" | "dark";
  label?: string;
  placeholder?: string;
  labelInside?: boolean;
}

export function Select({
  options,
  selected,
  setSelected,
  variant = "light",
  label,
  labelInside = false,
  placeholder = "Select One",
}: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative flex flex-col gap-0.5">
            {!labelInside && (
              <Listbox.Label
                className={`font-sans text-md ml-0.5 text-${colors[variant].subtleText}`}
              >
                {label}
              </Listbox.Label>
            )}
            <Listbox.Button
              className={`flex flex-row gap-2 font-serif items-center relative w-full bg-${colors[variant].bg} border-2 border-${colors[variant].text} rounded-md shadow-sm p-2.5 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              {labelInside && (
                <Listbox.Label
                  className={`block text-sm font-medium text-${colors[variant].subtleText}`}
                >
                  {label}
                </Listbox.Label>
              )}
              <span
                className={`block truncate font-serif text-md text-${
                  selected ? colors[variant].text : colors[variant].subtleText
                }`}
              >
                {selected ? camelCaseToCapitalizedWords(selected) : placeholder}
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className={`h-5 w-5 text-${colors[variant].subtleText}`}
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
                className={`absolute z-10 mt-6 w-full bg-${colors[variant].bg} shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-regBlue ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
              >
                {options.map((option) => {
                  let formattedOption = camelCaseToCapitalizedWords(option);
                  return (
                    <Listbox.Option
                      key={option}
                      className={({ active }) =>
                        classNames(
                          active
                            ? `text-${colors[variant].activeText} bg-${colors[variant].activeBg}`
                            : `text-${colors[variant].text}`,
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
                              {formattedOption}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active
                                  ? `text-${colors[variant].activeText}`
                                  : `text-${colors[variant].text}`,
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
