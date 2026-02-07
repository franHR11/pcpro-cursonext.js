// https://tailwindcomponents.com/component/radio-buttons-1
"use client";
const tabsOptions = [
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "2",
  },
  {
    id: "3",
    label: "3",
  },
  {
    id: "4",
    label: "4",
  },
  {
    id: "5",
    label: "5",
  },
];

interface Props {
  currentTab: number;
  tabOptions: number[];
}

export const TabBar = ({ currentTab, tabOptions }: Props) => {
  return (
    <div className="grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-200 p-2">
      {tabsOptions.map((tab) => (
        <div key={tab.id}>
          <input name="tabs" type="radio" id={tab.id} className="peer hidden" />
          <label
            htmlFor={tab.id}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab.label}
          </label>
        </div>
      ))}
    </div>
  );
};
