"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Progresso natural de rolagem: nao intercepta wheel/touch, o navegador
  // controla o scroll o tempo todo. Isso evita a tela travar no meio da
  // animacao, que acontecia com a versao anterior baseada em captura de
  // eventos de wheel/touch.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const mediaWidth = useTransform(
    scrollYProgress,
    [0, 0.9],
    [300, isMobileState ? 950 : 1550],
  );
  const mediaHeight = useTransform(
    scrollYProgress,
    [0, 0.9],
    [400, isMobileState ? 600 : 800],
  );
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textTranslateX = useTransform(
    scrollYProgress,
    [0, 0.9],
    [0, isMobileState ? 180 : 150],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.9], [0.7, 0.4]);
  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const negTextTranslateX = useTransform(textTranslateX, (v) => -v);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0 z-0 h-full" style={{ opacity: bgOpacity }}>
          <Image
            src={bgImageSrc}
            alt="Background"
            fill
            sizes="100vw"
            className="w-screen h-screen"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-protur-green/20" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              maxWidth: "95vw",
              maxHeight: "85vh",
              boxShadow: "0px 20px 60px rgba(22, 53, 42, 0.35)",
            }}
          >
            {mediaType === "video" ? (
              <div className="relative h-full w-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover rounded-xl"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-protur-green/40"
                  style={{ opacity: overlayOpacity }}
                />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={mediaSrc}
                  alt={title || "Media content"}
                  fill
                  sizes="(max-width: 768px) 95vw, 1550px"
                  className="object-cover rounded-xl"
                  priority
                />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-protur-green/45"
                  style={{ opacity: overlayOpacity }}
                />
              </div>
            )}

            <div className="relative z-10 mt-4 flex flex-col items-center text-center">
              {date && (
                <motion.p
                  className="text-2xl text-protur-lime"
                  style={{ x: negTextTranslateX }}
                >
                  {date}
                </motion.p>
              )}
              {scrollToExpand && (
                <motion.p
                  className="text-center font-medium text-protur-lime"
                  style={{ x: textTranslateX }}
                >
                  {scrollToExpand}
                </motion.p>
              )}
            </div>
          </motion.div>

          <div
            className={`relative z-10 flex w-full flex-col items-center justify-center gap-4 text-center ${
              textBlend ? "mix-blend-difference" : "mix-blend-normal"
            }`}
          >
            <motion.h2
              className="text-4xl font-bold text-protur-cream md:text-5xl lg:text-6xl"
              style={{ x: negTextTranslateX }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="text-center text-4xl font-bold text-protur-cream md:text-5xl lg:text-6xl"
              style={{ x: textTranslateX }}
            >
              {restOfTitle}
            </motion.h2>
          </div>
        </div>
      </div>

      {children && (
        <motion.section
          className="absolute bottom-0 flex w-full flex-col px-8 py-10 md:px-16 lg:py-20"
          style={{ opacity: contentOpacity }}
        >
          {children}
        </motion.section>
      )}
    </div>
  );
};

export default ScrollExpandMedia;
