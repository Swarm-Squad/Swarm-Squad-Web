import { Drone } from '@/components/drone';
import { cn } from '@/lib/utils';

type SwarmDrone = {
  left: string;
  bottom: string;
  /** Tailwind width classes — controls drone scale responsively. */
  width: string;
  /** Smaller + dimmer reads as farther away. */
  opacity: string;
  rise: { duration: string; delay: string };
  /** Negative bob delays start each drone mid-cycle so they never sync. */
  bob: { duration: string; delay: string };
  visibility?: string;
};

const SWARM: SwarmDrone[] = [
  {
    left: '71%',
    bottom: '13%',
    width: 'w-48 sm:w-64 md:w-80',
    opacity: 'opacity-100',
    rise: { duration: '3.4s', delay: '0.15s' },
    bob: { duration: '5.4s', delay: '-0.8s' },
  },
  {
    left: '10%',
    bottom: '4%',
    width: 'w-32 md:w-44',
    opacity: 'opacity-80',
    rise: { duration: '3.8s', delay: '0.4s' },
    bob: { duration: '6s', delay: '-2.4s' },
  },
  {
    left: '88%',
    bottom: '46%',
    width: 'w-24 md:w-32',
    opacity: 'opacity-60',
    rise: { duration: '4.1s', delay: '0.6s' },
    bob: { duration: '6.4s', delay: '-1.3s' },
    visibility: 'hidden sm:block',
  },
  {
    left: '38%',
    bottom: '37%',
    width: 'w-16 md:w-24',
    opacity: 'opacity-45',
    rise: { duration: '4.5s', delay: '0.85s' },
    bob: { duration: '6.9s', delay: '-4.1s' },
    visibility: 'hidden md:block',
  },
  {
    left: '94%',
    bottom: '7%',
    width: 'w-28 md:w-32',
    opacity: 'opacity-65',
    rise: { duration: '4s', delay: '0.55s' },
    bob: { duration: '6.2s', delay: '-3.2s' },
    visibility: 'hidden sm:block',
  },
  {
    left: '54%',
    bottom: '60%',
    width: 'w-12 md:w-14',
    opacity: 'opacity-35',
    rise: { duration: '4.9s', delay: '1.15s' },
    bob: { duration: '7.4s', delay: '-1.9s' },
    visibility: 'hidden lg:block',
  },
  {
    left: '20%',
    bottom: '58%',
    width: 'w-10 md:w-12',
    opacity: 'opacity-30',
    rise: { duration: '5.1s', delay: '1.3s' },
    bob: { duration: '7s', delay: '-5.5s' },
    visibility: 'hidden lg:block',
  },
  {
    left: '47%',
    bottom: '8%',
    width: 'w-20 md:w-28',
    opacity: 'opacity-70',
    rise: { duration: '3.9s', delay: '0.3s' },
    bob: { duration: '5.8s', delay: '-1.5s' },
    visibility: 'hidden sm:block',
  },
  {
    left: '78%',
    bottom: '64%',
    width: 'w-14 md:w-16',
    opacity: 'opacity-40',
    rise: { duration: '4.7s', delay: '1s' },
    bob: { duration: '7.2s', delay: '-3.7s' },
    visibility: 'hidden md:block',
  },
  {
    left: '60%',
    bottom: '32%',
    width: 'w-16 md:w-20',
    opacity: 'opacity-50',
    rise: { duration: '4.3s', delay: '0.7s' },
    bob: { duration: '6.6s', delay: '-2.8s' },
    visibility: 'hidden sm:block',
  },
];

export function DroneSwarm() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {SWARM.map((drone, i) => (
        <div
          key={i}
          className={cn('drone-rise absolute', drone.visibility)}
          style={{
            left: drone.left,
            bottom: drone.bottom,
            transform: 'translateX(-50%)',
            animationDuration: drone.rise.duration,
            animationDelay: drone.rise.delay,
          }}
        >
          <div
            className="drone-bob"
            style={{ animationDuration: drone.bob.duration, animationDelay: drone.bob.delay }}
          >
            <Drone className={cn(drone.width, drone.opacity)} />
          </div>
        </div>
      ))}
    </div>
  );
}
