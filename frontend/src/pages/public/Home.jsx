import { Link } from "react-router-dom";
import useAuth from "../../features/auth/useAuth"; import {
  CalendarCheck,
  ShieldCheck,
  CarFront,
  UserRound,
} from "lucide-react";

export default function Home() {
  const fleet = [
    {
      name: "Mercedes Benz S Class",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Mercedes Benz V Class",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Audi A8",
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Rolls Royce",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const services = [
    {
      title: "Airport Transfers",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Intercity Trips",
      image:
        "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Wedding Events",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Business Meetings",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const { user } = useAuth();

  return (
    <div className="bg-[#efeff1] min-h-screen px-6 py-6">
      <div className="max-w-7xl mx-auto bg-white rounded-[30px] overflow-hidden shadow-xl">

        {/* HERO */}
        <section className="relative px-4 sm:px-6 lg:px-10 py-6 sm:py-10 lg:py-16 overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-[30px] sm:rounded-[40px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop')",
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/55 rounded-[30px] sm:rounded-[40px]" />

          {/* CONTENT */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[850px] sm:min-h-[900px] lg:min-h-[650px] px-4 sm:px-8 lg:px-14 py-10">

            {/* LEFT CONTENT */}
            <div className="text-white">

              {/* BADGE */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6">

                <div className="w-2 h-2 bg-lime-400 rounded-full" />

                <p className="text-sm font-medium text-gray-200">

                  Trusted Vehicle Rental Platform

                </p>

              </div>

              {/* TITLE */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">

                Rent Vehicles
                <br />

                For Every
                <span className="text-lime-400">

                  {" "}Journey

                </span>

              </h1>

              {/* DESCRIPTION */}
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl">

                UrbanRide helps you book premium and everyday vehicles
                for travel, business trips, airport transfers, weddings,
                events and daily commuting — all with a seamless booking
                experience and trusted professional vendors.

              </p>

              {/* FEATURES */}
              <div className="flex flex-wrap gap-3 mb-10">

                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">

                  Luxury Cars

                </div>

                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">

                  Wedding Rentals

                </div>

                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">

                  Airport Transfers

                </div>

                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">

                  Business Travel

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">

                {/* PRIMARY BUTTON */}
                <a
                  href="/vehicles"
                  className="bg-lime-400 hover:bg-lime-300 text-black px-8 py-4 rounded-2xl font-bold text-center transition-all duration-300 hover:scale-[1.02]"
                >

                  Explore Vehicles

                </a>

                {/* SECOND BUTTON */}
                {
                  user ? (

                    <a
                      href="/bookings"
                      className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-center transition-all duration-300"
                    >

                      My Bookings

                    </a>

                  ) : (

                    <a
                      href="/vendor/signup"
                      className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-center transition-all duration-300"
                    >

                      Become a Vendor

                    </a>

                  )
                }

              </div>

            </div>

            {/* BOOKING CARD */}
            <div className="flex justify-center lg:justify-end">

              <div className="bg-white/95 backdrop-blur-2xl rounded-[30px] p-5 sm:p-7 w-full max-w-md shadow-[0_20px_80px_rgba(0,0,0,0.35)] border border-white/40">

                {/* TABS */}
                <div className="grid grid-cols-3 gap-2 mb-6">

                  <button className="bg-lime-400 py-3 rounded-xl font-semibold text-sm sm:text-base">

                    Distance

                  </button>

                  <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-xl transition text-sm sm:text-base">

                    Hourly

                  </button>

                  <button className="bg-gray-100 hover:bg-gray-200 py-3 rounded-xl transition text-sm sm:text-base">

                    Flat Rate

                  </button>

                </div>

                {/* INPUTS */}
                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Pick Up Address"
                    className="w-full border border-gray-200 bg-gray-100 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />

                  <input
                    type="text"
                    placeholder="Drop Off Address"
                    className="w-full border border-gray-200 bg-gray-100 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />

                  <input
                    type="date"
                    className="w-full border border-gray-200 bg-gray-100 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />

                  <button className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl">

                    Reserve Your Ride

                  </button>

                </div>

                {/* FOOTER TEXT */}
                <p className="text-center text-sm text-gray-500 mt-5 leading-relaxed">

                  Fast booking • Secure payments • Trusted vendors

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* SERVICES */}
        <section className="px-10 py-20">
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-5xl font-black">Services</h2>

            <p className="text-gray-500 max-w-lg">
              We provide premium transportation services for airport transfers,
              weddings, meetings and luxury intercity travel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#f6f6f6] rounded-3xl p-5 flex gap-5 items-center"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-44 h-32 object-cover rounded-2xl"
                />

                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 mb-4 text-sm">
                    Luxury transportation with comfortable rides and premium
                    experience.
                  </p>

                  <button className="bg-black text-white px-5 py-2 rounded-xl text-sm">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLEET */}
        <section className="px-10 py-20 bg-[#fafafa]">
          <div className="flex items-center justify-between mb-14">
            <div>
              <h2 className="text-5xl font-black mb-4">
                Our Fleet
              </h2>

              <p className="text-gray-500 max-w-lg">
                Browse luxury sedans, SUVs and premium business class vehicles.
              </p>
            </div>

            <a
              href="/vehicles"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              View All Vehicles
            </a>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {fleet.map((car, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-md"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover rounded-2xl mb-5"
                />

                <h3 className="text-xl font-bold mb-3">
                  {car.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                  <span>4 Seats</span>
                  <span>Automatic</span>
                </div>

                <button className="w-full bg-lime-400 py-3 rounded-xl font-semibold">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="px-10 py-20">
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-5xl font-black">
              Why Choose Us
            </h2>

            <p className="text-gray-500 max-w-lg">
              Urban Ride provides trusted luxury rental services with secure
              booking and premium customer support.
            </p>
          </div>



          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Easy Online Booking",
                icon: <CalendarCheck size={38} />,
              },
              {
                title: "Professional Drivers",
                icon: <UserRound size={38} />,
              },
              {
                title: "Luxury Cars",
                icon: <CarFront size={38} />,
              },
              {
                title: "Secure Payments",
                icon: <ShieldCheck size={38} />,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-[#f6f6f6] rounded-3xl p-8 text-center hover:-translate-y-2 transition duration-300"
              >
                <div className="w-24 h-24 rounded-3xl bg-lime-400 flex items-center justify-center mx-auto mb-6 text-black shadow-lg">
                  {item.icon}
                </div>
                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>
                {/* DESCRIPTION */}
                <p className="text-gray-500 text-base leading-8">
                  Premium booking experience
                  with smooth ride management.
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="px-10 pb-20">
          <div className="bg-[#f3f1f8] rounded-[40px] p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-5xl font-black mb-6">
                Only Today
                <br />
                ₹5999/day
              </h2>

              <p className="text-gray-600 mb-8">
                Experience premium luxury SUV rides with Urban Ride.
              </p>

              <ul className="space-y-3 text-gray-700 mb-8">
                <li>✔ Premium Interior</li>
                <li>✔ Air Conditioning</li>
                <li>✔ Professional Driver</li>
                <li>✔ Business Class Experience</li>
              </ul>

              <button className="bg-black text-white px-8 py-4 rounded-xl">
                Reserve Now
              </button>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury SUV"
                className="rounded-3xl"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
