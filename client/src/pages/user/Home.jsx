import styles from "../../index";
import Herocar from "../../Assets/homepage_car_copy.jpeg";
import CarSearch from "./CarSearch";
import { HeroParallax } from "../../components/ui/Paralax";
import { useRef } from "react";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsSweetAlert } from "../../redux/user/userSlice";
import Footers from "../../components/Footer";


function Home() {
  const ref = useRef(null);
  const { isSweetAlert } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const sweetalert = () => {
    Swal.fire({

      show: true,
      title: "",
      text: "Vehicle Booked Successfully",
      icon: "success",
      showDenyButton: true,
      confirmButtonText: "Go to Home",
      confirmButtonColor: "#22c55e",
      denyButtonColor: 'black',
      denyButtonText: `See Orders`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      }
      else if (result.isDenied) {
        navigate('/profile/orders')
      }
    })
    dispatch(setIsSweetAlert(false))
  };

  return (
    <>
      {isSweetAlert && sweetalert()}

      {/* This is div is the container for the dot background */}

      <section className="relative w-full bg-white min-h-screen flex items-center">

        <div
          className="absolute inset-0 z-0
    bg-[radial-gradient(rgba(34,197,94,0.25)_1px,transparent_1px)]
    [background-size:16px_16px]
    [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]
    pointer-events-none"
        />
        <div className=" relative z-10 mx-auto max-w-8xl px-8 lg:px-5 py-24 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-2" >
              <p className="ml-2 text-sm md:text-lg uppercase tracking-widest font-bold text-gray-500">
                Plan your trip now
              </p>

              <h1 className="mt-5 mb-5 text-4xl md:text-6xl lg:text-8xl font-extrabold lg:leading-20">
                Save <span className="text-green-600">big</span> with our <br />
                car rental
              </h1>

              <p className="ml-2 mt-4 max-w-xl text-gray-400 text-base md:text-lg leading-relaxed">
                Rent the car of your dreams. Unbeatable prices, unlimited miles,
                flexible pick-up options and much more.
              </p>

              <div className="mt-12 flex flex-wrap gap-5 p-1">
                <button
                  onClick={() =>
                    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="inline-flex items-center gap-4 rounded-full bg-green-500 px-6 py-4
                       text-white font-semibold text-2xl hover:bg-green-400  transition"
                >
                  Book Ride
                  <i className="bi bi-check-circle-fill"></i>
                </button>

                <button
                  onClick={() =>
                    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="ml-2 inline-flex items-center gap-1 rounded-full border border-gray-900
                       px-6 py-3 font-semibold hover:bg-gray-900 hover:text-white transition text-2xl"
                >
                  Learn More
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden lg:block relative">
              <img
                src={Herocar}
                alt="Car"
                className="w-full max-w-xl mx-auto drop-shadow-2xl"
              />

              {/* subtle background glow */}
              <div className="absolute -z-10 inset-0 bg-green-400/20 blur-3xl rounded-full" />
            </div>

          </div>
        </div>
      </section>

      {/* HERO → CONTENT TRANSITION */}
      <div className="relative h-20 md:h-20 bg-gradient-to-b from-gray-50 to-white" />


      <div ref={ref} className="relative min-h-screen flex justify-center items-center overflow-hidden bg-white">
        <CarSearch />
      </div>

      <div className="relative h-32 md:h-48 bg-gradient-to-b from-white to-gray-50" />


      <section className="relative min-h-screen overflow-visible bg-gray-50 ">
        <HeroParallax />
      </section>

      <section className="relative z-20 bg-white">
        <Footers />
      </section>


    </>
  );
}

export default Home;
