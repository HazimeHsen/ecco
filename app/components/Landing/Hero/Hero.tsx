import Image from "next/image";
import { Button } from "../../ui/button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import SendWhatsAppMessage from "../../SendWhatsappMessage/SendWhatsappMessage";

const Hero = () => {
  const registerModal = useRegisterModal();
  return (
    <div className="w-full relative flex justify-center items-center h-screen md:-mt-[102px] -mt-[30px]">
      <div className="md:flex w-full items-center justify-between">
        <div className="col-span-7 flex flex-col justify-center relative md:max-w-[60%]">
          <h1 className="text-midnightblue text-4xl font-bold md:text-85xl text-center md:text-start lh-133 pt-5">
            Discover the joy of swimming.
          </h1>
          <SendWhatsAppMessage />
          <h3 className="text-black mx-auto md:mx-0 opacity-75 max-w-md text-md flex justify-center font-normal text-center md:text-start pt-8">
            Experience the freedom of gliding through crystal-clear water and
            embrace the world of swimming with our expert trainers.
          </h3>
          <div className="pt-8 mx-auto md:mx-0">
            <Button onClick={registerModal.onOpen} className="w-52">
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/hero.png"
            alt="nothing"
            width={400}
            height={805}
            className="object-contain max-h-[500px] max-w-[300px]   md:max-w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
