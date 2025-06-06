console.log("Styles.js loaded");

// Register GSAP plugins which is required.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


// Create ScrollSmoother instance
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",         // Main wrapper element
  content: "#smooth-content",         // Content inside the smoother
  smooth: 1.75,                         // Smooth scroll duration
  effects: true,                      // Enable parallax-style effects
  smoothTouch: 0.1,                   // Lower smoothing for touch
  ignoreMobileResize: true           // Avoid resize recalculations on mobile
});


// Get reference to the video element
const video = document.querySelector(".scrubber-video");

// Optional: Wait until video metadata is ready
video.addEventListener("loadedmetadata", () => {
  ScrollTrigger.refresh(); // Ensures layout and trigger positions are accurate
});


// Smoothly update video currentTime during scroll
let scrubTime = 0; // Keeps track of video seekbar time


// This ticker runs on every animation frame (~60fps)
// For better videos smoothness we need to change our 30fps videos to 60fps.
gsap.ticker.add(() => {
  if (!video || !video.duration) return;

  const duration = video.duration;
  const scrollProgress = ScrollTrigger.getById("videoScrub")?.progress || 0;

  // Interpolate the video time for smoother updates
  scrubTime += (scrollProgress * duration - scrubTime) * 0.1;

  video.currentTime = scrubTime;
});


// Create ScrollTrigger for pinning and syncing video with scroll
ScrollTrigger.create({
  id: "videoScrub",                        // Unique ID for reference
  trigger: ".scrubber-container",         // Container that triggers scroll
  start: "top top",                        // When top of container hits top of viewport
  end: "bottom bottom",                    // Until the container bottom reaches bottom of viewport
  pin: ".scrubber-video-container",       // Pin the video container during scroll
  scrub: true,                             // Tie animation to scroll position
  markers: false                           // Set to true for debugging
});
