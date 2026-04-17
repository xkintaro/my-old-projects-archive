import React, { useState, useEffect, useRef } from 'react';
import { Button2, Button3 } from '../../button';
import { TextBox1 } from '../../textbox';
import { CheckBox } from '../../checkbox';
import { Funnel, MoreVertical, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FileMenu() {
  const [isCheckedSelectAll, setIsCheckedSelectAll] = useState(false);
  const [isCheckedShowAllPreviews, setIsCheckedShowAllPreviews] = useState(false);

  const menuItems = [
    <TextBox1 key="search" placeholder="Search" className='rounded-full' icon={<Search size={18} />} />,
    <Button2 key="tag-filter">
      <Funnel size={18} />Tag Filters
    </Button2>,
    <label className='btn-2' key="show-all-previews">
      <CheckBox
        checked={isCheckedShowAllPreviews}
        onChange={(e) => setIsCheckedShowAllPreviews(e.target.checked)}
      />
      Show All Previews
    </label>,
    <label className='btn-2' key="select-all">
      <CheckBox
        checked={isCheckedSelectAll}
        onChange={(e) => setIsCheckedSelectAll(e.target.checked)}
      />
      Select All
    </label>,
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const visibleItemsCount = isSmallScreen ? 2 : 4;
  const shouldShowMore = menuItems.length > visibleItemsCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='w-full flex justify-center items-center z-20'
    >
      <div className='border border-solid border-[var(--border)] bg-[var(--bg-3)]/50 backdrop-blur-xs py-4 px-5 rounded-full max-w-3xl w-fit flex gap-2.5 items-center'>

        {shouldShowMore ? (
          <>
            {menuItems.slice(0, visibleItemsCount - 1)}

            <div className="relative flex-1 justify-end flex" ref={dropdownRef}>
              <Button3 onClick={() => setIsDropdownOpen(prev => !prev)}>
                <MoreVertical />
              </Button3>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-3)] border border-solid border-[var(--border)] rounded-[30px] shadow-lg z-10 p-2 flex flex-col gap-1">
                  {menuItems.slice(visibleItemsCount - 1).map((menuItem) =>
                    React.cloneElement(menuItem)
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          menuItems
        )}
      </div>
    </motion.div>
  );
}