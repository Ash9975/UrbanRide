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

        <footer className="bg-black text-white mt-16">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div>
                        <h2 className="text-2xl font-black mb-3">
                            URBAN<span className="text-lime-400">RIDE</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Premium luxury vehicle rental platform built for seamless booking and trusted vendors.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-300">Quick Links</h3>
                        <div className="flex flex-col gap-2.5 text-sm text-gray-400">
                            <Link to="/" className="hover:text-white transition">Home</Link>
                            <Link to="/vehicles" className="hover:text-white transition">Vehicles</Link>
                            {user ? (
                                <Link to="/profile" className="hover:text-white transition">Profile</Link>
                            ) : (
                                <Link to="/login" className="hover:text-white transition">Login</Link>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-300">Contact</h3>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>Nagpur, Maharashtra</p>
                            <p>ashishpimpalshende211@gmail.com</p>
                            <p>+91 9876543210</p>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-center gap-3">
                    <p className="text-gray-500 text-xs">© 2026 Urban Ride. All rights reserved.</p>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
