import BlurText from "../components/BlurText";
import Stack from "@/components/Stack";
import { SocialButton } from "@/components/ui/socialbutton";
import { LogoGoogleIcon, LogoGithubIcon, LogoX } from "@/svg";

const images = [
  { id: 1, img: "./homepage/4.jpg" },
  { id: 2, img: "./homepage/2.jpg" },
  { id: 3, img: "./homepage/3.jpg" },
];


export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="mt-12">
        <img
          src="./avatar.webp"
          alt="头像"
          className="w-16 h-16 rounded-full object-cover shadow-lg mb-6"
        ></img>
        <BlurText
          text="Hello!"
          animateBy="letters"
          direction="bottom"
          delay={50}
          className="text-3xl text-center font-semibold"
        />
        <p className="mt-3 text-5px">我是MrZhanggggg</p>
        <p className="mt-2 text-5px">一个喜欢探索，学习，使用AI的独立开发者</p>
      </div>
      <div className="mt-5 flex flex-row space-x-4">
        <SocialButton
          href="https://x.com/Mrzhanggggg"
          platform="twitter"
          icon={LogoX}
          className=""
        />
        <SocialButton
          href="https://github.com/501servenot"
          platform="github"
          icon={LogoGithubIcon}
          className=""
        />
      </div>
      <div className=" mt-20">

        
      </div>
    </div>
  );
}
