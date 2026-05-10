import { Link } from "react-router-dom";
const Footer = () => {

    const storedUser =
        localStorage.getItem("user");

    const user =
        storedUser &&
            storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    return (

        <footer className="bg-black text-white mt-20">

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* BRAND */}
                    <div>

                        <h2 className="text-4xl font-black mb-4">

                            URBAN
                            <span className="text-lime-400">

                                RIDE

                            </span>

                        </h2>

                        <p className="text-gray-400 leading-relaxed">

                            Premium luxury vehicle
                            rental platform built
                            for seamless booking
                            and trusted vendors.

                        </p>

                    </div>

                    {/* QUICK LINKS */}
                    <div>

                        <h3 className="text-2xl font-bold mb-5">

                            Quick Links

                        </h3>



                        <div className="flex flex-col gap-3 text-gray-400">

                            <Link
                                to="/"
                                className="hover:text-white transition"
                            >

                                Home

                            </Link>

                            <Link
                                to="/vehicles"
                                className="hover:text-white transition"
                            >

                                Vehicles

                            </Link>

                            {
                                user ? (

                                    <Link
                                        to="/profile"
                                        className="hover:text-white transition"
                                    >

                                        Profile

                                    </Link>

                                ) : (

                                    <Link
                                        to="/login"
                                        className="hover:text-white transition"
                                    >

                                        Login

                                    </Link>

                                )
                            }

                        </div>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3 className="text-2xl font-bold mb-5">

                            Contact

                        </h3>

                        <div className="space-y-3 text-gray-400">

                            <p>

                                Nagpur, Maharashtra

                            </p>

                            <p>
                                ashishpimpalshende211@gmail.com
                            </p>

                            <p>

                                +91 9876543210

                            </p>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-center gap-4">

                    <p className="text-gray-500 ">

                        © 2026 Urban Ride.
                        All rights reserved.

                    </p>



                </div>

            </div>

        </footer>
    );
};

export default Footer;