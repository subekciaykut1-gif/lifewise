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
        source: '/:category((?!api|images|en|es|fr|de|pt).+)/:slug',
        destination: '/en/:category/:slug',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'wisetips.co' }],
        destination: 'https://www.wisetips.co/:path*',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story',
        destination: '/:locale/viral-stories/dog-walks-home',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-160',
        destination: '/:locale/viral-stories/cat-saves-owner',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-288',
        destination: '/:locale/viral-stories/parrot-calls-911',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-416',
        destination: '/:locale/viral-stories/horse-remembers-owner',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-544',
        destination: '/:locale/viral-stories/dog-adopts-kitten',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after',
        destination: '/:locale/viral-stories/bathroom-reno-200',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-168',
        destination: '/:locale/viral-stories/shed-to-office',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-296',
        destination: '/:locale/viral-stories/kitchen-flip-thrift',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-424',
        destination: '/:locale/viral-stories/backyard-makeover-free',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-552',
        destination: '/:locale/viral-stories/closet-to-bedroom',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story',
        destination: '/:locale/viral-stories/neighbors-rebuild-porch',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-208',
        destination: '/:locale/viral-stories/town-saves-bookshop',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-336',
        destination: '/:locale/viral-stories/strangers-pay-layaway',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-464',
        destination: '/:locale/viral-stories/community-garden-crime',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-592',
        destination: '/:locale/viral-stories/teacher-lunch-debt',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story',
        destination: '/:locale/viral-stories/cashier-pays-groceries',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story-216',
        destination: '/:locale/viral-stories/mechanic-fixes-free',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story-344',
        destination: '/:locale/viral-stories/airline-kindness',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story-472',
        destination: '/:locale/viral-stories/stranger-tuition',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack',
        destination: '/:locale/viral-stories/ice-cube-tray-uses',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-144',
        destination: '/:locale/viral-stories/bread-clip-uses',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-272',
        destination: '/:locale/viral-stories/rubber-band-jar-trick',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-400',
        destination: '/:locale/viral-stories/pool-noodle-garage',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-528',
        destination: '/:locale/viral-stories/binder-clip-hacks',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained',
        destination: '/:locale/viral-stories/bed-rotting-trend',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained-256',
        destination: '/:locale/viral-stories/quiet-quitting-real',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained-384',
        destination: '/:locale/viral-stories/raw-water-trend',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained-512',
        destination: '/:locale/viral-stories/dopamine-menu-explained',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success',
        destination: '/:locale/viral-stories/first-diy-tile-floor',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-200',
        destination: '/:locale/viral-stories/shed-built-weekend',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-328',
        destination: '/:locale/viral-stories/painted-kitchen-cabinets',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-456',
        destination: '/:locale/viral-stories/concrete-countertops-diy',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-584',
        destination: '/:locale/viral-stories/fence-built-alone',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation',
        destination: '/:locale/viral-stories/rental-no-damage-makeover',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-136',
        destination: '/:locale/viral-stories/dark-room-bright',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-264',
        destination: '/:locale/viral-stories/garage-into-studio',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-392',
        destination: '/:locale/viral-stories/hoarder-room-clear',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-520',
        destination: '/:locale/viral-stories/outdated-kitchen-paint',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover',
        destination: '/:locale/viral-stories/living-room-500',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-192',
        destination: '/:locale/viral-stories/bedroom-thrift-flip',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-320',
        destination: '/:locale/viral-stories/bathroom-peel-stick',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-448',
        destination: '/:locale/viral-stories/home-office-free',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-576',
        destination: '/:locale/viral-stories/kitchen-on-benefits',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge',
        destination: '/:locale/viral-stories/learned-to-cook-at-60',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge-224',
        destination: '/:locale/viral-stories/fear-of-driving-overcome',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge-352',
        destination: '/:locale/viral-stories/debt-free-two-years',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge-480',
        destination: '/:locale/viral-stories/learned-language-at-70',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey',
        destination: '/:locale/viral-stories/sold-everything-traveled',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-176',
        destination: '/:locale/viral-stories/100-items-only',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-304',
        destination: '/:locale/viral-stories/tiny-closet-capsule',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-432',
        destination: '/:locale/viral-stories/declutter-5-years-ago',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-560',
        destination: '/:locale/viral-stories/minimal-with-kids',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep',
        destination: '/:locale/viral-stories/sleep-position-health',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-152',
        destination: '/:locale/viral-stories/nap-length-matters',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-280',
        destination: '/:locale/viral-stories/sleep-debt-real',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-408',
        destination: '/:locale/viral-stories/phone-before-bed-effects',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-536',
        destination: '/:locale/viral-stories/chronotype-quiz',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin',
        destination: '/:locale/viral-stories/butter-board-origin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin-248',
        destination: '/:locale/viral-stories/pasta-chips-tiktok',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin-376',
        destination: '/:locale/viral-stories/cloud-bread-explained',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin-504',
        destination: '/:locale/viral-stories/baked-feta-pasta-origin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story',
        destination: '/:locale/viral-stories/28sqm-family-of-four',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-184',
        destination: '/:locale/viral-stories/bus-conversion-home',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-312',
        destination: '/:locale/viral-stories/shipping-container-house',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-440',
        destination: '/:locale/viral-stories/cabin-built-alone',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-568',
        destination: '/:locale/viral-stories/tiny-house-with-baby',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-160',
        destination: '/:locale/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-288',
        destination: '/:locale/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-416',
        destination: '/:locale/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/amazing-animal-story-544',
        destination: '/:locale/viral-stories/amazing-animal-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/anti-aging-tips-263',
        destination: '/:locale/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/anti-aging-tips-479',
        destination: '/:locale/beauty/anti-aging-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/appliance-deep-clean-585',
        destination: '/:locale/cleaning/appliance-deep-clean',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/backup-data-453',
        destination: '/:locale/life-hacks/backup-data',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/basic-tool-kit-302',
        destination: '/:locale/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/basic-tool-kit-598',
        destination: '/:locale/diy/basic-tool-kit',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/food/batch-cooking-basics-587',
        destination: '/:locale/food/batch-cooking-basics',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/bathroom-storage-524',
        destination: '/:locale/home-and-garden/bathroom-storage',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-168',
        destination: '/:locale/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-296',
        destination: '/:locale/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-424',
        destination: '/:locale/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/before-and-after-552',
        destination: '/:locale/viral-stories/before-and-after',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-192',
        destination: '/:locale/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-320',
        destination: '/:locale/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-448',
        destination: '/:locale/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/budget-makeover-576',
        destination: '/:locale/viral-stories/budget-makeover',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/budget-tracking-357',
        destination: '/:locale/life-hacks/budget-tracking',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/calendar-tips-325',
        destination: '/:locale/life-hacks/calendar-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/card-making-590',
        destination: '/:locale/diy/card-making',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/caulking-gaps-342',
        destination: '/:locale/diy/caulking-gaps',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/ceiling-fan-install-438',
        destination: '/:locale/diy/ceiling-fan-install',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/closet-organization-484',
        destination: '/:locale/home-and-garden/closet-organization',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-208',
        destination: '/:locale/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-336',
        destination: '/:locale/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-464',
        destination: '/:locale/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/community-story-592',
        destination: '/:locale/viral-stories/community-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/compost-for-garden-580',
        destination: '/:locale/home-and-garden/compost-for-garden',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/concealer-tips-351',
        destination: '/:locale/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/concealer-tips-567',
        destination: '/:locale/beauty/concealer-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/conditioner-tips-303',
        destination: '/:locale/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/conditioner-tips-519',
        destination: '/:locale/beauty/conditioner-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/container-gardening-548',
        destination: '/:locale/home-and-garden/container-gardening',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/craft-storage-558',
        destination: '/:locale/diy/craft-storage',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/creative-solution-240',
        destination: '/:locale/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/creative-solution-368',
        destination: '/:locale/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/creative-solution-496',
        destination: '/:locale/viral-stories/creative-solution',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/cuticle-care-383',
        destination: '/:locale/beauty/cuticle-care',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/desk-build-542',
        destination: '/:locale/diy/desk-build',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/diet-and-glow-423',
        destination: '/:locale/beauty/diet-and-glow',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/dinner-when-busy-549',
        destination: '/:locale/life-hacks/dinner-when-busy',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-200',
        destination: '/:locale/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-328',
        destination: '/:locale/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-456',
        destination: '/:locale/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/diy-success-584',
        destination: '/:locale/viral-stories/diy-success',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/door-hinge-fix-446',
        destination: '/:locale/diy/door-hinge-fix',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/drawer-dividers-492',
        destination: '/:locale/home-and-garden/drawer-dividers',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/dry-skin-fix-239',
        destination: '/:locale/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/dry-skin-fix-455',
        destination: '/:locale/beauty/dry-skin-fix',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/drywall-patch-334',
        destination: '/:locale/diy/drywall-patch',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/eco-friendly-dish-soap-593',
        destination: '/:locale/cleaning/eco-friendly-dish-soap',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/email-inbox-zero-317',
        destination: '/:locale/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/email-inbox-zero-597',
        destination: '/:locale/life-hacks/email-inbox-zero',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/entryway-organization-508',
        destination: '/:locale/home-and-garden/entryway-organization',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/evening-routine-293',
        destination: '/:locale/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/evening-routine-573',
        destination: '/:locale/life-hacks/evening-routine',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/eye-cream-use-271',
        destination: '/:locale/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/eye-cream-use-487',
        destination: '/:locale/beauty/eye-cream-use',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/eyebrow-shape-359',
        destination: '/:locale/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/eyebrow-shape-575',
        destination: '/:locale/beauty/eyebrow-shape',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/faucet-drip-fix-374',
        destination: '/:locale/diy/faucet-drip-fix',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/fixing-wobbly-chair-326',
        destination: '/:locale/diy/fixing-wobbly-chair',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/focus-and-distraction-341',
        destination: '/:locale/life-hacks/focus-and-distraction',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/foundation-match-343',
        destination: '/:locale/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/foundation-match-559',
        destination: '/:locale/beauty/foundation-match',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/food/freezer-meal-ideas-595',
        destination: '/:locale/food/freezer-meal-ideas',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/furniture-assembly-318',
        destination: '/:locale/diy/furniture-assembly',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/garage-organization-532',
        destination: '/:locale/home-and-garden/garage-organization',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/garden-planning-540',
        destination: '/:locale/home-and-garden/garden-planning',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/gift-ideas-477',
        destination: '/:locale/life-hacks/gift-ideas',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/gift-wrapping-582',
        destination: '/:locale/diy/gift-wrapping',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/grocery-list-app-557',
        destination: '/:locale/life-hacks/grocery-list-app',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/hair-mask-319',
        destination: '/:locale/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/hair-mask-535',
        destination: '/:locale/beauty/hair-mask',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/hair-washing-right-295',
        destination: '/:locale/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/hair-washing-right-511',
        destination: '/:locale/beauty/hair-washing-right',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/hand-care-287',
        destination: '/:locale/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/hand-care-503',
        destination: '/:locale/beauty/hand-care',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/hanging-pictures-straight-310',
        destination: '/:locale/diy/hanging-pictures-straight',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/headboard-diy-550',
        destination: '/:locale/diy/headboard-diy',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/heat-protectant-311',
        destination: '/:locale/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/heat-protectant-527',
        destination: '/:locale/beauty/heat-protectant',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/holiday-diy-decor-566',
        destination: '/:locale/diy/holiday-diy-decor',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/homework-help-517',
        destination: '/:locale/life-hacks/homework-help',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/hydrogen-peroxide-cleaning-uses-537',
        destination: '/:locale/cleaning/hydrogen-peroxide-cleaning-uses',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/indoor-plants-556',
        destination: '/:locale/home-and-garden/indoor-plants',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-136',
        destination: '/:locale/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-264',
        destination: '/:locale/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-392',
        destination: '/:locale/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/inspiring-home-transformation-520',
        destination: '/:locale/viral-stories/inspiring-home-transformation',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/jet-lag-tips-405',
        destination: '/:locale/life-hacks/jet-lag-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/kids-chores-501',
        destination: '/:locale/life-hacks/kids-chores',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story-216',
        destination: '/:locale/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story-344',
        destination: '/:locale/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/kindness-story-472',
        destination: '/:locale/viral-stories/kindness-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/kitchen-drawer-organizers-516',
        destination: '/:locale/home-and-garden/kitchen-drawer-organizers',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/kitchen-grease-removal-561',
        destination: '/:locale/cleaning/kitchen-grease-removal',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/laundry-stain-removal-569',
        destination: '/:locale/cleaning/laundry-stain-removal',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/led-bulb-upgrade-430',
        destination: '/:locale/diy/led-bulb-upgrade',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/light-switch-replace-414',
        destination: '/:locale/diy/light-switch-replace',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/lip-care-279',
        destination: '/:locale/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/lip-care-495',
        destination: '/:locale/beauty/lip-care',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/lunch-on-the-go-541',
        destination: '/:locale/life-hacks/lunch-on-the-go',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/manicure-at-home-399',
        destination: '/:locale/beauty/manicure-at-home',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/mascara-tips-367',
        destination: '/:locale/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/mascara-tips-583',
        destination: '/:locale/beauty/mascara-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/food/meal-prep-sunday-579',
        destination: '/:locale/food/meal-prep-sunday',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/meeting-efficiency-333',
        destination: '/:locale/life-hacks/meeting-efficiency',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-176',
        destination: '/:locale/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-304',
        destination: '/:locale/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-432',
        destination: '/:locale/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/minimalist-journey-560',
        destination: '/:locale/viral-stories/minimalist-journey',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/money-saving-daily-349',
        destination: '/:locale/life-hacks/money-saving-daily',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/health/morning-energy-boosters-586',
        destination: '/:locale/health/morning-energy-boosters',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/morning-productivity-routine-285',
        destination: '/:locale/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/morning-productivity-routine-565',
        destination: '/:locale/life-hacks/morning-productivity-routine',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/morning-rush-525',
        destination: '/:locale/life-hacks/morning-rush',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/nail-care-at-home-375',
        destination: '/:locale/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/nail-care-at-home-591',
        destination: '/:locale/beauty/nail-care-at-home',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/nail-strengthening-391',
        destination: '/:locale/beauty/nail-strengthening',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/natural-bathroom-cleaners-553',
        destination: '/:locale/cleaning/natural-bathroom-cleaners',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/natural-face-mask-231',
        destination: '/:locale/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/natural-face-mask-447',
        destination: '/:locale/beauty/natural-face-mask',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/natural-makeup-look-335',
        destination: '/:locale/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/natural-makeup-look-551',
        destination: '/:locale/beauty/natural-makeup-look',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/negotiate-bills-373',
        destination: '/:locale/life-hacks/negotiate-bills',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/oily-skin-balance-247',
        destination: '/:locale/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/oily-skin-balance-463',
        destination: '/:locale/beauty/oily-skin-balance',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/outdoor-furniture-cleaning-577',
        destination: '/:locale/cleaning/outdoor-furniture-cleaning',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/outlet-install-422',
        destination: '/:locale/diy/outlet-install',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge-224',
        destination: '/:locale/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge-352',
        destination: '/:locale/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/overcoming-challenge-480',
        destination: '/:locale/viral-stories/overcoming-challenge',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/packing-light-389',
        destination: '/:locale/life-hacks/packing-light',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/paint-a-room-350',
        destination: '/:locale/diy/paint-a-room',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/paint-brush-care-358',
        destination: '/:locale/diy/paint-brush-care',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/pallet-projects-526',
        destination: '/:locale/diy/pallet-projects',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/parenting-shortcuts-493',
        destination: '/:locale/life-hacks/parenting-shortcuts',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/password-manager-437',
        destination: '/:locale/life-hacks/password-manager',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/pest-control-natural-596',
        destination: '/:locale/home-and-garden/pest-control-natural',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/phone-storage-429',
        destination: '/:locale/life-hacks/phone-storage',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/pipe-insulation-398',
        destination: '/:locale/diy/pipe-insulation',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/pruning-basics-572',
        destination: '/:locale/home-and-garden/pruning-basics',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/quality-time-469',
        destination: '/:locale/life-hacks/quality-time',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/quick-breakfast-533',
        destination: '/:locale/life-hacks/quick-breakfast',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/relationship-communication-461',
        destination: '/:locale/life-hacks/relationship-communication',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/road-trip-prep-413',
        destination: '/:locale/life-hacks/road-trip-prep',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/roller-tips-366',
        destination: '/:locale/diy/roller-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/sanding-basics-494',
        destination: '/:locale/diy/sanding-basics',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/screen-door-repair-462',
        destination: '/:locale/diy/screen-door-repair',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/screen-time-rules-509',
        destination: '/:locale/life-hacks/screen-time-rules',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/seed-starting-588',
        destination: '/:locale/home-and-garden/seed-starting',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/shelf-build-534',
        destination: '/:locale/diy/shelf-build',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/skincare-routine-order-223',
        destination: '/:locale/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/skincare-routine-order-439',
        destination: '/:locale/beauty/skincare-routine-order',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/sleep-and-skin-415',
        destination: '/:locale/beauty/sleep-and-skin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/health/sleep-quality-tips-594',
        destination: '/:locale/health/sleep-quality-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/small-space-organization-476',
        destination: '/:locale/home-and-garden/small-space-organization',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/split-end-tips-327',
        destination: '/:locale/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/split-end-tips-543',
        destination: '/:locale/beauty/split-end-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/stain-and-seal-502',
        destination: '/:locale/diy/stain-and-seal',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/sticky-door-454',
        destination: '/:locale/diy/sticky-door',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/stress-and-skin-431',
        destination: '/:locale/beauty/stress-and-skin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/subscription-audit-365',
        destination: '/:locale/life-hacks/subscription-audit',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/sunscreen-daily-255',
        destination: '/:locale/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/sunscreen-daily-471',
        destination: '/:locale/beauty/sunscreen-daily',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-152',
        destination: '/:locale/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-280',
        destination: '/:locale/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-408',
        destination: '/:locale/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/surprising-fact-about-sleep-536',
        destination: '/:locale/viral-stories/surprising-fact-about-sleep',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/tech-declutter-421',
        destination: '/:locale/life-hacks/tech-declutter',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/thank-you-notes-485',
        destination: '/:locale/life-hacks/thank-you-notes',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/time-blocking-301',
        destination: '/:locale/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/time-blocking-581',
        destination: '/:locale/life-hacks/time-blocking',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-184',
        destination: '/:locale/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-312',
        destination: '/:locale/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-440',
        destination: '/:locale/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/tiny-home-story-568',
        destination: '/:locale/viral-stories/tiny-home-story',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/to-do-list-that-works-309',
        destination: '/:locale/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/to-do-list-that-works-589',
        destination: '/:locale/life-hacks/to-do-list-that-works',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/toilet-running-fix-382',
        destination: '/:locale/diy/toilet-running-fix',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/travel-documents-397',
        destination: '/:locale/life-hacks/travel-documents',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/travel-hacks-381',
        destination: '/:locale/life-hacks/travel-hacks',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained-256',
        destination: '/:locale/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained-384',
        destination: '/:locale/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/trend-explained-512',
        destination: '/:locale/viral-stories/trend-explained',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/life-hacks/two-factor-auth-445',
        destination: '/:locale/life-hacks/two-factor-auth',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/unclog-drain-390',
        destination: '/:locale/diy/unclog-drain',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/under-bed-storage-500',
        destination: '/:locale/home-and-garden/under-bed-storage',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-144',
        destination: '/:locale/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-272',
        destination: '/:locale/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-400',
        destination: '/:locale/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unexpected-life-hack-528',
        destination: '/:locale/viral-stories/unexpected-life-hack',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unusual-home-feature-232',
        destination: '/:locale/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unusual-home-feature-360',
        destination: '/:locale/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/unusual-home-feature-488',
        destination: '/:locale/viral-stories/unusual-home-feature',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/upcycle-furniture-518',
        destination: '/:locale/diy/upcycle-furniture',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/varnish-tips-510',
        destination: '/:locale/diy/varnish-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/cleaning/vinegar-and-baking-soda-combos-545',
        destination: '/:locale/cleaning/vinegar-and-baking-soda-combos',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin-248',
        destination: '/:locale/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin-376',
        destination: '/:locale/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/viral-stories/viral-recipe-origin-504',
        destination: '/:locale/viral-stories/viral-recipe-origin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/water-heater-basics-406',
        destination: '/:locale/diy/water-heater-basics',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/home-and-garden/watering-tips-564',
        destination: '/:locale/home-and-garden/watering-tips',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/weather-stripping-478',
        destination: '/:locale/diy/weather-stripping',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/beauty/wellness-and-skin-407',
        destination: '/:locale/beauty/wellness-and-skin',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/window-seal-470',
        destination: '/:locale/diy/window-seal',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/wood-fill-486',
        destination: '/:locale/diy/wood-fill',
        permanent: true,
      },
      {
        source: '/:locale(en|es|fr|de|pt)/diy/wreath-making-574',
        destination: '/:locale/diy/wreath-making',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

