import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/useAuth";
import {
  CalendarCheck,
  ShieldCheck,
  CarFront,
  UserRound,
} from "lucide-react";

export default function Home() {
  const [bookingTab, setBookingTab] = useState("Distance");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const fleet = [
    {
      name: "Mercedes Benz S Class",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Mercedes Benz V Class",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Audi A8",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Rolls Royce",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const services = [
    {
      title: "Airport Transfers",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Intercity Trips",
      image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Wedding Events",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Business Meetings",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const { user } = useAuth();

  const handleReserveRide = () => {
    if (!pickup.trim()) {
      alert("Please enter a pick up address");
      return;
    }
    navigate("/vehicles");
  };

  return (
    <div className="bg-[#efeff1] min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-b-3xl lg:rounded-3xl overflow-hidden shadow-xl">

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 min-h-[600px] lg:min-h-[560px]">

            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full mb-5">
                <div className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
                <p className="text-xs font-medium text-gray-200">Trusted Vehicle Rental Platform</p>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5 tracking-tight">
                Rent Vehicles
                <br />
                For Every
                <span className="text-lime-400"> Journey</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-7 max-w-lg">
                UrbanRide helps you book premium and everyday vehicles
                for travel, business trips, airport transfers, weddings,
                events and daily commuting.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">Luxury Cars</div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">Wedding Rentals</div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">Airport Transfers</div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">Business Travel</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/vehicles"
                  className="bg-lime-400 hover:bg-lime-300 text-black px-7 py-3 rounded-xl font-bold text-sm text-center transition-all duration-300 hover:scale-[1.02]"
                >
                  Explore Vehicles
                </Link>
                {user ? (
                  <Link
                    to="/bookings"
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-7 py-3 rounded-xl font-bold text-sm text-center transition-all duration-300"
                  >
                    My Bookings
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-7 py-3 rounded-xl font-bold text-sm text-center transition-all duration-300"
                  >
                    Become a Vendor
                  </Link>
                )}
              </div>
            </div>

            {/* BOOKING CARD */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 w-full max-w-sm shadow-2xl border border-white/40">

                <div className="grid grid-cols-3 gap-1.5 mb-5">
                  {["Distance", "Hourly", "Flat Rate"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setBookingTab(tab)}
                      className={`py-2.5 rounded-lg font-semibold text-xs transition ${
                        bookingTab === tab
                          ? "bg-lime-400 text-black"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Pick Up Address"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-100 rounded-xl px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />
                  {bookingTab === "Distance" && (
                    <input
                      type="text"
                      placeholder="Drop Off Address"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full border border-gray-200 bg-gray-100 rounded-xl px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition"
                    />
                  )}
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-100 rounded-xl px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />
                  <button
                    onClick={handleReserveRide}
                    className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-xl"
                  >
                    Reserve Your Ride
                  </button>
                </div>

                <p className="text-center text-[11px] text-gray-400 mt-4">
                  Fast booking • Secure payments • Trusted vendors
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* SERVICES */}
        <section className="px-6 sm:px-10 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-lime-500 text-xs font-semibold uppercase tracking-wider mb-2">What We Offer</p>
              <h2 className="text-2xl sm:text-3xl font-black">Our Services</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              We provide premium transportation services for airport transfers,
              weddings, meetings and luxury intercity travel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <div key={index} className="bg-[#f6f6f6] rounded-2xl p-4 flex gap-4 items-center hover:shadow-md transition">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-28 h-24 object-cover rounded-xl flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold mb-1.5">{service.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">
                    Luxury transportation with comfortable rides and premium experience.
                  </p>
                  <Link
                    to="/vehicles"
                    className="inline-block bg-black text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-800 transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLEET */}
        <section className="px-6 sm:px-10 py-16 bg-[#fafafa]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-lime-500 text-xs font-semibold uppercase tracking-wider mb-2">Premium Collection</p>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Our Fleet</h2>
              <p className="text-gray-500 text-sm max-w-md">
                Browse luxury sedans, SUVs and premium business class vehicles.
              </p>
            </div>
            <Link to="/vehicles" className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-800 transition">
              View All Vehicles
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fleet.map((car, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                <img src={car.image} alt={car.name} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-2">{car.name}</h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
                    <span>4 Seats</span>
                    <span>Automatic</span>
                  </div>
                  <Link
                    to="/vehicles"
                    className="block w-full bg-lime-400 hover:bg-lime-300 py-2 rounded-lg text-xs font-semibold transition text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="px-6 sm:px-10 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-lime-500 text-xs font-semibold uppercase tracking-wider mb-2">Our Advantages</p>
              <h2 className="text-2xl sm:text-3xl font-black">Why Choose Us</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              Urban Ride provides trusted luxury rental services with secure
              booking and premium customer support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Easy Online Booking", icon: <CalendarCheck size={24} /> },
              { title: "Professional Drivers", icon: <UserRound size={24} /> },
              { title: "Luxury Cars", icon: <CarFront size={24} /> },
              { title: "Secure Payments", icon: <ShieldCheck size={24} /> },
            ].map((item, index) => (
              <div key={index} className="bg-[#f6f6f6] rounded-2xl p-6 text-center hover:-translate-y-1 transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-lime-400 flex items-center justify-center mx-auto mb-4 text-black shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Premium booking experience with smooth ride management.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 sm:px-10 pb-16">
          <div className="bg-[#f3f1f8] rounded-3xl p-8 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                Only Today<br />₹5999/day
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Experience premium luxury SUV rides with Urban Ride.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2"><span className="text-lime-500">✔</span> Premium Interior</li>
                <li className="flex items-center gap-2"><span className="text-lime-500">✔</span> Air Conditioning</li>
                <li className="flex items-center gap-2"><span className="text-lime-500">✔</span> Professional Driver</li>
                <li className="flex items-center gap-2"><span className="text-lime-500">✔</span> Business Class Experience</li>
              </ul>
              <Link
                to="/vehicles"
                className="inline-block bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
              >
                Reserve Now
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury SUV"
                className="rounded-2xl w-full object-cover max-h-72"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
