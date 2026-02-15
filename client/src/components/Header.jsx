import styles from "../index";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { getUserRoleFlags } from "./utils/authHelpers";

import { MdMenuOpen } from "react-icons/md";
import { useState } from "react";
import { Drawer } from "antd";


function Header() {
    const { user: currentUser } = useSelector((state) => state.user);

    const { isUser } = getUserRoleFlags(currentUser);

    const [nav, setNav] = useState(false);

    return (
        <div
            className="
    fixed top-0 left-0 z-50 w-full
    bg-white/80 backdrop-blur-md
    flex justify-between items-center
    px-6 py-12 sm:px-12 lg:px-20 
    h-16 
  "
        >

            <Link to="/">
                <div
                    className={`h-[70px] w-[120px] my-5`}
                >
                    <img src="../src/Assets/logo.png" alt="" />
                </div>
            </Link>

            <div className="hidden lg:block">
                <ul className="flex list-none gap-2 lg:gap-8">
                    {navLinks.map((navlink, index) => (
                        <li
                            key={index}
                            className={`${index != navLinks.length - 1 ? "mx-4" : "mx-0"}`}
                        >
                            <Link
                                to={navlink.path}
                                className={`text-black hover:text-green-500  font-poppins cursor-pointer font-semibold text-xl`}
                            >
                                {navlink.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex gap-5 ">
                {/* Sign In button */}
                {!isUser && (
                    <div className="hidden md:inline-flex">
                        <Link to="/signin">
                            <button
                                id="signin"
                                className="border text-black shadow-md hover:scale-[1.03] transition-all ease-out duration-[0.3s] py-1 text-xl md:text-2xl sm:py-[7px] px-2 sm:px-4 font-normal sm:font-semibold rounded-full hidden lg:inline-flex"
                            >
                                Sign In
                            </button>
                        </Link>
                    </div>
                )}

                {/* Profile or Sign Up */}
                <div className="hidden lg:flex items-center justify-center ">
                    {isUser ? (
                        <Link to="/profile">
                            <img
                                src={currentUser.profilePicture}
                                alt="profile"
                                referrerPolicy="no-referrer"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        </Link>
                    ) : (
                        <Link to="/signup">
                            <button className="bg-green-400 text-white py-1 text-xl md:text-2xl sm:py-[7px] px-2 sm:px-4 font-normal sm:font-semibold rounded-full hidden lg:inline-flex shadow-md hover:scale-[1.03] transition-all ease-out">
                                Sign Up
                            </button>
                        </Link>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Header;
