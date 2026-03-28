import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'wisetips.co' }],
        destination: 'https://www.wisetips.co/:path*',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story',
        destination: '/en/viral-stories/dog-walks-home',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story',
        destination: '/es/viral-stories/dog-walks-home',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story',
        destination: '/fr/viral-stories/dog-walks-home',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story',
        destination: '/de/viral-stories/dog-walks-home',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story',
        destination: '/pt/viral-stories/dog-walks-home',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-160',
        destination: '/en/viral-stories/cat-saves-owner',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-160',
        destination: '/es/viral-stories/cat-saves-owner',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-160',
        destination: '/fr/viral-stories/cat-saves-owner',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-160',
        destination: '/de/viral-stories/cat-saves-owner',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-160',
        destination: '/pt/viral-stories/cat-saves-owner',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-288',
        destination: '/en/viral-stories/parrot-calls-911',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-288',
        destination: '/es/viral-stories/parrot-calls-911',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-288',
        destination: '/fr/viral-stories/parrot-calls-911',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-288',
        destination: '/de/viral-stories/parrot-calls-911',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-288',
        destination: '/pt/viral-stories/parrot-calls-911',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-416',
        destination: '/en/viral-stories/horse-remembers-owner',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-416',
        destination: '/es/viral-stories/horse-remembers-owner',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-416',
        destination: '/fr/viral-stories/horse-remembers-owner',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-416',
        destination: '/de/viral-stories/horse-remembers-owner',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-416',
        destination: '/pt/viral-stories/horse-remembers-owner',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-544',
        destination: '/en/viral-stories/dog-adopts-kitten',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-544',
        destination: '/es/viral-stories/dog-adopts-kitten',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-544',
        destination: '/fr/viral-stories/dog-adopts-kitten',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-544',
        destination: '/de/viral-stories/dog-adopts-kitten',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-544',
        destination: '/pt/viral-stories/dog-adopts-kitten',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after',
        destination: '/en/viral-stories/bathroom-reno-200',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after',
        destination: '/es/viral-stories/bathroom-reno-200',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after',
        destination: '/fr/viral-stories/bathroom-reno-200',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after',
        destination: '/de/viral-stories/bathroom-reno-200',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after',
        destination: '/pt/viral-stories/bathroom-reno-200',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-168',
        destination: '/en/viral-stories/shed-to-office',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-168',
        destination: '/es/viral-stories/shed-to-office',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-168',
        destination: '/fr/viral-stories/shed-to-office',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-168',
        destination: '/de/viral-stories/shed-to-office',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-168',
        destination: '/pt/viral-stories/shed-to-office',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-296',
        destination: '/en/viral-stories/kitchen-flip-thrift',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-296',
        destination: '/es/viral-stories/kitchen-flip-thrift',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-296',
        destination: '/fr/viral-stories/kitchen-flip-thrift',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-296',
        destination: '/de/viral-stories/kitchen-flip-thrift',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-296',
        destination: '/pt/viral-stories/kitchen-flip-thrift',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-424',
        destination: '/en/viral-stories/backyard-makeover-free',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-424',
        destination: '/es/viral-stories/backyard-makeover-free',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-424',
        destination: '/fr/viral-stories/backyard-makeover-free',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-424',
        destination: '/de/viral-stories/backyard-makeover-free',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-424',
        destination: '/pt/viral-stories/backyard-makeover-free',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-552',
        destination: '/en/viral-stories/closet-to-bedroom',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-552',
        destination: '/es/viral-stories/closet-to-bedroom',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-552',
        destination: '/fr/viral-stories/closet-to-bedroom',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-552',
        destination: '/de/viral-stories/closet-to-bedroom',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-552',
        destination: '/pt/viral-stories/closet-to-bedroom',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story',
        destination: '/en/viral-stories/neighbors-rebuild-porch',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story',
        destination: '/es/viral-stories/neighbors-rebuild-porch',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story',
        destination: '/fr/viral-stories/neighbors-rebuild-porch',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story',
        destination: '/de/viral-stories/neighbors-rebuild-porch',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story',
        destination: '/pt/viral-stories/neighbors-rebuild-porch',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-208',
        destination: '/en/viral-stories/town-saves-bookshop',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-208',
        destination: '/es/viral-stories/town-saves-bookshop',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-208',
        destination: '/fr/viral-stories/town-saves-bookshop',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-208',
        destination: '/de/viral-stories/town-saves-bookshop',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-208',
        destination: '/pt/viral-stories/town-saves-bookshop',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-336',
        destination: '/en/viral-stories/strangers-pay-layaway',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-336',
        destination: '/es/viral-stories/strangers-pay-layaway',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-336',
        destination: '/fr/viral-stories/strangers-pay-layaway',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-336',
        destination: '/de/viral-stories/strangers-pay-layaway',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-336',
        destination: '/pt/viral-stories/strangers-pay-layaway',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-464',
        destination: '/en/viral-stories/community-garden-crime',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-464',
        destination: '/es/viral-stories/community-garden-crime',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-464',
        destination: '/fr/viral-stories/community-garden-crime',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-464',
        destination: '/de/viral-stories/community-garden-crime',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-464',
        destination: '/pt/viral-stories/community-garden-crime',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-592',
        destination: '/en/viral-stories/teacher-lunch-debt',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-592',
        destination: '/es/viral-stories/teacher-lunch-debt',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-592',
        destination: '/fr/viral-stories/teacher-lunch-debt',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-592',
        destination: '/de/viral-stories/teacher-lunch-debt',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-592',
        destination: '/pt/viral-stories/teacher-lunch-debt',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story',
        destination: '/en/viral-stories/cashier-pays-groceries',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story',
        destination: '/es/viral-stories/cashier-pays-groceries',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story',
        destination: '/fr/viral-stories/cashier-pays-groceries',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story',
        destination: '/de/viral-stories/cashier-pays-groceries',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story',
        destination: '/pt/viral-stories/cashier-pays-groceries',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story-216',
        destination: '/en/viral-stories/mechanic-fixes-free',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story-216',
        destination: '/es/viral-stories/mechanic-fixes-free',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story-216',
        destination: '/fr/viral-stories/mechanic-fixes-free',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story-216',
        destination: '/de/viral-stories/mechanic-fixes-free',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story-216',
        destination: '/pt/viral-stories/mechanic-fixes-free',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story-344',
        destination: '/en/viral-stories/airline-kindness',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story-344',
        destination: '/es/viral-stories/airline-kindness',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story-344',
        destination: '/fr/viral-stories/airline-kindness',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story-344',
        destination: '/de/viral-stories/airline-kindness',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story-344',
        destination: '/pt/viral-stories/airline-kindness',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story-472',
        destination: '/en/viral-stories/stranger-tuition',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story-472',
        destination: '/es/viral-stories/stranger-tuition',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story-472',
        destination: '/fr/viral-stories/stranger-tuition',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story-472',
        destination: '/de/viral-stories/stranger-tuition',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story-472',
        destination: '/pt/viral-stories/stranger-tuition',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack',
        destination: '/en/viral-stories/ice-cube-tray-uses',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack',
        destination: '/es/viral-stories/ice-cube-tray-uses',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack',
        destination: '/fr/viral-stories/ice-cube-tray-uses',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack',
        destination: '/de/viral-stories/ice-cube-tray-uses',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack',
        destination: '/pt/viral-stories/ice-cube-tray-uses',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-144',
        destination: '/en/viral-stories/bread-clip-uses',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-144',
        destination: '/es/viral-stories/bread-clip-uses',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-144',
        destination: '/fr/viral-stories/bread-clip-uses',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-144',
        destination: '/de/viral-stories/bread-clip-uses',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-144',
        destination: '/pt/viral-stories/bread-clip-uses',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-272',
        destination: '/en/viral-stories/rubber-band-jar-trick',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-272',
        destination: '/es/viral-stories/rubber-band-jar-trick',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-272',
        destination: '/fr/viral-stories/rubber-band-jar-trick',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-272',
        destination: '/de/viral-stories/rubber-band-jar-trick',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-272',
        destination: '/pt/viral-stories/rubber-band-jar-trick',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-400',
        destination: '/en/viral-stories/pool-noodle-garage',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-400',
        destination: '/es/viral-stories/pool-noodle-garage',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-400',
        destination: '/fr/viral-stories/pool-noodle-garage',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-400',
        destination: '/de/viral-stories/pool-noodle-garage',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-400',
        destination: '/pt/viral-stories/pool-noodle-garage',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-528',
        destination: '/en/viral-stories/binder-clip-hacks',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-528',
        destination: '/es/viral-stories/binder-clip-hacks',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-528',
        destination: '/fr/viral-stories/binder-clip-hacks',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-528',
        destination: '/de/viral-stories/binder-clip-hacks',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-528',
        destination: '/pt/viral-stories/binder-clip-hacks',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained',
        destination: '/en/viral-stories/bed-rotting-trend',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained',
        destination: '/es/viral-stories/bed-rotting-trend',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained',
        destination: '/fr/viral-stories/bed-rotting-trend',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained',
        destination: '/de/viral-stories/bed-rotting-trend',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained',
        destination: '/pt/viral-stories/bed-rotting-trend',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained-256',
        destination: '/en/viral-stories/quiet-quitting-real',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained-256',
        destination: '/es/viral-stories/quiet-quitting-real',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained-256',
        destination: '/fr/viral-stories/quiet-quitting-real',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained-256',
        destination: '/de/viral-stories/quiet-quitting-real',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained-256',
        destination: '/pt/viral-stories/quiet-quitting-real',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained-384',
        destination: '/en/viral-stories/raw-water-trend',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained-384',
        destination: '/es/viral-stories/raw-water-trend',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained-384',
        destination: '/fr/viral-stories/raw-water-trend',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained-384',
        destination: '/de/viral-stories/raw-water-trend',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained-384',
        destination: '/pt/viral-stories/raw-water-trend',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained-512',
        destination: '/en/viral-stories/dopamine-menu-explained',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained-512',
        destination: '/es/viral-stories/dopamine-menu-explained',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained-512',
        destination: '/fr/viral-stories/dopamine-menu-explained',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained-512',
        destination: '/de/viral-stories/dopamine-menu-explained',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained-512',
        destination: '/pt/viral-stories/dopamine-menu-explained',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success',
        destination: '/en/viral-stories/first-diy-tile-floor',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success',
        destination: '/es/viral-stories/first-diy-tile-floor',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success',
        destination: '/fr/viral-stories/first-diy-tile-floor',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success',
        destination: '/de/viral-stories/first-diy-tile-floor',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success',
        destination: '/pt/viral-stories/first-diy-tile-floor',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-200',
        destination: '/en/viral-stories/shed-built-weekend',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-200',
        destination: '/es/viral-stories/shed-built-weekend',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-200',
        destination: '/fr/viral-stories/shed-built-weekend',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-200',
        destination: '/de/viral-stories/shed-built-weekend',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-200',
        destination: '/pt/viral-stories/shed-built-weekend',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-328',
        destination: '/en/viral-stories/painted-kitchen-cabinets',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-328',
        destination: '/es/viral-stories/painted-kitchen-cabinets',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-328',
        destination: '/fr/viral-stories/painted-kitchen-cabinets',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-328',
        destination: '/de/viral-stories/painted-kitchen-cabinets',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-328',
        destination: '/pt/viral-stories/painted-kitchen-cabinets',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-456',
        destination: '/en/viral-stories/concrete-countertops-diy',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-456',
        destination: '/es/viral-stories/concrete-countertops-diy',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-456',
        destination: '/fr/viral-stories/concrete-countertops-diy',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-456',
        destination: '/de/viral-stories/concrete-countertops-diy',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-456',
        destination: '/pt/viral-stories/concrete-countertops-diy',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-584',
        destination: '/en/viral-stories/fence-built-alone',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-584',
        destination: '/es/viral-stories/fence-built-alone',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-584',
        destination: '/fr/viral-stories/fence-built-alone',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-584',
        destination: '/de/viral-stories/fence-built-alone',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-584',
        destination: '/pt/viral-stories/fence-built-alone',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation',
        destination: '/en/viral-stories/rental-no-damage-makeover',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation',
        destination: '/es/viral-stories/rental-no-damage-makeover',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation',
        destination: '/fr/viral-stories/rental-no-damage-makeover',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation',
        destination: '/de/viral-stories/rental-no-damage-makeover',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation',
        destination: '/pt/viral-stories/rental-no-damage-makeover',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-136',
        destination: '/en/viral-stories/dark-room-bright',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-136',
        destination: '/es/viral-stories/dark-room-bright',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-136',
        destination: '/fr/viral-stories/dark-room-bright',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-136',
        destination: '/de/viral-stories/dark-room-bright',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-136',
        destination: '/pt/viral-stories/dark-room-bright',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-264',
        destination: '/en/viral-stories/garage-into-studio',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-264',
        destination: '/es/viral-stories/garage-into-studio',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-264',
        destination: '/fr/viral-stories/garage-into-studio',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-264',
        destination: '/de/viral-stories/garage-into-studio',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-264',
        destination: '/pt/viral-stories/garage-into-studio',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-392',
        destination: '/en/viral-stories/hoarder-room-clear',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-392',
        destination: '/es/viral-stories/hoarder-room-clear',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-392',
        destination: '/fr/viral-stories/hoarder-room-clear',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-392',
        destination: '/de/viral-stories/hoarder-room-clear',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-392',
        destination: '/pt/viral-stories/hoarder-room-clear',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-520',
        destination: '/en/viral-stories/outdated-kitchen-paint',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-520',
        destination: '/es/viral-stories/outdated-kitchen-paint',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-520',
        destination: '/fr/viral-stories/outdated-kitchen-paint',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-520',
        destination: '/de/viral-stories/outdated-kitchen-paint',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-520',
        destination: '/pt/viral-stories/outdated-kitchen-paint',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover',
        destination: '/en/viral-stories/living-room-500',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover',
        destination: '/es/viral-stories/living-room-500',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover',
        destination: '/fr/viral-stories/living-room-500',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover',
        destination: '/de/viral-stories/living-room-500',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover',
        destination: '/pt/viral-stories/living-room-500',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-192',
        destination: '/en/viral-stories/bedroom-thrift-flip',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-192',
        destination: '/es/viral-stories/bedroom-thrift-flip',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-192',
        destination: '/fr/viral-stories/bedroom-thrift-flip',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-192',
        destination: '/de/viral-stories/bedroom-thrift-flip',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-192',
        destination: '/pt/viral-stories/bedroom-thrift-flip',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-320',
        destination: '/en/viral-stories/bathroom-peel-stick',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-320',
        destination: '/es/viral-stories/bathroom-peel-stick',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-320',
        destination: '/fr/viral-stories/bathroom-peel-stick',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-320',
        destination: '/de/viral-stories/bathroom-peel-stick',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-320',
        destination: '/pt/viral-stories/bathroom-peel-stick',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-448',
        destination: '/en/viral-stories/home-office-free',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-448',
        destination: '/es/viral-stories/home-office-free',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-448',
        destination: '/fr/viral-stories/home-office-free',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-448',
        destination: '/de/viral-stories/home-office-free',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-448',
        destination: '/pt/viral-stories/home-office-free',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-576',
        destination: '/en/viral-stories/kitchen-on-benefits',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-576',
        destination: '/es/viral-stories/kitchen-on-benefits',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-576',
        destination: '/fr/viral-stories/kitchen-on-benefits',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-576',
        destination: '/de/viral-stories/kitchen-on-benefits',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-576',
        destination: '/pt/viral-stories/kitchen-on-benefits',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge',
        destination: '/en/viral-stories/learned-to-cook-at-60',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge',
        destination: '/es/viral-stories/learned-to-cook-at-60',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge',
        destination: '/fr/viral-stories/learned-to-cook-at-60',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge',
        destination: '/de/viral-stories/learned-to-cook-at-60',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge',
        destination: '/pt/viral-stories/learned-to-cook-at-60',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge-224',
        destination: '/en/viral-stories/fear-of-driving-overcome',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge-224',
        destination: '/es/viral-stories/fear-of-driving-overcome',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge-224',
        destination: '/fr/viral-stories/fear-of-driving-overcome',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge-224',
        destination: '/de/viral-stories/fear-of-driving-overcome',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge-224',
        destination: '/pt/viral-stories/fear-of-driving-overcome',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge-352',
        destination: '/en/viral-stories/debt-free-two-years',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge-352',
        destination: '/es/viral-stories/debt-free-two-years',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge-352',
        destination: '/fr/viral-stories/debt-free-two-years',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge-352',
        destination: '/de/viral-stories/debt-free-two-years',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge-352',
        destination: '/pt/viral-stories/debt-free-two-years',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge-480',
        destination: '/en/viral-stories/learned-language-at-70',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge-480',
        destination: '/es/viral-stories/learned-language-at-70',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge-480',
        destination: '/fr/viral-stories/learned-language-at-70',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge-480',
        destination: '/de/viral-stories/learned-language-at-70',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge-480',
        destination: '/pt/viral-stories/learned-language-at-70',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey',
        destination: '/en/viral-stories/sold-everything-traveled',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey',
        destination: '/es/viral-stories/sold-everything-traveled',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey',
        destination: '/fr/viral-stories/sold-everything-traveled',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey',
        destination: '/de/viral-stories/sold-everything-traveled',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey',
        destination: '/pt/viral-stories/sold-everything-traveled',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-176',
        destination: '/en/viral-stories/100-items-only',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-176',
        destination: '/es/viral-stories/100-items-only',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-176',
        destination: '/fr/viral-stories/100-items-only',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-176',
        destination: '/de/viral-stories/100-items-only',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-176',
        destination: '/pt/viral-stories/100-items-only',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-304',
        destination: '/en/viral-stories/tiny-closet-capsule',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-304',
        destination: '/es/viral-stories/tiny-closet-capsule',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-304',
        destination: '/fr/viral-stories/tiny-closet-capsule',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-304',
        destination: '/de/viral-stories/tiny-closet-capsule',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-304',
        destination: '/pt/viral-stories/tiny-closet-capsule',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-432',
        destination: '/en/viral-stories/declutter-5-years-ago',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-432',
        destination: '/es/viral-stories/declutter-5-years-ago',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-432',
        destination: '/fr/viral-stories/declutter-5-years-ago',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-432',
        destination: '/de/viral-stories/declutter-5-years-ago',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-432',
        destination: '/pt/viral-stories/declutter-5-years-ago',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-560',
        destination: '/en/viral-stories/minimal-with-kids',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-560',
        destination: '/es/viral-stories/minimal-with-kids',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-560',
        destination: '/fr/viral-stories/minimal-with-kids',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-560',
        destination: '/de/viral-stories/minimal-with-kids',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-560',
        destination: '/pt/viral-stories/minimal-with-kids',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep',
        destination: '/en/viral-stories/sleep-position-health',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep',
        destination: '/es/viral-stories/sleep-position-health',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep',
        destination: '/fr/viral-stories/sleep-position-health',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep',
        destination: '/de/viral-stories/sleep-position-health',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep',
        destination: '/pt/viral-stories/sleep-position-health',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-152',
        destination: '/en/viral-stories/nap-length-matters',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-152',
        destination: '/es/viral-stories/nap-length-matters',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-152',
        destination: '/fr/viral-stories/nap-length-matters',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-152',
        destination: '/de/viral-stories/nap-length-matters',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-152',
        destination: '/pt/viral-stories/nap-length-matters',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-280',
        destination: '/en/viral-stories/sleep-debt-real',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-280',
        destination: '/es/viral-stories/sleep-debt-real',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-280',
        destination: '/fr/viral-stories/sleep-debt-real',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-280',
        destination: '/de/viral-stories/sleep-debt-real',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-280',
        destination: '/pt/viral-stories/sleep-debt-real',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-408',
        destination: '/en/viral-stories/phone-before-bed-effects',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-408',
        destination: '/es/viral-stories/phone-before-bed-effects',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-408',
        destination: '/fr/viral-stories/phone-before-bed-effects',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-408',
        destination: '/de/viral-stories/phone-before-bed-effects',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-408',
        destination: '/pt/viral-stories/phone-before-bed-effects',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-536',
        destination: '/en/viral-stories/chronotype-quiz',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-536',
        destination: '/es/viral-stories/chronotype-quiz',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-536',
        destination: '/fr/viral-stories/chronotype-quiz',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-536',
        destination: '/de/viral-stories/chronotype-quiz',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-536',
        destination: '/pt/viral-stories/chronotype-quiz',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin',
        destination: '/en/viral-stories/butter-board-origin',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin',
        destination: '/es/viral-stories/butter-board-origin',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin',
        destination: '/fr/viral-stories/butter-board-origin',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin',
        destination: '/de/viral-stories/butter-board-origin',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin',
        destination: '/pt/viral-stories/butter-board-origin',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin-248',
        destination: '/en/viral-stories/pasta-chips-tiktok',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin-248',
        destination: '/es/viral-stories/pasta-chips-tiktok',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin-248',
        destination: '/fr/viral-stories/pasta-chips-tiktok',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin-248',
        destination: '/de/viral-stories/pasta-chips-tiktok',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin-248',
        destination: '/pt/viral-stories/pasta-chips-tiktok',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin-376',
        destination: '/en/viral-stories/cloud-bread-explained',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin-376',
        destination: '/es/viral-stories/cloud-bread-explained',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin-376',
        destination: '/fr/viral-stories/cloud-bread-explained',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin-376',
        destination: '/de/viral-stories/cloud-bread-explained',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin-376',
        destination: '/pt/viral-stories/cloud-bread-explained',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin-504',
        destination: '/en/viral-stories/baked-feta-pasta-origin',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin-504',
        destination: '/es/viral-stories/baked-feta-pasta-origin',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin-504',
        destination: '/fr/viral-stories/baked-feta-pasta-origin',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin-504',
        destination: '/de/viral-stories/baked-feta-pasta-origin',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin-504',
        destination: '/pt/viral-stories/baked-feta-pasta-origin',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story',
        destination: '/en/viral-stories/28sqm-family-of-four',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story',
        destination: '/es/viral-stories/28sqm-family-of-four',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story',
        destination: '/fr/viral-stories/28sqm-family-of-four',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story',
        destination: '/de/viral-stories/28sqm-family-of-four',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story',
        destination: '/pt/viral-stories/28sqm-family-of-four',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-184',
        destination: '/en/viral-stories/bus-conversion-home',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-184',
        destination: '/es/viral-stories/bus-conversion-home',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-184',
        destination: '/fr/viral-stories/bus-conversion-home',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-184',
        destination: '/de/viral-stories/bus-conversion-home',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-184',
        destination: '/pt/viral-stories/bus-conversion-home',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-312',
        destination: '/en/viral-stories/shipping-container-house',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-312',
        destination: '/es/viral-stories/shipping-container-house',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-312',
        destination: '/fr/viral-stories/shipping-container-house',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-312',
        destination: '/de/viral-stories/shipping-container-house',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-312',
        destination: '/pt/viral-stories/shipping-container-house',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-440',
        destination: '/en/viral-stories/cabin-built-alone',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-440',
        destination: '/es/viral-stories/cabin-built-alone',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-440',
        destination: '/fr/viral-stories/cabin-built-alone',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-440',
        destination: '/de/viral-stories/cabin-built-alone',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-440',
        destination: '/pt/viral-stories/cabin-built-alone',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-568',
        destination: '/en/viral-stories/tiny-house-with-baby',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-568',
        destination: '/es/viral-stories/tiny-house-with-baby',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-568',
        destination: '/fr/viral-stories/tiny-house-with-baby',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-568',
        destination: '/de/viral-stories/tiny-house-with-baby',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-568',
        destination: '/pt/viral-stories/tiny-house-with-baby',
        permanent: true,
      },

      {
        source: '/en/viral-stories/amazing-animal-story-160',
        destination: '/en/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-160',
        destination: '/es/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-160',
        destination: '/fr/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-160',
        destination: '/de/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-160',
        destination: '/pt/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-288',
        destination: '/en/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-288',
        destination: '/es/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-288',
        destination: '/fr/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-288',
        destination: '/de/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-288',
        destination: '/pt/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-416',
        destination: '/en/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-416',
        destination: '/es/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-416',
        destination: '/fr/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-416',
        destination: '/de/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-416',
        destination: '/pt/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/amazing-animal-story-544',
        destination: '/en/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/amazing-animal-story-544',
        destination: '/es/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/amazing-animal-story-544',
        destination: '/fr/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/amazing-animal-story-544',
        destination: '/de/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/amazing-animal-story-544',
        destination: '/pt/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/en/beauty/anti-aging-tips-263',
        destination: '/en/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/anti-aging-tips-263',
        destination: '/es/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/anti-aging-tips-263',
        destination: '/fr/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/anti-aging-tips-263',
        destination: '/de/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/anti-aging-tips-263',
        destination: '/pt/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/en/beauty/anti-aging-tips-479',
        destination: '/en/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/anti-aging-tips-479',
        destination: '/es/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/anti-aging-tips-479',
        destination: '/fr/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/anti-aging-tips-479',
        destination: '/de/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/anti-aging-tips-479',
        destination: '/pt/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/en/cleaning/appliance-deep-clean-585',
        destination: '/en/cleaning/appliance-deep-clean',
        permanent: true,
      },
      {
        source: '/es/cleaning/appliance-deep-clean-585',
        destination: '/es/cleaning/appliance-deep-clean',
        permanent: true,
      },
      {
        source: '/fr/cleaning/appliance-deep-clean-585',
        destination: '/fr/cleaning/appliance-deep-clean',
        permanent: true,
      },
      {
        source: '/de/cleaning/appliance-deep-clean-585',
        destination: '/de/cleaning/appliance-deep-clean',
        permanent: true,
      },
      {
        source: '/pt/cleaning/appliance-deep-clean-585',
        destination: '/pt/cleaning/appliance-deep-clean',
        permanent: true,
      },
      {
        source: '/en/life-hacks/backup-data-453',
        destination: '/en/life-hacks/backup-data',
        permanent: true,
      },
      {
        source: '/es/life-hacks/backup-data-453',
        destination: '/es/life-hacks/backup-data',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/backup-data-453',
        destination: '/fr/life-hacks/backup-data',
        permanent: true,
      },
      {
        source: '/de/life-hacks/backup-data-453',
        destination: '/de/life-hacks/backup-data',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/backup-data-453',
        destination: '/pt/life-hacks/backup-data',
        permanent: true,
      },
      {
        source: '/en/diy/basic-tool-kit-302',
        destination: '/en/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/es/diy/basic-tool-kit-302',
        destination: '/es/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/fr/diy/basic-tool-kit-302',
        destination: '/fr/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/de/diy/basic-tool-kit-302',
        destination: '/de/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/pt/diy/basic-tool-kit-302',
        destination: '/pt/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/en/diy/basic-tool-kit-598',
        destination: '/en/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/es/diy/basic-tool-kit-598',
        destination: '/es/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/fr/diy/basic-tool-kit-598',
        destination: '/fr/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/de/diy/basic-tool-kit-598',
        destination: '/de/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/pt/diy/basic-tool-kit-598',
        destination: '/pt/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/en/food/batch-cooking-basics-587',
        destination: '/en/food/batch-cooking-basics',
        permanent: true,
      },
      {
        source: '/es/food/batch-cooking-basics-587',
        destination: '/es/food/batch-cooking-basics',
        permanent: true,
      },
      {
        source: '/fr/food/batch-cooking-basics-587',
        destination: '/fr/food/batch-cooking-basics',
        permanent: true,
      },
      {
        source: '/de/food/batch-cooking-basics-587',
        destination: '/de/food/batch-cooking-basics',
        permanent: true,
      },
      {
        source: '/pt/food/batch-cooking-basics-587',
        destination: '/pt/food/batch-cooking-basics',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/bathroom-storage-524',
        destination: '/en/home-and-garden/bathroom-storage',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/bathroom-storage-524',
        destination: '/es/home-and-garden/bathroom-storage',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/bathroom-storage-524',
        destination: '/fr/home-and-garden/bathroom-storage',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/bathroom-storage-524',
        destination: '/de/home-and-garden/bathroom-storage',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/bathroom-storage-524',
        destination: '/pt/home-and-garden/bathroom-storage',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-168',
        destination: '/en/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-168',
        destination: '/es/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-168',
        destination: '/fr/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-168',
        destination: '/de/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-168',
        destination: '/pt/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-296',
        destination: '/en/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-296',
        destination: '/es/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-296',
        destination: '/fr/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-296',
        destination: '/de/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-296',
        destination: '/pt/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-424',
        destination: '/en/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-424',
        destination: '/es/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-424',
        destination: '/fr/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-424',
        destination: '/de/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-424',
        destination: '/pt/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/en/viral-stories/before-and-after-552',
        destination: '/en/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/es/viral-stories/before-and-after-552',
        destination: '/es/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/before-and-after-552',
        destination: '/fr/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/de/viral-stories/before-and-after-552',
        destination: '/de/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/before-and-after-552',
        destination: '/pt/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-192',
        destination: '/en/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-192',
        destination: '/es/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-192',
        destination: '/fr/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-192',
        destination: '/de/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-192',
        destination: '/pt/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-320',
        destination: '/en/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-320',
        destination: '/es/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-320',
        destination: '/fr/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-320',
        destination: '/de/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-320',
        destination: '/pt/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-448',
        destination: '/en/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-448',
        destination: '/es/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-448',
        destination: '/fr/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-448',
        destination: '/de/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-448',
        destination: '/pt/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/en/viral-stories/budget-makeover-576',
        destination: '/en/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/es/viral-stories/budget-makeover-576',
        destination: '/es/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/budget-makeover-576',
        destination: '/fr/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/de/viral-stories/budget-makeover-576',
        destination: '/de/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/budget-makeover-576',
        destination: '/pt/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/en/life-hacks/budget-tracking-357',
        destination: '/en/life-hacks/budget-tracking',
        permanent: true,
      },
      {
        source: '/es/life-hacks/budget-tracking-357',
        destination: '/es/life-hacks/budget-tracking',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/budget-tracking-357',
        destination: '/fr/life-hacks/budget-tracking',
        permanent: true,
      },
      {
        source: '/de/life-hacks/budget-tracking-357',
        destination: '/de/life-hacks/budget-tracking',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/budget-tracking-357',
        destination: '/pt/life-hacks/budget-tracking',
        permanent: true,
      },
      {
        source: '/en/life-hacks/calendar-tips-325',
        destination: '/en/life-hacks/calendar-tips',
        permanent: true,
      },
      {
        source: '/es/life-hacks/calendar-tips-325',
        destination: '/es/life-hacks/calendar-tips',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/calendar-tips-325',
        destination: '/fr/life-hacks/calendar-tips',
        permanent: true,
      },
      {
        source: '/de/life-hacks/calendar-tips-325',
        destination: '/de/life-hacks/calendar-tips',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/calendar-tips-325',
        destination: '/pt/life-hacks/calendar-tips',
        permanent: true,
      },
      {
        source: '/en/diy/card-making-590',
        destination: '/en/diy/card-making',
        permanent: true,
      },
      {
        source: '/es/diy/card-making-590',
        destination: '/es/diy/card-making',
        permanent: true,
      },
      {
        source: '/fr/diy/card-making-590',
        destination: '/fr/diy/card-making',
        permanent: true,
      },
      {
        source: '/de/diy/card-making-590',
        destination: '/de/diy/card-making',
        permanent: true,
      },
      {
        source: '/pt/diy/card-making-590',
        destination: '/pt/diy/card-making',
        permanent: true,
      },
      {
        source: '/en/diy/caulking-gaps-342',
        destination: '/en/diy/caulking-gaps',
        permanent: true,
      },
      {
        source: '/es/diy/caulking-gaps-342',
        destination: '/es/diy/caulking-gaps',
        permanent: true,
      },
      {
        source: '/fr/diy/caulking-gaps-342',
        destination: '/fr/diy/caulking-gaps',
        permanent: true,
      },
      {
        source: '/de/diy/caulking-gaps-342',
        destination: '/de/diy/caulking-gaps',
        permanent: true,
      },
      {
        source: '/pt/diy/caulking-gaps-342',
        destination: '/pt/diy/caulking-gaps',
        permanent: true,
      },
      {
        source: '/en/diy/ceiling-fan-install-438',
        destination: '/en/diy/ceiling-fan-install',
        permanent: true,
      },
      {
        source: '/es/diy/ceiling-fan-install-438',
        destination: '/es/diy/ceiling-fan-install',
        permanent: true,
      },
      {
        source: '/fr/diy/ceiling-fan-install-438',
        destination: '/fr/diy/ceiling-fan-install',
        permanent: true,
      },
      {
        source: '/de/diy/ceiling-fan-install-438',
        destination: '/de/diy/ceiling-fan-install',
        permanent: true,
      },
      {
        source: '/pt/diy/ceiling-fan-install-438',
        destination: '/pt/diy/ceiling-fan-install',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/closet-organization-484',
        destination: '/en/home-and-garden/closet-organization',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/closet-organization-484',
        destination: '/es/home-and-garden/closet-organization',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/closet-organization-484',
        destination: '/fr/home-and-garden/closet-organization',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/closet-organization-484',
        destination: '/de/home-and-garden/closet-organization',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/closet-organization-484',
        destination: '/pt/home-and-garden/closet-organization',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-208',
        destination: '/en/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-208',
        destination: '/es/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-208',
        destination: '/fr/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-208',
        destination: '/de/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-208',
        destination: '/pt/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-336',
        destination: '/en/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-336',
        destination: '/es/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-336',
        destination: '/fr/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-336',
        destination: '/de/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-336',
        destination: '/pt/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-464',
        destination: '/en/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-464',
        destination: '/es/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-464',
        destination: '/fr/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-464',
        destination: '/de/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-464',
        destination: '/pt/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/community-story-592',
        destination: '/en/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/community-story-592',
        destination: '/es/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/community-story-592',
        destination: '/fr/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/community-story-592',
        destination: '/de/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/community-story-592',
        destination: '/pt/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/compost-for-garden-580',
        destination: '/en/home-and-garden/compost-for-garden',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/compost-for-garden-580',
        destination: '/es/home-and-garden/compost-for-garden',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/compost-for-garden-580',
        destination: '/fr/home-and-garden/compost-for-garden',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/compost-for-garden-580',
        destination: '/de/home-and-garden/compost-for-garden',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/compost-for-garden-580',
        destination: '/pt/home-and-garden/compost-for-garden',
        permanent: true,
      },
      {
        source: '/en/beauty/concealer-tips-351',
        destination: '/en/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/concealer-tips-351',
        destination: '/es/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/concealer-tips-351',
        destination: '/fr/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/concealer-tips-351',
        destination: '/de/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/concealer-tips-351',
        destination: '/pt/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/en/beauty/concealer-tips-567',
        destination: '/en/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/concealer-tips-567',
        destination: '/es/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/concealer-tips-567',
        destination: '/fr/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/concealer-tips-567',
        destination: '/de/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/concealer-tips-567',
        destination: '/pt/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/en/beauty/conditioner-tips-303',
        destination: '/en/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/conditioner-tips-303',
        destination: '/es/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/conditioner-tips-303',
        destination: '/fr/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/conditioner-tips-303',
        destination: '/de/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/conditioner-tips-303',
        destination: '/pt/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/en/beauty/conditioner-tips-519',
        destination: '/en/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/conditioner-tips-519',
        destination: '/es/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/conditioner-tips-519',
        destination: '/fr/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/conditioner-tips-519',
        destination: '/de/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/conditioner-tips-519',
        destination: '/pt/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/container-gardening-548',
        destination: '/en/home-and-garden/container-gardening',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/container-gardening-548',
        destination: '/es/home-and-garden/container-gardening',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/container-gardening-548',
        destination: '/fr/home-and-garden/container-gardening',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/container-gardening-548',
        destination: '/de/home-and-garden/container-gardening',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/container-gardening-548',
        destination: '/pt/home-and-garden/container-gardening',
        permanent: true,
      },
      {
        source: '/en/diy/craft-storage-558',
        destination: '/en/diy/craft-storage',
        permanent: true,
      },
      {
        source: '/es/diy/craft-storage-558',
        destination: '/es/diy/craft-storage',
        permanent: true,
      },
      {
        source: '/fr/diy/craft-storage-558',
        destination: '/fr/diy/craft-storage',
        permanent: true,
      },
      {
        source: '/de/diy/craft-storage-558',
        destination: '/de/diy/craft-storage',
        permanent: true,
      },
      {
        source: '/pt/diy/craft-storage-558',
        destination: '/pt/diy/craft-storage',
        permanent: true,
      },
      {
        source: '/en/viral-stories/creative-solution-240',
        destination: '/en/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/es/viral-stories/creative-solution-240',
        destination: '/es/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/creative-solution-240',
        destination: '/fr/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/de/viral-stories/creative-solution-240',
        destination: '/de/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/creative-solution-240',
        destination: '/pt/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/en/viral-stories/creative-solution-368',
        destination: '/en/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/es/viral-stories/creative-solution-368',
        destination: '/es/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/creative-solution-368',
        destination: '/fr/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/de/viral-stories/creative-solution-368',
        destination: '/de/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/creative-solution-368',
        destination: '/pt/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/en/viral-stories/creative-solution-496',
        destination: '/en/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/es/viral-stories/creative-solution-496',
        destination: '/es/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/creative-solution-496',
        destination: '/fr/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/de/viral-stories/creative-solution-496',
        destination: '/de/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/creative-solution-496',
        destination: '/pt/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/en/beauty/cuticle-care-383',
        destination: '/en/beauty/cuticle-care',
        permanent: true,
      },
      {
        source: '/es/beauty/cuticle-care-383',
        destination: '/es/beauty/cuticle-care',
        permanent: true,
      },
      {
        source: '/fr/beauty/cuticle-care-383',
        destination: '/fr/beauty/cuticle-care',
        permanent: true,
      },
      {
        source: '/de/beauty/cuticle-care-383',
        destination: '/de/beauty/cuticle-care',
        permanent: true,
      },
      {
        source: '/pt/beauty/cuticle-care-383',
        destination: '/pt/beauty/cuticle-care',
        permanent: true,
      },
      {
        source: '/en/diy/desk-build-542',
        destination: '/en/diy/desk-build',
        permanent: true,
      },
      {
        source: '/es/diy/desk-build-542',
        destination: '/es/diy/desk-build',
        permanent: true,
      },
      {
        source: '/fr/diy/desk-build-542',
        destination: '/fr/diy/desk-build',
        permanent: true,
      },
      {
        source: '/de/diy/desk-build-542',
        destination: '/de/diy/desk-build',
        permanent: true,
      },
      {
        source: '/pt/diy/desk-build-542',
        destination: '/pt/diy/desk-build',
        permanent: true,
      },
      {
        source: '/en/beauty/diet-and-glow-423',
        destination: '/en/beauty/diet-and-glow',
        permanent: true,
      },
      {
        source: '/es/beauty/diet-and-glow-423',
        destination: '/es/beauty/diet-and-glow',
        permanent: true,
      },
      {
        source: '/fr/beauty/diet-and-glow-423',
        destination: '/fr/beauty/diet-and-glow',
        permanent: true,
      },
      {
        source: '/de/beauty/diet-and-glow-423',
        destination: '/de/beauty/diet-and-glow',
        permanent: true,
      },
      {
        source: '/pt/beauty/diet-and-glow-423',
        destination: '/pt/beauty/diet-and-glow',
        permanent: true,
      },
      {
        source: '/en/life-hacks/dinner-when-busy-549',
        destination: '/en/life-hacks/dinner-when-busy',
        permanent: true,
      },
      {
        source: '/es/life-hacks/dinner-when-busy-549',
        destination: '/es/life-hacks/dinner-when-busy',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/dinner-when-busy-549',
        destination: '/fr/life-hacks/dinner-when-busy',
        permanent: true,
      },
      {
        source: '/de/life-hacks/dinner-when-busy-549',
        destination: '/de/life-hacks/dinner-when-busy',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/dinner-when-busy-549',
        destination: '/pt/life-hacks/dinner-when-busy',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-200',
        destination: '/en/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-200',
        destination: '/es/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-200',
        destination: '/fr/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-200',
        destination: '/de/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-200',
        destination: '/pt/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-328',
        destination: '/en/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-328',
        destination: '/es/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-328',
        destination: '/fr/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-328',
        destination: '/de/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-328',
        destination: '/pt/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-456',
        destination: '/en/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-456',
        destination: '/es/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-456',
        destination: '/fr/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-456',
        destination: '/de/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-456',
        destination: '/pt/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/en/viral-stories/diy-success-584',
        destination: '/en/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/es/viral-stories/diy-success-584',
        destination: '/es/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/diy-success-584',
        destination: '/fr/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/de/viral-stories/diy-success-584',
        destination: '/de/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/diy-success-584',
        destination: '/pt/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/en/diy/door-hinge-fix-446',
        destination: '/en/diy/door-hinge-fix',
        permanent: true,
      },
      {
        source: '/es/diy/door-hinge-fix-446',
        destination: '/es/diy/door-hinge-fix',
        permanent: true,
      },
      {
        source: '/fr/diy/door-hinge-fix-446',
        destination: '/fr/diy/door-hinge-fix',
        permanent: true,
      },
      {
        source: '/de/diy/door-hinge-fix-446',
        destination: '/de/diy/door-hinge-fix',
        permanent: true,
      },
      {
        source: '/pt/diy/door-hinge-fix-446',
        destination: '/pt/diy/door-hinge-fix',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/drawer-dividers-492',
        destination: '/en/home-and-garden/drawer-dividers',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/drawer-dividers-492',
        destination: '/es/home-and-garden/drawer-dividers',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/drawer-dividers-492',
        destination: '/fr/home-and-garden/drawer-dividers',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/drawer-dividers-492',
        destination: '/de/home-and-garden/drawer-dividers',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/drawer-dividers-492',
        destination: '/pt/home-and-garden/drawer-dividers',
        permanent: true,
      },
      {
        source: '/en/beauty/dry-skin-fix-239',
        destination: '/en/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/es/beauty/dry-skin-fix-239',
        destination: '/es/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/fr/beauty/dry-skin-fix-239',
        destination: '/fr/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/de/beauty/dry-skin-fix-239',
        destination: '/de/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/pt/beauty/dry-skin-fix-239',
        destination: '/pt/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/en/beauty/dry-skin-fix-455',
        destination: '/en/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/es/beauty/dry-skin-fix-455',
        destination: '/es/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/fr/beauty/dry-skin-fix-455',
        destination: '/fr/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/de/beauty/dry-skin-fix-455',
        destination: '/de/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/pt/beauty/dry-skin-fix-455',
        destination: '/pt/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/en/diy/drywall-patch-334',
        destination: '/en/diy/drywall-patch',
        permanent: true,
      },
      {
        source: '/es/diy/drywall-patch-334',
        destination: '/es/diy/drywall-patch',
        permanent: true,
      },
      {
        source: '/fr/diy/drywall-patch-334',
        destination: '/fr/diy/drywall-patch',
        permanent: true,
      },
      {
        source: '/de/diy/drywall-patch-334',
        destination: '/de/diy/drywall-patch',
        permanent: true,
      },
      {
        source: '/pt/diy/drywall-patch-334',
        destination: '/pt/diy/drywall-patch',
        permanent: true,
      },
      {
        source: '/en/cleaning/eco-friendly-dish-soap-593',
        destination: '/en/cleaning/eco-friendly-dish-soap',
        permanent: true,
      },
      {
        source: '/es/cleaning/eco-friendly-dish-soap-593',
        destination: '/es/cleaning/eco-friendly-dish-soap',
        permanent: true,
      },
      {
        source: '/fr/cleaning/eco-friendly-dish-soap-593',
        destination: '/fr/cleaning/eco-friendly-dish-soap',
        permanent: true,
      },
      {
        source: '/de/cleaning/eco-friendly-dish-soap-593',
        destination: '/de/cleaning/eco-friendly-dish-soap',
        permanent: true,
      },
      {
        source: '/pt/cleaning/eco-friendly-dish-soap-593',
        destination: '/pt/cleaning/eco-friendly-dish-soap',
        permanent: true,
      },
      {
        source: '/en/life-hacks/email-inbox-zero-317',
        destination: '/en/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/es/life-hacks/email-inbox-zero-317',
        destination: '/es/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/email-inbox-zero-317',
        destination: '/fr/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/de/life-hacks/email-inbox-zero-317',
        destination: '/de/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/email-inbox-zero-317',
        destination: '/pt/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/en/life-hacks/email-inbox-zero-597',
        destination: '/en/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/es/life-hacks/email-inbox-zero-597',
        destination: '/es/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/email-inbox-zero-597',
        destination: '/fr/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/de/life-hacks/email-inbox-zero-597',
        destination: '/de/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/email-inbox-zero-597',
        destination: '/pt/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/entryway-organization-508',
        destination: '/en/home-and-garden/entryway-organization',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/entryway-organization-508',
        destination: '/es/home-and-garden/entryway-organization',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/entryway-organization-508',
        destination: '/fr/home-and-garden/entryway-organization',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/entryway-organization-508',
        destination: '/de/home-and-garden/entryway-organization',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/entryway-organization-508',
        destination: '/pt/home-and-garden/entryway-organization',
        permanent: true,
      },
      {
        source: '/en/life-hacks/evening-routine-293',
        destination: '/en/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/es/life-hacks/evening-routine-293',
        destination: '/es/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/evening-routine-293',
        destination: '/fr/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/de/life-hacks/evening-routine-293',
        destination: '/de/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/evening-routine-293',
        destination: '/pt/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/en/life-hacks/evening-routine-573',
        destination: '/en/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/es/life-hacks/evening-routine-573',
        destination: '/es/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/evening-routine-573',
        destination: '/fr/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/de/life-hacks/evening-routine-573',
        destination: '/de/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/evening-routine-573',
        destination: '/pt/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/en/beauty/eye-cream-use-271',
        destination: '/en/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/es/beauty/eye-cream-use-271',
        destination: '/es/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/fr/beauty/eye-cream-use-271',
        destination: '/fr/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/de/beauty/eye-cream-use-271',
        destination: '/de/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/pt/beauty/eye-cream-use-271',
        destination: '/pt/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/en/beauty/eye-cream-use-487',
        destination: '/en/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/es/beauty/eye-cream-use-487',
        destination: '/es/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/fr/beauty/eye-cream-use-487',
        destination: '/fr/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/de/beauty/eye-cream-use-487',
        destination: '/de/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/pt/beauty/eye-cream-use-487',
        destination: '/pt/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/en/beauty/eyebrow-shape-359',
        destination: '/en/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/es/beauty/eyebrow-shape-359',
        destination: '/es/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/fr/beauty/eyebrow-shape-359',
        destination: '/fr/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/de/beauty/eyebrow-shape-359',
        destination: '/de/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/pt/beauty/eyebrow-shape-359',
        destination: '/pt/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/en/beauty/eyebrow-shape-575',
        destination: '/en/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/es/beauty/eyebrow-shape-575',
        destination: '/es/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/fr/beauty/eyebrow-shape-575',
        destination: '/fr/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/de/beauty/eyebrow-shape-575',
        destination: '/de/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/pt/beauty/eyebrow-shape-575',
        destination: '/pt/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/en/diy/faucet-drip-fix-374',
        destination: '/en/diy/faucet-drip-fix',
        permanent: true,
      },
      {
        source: '/es/diy/faucet-drip-fix-374',
        destination: '/es/diy/faucet-drip-fix',
        permanent: true,
      },
      {
        source: '/fr/diy/faucet-drip-fix-374',
        destination: '/fr/diy/faucet-drip-fix',
        permanent: true,
      },
      {
        source: '/de/diy/faucet-drip-fix-374',
        destination: '/de/diy/faucet-drip-fix',
        permanent: true,
      },
      {
        source: '/pt/diy/faucet-drip-fix-374',
        destination: '/pt/diy/faucet-drip-fix',
        permanent: true,
      },
      {
        source: '/en/diy/fixing-wobbly-chair-326',
        destination: '/en/diy/fixing-wobbly-chair',
        permanent: true,
      },
      {
        source: '/es/diy/fixing-wobbly-chair-326',
        destination: '/es/diy/fixing-wobbly-chair',
        permanent: true,
      },
      {
        source: '/fr/diy/fixing-wobbly-chair-326',
        destination: '/fr/diy/fixing-wobbly-chair',
        permanent: true,
      },
      {
        source: '/de/diy/fixing-wobbly-chair-326',
        destination: '/de/diy/fixing-wobbly-chair',
        permanent: true,
      },
      {
        source: '/pt/diy/fixing-wobbly-chair-326',
        destination: '/pt/diy/fixing-wobbly-chair',
        permanent: true,
      },
      {
        source: '/en/life-hacks/focus-and-distraction-341',
        destination: '/en/life-hacks/focus-and-distraction',
        permanent: true,
      },
      {
        source: '/es/life-hacks/focus-and-distraction-341',
        destination: '/es/life-hacks/focus-and-distraction',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/focus-and-distraction-341',
        destination: '/fr/life-hacks/focus-and-distraction',
        permanent: true,
      },
      {
        source: '/de/life-hacks/focus-and-distraction-341',
        destination: '/de/life-hacks/focus-and-distraction',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/focus-and-distraction-341',
        destination: '/pt/life-hacks/focus-and-distraction',
        permanent: true,
      },
      {
        source: '/en/beauty/foundation-match-343',
        destination: '/en/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/es/beauty/foundation-match-343',
        destination: '/es/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/fr/beauty/foundation-match-343',
        destination: '/fr/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/de/beauty/foundation-match-343',
        destination: '/de/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/pt/beauty/foundation-match-343',
        destination: '/pt/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/en/beauty/foundation-match-559',
        destination: '/en/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/es/beauty/foundation-match-559',
        destination: '/es/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/fr/beauty/foundation-match-559',
        destination: '/fr/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/de/beauty/foundation-match-559',
        destination: '/de/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/pt/beauty/foundation-match-559',
        destination: '/pt/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/en/food/freezer-meal-ideas-595',
        destination: '/en/food/freezer-meal-ideas',
        permanent: true,
      },
      {
        source: '/es/food/freezer-meal-ideas-595',
        destination: '/es/food/freezer-meal-ideas',
        permanent: true,
      },
      {
        source: '/fr/food/freezer-meal-ideas-595',
        destination: '/fr/food/freezer-meal-ideas',
        permanent: true,
      },
      {
        source: '/de/food/freezer-meal-ideas-595',
        destination: '/de/food/freezer-meal-ideas',
        permanent: true,
      },
      {
        source: '/pt/food/freezer-meal-ideas-595',
        destination: '/pt/food/freezer-meal-ideas',
        permanent: true,
      },
      {
        source: '/en/diy/furniture-assembly-318',
        destination: '/en/diy/furniture-assembly',
        permanent: true,
      },
      {
        source: '/es/diy/furniture-assembly-318',
        destination: '/es/diy/furniture-assembly',
        permanent: true,
      },
      {
        source: '/fr/diy/furniture-assembly-318',
        destination: '/fr/diy/furniture-assembly',
        permanent: true,
      },
      {
        source: '/de/diy/furniture-assembly-318',
        destination: '/de/diy/furniture-assembly',
        permanent: true,
      },
      {
        source: '/pt/diy/furniture-assembly-318',
        destination: '/pt/diy/furniture-assembly',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/garage-organization-532',
        destination: '/en/home-and-garden/garage-organization',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/garage-organization-532',
        destination: '/es/home-and-garden/garage-organization',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/garage-organization-532',
        destination: '/fr/home-and-garden/garage-organization',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/garage-organization-532',
        destination: '/de/home-and-garden/garage-organization',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/garage-organization-532',
        destination: '/pt/home-and-garden/garage-organization',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/garden-planning-540',
        destination: '/en/home-and-garden/garden-planning',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/garden-planning-540',
        destination: '/es/home-and-garden/garden-planning',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/garden-planning-540',
        destination: '/fr/home-and-garden/garden-planning',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/garden-planning-540',
        destination: '/de/home-and-garden/garden-planning',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/garden-planning-540',
        destination: '/pt/home-and-garden/garden-planning',
        permanent: true,
      },
      {
        source: '/en/life-hacks/gift-ideas-477',
        destination: '/en/life-hacks/gift-ideas',
        permanent: true,
      },
      {
        source: '/es/life-hacks/gift-ideas-477',
        destination: '/es/life-hacks/gift-ideas',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/gift-ideas-477',
        destination: '/fr/life-hacks/gift-ideas',
        permanent: true,
      },
      {
        source: '/de/life-hacks/gift-ideas-477',
        destination: '/de/life-hacks/gift-ideas',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/gift-ideas-477',
        destination: '/pt/life-hacks/gift-ideas',
        permanent: true,
      },
      {
        source: '/en/diy/gift-wrapping-582',
        destination: '/en/diy/gift-wrapping',
        permanent: true,
      },
      {
        source: '/es/diy/gift-wrapping-582',
        destination: '/es/diy/gift-wrapping',
        permanent: true,
      },
      {
        source: '/fr/diy/gift-wrapping-582',
        destination: '/fr/diy/gift-wrapping',
        permanent: true,
      },
      {
        source: '/de/diy/gift-wrapping-582',
        destination: '/de/diy/gift-wrapping',
        permanent: true,
      },
      {
        source: '/pt/diy/gift-wrapping-582',
        destination: '/pt/diy/gift-wrapping',
        permanent: true,
      },
      {
        source: '/en/life-hacks/grocery-list-app-557',
        destination: '/en/life-hacks/grocery-list-app',
        permanent: true,
      },
      {
        source: '/es/life-hacks/grocery-list-app-557',
        destination: '/es/life-hacks/grocery-list-app',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/grocery-list-app-557',
        destination: '/fr/life-hacks/grocery-list-app',
        permanent: true,
      },
      {
        source: '/de/life-hacks/grocery-list-app-557',
        destination: '/de/life-hacks/grocery-list-app',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/grocery-list-app-557',
        destination: '/pt/life-hacks/grocery-list-app',
        permanent: true,
      },
      {
        source: '/en/beauty/hair-mask-319',
        destination: '/en/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/es/beauty/hair-mask-319',
        destination: '/es/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/fr/beauty/hair-mask-319',
        destination: '/fr/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/de/beauty/hair-mask-319',
        destination: '/de/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/pt/beauty/hair-mask-319',
        destination: '/pt/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/en/beauty/hair-mask-535',
        destination: '/en/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/es/beauty/hair-mask-535',
        destination: '/es/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/fr/beauty/hair-mask-535',
        destination: '/fr/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/de/beauty/hair-mask-535',
        destination: '/de/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/pt/beauty/hair-mask-535',
        destination: '/pt/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/en/beauty/hair-washing-right-295',
        destination: '/en/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/es/beauty/hair-washing-right-295',
        destination: '/es/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/fr/beauty/hair-washing-right-295',
        destination: '/fr/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/de/beauty/hair-washing-right-295',
        destination: '/de/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/pt/beauty/hair-washing-right-295',
        destination: '/pt/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/en/beauty/hair-washing-right-511',
        destination: '/en/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/es/beauty/hair-washing-right-511',
        destination: '/es/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/fr/beauty/hair-washing-right-511',
        destination: '/fr/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/de/beauty/hair-washing-right-511',
        destination: '/de/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/pt/beauty/hair-washing-right-511',
        destination: '/pt/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/en/beauty/hand-care-287',
        destination: '/en/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/es/beauty/hand-care-287',
        destination: '/es/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/fr/beauty/hand-care-287',
        destination: '/fr/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/de/beauty/hand-care-287',
        destination: '/de/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/pt/beauty/hand-care-287',
        destination: '/pt/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/en/beauty/hand-care-503',
        destination: '/en/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/es/beauty/hand-care-503',
        destination: '/es/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/fr/beauty/hand-care-503',
        destination: '/fr/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/de/beauty/hand-care-503',
        destination: '/de/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/pt/beauty/hand-care-503',
        destination: '/pt/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/en/diy/hanging-pictures-straight-310',
        destination: '/en/diy/hanging-pictures-straight',
        permanent: true,
      },
      {
        source: '/es/diy/hanging-pictures-straight-310',
        destination: '/es/diy/hanging-pictures-straight',
        permanent: true,
      },
      {
        source: '/fr/diy/hanging-pictures-straight-310',
        destination: '/fr/diy/hanging-pictures-straight',
        permanent: true,
      },
      {
        source: '/de/diy/hanging-pictures-straight-310',
        destination: '/de/diy/hanging-pictures-straight',
        permanent: true,
      },
      {
        source: '/pt/diy/hanging-pictures-straight-310',
        destination: '/pt/diy/hanging-pictures-straight',
        permanent: true,
      },
      {
        source: '/en/diy/headboard-diy-550',
        destination: '/en/diy/headboard-diy',
        permanent: true,
      },
      {
        source: '/es/diy/headboard-diy-550',
        destination: '/es/diy/headboard-diy',
        permanent: true,
      },
      {
        source: '/fr/diy/headboard-diy-550',
        destination: '/fr/diy/headboard-diy',
        permanent: true,
      },
      {
        source: '/de/diy/headboard-diy-550',
        destination: '/de/diy/headboard-diy',
        permanent: true,
      },
      {
        source: '/pt/diy/headboard-diy-550',
        destination: '/pt/diy/headboard-diy',
        permanent: true,
      },
      {
        source: '/en/beauty/heat-protectant-311',
        destination: '/en/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/es/beauty/heat-protectant-311',
        destination: '/es/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/fr/beauty/heat-protectant-311',
        destination: '/fr/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/de/beauty/heat-protectant-311',
        destination: '/de/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/pt/beauty/heat-protectant-311',
        destination: '/pt/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/en/beauty/heat-protectant-527',
        destination: '/en/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/es/beauty/heat-protectant-527',
        destination: '/es/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/fr/beauty/heat-protectant-527',
        destination: '/fr/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/de/beauty/heat-protectant-527',
        destination: '/de/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/pt/beauty/heat-protectant-527',
        destination: '/pt/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/en/diy/holiday-diy-decor-566',
        destination: '/en/diy/holiday-diy-decor',
        permanent: true,
      },
      {
        source: '/es/diy/holiday-diy-decor-566',
        destination: '/es/diy/holiday-diy-decor',
        permanent: true,
      },
      {
        source: '/fr/diy/holiday-diy-decor-566',
        destination: '/fr/diy/holiday-diy-decor',
        permanent: true,
      },
      {
        source: '/de/diy/holiday-diy-decor-566',
        destination: '/de/diy/holiday-diy-decor',
        permanent: true,
      },
      {
        source: '/pt/diy/holiday-diy-decor-566',
        destination: '/pt/diy/holiday-diy-decor',
        permanent: true,
      },
      {
        source: '/en/life-hacks/homework-help-517',
        destination: '/en/life-hacks/homework-help',
        permanent: true,
      },
      {
        source: '/es/life-hacks/homework-help-517',
        destination: '/es/life-hacks/homework-help',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/homework-help-517',
        destination: '/fr/life-hacks/homework-help',
        permanent: true,
      },
      {
        source: '/de/life-hacks/homework-help-517',
        destination: '/de/life-hacks/homework-help',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/homework-help-517',
        destination: '/pt/life-hacks/homework-help',
        permanent: true,
      },
      {
        source: '/en/cleaning/hydrogen-peroxide-cleaning-uses-537',
        destination: '/en/cleaning/hydrogen-peroxide-cleaning-uses',
        permanent: true,
      },
      {
        source: '/es/cleaning/hydrogen-peroxide-cleaning-uses-537',
        destination: '/es/cleaning/hydrogen-peroxide-cleaning-uses',
        permanent: true,
      },
      {
        source: '/fr/cleaning/hydrogen-peroxide-cleaning-uses-537',
        destination: '/fr/cleaning/hydrogen-peroxide-cleaning-uses',
        permanent: true,
      },
      {
        source: '/de/cleaning/hydrogen-peroxide-cleaning-uses-537',
        destination: '/de/cleaning/hydrogen-peroxide-cleaning-uses',
        permanent: true,
      },
      {
        source: '/pt/cleaning/hydrogen-peroxide-cleaning-uses-537',
        destination: '/pt/cleaning/hydrogen-peroxide-cleaning-uses',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/indoor-plants-556',
        destination: '/en/home-and-garden/indoor-plants',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/indoor-plants-556',
        destination: '/es/home-and-garden/indoor-plants',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/indoor-plants-556',
        destination: '/fr/home-and-garden/indoor-plants',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/indoor-plants-556',
        destination: '/de/home-and-garden/indoor-plants',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/indoor-plants-556',
        destination: '/pt/home-and-garden/indoor-plants',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-136',
        destination: '/en/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-136',
        destination: '/es/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-136',
        destination: '/fr/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-136',
        destination: '/de/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-136',
        destination: '/pt/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-264',
        destination: '/en/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-264',
        destination: '/es/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-264',
        destination: '/fr/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-264',
        destination: '/de/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-264',
        destination: '/pt/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-392',
        destination: '/en/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-392',
        destination: '/es/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-392',
        destination: '/fr/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-392',
        destination: '/de/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-392',
        destination: '/pt/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/en/viral-stories/inspiring-home-transformation-520',
        destination: '/en/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/es/viral-stories/inspiring-home-transformation-520',
        destination: '/es/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/inspiring-home-transformation-520',
        destination: '/fr/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/de/viral-stories/inspiring-home-transformation-520',
        destination: '/de/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/inspiring-home-transformation-520',
        destination: '/pt/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/en/life-hacks/jet-lag-tips-405',
        destination: '/en/life-hacks/jet-lag-tips',
        permanent: true,
      },
      {
        source: '/es/life-hacks/jet-lag-tips-405',
        destination: '/es/life-hacks/jet-lag-tips',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/jet-lag-tips-405',
        destination: '/fr/life-hacks/jet-lag-tips',
        permanent: true,
      },
      {
        source: '/de/life-hacks/jet-lag-tips-405',
        destination: '/de/life-hacks/jet-lag-tips',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/jet-lag-tips-405',
        destination: '/pt/life-hacks/jet-lag-tips',
        permanent: true,
      },
      {
        source: '/en/life-hacks/kids-chores-501',
        destination: '/en/life-hacks/kids-chores',
        permanent: true,
      },
      {
        source: '/es/life-hacks/kids-chores-501',
        destination: '/es/life-hacks/kids-chores',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/kids-chores-501',
        destination: '/fr/life-hacks/kids-chores',
        permanent: true,
      },
      {
        source: '/de/life-hacks/kids-chores-501',
        destination: '/de/life-hacks/kids-chores',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/kids-chores-501',
        destination: '/pt/life-hacks/kids-chores',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story-216',
        destination: '/en/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story-216',
        destination: '/es/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story-216',
        destination: '/fr/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story-216',
        destination: '/de/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story-216',
        destination: '/pt/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story-344',
        destination: '/en/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story-344',
        destination: '/es/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story-344',
        destination: '/fr/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story-344',
        destination: '/de/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story-344',
        destination: '/pt/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/kindness-story-472',
        destination: '/en/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/kindness-story-472',
        destination: '/es/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/kindness-story-472',
        destination: '/fr/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/kindness-story-472',
        destination: '/de/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/kindness-story-472',
        destination: '/pt/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/kitchen-drawer-organizers-516',
        destination: '/en/home-and-garden/kitchen-drawer-organizers',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/kitchen-drawer-organizers-516',
        destination: '/es/home-and-garden/kitchen-drawer-organizers',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/kitchen-drawer-organizers-516',
        destination: '/fr/home-and-garden/kitchen-drawer-organizers',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/kitchen-drawer-organizers-516',
        destination: '/de/home-and-garden/kitchen-drawer-organizers',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/kitchen-drawer-organizers-516',
        destination: '/pt/home-and-garden/kitchen-drawer-organizers',
        permanent: true,
      },
      {
        source: '/en/cleaning/kitchen-grease-removal-561',
        destination: '/en/cleaning/kitchen-grease-removal',
        permanent: true,
      },
      {
        source: '/es/cleaning/kitchen-grease-removal-561',
        destination: '/es/cleaning/kitchen-grease-removal',
        permanent: true,
      },
      {
        source: '/fr/cleaning/kitchen-grease-removal-561',
        destination: '/fr/cleaning/kitchen-grease-removal',
        permanent: true,
      },
      {
        source: '/de/cleaning/kitchen-grease-removal-561',
        destination: '/de/cleaning/kitchen-grease-removal',
        permanent: true,
      },
      {
        source: '/pt/cleaning/kitchen-grease-removal-561',
        destination: '/pt/cleaning/kitchen-grease-removal',
        permanent: true,
      },
      {
        source: '/en/cleaning/laundry-stain-removal-569',
        destination: '/en/cleaning/laundry-stain-removal',
        permanent: true,
      },
      {
        source: '/es/cleaning/laundry-stain-removal-569',
        destination: '/es/cleaning/laundry-stain-removal',
        permanent: true,
      },
      {
        source: '/fr/cleaning/laundry-stain-removal-569',
        destination: '/fr/cleaning/laundry-stain-removal',
        permanent: true,
      },
      {
        source: '/de/cleaning/laundry-stain-removal-569',
        destination: '/de/cleaning/laundry-stain-removal',
        permanent: true,
      },
      {
        source: '/pt/cleaning/laundry-stain-removal-569',
        destination: '/pt/cleaning/laundry-stain-removal',
        permanent: true,
      },
      {
        source: '/en/diy/led-bulb-upgrade-430',
        destination: '/en/diy/led-bulb-upgrade',
        permanent: true,
      },
      {
        source: '/es/diy/led-bulb-upgrade-430',
        destination: '/es/diy/led-bulb-upgrade',
        permanent: true,
      },
      {
        source: '/fr/diy/led-bulb-upgrade-430',
        destination: '/fr/diy/led-bulb-upgrade',
        permanent: true,
      },
      {
        source: '/de/diy/led-bulb-upgrade-430',
        destination: '/de/diy/led-bulb-upgrade',
        permanent: true,
      },
      {
        source: '/pt/diy/led-bulb-upgrade-430',
        destination: '/pt/diy/led-bulb-upgrade',
        permanent: true,
      },
      {
        source: '/en/diy/light-switch-replace-414',
        destination: '/en/diy/light-switch-replace',
        permanent: true,
      },
      {
        source: '/es/diy/light-switch-replace-414',
        destination: '/es/diy/light-switch-replace',
        permanent: true,
      },
      {
        source: '/fr/diy/light-switch-replace-414',
        destination: '/fr/diy/light-switch-replace',
        permanent: true,
      },
      {
        source: '/de/diy/light-switch-replace-414',
        destination: '/de/diy/light-switch-replace',
        permanent: true,
      },
      {
        source: '/pt/diy/light-switch-replace-414',
        destination: '/pt/diy/light-switch-replace',
        permanent: true,
      },
      {
        source: '/en/beauty/lip-care-279',
        destination: '/en/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/es/beauty/lip-care-279',
        destination: '/es/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/fr/beauty/lip-care-279',
        destination: '/fr/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/de/beauty/lip-care-279',
        destination: '/de/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/pt/beauty/lip-care-279',
        destination: '/pt/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/en/beauty/lip-care-495',
        destination: '/en/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/es/beauty/lip-care-495',
        destination: '/es/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/fr/beauty/lip-care-495',
        destination: '/fr/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/de/beauty/lip-care-495',
        destination: '/de/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/pt/beauty/lip-care-495',
        destination: '/pt/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/en/life-hacks/lunch-on-the-go-541',
        destination: '/en/life-hacks/lunch-on-the-go',
        permanent: true,
      },
      {
        source: '/es/life-hacks/lunch-on-the-go-541',
        destination: '/es/life-hacks/lunch-on-the-go',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/lunch-on-the-go-541',
        destination: '/fr/life-hacks/lunch-on-the-go',
        permanent: true,
      },
      {
        source: '/de/life-hacks/lunch-on-the-go-541',
        destination: '/de/life-hacks/lunch-on-the-go',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/lunch-on-the-go-541',
        destination: '/pt/life-hacks/lunch-on-the-go',
        permanent: true,
      },
      {
        source: '/en/beauty/manicure-at-home-399',
        destination: '/en/beauty/manicure-at-home',
        permanent: true,
      },
      {
        source: '/es/beauty/manicure-at-home-399',
        destination: '/es/beauty/manicure-at-home',
        permanent: true,
      },
      {
        source: '/fr/beauty/manicure-at-home-399',
        destination: '/fr/beauty/manicure-at-home',
        permanent: true,
      },
      {
        source: '/de/beauty/manicure-at-home-399',
        destination: '/de/beauty/manicure-at-home',
        permanent: true,
      },
      {
        source: '/pt/beauty/manicure-at-home-399',
        destination: '/pt/beauty/manicure-at-home',
        permanent: true,
      },
      {
        source: '/en/beauty/mascara-tips-367',
        destination: '/en/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/mascara-tips-367',
        destination: '/es/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/mascara-tips-367',
        destination: '/fr/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/mascara-tips-367',
        destination: '/de/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/mascara-tips-367',
        destination: '/pt/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/en/beauty/mascara-tips-583',
        destination: '/en/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/mascara-tips-583',
        destination: '/es/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/mascara-tips-583',
        destination: '/fr/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/mascara-tips-583',
        destination: '/de/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/mascara-tips-583',
        destination: '/pt/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/en/food/meal-prep-sunday-579',
        destination: '/en/food/meal-prep-sunday',
        permanent: true,
      },
      {
        source: '/es/food/meal-prep-sunday-579',
        destination: '/es/food/meal-prep-sunday',
        permanent: true,
      },
      {
        source: '/fr/food/meal-prep-sunday-579',
        destination: '/fr/food/meal-prep-sunday',
        permanent: true,
      },
      {
        source: '/de/food/meal-prep-sunday-579',
        destination: '/de/food/meal-prep-sunday',
        permanent: true,
      },
      {
        source: '/pt/food/meal-prep-sunday-579',
        destination: '/pt/food/meal-prep-sunday',
        permanent: true,
      },
      {
        source: '/en/life-hacks/meeting-efficiency-333',
        destination: '/en/life-hacks/meeting-efficiency',
        permanent: true,
      },
      {
        source: '/es/life-hacks/meeting-efficiency-333',
        destination: '/es/life-hacks/meeting-efficiency',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/meeting-efficiency-333',
        destination: '/fr/life-hacks/meeting-efficiency',
        permanent: true,
      },
      {
        source: '/de/life-hacks/meeting-efficiency-333',
        destination: '/de/life-hacks/meeting-efficiency',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/meeting-efficiency-333',
        destination: '/pt/life-hacks/meeting-efficiency',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-176',
        destination: '/en/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-176',
        destination: '/es/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-176',
        destination: '/fr/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-176',
        destination: '/de/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-176',
        destination: '/pt/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-304',
        destination: '/en/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-304',
        destination: '/es/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-304',
        destination: '/fr/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-304',
        destination: '/de/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-304',
        destination: '/pt/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-432',
        destination: '/en/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-432',
        destination: '/es/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-432',
        destination: '/fr/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-432',
        destination: '/de/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-432',
        destination: '/pt/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/en/viral-stories/minimalist-journey-560',
        destination: '/en/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/es/viral-stories/minimalist-journey-560',
        destination: '/es/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/minimalist-journey-560',
        destination: '/fr/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/de/viral-stories/minimalist-journey-560',
        destination: '/de/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/minimalist-journey-560',
        destination: '/pt/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/en/life-hacks/money-saving-daily-349',
        destination: '/en/life-hacks/money-saving-daily',
        permanent: true,
      },
      {
        source: '/es/life-hacks/money-saving-daily-349',
        destination: '/es/life-hacks/money-saving-daily',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/money-saving-daily-349',
        destination: '/fr/life-hacks/money-saving-daily',
        permanent: true,
      },
      {
        source: '/de/life-hacks/money-saving-daily-349',
        destination: '/de/life-hacks/money-saving-daily',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/money-saving-daily-349',
        destination: '/pt/life-hacks/money-saving-daily',
        permanent: true,
      },
      {
        source: '/en/health/morning-energy-boosters-586',
        destination: '/en/health/morning-energy-boosters',
        permanent: true,
      },
      {
        source: '/es/health/morning-energy-boosters-586',
        destination: '/es/health/morning-energy-boosters',
        permanent: true,
      },
      {
        source: '/fr/health/morning-energy-boosters-586',
        destination: '/fr/health/morning-energy-boosters',
        permanent: true,
      },
      {
        source: '/de/health/morning-energy-boosters-586',
        destination: '/de/health/morning-energy-boosters',
        permanent: true,
      },
      {
        source: '/pt/health/morning-energy-boosters-586',
        destination: '/pt/health/morning-energy-boosters',
        permanent: true,
      },
      {
        source: '/en/life-hacks/morning-productivity-routine-285',
        destination: '/en/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/es/life-hacks/morning-productivity-routine-285',
        destination: '/es/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/morning-productivity-routine-285',
        destination: '/fr/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/de/life-hacks/morning-productivity-routine-285',
        destination: '/de/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/morning-productivity-routine-285',
        destination: '/pt/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/en/life-hacks/morning-productivity-routine-565',
        destination: '/en/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/es/life-hacks/morning-productivity-routine-565',
        destination: '/es/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/morning-productivity-routine-565',
        destination: '/fr/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/de/life-hacks/morning-productivity-routine-565',
        destination: '/de/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/morning-productivity-routine-565',
        destination: '/pt/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/en/life-hacks/morning-rush-525',
        destination: '/en/life-hacks/morning-rush',
        permanent: true,
      },
      {
        source: '/es/life-hacks/morning-rush-525',
        destination: '/es/life-hacks/morning-rush',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/morning-rush-525',
        destination: '/fr/life-hacks/morning-rush',
        permanent: true,
      },
      {
        source: '/de/life-hacks/morning-rush-525',
        destination: '/de/life-hacks/morning-rush',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/morning-rush-525',
        destination: '/pt/life-hacks/morning-rush',
        permanent: true,
      },
      {
        source: '/en/beauty/nail-care-at-home-375',
        destination: '/en/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/es/beauty/nail-care-at-home-375',
        destination: '/es/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/fr/beauty/nail-care-at-home-375',
        destination: '/fr/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/de/beauty/nail-care-at-home-375',
        destination: '/de/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/pt/beauty/nail-care-at-home-375',
        destination: '/pt/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/en/beauty/nail-care-at-home-591',
        destination: '/en/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/es/beauty/nail-care-at-home-591',
        destination: '/es/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/fr/beauty/nail-care-at-home-591',
        destination: '/fr/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/de/beauty/nail-care-at-home-591',
        destination: '/de/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/pt/beauty/nail-care-at-home-591',
        destination: '/pt/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/en/beauty/nail-strengthening-391',
        destination: '/en/beauty/nail-strengthening',
        permanent: true,
      },
      {
        source: '/es/beauty/nail-strengthening-391',
        destination: '/es/beauty/nail-strengthening',
        permanent: true,
      },
      {
        source: '/fr/beauty/nail-strengthening-391',
        destination: '/fr/beauty/nail-strengthening',
        permanent: true,
      },
      {
        source: '/de/beauty/nail-strengthening-391',
        destination: '/de/beauty/nail-strengthening',
        permanent: true,
      },
      {
        source: '/pt/beauty/nail-strengthening-391',
        destination: '/pt/beauty/nail-strengthening',
        permanent: true,
      },
      {
        source: '/en/cleaning/natural-bathroom-cleaners-553',
        destination: '/en/cleaning/natural-bathroom-cleaners',
        permanent: true,
      },
      {
        source: '/es/cleaning/natural-bathroom-cleaners-553',
        destination: '/es/cleaning/natural-bathroom-cleaners',
        permanent: true,
      },
      {
        source: '/fr/cleaning/natural-bathroom-cleaners-553',
        destination: '/fr/cleaning/natural-bathroom-cleaners',
        permanent: true,
      },
      {
        source: '/de/cleaning/natural-bathroom-cleaners-553',
        destination: '/de/cleaning/natural-bathroom-cleaners',
        permanent: true,
      },
      {
        source: '/pt/cleaning/natural-bathroom-cleaners-553',
        destination: '/pt/cleaning/natural-bathroom-cleaners',
        permanent: true,
      },
      {
        source: '/en/beauty/natural-face-mask-231',
        destination: '/en/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/es/beauty/natural-face-mask-231',
        destination: '/es/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/fr/beauty/natural-face-mask-231',
        destination: '/fr/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/de/beauty/natural-face-mask-231',
        destination: '/de/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/pt/beauty/natural-face-mask-231',
        destination: '/pt/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/en/beauty/natural-face-mask-447',
        destination: '/en/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/es/beauty/natural-face-mask-447',
        destination: '/es/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/fr/beauty/natural-face-mask-447',
        destination: '/fr/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/de/beauty/natural-face-mask-447',
        destination: '/de/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/pt/beauty/natural-face-mask-447',
        destination: '/pt/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/en/beauty/natural-makeup-look-335',
        destination: '/en/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/es/beauty/natural-makeup-look-335',
        destination: '/es/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/fr/beauty/natural-makeup-look-335',
        destination: '/fr/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/de/beauty/natural-makeup-look-335',
        destination: '/de/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/pt/beauty/natural-makeup-look-335',
        destination: '/pt/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/en/beauty/natural-makeup-look-551',
        destination: '/en/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/es/beauty/natural-makeup-look-551',
        destination: '/es/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/fr/beauty/natural-makeup-look-551',
        destination: '/fr/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/de/beauty/natural-makeup-look-551',
        destination: '/de/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/pt/beauty/natural-makeup-look-551',
        destination: '/pt/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/en/life-hacks/negotiate-bills-373',
        destination: '/en/life-hacks/negotiate-bills',
        permanent: true,
      },
      {
        source: '/es/life-hacks/negotiate-bills-373',
        destination: '/es/life-hacks/negotiate-bills',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/negotiate-bills-373',
        destination: '/fr/life-hacks/negotiate-bills',
        permanent: true,
      },
      {
        source: '/de/life-hacks/negotiate-bills-373',
        destination: '/de/life-hacks/negotiate-bills',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/negotiate-bills-373',
        destination: '/pt/life-hacks/negotiate-bills',
        permanent: true,
      },
      {
        source: '/en/beauty/oily-skin-balance-247',
        destination: '/en/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/es/beauty/oily-skin-balance-247',
        destination: '/es/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/fr/beauty/oily-skin-balance-247',
        destination: '/fr/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/de/beauty/oily-skin-balance-247',
        destination: '/de/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/pt/beauty/oily-skin-balance-247',
        destination: '/pt/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/en/beauty/oily-skin-balance-463',
        destination: '/en/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/es/beauty/oily-skin-balance-463',
        destination: '/es/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/fr/beauty/oily-skin-balance-463',
        destination: '/fr/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/de/beauty/oily-skin-balance-463',
        destination: '/de/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/pt/beauty/oily-skin-balance-463',
        destination: '/pt/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/en/cleaning/outdoor-furniture-cleaning-577',
        destination: '/en/cleaning/outdoor-furniture-cleaning',
        permanent: true,
      },
      {
        source: '/es/cleaning/outdoor-furniture-cleaning-577',
        destination: '/es/cleaning/outdoor-furniture-cleaning',
        permanent: true,
      },
      {
        source: '/fr/cleaning/outdoor-furniture-cleaning-577',
        destination: '/fr/cleaning/outdoor-furniture-cleaning',
        permanent: true,
      },
      {
        source: '/de/cleaning/outdoor-furniture-cleaning-577',
        destination: '/de/cleaning/outdoor-furniture-cleaning',
        permanent: true,
      },
      {
        source: '/pt/cleaning/outdoor-furniture-cleaning-577',
        destination: '/pt/cleaning/outdoor-furniture-cleaning',
        permanent: true,
      },
      {
        source: '/en/diy/outlet-install-422',
        destination: '/en/diy/outlet-install',
        permanent: true,
      },
      {
        source: '/es/diy/outlet-install-422',
        destination: '/es/diy/outlet-install',
        permanent: true,
      },
      {
        source: '/fr/diy/outlet-install-422',
        destination: '/fr/diy/outlet-install',
        permanent: true,
      },
      {
        source: '/de/diy/outlet-install-422',
        destination: '/de/diy/outlet-install',
        permanent: true,
      },
      {
        source: '/pt/diy/outlet-install-422',
        destination: '/pt/diy/outlet-install',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge-224',
        destination: '/en/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge-224',
        destination: '/es/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge-224',
        destination: '/fr/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge-224',
        destination: '/de/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge-224',
        destination: '/pt/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge-352',
        destination: '/en/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge-352',
        destination: '/es/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge-352',
        destination: '/fr/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge-352',
        destination: '/de/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge-352',
        destination: '/pt/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/en/viral-stories/overcoming-challenge-480',
        destination: '/en/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/es/viral-stories/overcoming-challenge-480',
        destination: '/es/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/overcoming-challenge-480',
        destination: '/fr/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/de/viral-stories/overcoming-challenge-480',
        destination: '/de/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/overcoming-challenge-480',
        destination: '/pt/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/en/life-hacks/packing-light-389',
        destination: '/en/life-hacks/packing-light',
        permanent: true,
      },
      {
        source: '/es/life-hacks/packing-light-389',
        destination: '/es/life-hacks/packing-light',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/packing-light-389',
        destination: '/fr/life-hacks/packing-light',
        permanent: true,
      },
      {
        source: '/de/life-hacks/packing-light-389',
        destination: '/de/life-hacks/packing-light',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/packing-light-389',
        destination: '/pt/life-hacks/packing-light',
        permanent: true,
      },
      {
        source: '/en/diy/paint-a-room-350',
        destination: '/en/diy/paint-a-room',
        permanent: true,
      },
      {
        source: '/es/diy/paint-a-room-350',
        destination: '/es/diy/paint-a-room',
        permanent: true,
      },
      {
        source: '/fr/diy/paint-a-room-350',
        destination: '/fr/diy/paint-a-room',
        permanent: true,
      },
      {
        source: '/de/diy/paint-a-room-350',
        destination: '/de/diy/paint-a-room',
        permanent: true,
      },
      {
        source: '/pt/diy/paint-a-room-350',
        destination: '/pt/diy/paint-a-room',
        permanent: true,
      },
      {
        source: '/en/diy/paint-brush-care-358',
        destination: '/en/diy/paint-brush-care',
        permanent: true,
      },
      {
        source: '/es/diy/paint-brush-care-358',
        destination: '/es/diy/paint-brush-care',
        permanent: true,
      },
      {
        source: '/fr/diy/paint-brush-care-358',
        destination: '/fr/diy/paint-brush-care',
        permanent: true,
      },
      {
        source: '/de/diy/paint-brush-care-358',
        destination: '/de/diy/paint-brush-care',
        permanent: true,
      },
      {
        source: '/pt/diy/paint-brush-care-358',
        destination: '/pt/diy/paint-brush-care',
        permanent: true,
      },
      {
        source: '/en/diy/pallet-projects-526',
        destination: '/en/diy/pallet-projects',
        permanent: true,
      },
      {
        source: '/es/diy/pallet-projects-526',
        destination: '/es/diy/pallet-projects',
        permanent: true,
      },
      {
        source: '/fr/diy/pallet-projects-526',
        destination: '/fr/diy/pallet-projects',
        permanent: true,
      },
      {
        source: '/de/diy/pallet-projects-526',
        destination: '/de/diy/pallet-projects',
        permanent: true,
      },
      {
        source: '/pt/diy/pallet-projects-526',
        destination: '/pt/diy/pallet-projects',
        permanent: true,
      },
      {
        source: '/en/life-hacks/parenting-shortcuts-493',
        destination: '/en/life-hacks/parenting-shortcuts',
        permanent: true,
      },
      {
        source: '/es/life-hacks/parenting-shortcuts-493',
        destination: '/es/life-hacks/parenting-shortcuts',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/parenting-shortcuts-493',
        destination: '/fr/life-hacks/parenting-shortcuts',
        permanent: true,
      },
      {
        source: '/de/life-hacks/parenting-shortcuts-493',
        destination: '/de/life-hacks/parenting-shortcuts',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/parenting-shortcuts-493',
        destination: '/pt/life-hacks/parenting-shortcuts',
        permanent: true,
      },
      {
        source: '/en/life-hacks/password-manager-437',
        destination: '/en/life-hacks/password-manager',
        permanent: true,
      },
      {
        source: '/es/life-hacks/password-manager-437',
        destination: '/es/life-hacks/password-manager',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/password-manager-437',
        destination: '/fr/life-hacks/password-manager',
        permanent: true,
      },
      {
        source: '/de/life-hacks/password-manager-437',
        destination: '/de/life-hacks/password-manager',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/password-manager-437',
        destination: '/pt/life-hacks/password-manager',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/pest-control-natural-596',
        destination: '/en/home-and-garden/pest-control-natural',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/pest-control-natural-596',
        destination: '/es/home-and-garden/pest-control-natural',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/pest-control-natural-596',
        destination: '/fr/home-and-garden/pest-control-natural',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/pest-control-natural-596',
        destination: '/de/home-and-garden/pest-control-natural',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/pest-control-natural-596',
        destination: '/pt/home-and-garden/pest-control-natural',
        permanent: true,
      },
      {
        source: '/en/life-hacks/phone-storage-429',
        destination: '/en/life-hacks/phone-storage',
        permanent: true,
      },
      {
        source: '/es/life-hacks/phone-storage-429',
        destination: '/es/life-hacks/phone-storage',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/phone-storage-429',
        destination: '/fr/life-hacks/phone-storage',
        permanent: true,
      },
      {
        source: '/de/life-hacks/phone-storage-429',
        destination: '/de/life-hacks/phone-storage',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/phone-storage-429',
        destination: '/pt/life-hacks/phone-storage',
        permanent: true,
      },
      {
        source: '/en/diy/pipe-insulation-398',
        destination: '/en/diy/pipe-insulation',
        permanent: true,
      },
      {
        source: '/es/diy/pipe-insulation-398',
        destination: '/es/diy/pipe-insulation',
        permanent: true,
      },
      {
        source: '/fr/diy/pipe-insulation-398',
        destination: '/fr/diy/pipe-insulation',
        permanent: true,
      },
      {
        source: '/de/diy/pipe-insulation-398',
        destination: '/de/diy/pipe-insulation',
        permanent: true,
      },
      {
        source: '/pt/diy/pipe-insulation-398',
        destination: '/pt/diy/pipe-insulation',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/pruning-basics-572',
        destination: '/en/home-and-garden/pruning-basics',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/pruning-basics-572',
        destination: '/es/home-and-garden/pruning-basics',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/pruning-basics-572',
        destination: '/fr/home-and-garden/pruning-basics',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/pruning-basics-572',
        destination: '/de/home-and-garden/pruning-basics',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/pruning-basics-572',
        destination: '/pt/home-and-garden/pruning-basics',
        permanent: true,
      },
      {
        source: '/en/life-hacks/quality-time-469',
        destination: '/en/life-hacks/quality-time',
        permanent: true,
      },
      {
        source: '/es/life-hacks/quality-time-469',
        destination: '/es/life-hacks/quality-time',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/quality-time-469',
        destination: '/fr/life-hacks/quality-time',
        permanent: true,
      },
      {
        source: '/de/life-hacks/quality-time-469',
        destination: '/de/life-hacks/quality-time',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/quality-time-469',
        destination: '/pt/life-hacks/quality-time',
        permanent: true,
      },
      {
        source: '/en/life-hacks/quick-breakfast-533',
        destination: '/en/life-hacks/quick-breakfast',
        permanent: true,
      },
      {
        source: '/es/life-hacks/quick-breakfast-533',
        destination: '/es/life-hacks/quick-breakfast',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/quick-breakfast-533',
        destination: '/fr/life-hacks/quick-breakfast',
        permanent: true,
      },
      {
        source: '/de/life-hacks/quick-breakfast-533',
        destination: '/de/life-hacks/quick-breakfast',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/quick-breakfast-533',
        destination: '/pt/life-hacks/quick-breakfast',
        permanent: true,
      },
      {
        source: '/en/life-hacks/relationship-communication-461',
        destination: '/en/life-hacks/relationship-communication',
        permanent: true,
      },
      {
        source: '/es/life-hacks/relationship-communication-461',
        destination: '/es/life-hacks/relationship-communication',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/relationship-communication-461',
        destination: '/fr/life-hacks/relationship-communication',
        permanent: true,
      },
      {
        source: '/de/life-hacks/relationship-communication-461',
        destination: '/de/life-hacks/relationship-communication',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/relationship-communication-461',
        destination: '/pt/life-hacks/relationship-communication',
        permanent: true,
      },
      {
        source: '/en/life-hacks/road-trip-prep-413',
        destination: '/en/life-hacks/road-trip-prep',
        permanent: true,
      },
      {
        source: '/es/life-hacks/road-trip-prep-413',
        destination: '/es/life-hacks/road-trip-prep',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/road-trip-prep-413',
        destination: '/fr/life-hacks/road-trip-prep',
        permanent: true,
      },
      {
        source: '/de/life-hacks/road-trip-prep-413',
        destination: '/de/life-hacks/road-trip-prep',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/road-trip-prep-413',
        destination: '/pt/life-hacks/road-trip-prep',
        permanent: true,
      },
      {
        source: '/en/diy/roller-tips-366',
        destination: '/en/diy/roller-tips',
        permanent: true,
      },
      {
        source: '/es/diy/roller-tips-366',
        destination: '/es/diy/roller-tips',
        permanent: true,
      },
      {
        source: '/fr/diy/roller-tips-366',
        destination: '/fr/diy/roller-tips',
        permanent: true,
      },
      {
        source: '/de/diy/roller-tips-366',
        destination: '/de/diy/roller-tips',
        permanent: true,
      },
      {
        source: '/pt/diy/roller-tips-366',
        destination: '/pt/diy/roller-tips',
        permanent: true,
      },
      {
        source: '/en/diy/sanding-basics-494',
        destination: '/en/diy/sanding-basics',
        permanent: true,
      },
      {
        source: '/es/diy/sanding-basics-494',
        destination: '/es/diy/sanding-basics',
        permanent: true,
      },
      {
        source: '/fr/diy/sanding-basics-494',
        destination: '/fr/diy/sanding-basics',
        permanent: true,
      },
      {
        source: '/de/diy/sanding-basics-494',
        destination: '/de/diy/sanding-basics',
        permanent: true,
      },
      {
        source: '/pt/diy/sanding-basics-494',
        destination: '/pt/diy/sanding-basics',
        permanent: true,
      },
      {
        source: '/en/diy/screen-door-repair-462',
        destination: '/en/diy/screen-door-repair',
        permanent: true,
      },
      {
        source: '/es/diy/screen-door-repair-462',
        destination: '/es/diy/screen-door-repair',
        permanent: true,
      },
      {
        source: '/fr/diy/screen-door-repair-462',
        destination: '/fr/diy/screen-door-repair',
        permanent: true,
      },
      {
        source: '/de/diy/screen-door-repair-462',
        destination: '/de/diy/screen-door-repair',
        permanent: true,
      },
      {
        source: '/pt/diy/screen-door-repair-462',
        destination: '/pt/diy/screen-door-repair',
        permanent: true,
      },
      {
        source: '/en/life-hacks/screen-time-rules-509',
        destination: '/en/life-hacks/screen-time-rules',
        permanent: true,
      },
      {
        source: '/es/life-hacks/screen-time-rules-509',
        destination: '/es/life-hacks/screen-time-rules',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/screen-time-rules-509',
        destination: '/fr/life-hacks/screen-time-rules',
        permanent: true,
      },
      {
        source: '/de/life-hacks/screen-time-rules-509',
        destination: '/de/life-hacks/screen-time-rules',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/screen-time-rules-509',
        destination: '/pt/life-hacks/screen-time-rules',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/seed-starting-588',
        destination: '/en/home-and-garden/seed-starting',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/seed-starting-588',
        destination: '/es/home-and-garden/seed-starting',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/seed-starting-588',
        destination: '/fr/home-and-garden/seed-starting',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/seed-starting-588',
        destination: '/de/home-and-garden/seed-starting',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/seed-starting-588',
        destination: '/pt/home-and-garden/seed-starting',
        permanent: true,
      },
      {
        source: '/en/diy/shelf-build-534',
        destination: '/en/diy/shelf-build',
        permanent: true,
      },
      {
        source: '/es/diy/shelf-build-534',
        destination: '/es/diy/shelf-build',
        permanent: true,
      },
      {
        source: '/fr/diy/shelf-build-534',
        destination: '/fr/diy/shelf-build',
        permanent: true,
      },
      {
        source: '/de/diy/shelf-build-534',
        destination: '/de/diy/shelf-build',
        permanent: true,
      },
      {
        source: '/pt/diy/shelf-build-534',
        destination: '/pt/diy/shelf-build',
        permanent: true,
      },
      {
        source: '/en/beauty/skincare-routine-order-223',
        destination: '/en/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/es/beauty/skincare-routine-order-223',
        destination: '/es/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/fr/beauty/skincare-routine-order-223',
        destination: '/fr/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/de/beauty/skincare-routine-order-223',
        destination: '/de/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/pt/beauty/skincare-routine-order-223',
        destination: '/pt/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/en/beauty/skincare-routine-order-439',
        destination: '/en/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/es/beauty/skincare-routine-order-439',
        destination: '/es/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/fr/beauty/skincare-routine-order-439',
        destination: '/fr/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/de/beauty/skincare-routine-order-439',
        destination: '/de/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/pt/beauty/skincare-routine-order-439',
        destination: '/pt/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/en/beauty/sleep-and-skin-415',
        destination: '/en/beauty/sleep-and-skin',
        permanent: true,
      },
      {
        source: '/es/beauty/sleep-and-skin-415',
        destination: '/es/beauty/sleep-and-skin',
        permanent: true,
      },
      {
        source: '/fr/beauty/sleep-and-skin-415',
        destination: '/fr/beauty/sleep-and-skin',
        permanent: true,
      },
      {
        source: '/de/beauty/sleep-and-skin-415',
        destination: '/de/beauty/sleep-and-skin',
        permanent: true,
      },
      {
        source: '/pt/beauty/sleep-and-skin-415',
        destination: '/pt/beauty/sleep-and-skin',
        permanent: true,
      },
      {
        source: '/en/health/sleep-quality-tips-594',
        destination: '/en/health/sleep-quality-tips',
        permanent: true,
      },
      {
        source: '/es/health/sleep-quality-tips-594',
        destination: '/es/health/sleep-quality-tips',
        permanent: true,
      },
      {
        source: '/fr/health/sleep-quality-tips-594',
        destination: '/fr/health/sleep-quality-tips',
        permanent: true,
      },
      {
        source: '/de/health/sleep-quality-tips-594',
        destination: '/de/health/sleep-quality-tips',
        permanent: true,
      },
      {
        source: '/pt/health/sleep-quality-tips-594',
        destination: '/pt/health/sleep-quality-tips',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/small-space-organization-476',
        destination: '/en/home-and-garden/small-space-organization',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/small-space-organization-476',
        destination: '/es/home-and-garden/small-space-organization',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/small-space-organization-476',
        destination: '/fr/home-and-garden/small-space-organization',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/small-space-organization-476',
        destination: '/de/home-and-garden/small-space-organization',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/small-space-organization-476',
        destination: '/pt/home-and-garden/small-space-organization',
        permanent: true,
      },
      {
        source: '/en/beauty/split-end-tips-327',
        destination: '/en/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/split-end-tips-327',
        destination: '/es/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/split-end-tips-327',
        destination: '/fr/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/split-end-tips-327',
        destination: '/de/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/split-end-tips-327',
        destination: '/pt/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/en/beauty/split-end-tips-543',
        destination: '/en/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/es/beauty/split-end-tips-543',
        destination: '/es/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/fr/beauty/split-end-tips-543',
        destination: '/fr/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/de/beauty/split-end-tips-543',
        destination: '/de/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/pt/beauty/split-end-tips-543',
        destination: '/pt/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/en/diy/stain-and-seal-502',
        destination: '/en/diy/stain-and-seal',
        permanent: true,
      },
      {
        source: '/es/diy/stain-and-seal-502',
        destination: '/es/diy/stain-and-seal',
        permanent: true,
      },
      {
        source: '/fr/diy/stain-and-seal-502',
        destination: '/fr/diy/stain-and-seal',
        permanent: true,
      },
      {
        source: '/de/diy/stain-and-seal-502',
        destination: '/de/diy/stain-and-seal',
        permanent: true,
      },
      {
        source: '/pt/diy/stain-and-seal-502',
        destination: '/pt/diy/stain-and-seal',
        permanent: true,
      },
      {
        source: '/en/diy/sticky-door-454',
        destination: '/en/diy/sticky-door',
        permanent: true,
      },
      {
        source: '/es/diy/sticky-door-454',
        destination: '/es/diy/sticky-door',
        permanent: true,
      },
      {
        source: '/fr/diy/sticky-door-454',
        destination: '/fr/diy/sticky-door',
        permanent: true,
      },
      {
        source: '/de/diy/sticky-door-454',
        destination: '/de/diy/sticky-door',
        permanent: true,
      },
      {
        source: '/pt/diy/sticky-door-454',
        destination: '/pt/diy/sticky-door',
        permanent: true,
      },
      {
        source: '/en/beauty/stress-and-skin-431',
        destination: '/en/beauty/stress-and-skin',
        permanent: true,
      },
      {
        source: '/es/beauty/stress-and-skin-431',
        destination: '/es/beauty/stress-and-skin',
        permanent: true,
      },
      {
        source: '/fr/beauty/stress-and-skin-431',
        destination: '/fr/beauty/stress-and-skin',
        permanent: true,
      },
      {
        source: '/de/beauty/stress-and-skin-431',
        destination: '/de/beauty/stress-and-skin',
        permanent: true,
      },
      {
        source: '/pt/beauty/stress-and-skin-431',
        destination: '/pt/beauty/stress-and-skin',
        permanent: true,
      },
      {
        source: '/en/life-hacks/subscription-audit-365',
        destination: '/en/life-hacks/subscription-audit',
        permanent: true,
      },
      {
        source: '/es/life-hacks/subscription-audit-365',
        destination: '/es/life-hacks/subscription-audit',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/subscription-audit-365',
        destination: '/fr/life-hacks/subscription-audit',
        permanent: true,
      },
      {
        source: '/de/life-hacks/subscription-audit-365',
        destination: '/de/life-hacks/subscription-audit',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/subscription-audit-365',
        destination: '/pt/life-hacks/subscription-audit',
        permanent: true,
      },
      {
        source: '/en/beauty/sunscreen-daily-255',
        destination: '/en/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/es/beauty/sunscreen-daily-255',
        destination: '/es/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/fr/beauty/sunscreen-daily-255',
        destination: '/fr/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/de/beauty/sunscreen-daily-255',
        destination: '/de/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/pt/beauty/sunscreen-daily-255',
        destination: '/pt/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/en/beauty/sunscreen-daily-471',
        destination: '/en/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/es/beauty/sunscreen-daily-471',
        destination: '/es/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/fr/beauty/sunscreen-daily-471',
        destination: '/fr/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/de/beauty/sunscreen-daily-471',
        destination: '/de/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/pt/beauty/sunscreen-daily-471',
        destination: '/pt/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-152',
        destination: '/en/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-152',
        destination: '/es/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-152',
        destination: '/fr/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-152',
        destination: '/de/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-152',
        destination: '/pt/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-280',
        destination: '/en/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-280',
        destination: '/es/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-280',
        destination: '/fr/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-280',
        destination: '/de/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-280',
        destination: '/pt/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-408',
        destination: '/en/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-408',
        destination: '/es/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-408',
        destination: '/fr/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-408',
        destination: '/de/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-408',
        destination: '/pt/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/en/viral-stories/surprising-fact-about-sleep-536',
        destination: '/en/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/es/viral-stories/surprising-fact-about-sleep-536',
        destination: '/es/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/surprising-fact-about-sleep-536',
        destination: '/fr/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/de/viral-stories/surprising-fact-about-sleep-536',
        destination: '/de/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/surprising-fact-about-sleep-536',
        destination: '/pt/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/en/life-hacks/tech-declutter-421',
        destination: '/en/life-hacks/tech-declutter',
        permanent: true,
      },
      {
        source: '/es/life-hacks/tech-declutter-421',
        destination: '/es/life-hacks/tech-declutter',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/tech-declutter-421',
        destination: '/fr/life-hacks/tech-declutter',
        permanent: true,
      },
      {
        source: '/de/life-hacks/tech-declutter-421',
        destination: '/de/life-hacks/tech-declutter',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/tech-declutter-421',
        destination: '/pt/life-hacks/tech-declutter',
        permanent: true,
      },
      {
        source: '/en/life-hacks/thank-you-notes-485',
        destination: '/en/life-hacks/thank-you-notes',
        permanent: true,
      },
      {
        source: '/es/life-hacks/thank-you-notes-485',
        destination: '/es/life-hacks/thank-you-notes',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/thank-you-notes-485',
        destination: '/fr/life-hacks/thank-you-notes',
        permanent: true,
      },
      {
        source: '/de/life-hacks/thank-you-notes-485',
        destination: '/de/life-hacks/thank-you-notes',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/thank-you-notes-485',
        destination: '/pt/life-hacks/thank-you-notes',
        permanent: true,
      },
      {
        source: '/en/life-hacks/time-blocking-301',
        destination: '/en/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/es/life-hacks/time-blocking-301',
        destination: '/es/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/time-blocking-301',
        destination: '/fr/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/de/life-hacks/time-blocking-301',
        destination: '/de/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/time-blocking-301',
        destination: '/pt/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/en/life-hacks/time-blocking-581',
        destination: '/en/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/es/life-hacks/time-blocking-581',
        destination: '/es/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/time-blocking-581',
        destination: '/fr/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/de/life-hacks/time-blocking-581',
        destination: '/de/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/time-blocking-581',
        destination: '/pt/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-184',
        destination: '/en/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-184',
        destination: '/es/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-184',
        destination: '/fr/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-184',
        destination: '/de/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-184',
        destination: '/pt/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-312',
        destination: '/en/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-312',
        destination: '/es/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-312',
        destination: '/fr/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-312',
        destination: '/de/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-312',
        destination: '/pt/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-440',
        destination: '/en/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-440',
        destination: '/es/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-440',
        destination: '/fr/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-440',
        destination: '/de/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-440',
        destination: '/pt/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/en/viral-stories/tiny-home-story-568',
        destination: '/en/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/es/viral-stories/tiny-home-story-568',
        destination: '/es/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/tiny-home-story-568',
        destination: '/fr/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/de/viral-stories/tiny-home-story-568',
        destination: '/de/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/tiny-home-story-568',
        destination: '/pt/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/en/life-hacks/to-do-list-that-works-309',
        destination: '/en/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/es/life-hacks/to-do-list-that-works-309',
        destination: '/es/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/to-do-list-that-works-309',
        destination: '/fr/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/de/life-hacks/to-do-list-that-works-309',
        destination: '/de/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/to-do-list-that-works-309',
        destination: '/pt/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/en/life-hacks/to-do-list-that-works-589',
        destination: '/en/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/es/life-hacks/to-do-list-that-works-589',
        destination: '/es/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/to-do-list-that-works-589',
        destination: '/fr/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/de/life-hacks/to-do-list-that-works-589',
        destination: '/de/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/to-do-list-that-works-589',
        destination: '/pt/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/en/diy/toilet-running-fix-382',
        destination: '/en/diy/toilet-running-fix',
        permanent: true,
      },
      {
        source: '/es/diy/toilet-running-fix-382',
        destination: '/es/diy/toilet-running-fix',
        permanent: true,
      },
      {
        source: '/fr/diy/toilet-running-fix-382',
        destination: '/fr/diy/toilet-running-fix',
        permanent: true,
      },
      {
        source: '/de/diy/toilet-running-fix-382',
        destination: '/de/diy/toilet-running-fix',
        permanent: true,
      },
      {
        source: '/pt/diy/toilet-running-fix-382',
        destination: '/pt/diy/toilet-running-fix',
        permanent: true,
      },
      {
        source: '/en/life-hacks/travel-documents-397',
        destination: '/en/life-hacks/travel-documents',
        permanent: true,
      },
      {
        source: '/es/life-hacks/travel-documents-397',
        destination: '/es/life-hacks/travel-documents',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/travel-documents-397',
        destination: '/fr/life-hacks/travel-documents',
        permanent: true,
      },
      {
        source: '/de/life-hacks/travel-documents-397',
        destination: '/de/life-hacks/travel-documents',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/travel-documents-397',
        destination: '/pt/life-hacks/travel-documents',
        permanent: true,
      },
      {
        source: '/en/life-hacks/travel-hacks-381',
        destination: '/en/life-hacks/travel-hacks',
        permanent: true,
      },
      {
        source: '/es/life-hacks/travel-hacks-381',
        destination: '/es/life-hacks/travel-hacks',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/travel-hacks-381',
        destination: '/fr/life-hacks/travel-hacks',
        permanent: true,
      },
      {
        source: '/de/life-hacks/travel-hacks-381',
        destination: '/de/life-hacks/travel-hacks',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/travel-hacks-381',
        destination: '/pt/life-hacks/travel-hacks',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained-256',
        destination: '/en/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained-256',
        destination: '/es/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained-256',
        destination: '/fr/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained-256',
        destination: '/de/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained-256',
        destination: '/pt/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained-384',
        destination: '/en/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained-384',
        destination: '/es/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained-384',
        destination: '/fr/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained-384',
        destination: '/de/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained-384',
        destination: '/pt/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/en/viral-stories/trend-explained-512',
        destination: '/en/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/es/viral-stories/trend-explained-512',
        destination: '/es/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/trend-explained-512',
        destination: '/fr/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/de/viral-stories/trend-explained-512',
        destination: '/de/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/trend-explained-512',
        destination: '/pt/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/en/life-hacks/two-factor-auth-445',
        destination: '/en/life-hacks/two-factor-auth',
        permanent: true,
      },
      {
        source: '/es/life-hacks/two-factor-auth-445',
        destination: '/es/life-hacks/two-factor-auth',
        permanent: true,
      },
      {
        source: '/fr/life-hacks/two-factor-auth-445',
        destination: '/fr/life-hacks/two-factor-auth',
        permanent: true,
      },
      {
        source: '/de/life-hacks/two-factor-auth-445',
        destination: '/de/life-hacks/two-factor-auth',
        permanent: true,
      },
      {
        source: '/pt/life-hacks/two-factor-auth-445',
        destination: '/pt/life-hacks/two-factor-auth',
        permanent: true,
      },
      {
        source: '/en/diy/unclog-drain-390',
        destination: '/en/diy/unclog-drain',
        permanent: true,
      },
      {
        source: '/es/diy/unclog-drain-390',
        destination: '/es/diy/unclog-drain',
        permanent: true,
      },
      {
        source: '/fr/diy/unclog-drain-390',
        destination: '/fr/diy/unclog-drain',
        permanent: true,
      },
      {
        source: '/de/diy/unclog-drain-390',
        destination: '/de/diy/unclog-drain',
        permanent: true,
      },
      {
        source: '/pt/diy/unclog-drain-390',
        destination: '/pt/diy/unclog-drain',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/under-bed-storage-500',
        destination: '/en/home-and-garden/under-bed-storage',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/under-bed-storage-500',
        destination: '/es/home-and-garden/under-bed-storage',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/under-bed-storage-500',
        destination: '/fr/home-and-garden/under-bed-storage',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/under-bed-storage-500',
        destination: '/de/home-and-garden/under-bed-storage',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/under-bed-storage-500',
        destination: '/pt/home-and-garden/under-bed-storage',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-144',
        destination: '/en/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-144',
        destination: '/es/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-144',
        destination: '/fr/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-144',
        destination: '/de/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-144',
        destination: '/pt/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-272',
        destination: '/en/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-272',
        destination: '/es/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-272',
        destination: '/fr/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-272',
        destination: '/de/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-272',
        destination: '/pt/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-400',
        destination: '/en/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-400',
        destination: '/es/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-400',
        destination: '/fr/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-400',
        destination: '/de/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-400',
        destination: '/pt/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unexpected-life-hack-528',
        destination: '/en/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unexpected-life-hack-528',
        destination: '/es/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unexpected-life-hack-528',
        destination: '/fr/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unexpected-life-hack-528',
        destination: '/de/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unexpected-life-hack-528',
        destination: '/pt/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unusual-home-feature-232',
        destination: '/en/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unusual-home-feature-232',
        destination: '/es/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unusual-home-feature-232',
        destination: '/fr/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unusual-home-feature-232',
        destination: '/de/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unusual-home-feature-232',
        destination: '/pt/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unusual-home-feature-360',
        destination: '/en/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unusual-home-feature-360',
        destination: '/es/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unusual-home-feature-360',
        destination: '/fr/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unusual-home-feature-360',
        destination: '/de/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unusual-home-feature-360',
        destination: '/pt/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/en/viral-stories/unusual-home-feature-488',
        destination: '/en/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/es/viral-stories/unusual-home-feature-488',
        destination: '/es/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/unusual-home-feature-488',
        destination: '/fr/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/de/viral-stories/unusual-home-feature-488',
        destination: '/de/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/unusual-home-feature-488',
        destination: '/pt/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/en/diy/upcycle-furniture-518',
        destination: '/en/diy/upcycle-furniture',
        permanent: true,
      },
      {
        source: '/es/diy/upcycle-furniture-518',
        destination: '/es/diy/upcycle-furniture',
        permanent: true,
      },
      {
        source: '/fr/diy/upcycle-furniture-518',
        destination: '/fr/diy/upcycle-furniture',
        permanent: true,
      },
      {
        source: '/de/diy/upcycle-furniture-518',
        destination: '/de/diy/upcycle-furniture',
        permanent: true,
      },
      {
        source: '/pt/diy/upcycle-furniture-518',
        destination: '/pt/diy/upcycle-furniture',
        permanent: true,
      },
      {
        source: '/en/diy/varnish-tips-510',
        destination: '/en/diy/varnish-tips',
        permanent: true,
      },
      {
        source: '/es/diy/varnish-tips-510',
        destination: '/es/diy/varnish-tips',
        permanent: true,
      },
      {
        source: '/fr/diy/varnish-tips-510',
        destination: '/fr/diy/varnish-tips',
        permanent: true,
      },
      {
        source: '/de/diy/varnish-tips-510',
        destination: '/de/diy/varnish-tips',
        permanent: true,
      },
      {
        source: '/pt/diy/varnish-tips-510',
        destination: '/pt/diy/varnish-tips',
        permanent: true,
      },
      {
        source: '/en/cleaning/vinegar-and-baking-soda-combos-545',
        destination: '/en/cleaning/vinegar-and-baking-soda-combos',
        permanent: true,
      },
      {
        source: '/es/cleaning/vinegar-and-baking-soda-combos-545',
        destination: '/es/cleaning/vinegar-and-baking-soda-combos',
        permanent: true,
      },
      {
        source: '/fr/cleaning/vinegar-and-baking-soda-combos-545',
        destination: '/fr/cleaning/vinegar-and-baking-soda-combos',
        permanent: true,
      },
      {
        source: '/de/cleaning/vinegar-and-baking-soda-combos-545',
        destination: '/de/cleaning/vinegar-and-baking-soda-combos',
        permanent: true,
      },
      {
        source: '/pt/cleaning/vinegar-and-baking-soda-combos-545',
        destination: '/pt/cleaning/vinegar-and-baking-soda-combos',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin-248',
        destination: '/en/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin-248',
        destination: '/es/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin-248',
        destination: '/fr/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin-248',
        destination: '/de/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin-248',
        destination: '/pt/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin-376',
        destination: '/en/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin-376',
        destination: '/es/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin-376',
        destination: '/fr/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin-376',
        destination: '/de/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin-376',
        destination: '/pt/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/en/viral-stories/viral-recipe-origin-504',
        destination: '/en/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/es/viral-stories/viral-recipe-origin-504',
        destination: '/es/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/fr/viral-stories/viral-recipe-origin-504',
        destination: '/fr/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/de/viral-stories/viral-recipe-origin-504',
        destination: '/de/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/pt/viral-stories/viral-recipe-origin-504',
        destination: '/pt/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/en/diy/water-heater-basics-406',
        destination: '/en/diy/water-heater-basics',
        permanent: true,
      },
      {
        source: '/es/diy/water-heater-basics-406',
        destination: '/es/diy/water-heater-basics',
        permanent: true,
      },
      {
        source: '/fr/diy/water-heater-basics-406',
        destination: '/fr/diy/water-heater-basics',
        permanent: true,
      },
      {
        source: '/de/diy/water-heater-basics-406',
        destination: '/de/diy/water-heater-basics',
        permanent: true,
      },
      {
        source: '/pt/diy/water-heater-basics-406',
        destination: '/pt/diy/water-heater-basics',
        permanent: true,
      },
      {
        source: '/en/home-and-garden/watering-tips-564',
        destination: '/en/home-and-garden/watering-tips',
        permanent: true,
      },
      {
        source: '/es/home-and-garden/watering-tips-564',
        destination: '/es/home-and-garden/watering-tips',
        permanent: true,
      },
      {
        source: '/fr/home-and-garden/watering-tips-564',
        destination: '/fr/home-and-garden/watering-tips',
        permanent: true,
      },
      {
        source: '/de/home-and-garden/watering-tips-564',
        destination: '/de/home-and-garden/watering-tips',
        permanent: true,
      },
      {
        source: '/pt/home-and-garden/watering-tips-564',
        destination: '/pt/home-and-garden/watering-tips',
        permanent: true,
      },
      {
        source: '/en/diy/weather-stripping-478',
        destination: '/en/diy/weather-stripping',
        permanent: true,
      },
      {
        source: '/es/diy/weather-stripping-478',
        destination: '/es/diy/weather-stripping',
        permanent: true,
      },
      {
        source: '/fr/diy/weather-stripping-478',
        destination: '/fr/diy/weather-stripping',
        permanent: true,
      },
      {
        source: '/de/diy/weather-stripping-478',
        destination: '/de/diy/weather-stripping',
        permanent: true,
      },
      {
        source: '/pt/diy/weather-stripping-478',
        destination: '/pt/diy/weather-stripping',
        permanent: true,
      },
      {
        source: '/en/beauty/wellness-and-skin-407',
        destination: '/en/beauty/wellness-and-skin',
        permanent: true,
      },
      {
        source: '/es/beauty/wellness-and-skin-407',
        destination: '/es/beauty/wellness-and-skin',
        permanent: true,
      },
      {
        source: '/fr/beauty/wellness-and-skin-407',
        destination: '/fr/beauty/wellness-and-skin',
        permanent: true,
      },
      {
        source: '/de/beauty/wellness-and-skin-407',
        destination: '/de/beauty/wellness-and-skin',
        permanent: true,
      },
      {
        source: '/pt/beauty/wellness-and-skin-407',
        destination: '/pt/beauty/wellness-and-skin',
        permanent: true,
      },
      {
        source: '/en/diy/window-seal-470',
        destination: '/en/diy/window-seal',
        permanent: true,
      },
      {
        source: '/es/diy/window-seal-470',
        destination: '/es/diy/window-seal',
        permanent: true,
      },
      {
        source: '/fr/diy/window-seal-470',
        destination: '/fr/diy/window-seal',
        permanent: true,
      },
      {
        source: '/de/diy/window-seal-470',
        destination: '/de/diy/window-seal',
        permanent: true,
      },
      {
        source: '/pt/diy/window-seal-470',
        destination: '/pt/diy/window-seal',
        permanent: true,
      },
      {
        source: '/en/diy/wood-fill-486',
        destination: '/en/diy/wood-fill',
        permanent: true,
      },
      {
        source: '/es/diy/wood-fill-486',
        destination: '/es/diy/wood-fill',
        permanent: true,
      },
      {
        source: '/fr/diy/wood-fill-486',
        destination: '/fr/diy/wood-fill',
        permanent: true,
      },
      {
        source: '/de/diy/wood-fill-486',
        destination: '/de/diy/wood-fill',
        permanent: true,
      },
      {
        source: '/pt/diy/wood-fill-486',
        destination: '/pt/diy/wood-fill',
        permanent: true,
      },
      {
        source: '/en/diy/wreath-making-574',
        destination: '/en/diy/wreath-making',
        permanent: true,
      },
      {
        source: '/es/diy/wreath-making-574',
        destination: '/es/diy/wreath-making',
        permanent: true,
      },
      {
        source: '/fr/diy/wreath-making-574',
        destination: '/fr/diy/wreath-making',
        permanent: true,
      },
      {
        source: '/de/diy/wreath-making-574',
        destination: '/de/diy/wreath-making',
        permanent: true,
      },
      {
        source: '/pt/diy/wreath-making-574',
        destination: '/pt/diy/wreath-making',
        permanent: true,
      },

    ];
  },
};

export default withNextIntl(nextConfig);

