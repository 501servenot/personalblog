import TitleCard from "@/components/TiltedCard";
import BlurText from "@/components/BlurText";
import Link from "next/link";

const blogimages = [
  { src: "./blogs/test1/cover.png", description: "openRouter" },
  { src: "./blogs/test2/cover.png", description: "Unsloth" },
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col mt-10">
      <div>
        <BlurText
          text="Blogs:"
          animateBy="letters"
          direction="bottom"
          delay={50}
          className="text-xl text-center font-medium"
              />
              <p className='mt-3 text-10px'>
                  一些好玩的文章
              </p>
      </div>

      <div className="grid grid-cols-2 gap-20 mt-5 ">
        {blogimages.map((blogimage, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <TitleCard
              imageSrc={blogimage.src}
              containerHeight="150px"
              containerWidth="250px"
              imageHeight="150px"
              imageWidth="250px"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={true}
              showTooltip={false}
              displayOverlayContent={false}
            />
            <div className="mt-3 text-base text-gray-200 font-medium w-full text-left">
              {blogimage.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
