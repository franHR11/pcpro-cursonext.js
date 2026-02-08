// https://tailwindcomponents.com/component/radio-buttons-1
"use client";
import { setCookie } from "cookies-next";
import { useState } from "react";



interface Props {
  currentTab: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4, 5],
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelectedTab(tab);
    setCookie('selectedTab', tab.toString());
  };

  return (
    <div className="grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-200 p-2">
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selectedTab === tab}
            onChange={() => { }}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
