// import { BackgroundVideo } from '@/components/background-video';
// import HeroAnimation from '@/components/hero-animation';
// import ImageRotation from '@/components/image-rotation';
// import HorizontalVehicleMovement from '@/components/horizontal-vehicle-scroll';
// import VehicleScrollEffect from '@/components/vehicle-scroll-effect';
// import TerrainVehicleMovement from '@/components/terrain-vehicle-movement';
// import VideoScrollEffect from '@/components/video-scroll-effect';
// import FloatingText from '@/components/floating-text';
// import ImageGrid from '@/components/image-grid';
import ComplianceDashboard from '@/components/compliance-dashboard';
import AlfredScroll from '@/components/alfred-slider';
import SlidingBackground from '@/components/background-slider';

async function Home() {
  return (
    <>
      {/* <div className="bg-blue-300 py-[100vh]">
        <BackgroundVideo
          className="h-[700px] w-full bg-black"
          videoUrl="https://videos.pexels.com/video-files/4562551/4562551-hd_1280_720_30fps.mp4"
          thresholdView={0.5}
          childrenClassName="flex items-center justify-center text-white"
        >
          <h1 className="text- text-center text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Content Over the Background
          </h1>
        </BackgroundVideo>
      </div>
      <div className="relative">
        <HeroAnimation
          backgroundImage="https://cdn.prod.website-files.com/63a1c2f787c35e5906961d4f/63a1c2f787c35e6c13961e55_442380534.webp"
          floatingImage="https://cdn.prod.website-files.com/63a1c2f787c35e5906961d4f/63a1c2f787c35e1667961e56_Drone.webp"
          className="h-[200vh] bg-black"
          floatingClassName="h-[300px] w-[300px]"
        />
      </div>

      <div className="h-300 w-full bg-blue-100" />
      <ImageRotation
        className="h-64 w-64"
        image="/image-rotation/image.png"
        threshold={0.5}
        rotate={15}
        rotateX={15}
        rotateY={-15}
      />

      <div className="h-300 w-full bg-blue-300" />
      <HorizontalVehicleMovement
        skyImage="/horizontal-vehicle-scroll/sky.jpeg"
        treeImage="/horizontal-vehicle-scroll/tree-removebg-preview.png"
        trackImage="/horizontal-vehicle-scroll/track.jpeg"
        floatingImg="/horizontal-vehicle-scroll/car-removebg-preview.png"
        wheelSpinDuration={{ sm: '1.2s', md: '0.8s', lg: '0.6s' }} // Set custom duration for wheel spin
        floatingImgMovementDuration={{ sm: '15s', md: '12s', lg: '11s' }} // Set custom duration for car movement
        wheels={[
          {
            image: '/horizontal-vehicle-scroll/wheel1-removebg-preview.png',
            className: '-bottom-[2px] left-[34px]',
          },
          {
            image: '/horizontal-vehicle-scroll/wheel2-removebg-preview.png',
            className: '-bottom-[6px] left-[166px]',
          },
        ]}
        wheelClassName="h-[49px] w-[46px]"
        floatingBodyClassName="bottom-[77px] left-[3rem]"
        floatingImgClassName="h-[4.7rem] w-[17rem]"
        trackImgClassName="bottom-0 h-[20vh]"
        treeImgClassName="bottom-4 h-[87%]"
      />
      <div className="h-300 w-full bg-blue-200" />

      <VehicleScrollEffect
        topPosition={55} //63
        leftPosition={50.8} //49.8
        floatingImgScaleFactor={2.5}
        floatingImg="/vehicle-scroll-effect/tank1.png" //http://www.redanttechsys.com/assets/img/hero/concept-4.png
        backgroundImage="/vehicle-scroll-effect/blurry_road.avif"
        className="h-[500vh]"
        floatingImgClassName="
        top-[55%] left-[51%]  w-39 h-39
        md:w-42 md:h-42 md:top-[49%] md:left-[51%]
        lg:w-50 lg:h-50 lg:top-[55%] lg:left-[50.8%]
      "
      />

      <div className="h-300 w-full bg-blue-200" />
      <TerrainVehicleMovement
        terrainImage="/terrain-vehicle-movement/snow-desert.jpeg"
        svgHeight="sm:h-[60vh] md:h-[80vh] lg:h-[100vh]"
        floatingGroupClassName=" sm:h-[50px] sm:w-[120px] md:h-[70px] md:w-[180px] lg:h-[100px] lg:w-[250px]" // Floating Image + wheels
        floatingImg="/terrain-vehicle-movement/Pioneer UGV v3.png"
        wheels={[
          {
            image: '/terrain-vehicle-movement/pioneer wheel.png',
            x: 340, // Adjust X position
            y: 268, // Adjust Y position
          },
          {
            image: '/terrain-vehicle-movement/pioneer wheel.png',
            x: 266, // Adjust X position
            y: 267, // Adjust Y position
          },
        ]}
        wheelHeight={42}
        wheelWidth={33}
        floatingImgWidth={237}
        floatingImgHeight={220}
        floatingImgPosition={{ x: -22, y: 8, rotate: -1 }}
        wheelSpinDuration={{ sm: '1.2s', md: '0.8s', lg: '5s' }} // Set custom duration for wheel spin
        floatingImgMovementDuration={{ sm: '15s', md: '12s', lg: '25s' }} // Set custom duration for car movement
      />
      <div className="h-96 w-full bg-blue-200" />

      <VideoScrollEffect
        videoSrc="https://videos.pexels.com/video-files/4562551/4562551-hd_1280_720_30fps.mp4"
        className="h-[500vh] w-full"
        videoClassName="opacity-80"
        childrenClassName="px-4 text-white drop-shadow-md md:px-8 lg:px-16"
        thresholdView={0.5}
      >
        <div>
          <h1 className="text-4xl font-bold">First Content</h1>
          <p>This is the first section of content.</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">Second Content</h1>
          <p>This is the second section of content.</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">Third Content</h1>
          <p>This is the third section of content.</p>
        </div>
      </VideoScrollEffect>

      <div className="h-300 w-full bg-blue-200" />
      <FloatingText
        className="size-full"
        text="Welcome to RedAnt! this is some random text"
        textColor="#FF5733"
        fontSize="text-5xl"
        fontFamily="Cursive"
        letterSpacing="tracking-widest"
        animationDuration={0.4}
        animationDelay={0.25}
        maxCharsPerLine={25}
        lineSpacing={30}
      />
      <div className="h-300 w-full bg-blue-200" />
      <ImageGrid
        className="grid-cols-4 grid-rows-2 gap-4 p-4"
        ImageWidth={300}
        ImageHeight={200}
        images={[
          {
            src: '/image-grid/image1.jpeg',
            animation: 'bounce-top-normal',
            alt: 'Image 1',
          },
          {
            src: '/image-grid/image2.jpg',
            animation: 'bounce-bottom-normal',
            alt: 'Image 2',
          },
          {
            src: '/image-grid/image3.jpeg',
            animation: 'shake-horizontal-normal',
            alt: 'Image 3',
          },
          {
            src: '/image-grid/image4.png',
            animation: 'shake-vertical-normal',
            alt: 'Image 4',
          },
          {
            src: '/image-grid/image5.jpg',
            animation: 'shake-top-normal',
            alt: 'Image 5',
          },
          {
            src: '/image-grid/image6.jpg',
            animation: 'rotate-in-2-fwd-ccw-normal',
            alt: 'Image 6',
          },
          {
            src: '/image-grid/image7.jpeg',
            animation: 'tilt-in-tr-normal',
            alt: 'Image 7',
          },
          {
            src: '/image-grid/image8.jpeg',
            animation: 'puff-in-center-normal',
            alt: 'Image 8',
          },
        ]}
      /> */}

      <div className="h-300 w-full bg-blue-200" />
      <ComplianceDashboard />
      <div className="h-300 w-full bg-blue-200" />
      <SlidingBackground
        className="w-full"
        backgroundImages={[
          '/background-slider/S3_1.webp',
          '/background-slider/S3_2.webp',
          '/background-slider/S3_3.webp',
        ]}
        overlayImages={[
          '/background-slider/S5_1.webp',
          '/background-slider/S3_6.webp',
          '/background-slider/S3_7.webp',
        ]}
        robotImage="/background-slider/alfred.png"
        extraScrollSpace={50}
      />
      <div className="h-screen w-full bg-blue-200" />

      <AlfredScroll
        robotImage="/alfred-slider/alfred-1.png"
        robotWidth={400}
        robotHeight={400}
        backgroundImage="/alfred-slider/S3_1.webp?height=1280&width=1920"
        firstSectionHeading="Anything humans can do in space, robots can do better"
        firstSectionHeadingClassName="text-4xl text-white"
        secondSectionHeading="semi-autonomous machines"
        secondSectionHeadingClassName="mb-2 text-4xl text-gray-900"
        secondSectionSubheading="designed to serve food"
        secondSectionSubheadingClassName="text-2xl  text-gray-800"
        cards={[
          {
            type: 'left',
            heading: 'Left Card',
            text: ' the use of machines that can be programmed to perform tasks',
            image: '/alfred-slider/alfred-1.png',
            imageWidth: 120,
            imageHeight: 120,
            headingClassName: 'mb-2 text-lg font-bold text-blue-800',
            paraClassName: 'text-blue-600',
          },
          {
            type: 'main',
            heading: 'Main Card',
            text: 'These robots are equipped with sensors, cameras, and other advanced technologies',
            headingClassName: 'mb-2 text-lg font-bold text-blue-800',
            paraClassName: 'text-blue-600 text-sm',
          },
          {
            type: 'right',
            heading: 'Right Card',
            text: 'These robots are efficient and cost-effective',
            image: '/alfred-slider/alfred-1.png',
            imageWidth: 120,
            imageHeight: 120,
            headingClassName: 'mb-2 text-lg font-bold text-blue-800',
            paraClassName: 'text-blue-600',
          },
        ]}
      />
      <div className="h-300 w-full bg-blue-200" />
    </>
  );
}

export default Home;
