const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content', 'articles');
const mapFile = path.join(__dirname, 'viral-redirects.txt');

const mapping = [
  { old: 'amazing-animal-story', new: 'dog-walks-home', title: "Dog Walks 50 Miles Home After Being Rehomed — Owner Opens Door in Disbelief" },
  { old: 'amazing-animal-story-160', new: 'cat-saves-owner', title: "Cat Wakes Sleeping Owner Seconds Before Carbon Monoxide Alarm — Doctors Call It a Miracle" },
  { old: 'amazing-animal-story-288', new: 'parrot-calls-911', title: "Parrot Dials 911 During Owner's Medical Emergency — And the Operator Stays on the Line" },
  { old: 'amazing-animal-story-416', new: 'horse-remembers-owner', title: "Horse Hasn't Seen Its Owner in 10 Years — The Reunion Goes Viral for a Reason" },
  { old: 'amazing-animal-story-544', new: 'dog-adopts-kitten', title: "Rescue Dog Refuses to Leave Abandoned Kitten's Side — Shelter Staff Can't Believe What Happens Next" },
  
  { old: 'before-and-after', new: 'bathroom-reno-200', title: "She Renovated Her Entire Bathroom for Under $200 — The Before and After Is Unreal" },
  { old: 'before-and-after-168', new: 'shed-to-office', title: "Couple Transforms Rotting Garden Shed Into a Stunning Home Office in One Weekend" },
  { old: 'before-and-after-296', new: 'kitchen-flip-thrift', title: "This Kitchen Cost $180 to Transform — Every Single Item Came From a Thrift Store" },
  { old: 'before-and-after-424', new: 'backyard-makeover-free', title: "Family Turns Overgrown Backyard Into an Outdoor Living Room Using Only Free Materials" },
  { old: 'before-and-after-552', new: 'closet-to-bedroom', title: "They Converted a Closet Into a Tiny Bedroom — Now 3 Million People Want to Copy It" },

  { old: 'community-story', new: 'neighbors-rebuild-porch', title: "Neighbors Secretly Rebuilt an Elderly Man's Porch While He Was in Hospital" },
  { old: 'community-story-208', new: 'town-saves-bookshop', title: "Small Town Raises $40,000 Overnight to Save Its Only Bookshop From Closing" },
  { old: 'community-story-336', new: 'strangers-pay-layaway', title: "Strangers Keep Paying Off Layaway Bills at Walmart — Store Manager Explains Why" },
  { old: 'community-story-464', new: 'community-garden-crime', title: "Community Garden Planted on Abandoned Lot Cuts Local Crime Rate in Half" },
  { old: 'community-story-592', new: 'teacher-lunch-debt', title: "Teacher Quietly Pays Off Every Student's Lunch Debt — District Responds Unexpectedly" },

  { old: 'kindness-story', new: 'cashier-pays-groceries', title: "Cashier Uses Her Own Money to Cover Struggling Mom's Groceries — Goes Viral Instantly" },
  { old: 'kindness-story-216', new: 'mechanic-fixes-free', title: "Mechanic Fixes Single Dad's Car for Free After Learning Why He Needed It" },
  { old: 'kindness-story-344', new: 'airline-kindness', title: "Passenger Gives Up Business Class Seat to Exhausted Nurse — Airline's Response Stuns Everyone" },
  { old: 'kindness-story-472', new: 'stranger-tuition', title: "Anonymous Donor Pays Stranger's Full College Tuition After Overhearing Phone Call" },

  { old: 'unexpected-life-hack', new: 'ice-cube-tray-uses', title: "People Are Freezing Coffee in Ice Cube Trays — And It Changes Everything About Iced Coffee" },
  { old: 'unexpected-life-hack-144', new: 'bread-clip-uses', title: "The Tiny Bread Clip Has a Second Use Nobody Talks About" },
  { old: 'unexpected-life-hack-272', new: 'rubber-band-jar-trick', title: "A Rubber Band Around a Jar Lid — The Trick That Went Viral for a Reason" },
  { old: 'unexpected-life-hack-400', new: 'pool-noodle-garage', title: "Why People Are Hanging Pool Noodles in Their Garages" },
  { old: 'unexpected-life-hack-528', new: 'binder-clip-hacks', title: "10 Ways a Binder Clip Saves the Day — Number 7 Is Genius" },

  { old: 'trend-explained', new: 'bed-rotting-trend', title: "What Is 'Bed Rotting' — And Is It Actually Bad for You?" },
  { old: 'trend-explained-256', new: 'quiet-quitting-real', title: "Quiet Quitting: What It Actually Means and Whether It Works" },
  { old: 'trend-explained-384', new: 'raw-water-trend', title: "The Raw Water Trend Is Going Viral — Doctors Have a Warning" },
  { old: 'trend-explained-512', new: 'dopamine-menu-explained', title: "Everyone's Making a 'Dopamine Menu' — Here's What It Is and How to Make Yours" },

  { old: 'diy-success', new: 'first-diy-tile-floor', title: "She Tiled Her Own Bathroom Floor With Zero Experience — Here's Exactly What She Did" },
  { old: 'diy-success-200', new: 'shed-built-weekend', title: "He Built a Full Garden Shed in One Weekend Using Only YouTube Tutorials" },
  { old: 'diy-success-328', new: 'painted-kitchen-cabinets', title: "Why Thousands Are Painting Kitchen Cabinets Instead of Replacing Them" },
  { old: 'diy-success-456', new: 'concrete-countertops-diy', title: "They Poured Their Own Concrete Countertops for $80 — The Result Looks Professional" },
  { old: 'diy-success-584', new: 'fence-built-alone', title: "She Built an Entire Privacy Fence Alone in 3 Days — Here's the Full Breakdown" },

  { old: 'inspiring-home-transformation', new: 'rental-no-damage-makeover', title: "Renter Transforms Ugly Apartment Without Damaging a Single Wall — Landlord Approves" },
  { old: 'inspiring-home-transformation-136', new: 'dark-room-bright', title: "Dark, Depressing Living Room Transformed With $300 and Zero Renovation" },
  { old: 'inspiring-home-transformation-264', new: 'garage-into-studio', title: "Family Converts Unused Garage Into a Full Art Studio Over One Long Weekend" },
  { old: 'inspiring-home-transformation-392', new: 'hoarder-room-clear', title: "She Cleared a 20-Year Hoarder Room in 4 Days — The Transformation Is Breathtaking" },
  { old: 'inspiring-home-transformation-520', new: 'outdated-kitchen-paint', title: "1970s Kitchen Transformed With Just Paint and New Hardware — Cost: $140" },

  { old: 'budget-makeover', new: 'living-room-500', title: "Living Room Makeover for Under $500 — Every Item Sourced From Facebook Marketplace" },
  { old: 'budget-makeover-192', new: 'bedroom-thrift-flip', title: "This Bedroom Makeover Cost $67 — Every Piece Came From a Thrift Store" },
  { old: 'budget-makeover-320', new: 'bathroom-peel-stick', title: "Bathroom Transformed With Peel-and-Stick Tiles — Landlord Couldn't Tell the Difference" },
  { old: 'budget-makeover-448', new: 'home-office-free', title: "Full Home Office Setup Built From Freecycle and Curbside Finds — Worth Over $1,200" },
  { old: 'budget-makeover-576', new: 'kitchen-on-benefits', title: "Single Mom on Benefits Transforms Her Kitchen for £45 — The Internet Rallies Around Her" },

  { old: 'overcoming-challenge', new: 'learned-to-cook-at-60', title: "She Had Never Cooked a Meal Until Age 60 — Now She Teaches Classes" },
  { old: 'overcoming-challenge-224', new: 'fear-of-driving-overcome', title: "Man Who Feared Driving for 15 Years Finally Gets His License at 47" },
  { old: 'overcoming-challenge-352', new: 'debt-free-two-years', title: "Couple Paid Off $68,000 in Debt in Two Years on Average Salaries — Here's Their Method" },
  { old: 'overcoming-challenge-480', new: 'learned-language-at-70', title: "She Learned Spanish at 72 to Speak to Her Grandchildren — Her Progress After One Year" },

  { old: 'minimalist-journey', new: 'sold-everything-traveled', title: "Couple Sold Everything They Owned and Traveled Full-Time for 3 Years — Here's What They Learned" },
  { old: 'minimalist-journey-176', new: '100-items-only', title: "She Reduced Her Possessions to 100 Items — 18 Months Later She Hasn't Looked Back" },
  { old: 'minimalist-journey-304', new: 'tiny-closet-capsule', title: "Man Builds Entire Capsule Wardrobe for $200 — Stops Thinking About Clothes Forever" },
  { old: 'minimalist-journey-432', new: 'declutter-5-years-ago', title: "She Started Decluttering 5 Years Ago — Here's What Her Home Looks Like Now" },
  { old: 'minimalist-journey-560', new: 'minimal-with-kids', title: "How This Family of Five Lives Minimally With Young Children" },

  { old: 'surprising-fact-about-sleep', new: 'sleep-position-health', title: "Your Sleep Position Is Affecting Your Health More Than You Realize" },
  { old: 'surprising-fact-about-sleep-152', new: 'nap-length-matters', title: "The Exact Nap Length That Boosts Performance — And the One That Ruins Your Night" },
  { old: 'surprising-fact-about-sleep-280', new: 'sleep-debt-real', title: "Sleep Debt Is Real — Scientists Explain Why You Can't Just 'Catch Up' on Weekends" },
  { old: 'surprising-fact-about-sleep-408', new: 'phone-before-bed-effects', title: "What Happens to Your Brain When You Use Your Phone in Bed" },
  { old: 'surprising-fact-about-sleep-536', new: 'chronotype-quiz', title: "Night Owl or Early Bird Isn't a Choice — It's Biology, and Here's the Proof" },

  { old: 'viral-recipe-origin', new: 'butter-board-origin', title: "Where Did the Butter Board Trend Actually Start — And Does It Taste as Good as It Looks?" },
  { old: 'viral-recipe-origin-248', new: 'pasta-chips-tiktok', title: "The Pasta Chips Recipe That Took Over TikTok — We Tested It So You Don't Have To" },
  { old: 'viral-recipe-origin-376', new: 'cloud-bread-explained', title: "Cloud Bread Went Viral in 2020 — Here's Why It Actually Works" },
  { old: 'viral-recipe-origin-504', new: 'baked-feta-pasta-origin', title: "The Baked Feta Pasta That Crashed Finnish Grocery Stores — The Original Recipe" },

  { old: 'tiny-home-story', new: '28sqm-family-of-four', title: "Family of Four Lives in 28 Square Meters — Here's Their Full Floor Plan" },
  { old: 'tiny-home-story-184', new: 'bus-conversion-home', title: "He Converted a School Bus Into a Full Home for $11,000 — Full Tour Inside" },
  { old: 'tiny-home-story-312', new: 'shipping-container-house', title: "Couple Builds Shipping Container Home for $35,000 — Banks Called Them Crazy" },
  { old: 'tiny-home-story-440', new: 'cabin-built-alone', title: "She Built Her Own Off-Grid Cabin Alone at Age 26 — Mortgage-Free Forever" },
  { old: 'tiny-home-story-568', new: 'tiny-house-with-baby', title: "They Had a Baby and Refused to Leave Their Tiny House — Here's How They Made It Work" }
];

const locales = ['en', 'es', 'fr', 'de', 'pt'];
let redirectPairs = [];
let successCount = 0;

for (const map of mapping) {
  const oldPath = path.join(articlesDir, map.old + '.mdx');
  const newPath = path.join(articlesDir, map.new + '.mdx');
  
  if (fs.existsSync(oldPath)) {
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // Safety check - verify we haven't already processed it
    if (!content.includes(`title: ${map.title}`)) {
       // Replace title
       content = content.replace(/title:\s*['"]?([^'"\n]+)['"]?/, `title: "${map.title.replace(/"/g, '\\"')}"`);
       // Replace excerpt with generic hook
       content = content.replace(/excerpt:\s*['"]?([^'"\n]+)['"]?/, `excerpt: "Discover the amazing true story: ${map.title.replace(/"/g, '\\"')}. You won't believe what happens next."`);
    }

    fs.writeFileSync(newPath, content, 'utf8');
    fs.unlinkSync(oldPath);
    successCount++;
    
    // Build redirect string for all locales
    // e.g., /en/viral-stories/amazing-animal-story -> /en/viral-stories/dog-walks-home
    for (const locale of locales) {
      redirectPairs.push(`/${locale}/viral-stories/${map.old} -> /${locale}/viral-stories/${map.new}`);
    }
    
    console.log(`Renamed: ${map.old} -> ${map.new}`);
  } else if (fs.existsSync(newPath)) {
    console.log(`Already renamed: ${map.new}`);
  } else {
    console.log(`MISSING: ${map.old}`);
  }
}

fs.writeFileSync(mapFile, redirectPairs.join('\n'), 'utf8');
console.log(`\nSuccessfully processed ${successCount} viral story renaming tasks!`);
console.log(`Generated ${redirectPairs.length} 301 redirects to inject.`);
