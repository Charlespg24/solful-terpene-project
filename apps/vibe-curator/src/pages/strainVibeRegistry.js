import { lazy } from 'react';

// Lazy-loaded immersive strain vibe pages (one per strain).
// Keys are kebab-case strain slugs matching the JSON profile filenames.
export const strainVibeComponents = {
  'avenue-of-the-giants': lazy(() => import('./AvenueOfTheGiantsVibe')),
  'black-lime-chem': lazy(() => import('./BlackLimeChemVibe')),
  'blueberry-muffin': lazy(() => import('./BlueberryMuffinVibe')),
  'carambola': lazy(() => import('./CarambolaVibe')),
  'glitter-bomb': lazy(() => import('./GlitterBombVibe')),
  'guava-gift': lazy(() => import('./GuavaGiftVibe')),
  'lemon-papaya-banana': lazy(() => import('./LemonPapayaBananaVibe')),
  'love-and-laughter-cbd': lazy(() => import('./LoveAndLaughterCbdVibe')),
  'love-and-laughter': lazy(() => import('./LoveAndLaughterCbdVibe')),
  'mandarin-cherry-tree': lazy(() => import('./MandarinCherryTreeVibe')),
  'mikes-bomba': lazy(() => import('./MikesBombaVibe')),
  'moonlight': lazy(() => import('./MoonlightVibe')),
  'mule-fuel': lazy(() => import('./MuleFuelVibe')),
  'natty-bumppo': lazy(() => import('./NattyBumppoVibe')),
  'peach-flambe': lazy(() => import('./PeachFlambeVibe')),
  'pineapple-mojito': lazy(() => import('./PineappleMojitoVibe')),
  'pink-jesus-reserve': lazy(() => import('./PinkJesusReserveVibe')),
  'pink-rider': lazy(() => import('./PinkRiderVibe')),
  'pinnacle': lazy(() => import('./PinnacleVibe')),
  'purple-candy-cane': lazy(() => import('./PurpleCandyCaneVibe')),
  'rasta-governmint': lazy(() => import('./RastaGovernmintVibe')),
  'satsuma-sherbet': lazy(() => import('./SatsumaSherbetVibe')),
  'strawberry-biscotti': lazy(() => import('./StrawberryBiscottiVibe')),
  'tropical-sleigh-ride': lazy(() => import('./TropicalSleighRideVibe')),
  'tropicanna-cherry': lazy(() => import('./TropicannaCherryVibe')),
};

export function getStrainVibeComponent(strainId) {
  if (!strainId) return null;
  return strainVibeComponents[strainId] || null;
}
