import TitleCard from "@/components/TiltedCard";
import BlurText from "@/components/BlurText";
import Link from "next/link";
import { getBlogPosts } from "@/lib/getblog";

export default async function BlogsPage() {
  const posts = getBlogPosts();

  return (
    <div className="flex flex-col mt-25">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap:20 mt-5 ">
        {posts.map((post) => (
          <div key={post.slug} className="flex flex-col items-center">
            <Link href={`/blog/${post.slug}`}>
                <TitleCard
                  imageSrc={post.metadata.image || ""}
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
            </Link>
            <div className="mt-3 text-base text-gray-200 font-medium w-full text-left">
              {post.metadata.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
