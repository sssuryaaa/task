import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="p-3.5 flex justify-between shadow items-center">
      <div className="font-bold text-lg text-blue-500">Logo</div>
      {user && (
        <div
          onMouseEnter={() => setShowDropDown(true)}
          onMouseLeave={() => setShowDropDown(false)}
        >
          <div className="bg-blue-500 w-24 p-3 rounded-lg text-white">
            {user.name}
          </div>
          <FaChevronDown
            className="text-white absolute top-8 right-5"
            size={15}
          />
          {showDropDown && (
            <div
              className="absolute p-3 w-24 shadow-lg bg-white border cursor-pointer hover:bg-[#f0f0f0] rounded-lg"
              onClick={handleClick}
            >
              Logout
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
