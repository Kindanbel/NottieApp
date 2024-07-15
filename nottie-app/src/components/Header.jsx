import { IoSearchOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { GiSecretBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isClicked, setIsClicked] = useState(false);

  let navigate = useNavigate();

  const handleClickEvent = () => {
    setIsClicked(!isClicked);
  };

  const handleNavigation = () => {
    navigate("/")
  }

  return (
    <header className="flex items-center md:p-0 md:justify-between mb-5">
      <div className="logo md:hidden text-white flex items-center gap-x-4 ">
        <div>
          <GiSecretBook
            className={`text-[50px] text-nottieOrange duration-500`}
            onClick={handleNavigation}
          />
        </div>
      </div>
      <div className="search flex items-center relative">
        <IoSearchOutline className="hidden md:block text-[25px] absolute top-[20px] z-10 left-5 cursor-pointer" />

        {/*Mobile view search icon */}
        <IoSearchOutline
          onClick={handleClickEvent}
          className="block md:hidden text-[25px] absolute top-[px] left-5 cursor-pointer"
        />
        <input
          type="search"
          placeholder="Search"
          className={`absolute ${
            isClicked ? "block" : "hidden"
          } top-[30px] md:relative md:top-0 md:block  bg-gray-200 text-black py-5 px-[50px] w-[500px] md:w-[200px] lg:w-[500px] rounded-md`}
        />
        <IoSearchOutline
          className={`${
            isClicked ? "block" : "hidden"
          } md:hidden text-[17px] absolute top-[55px] z-10 left-5 cursor-pointer`}
        />
      </div>
      <div className="profile flex gap-3 md:gap-10 items-center pl-20">
        <div className="flex gap-5 items-center">
          <span className="bg-gray-200 p-2 w-[150px] rounded-full text-center">
            Nita Alumun
          </span>
        </div>
        <IoIosMenu className="text-[25px] cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
