import './index.scss';
import { cn } from '@/utils/cn';

const HorizontalVehicleMovement = ({
  skyImage,
  treeImage,
  trackImage,
  floatingImg,
  wheels = [
    { image: null, className: '' }, // Rear Wheel
    { image: null, className: '' }, // Front Wheel
  ],
  wheelClassName,
  floatingBodyClassName,
  floatingImgClassName,
  trackImgClassName,
  treeImgClassName,
  wheelSpinDuration = { sm: '1.2s', md: '0.8s', lg: '0.6s' }, // Object for different screen sizes
  floatingImgMovementDuration = { sm: '15s', md: '12s', lg: '11s' }, // Object for different screen sizes
}) => {
  // Extracting values from the object
  const wheelSpinSm = wheelSpinDuration.sm || '1.2s';
  const wheelSpinMd = wheelSpinDuration.md || '0.8s';
  const wheelSpinLg = wheelSpinDuration.lg || '0.6s';

  const floatingMoveSm = floatingImgMovementDuration.sm || '15s';
  const floatingMoveMd = floatingImgMovementDuration.md || '12s';
  const floatingMoveLg = floatingImgMovementDuration.lg || '11s';

  return (
    <div
      className="horizontal-vehicle-movement relative h-screen w-full overflow-x-hidden"
      style={{
        '--wheel-spin-duration-sm': wheelSpinSm,
        '--wheel-spin-duration-md': wheelSpinMd,
        '--wheel-spin-duration-lg': wheelSpinLg,
        '--floatingImg-movement-duration-sm': floatingMoveSm,
        '--floatingImg-movement-duration-md': floatingMoveMd,
        '--floatingImg-movement-duration-lg': floatingMoveLg,
      }}
    >
      {/* Sky Background */}
      {skyImage && (
        <div
          className="sky absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${skyImage})` }}
        />
      )}

      {/* Tree */}
      {treeImage && (
        <div
          className={cn(
            'tree absolute inset-0 bg-cover bg-no-repeat',
            treeImgClassName,
          )}
          style={{ backgroundImage: `url(${treeImage})` }}
        />
      )}

      {/* Track (Stationary) */}
      {trackImage && (
        <div
          className={cn('absolute w-full bg-repeat-x', trackImgClassName)}
          style={{ backgroundImage: `url(${trackImage})` }}
        />
      )}

      {/* Floating Image with Wheels */}
      <div
        className={cn(
          'animate-floatingImg absolute flex h-[4.7rem] w-[17rem] items-center',
          floatingBodyClassName,
        )}
      >
        {/* Floating Image Body */}
        {floatingImg && (
          <div
            className={cn('bg-contain bg-no-repeat', floatingImgClassName)}
            style={{ backgroundImage: `url(${floatingImg})` }}
          />
        )}

        {/* Rotating Wheels (Mapped Dynamically) */}
        {wheels?.map((wheel, index) =>
          wheel?.image ? (
            <div
              key={index}
              className={cn(
                'animate-wheel absolute bg-contain bg-no-repeat',
                wheelClassName,
                wheel?.className,
              )}
              style={{
                backgroundImage: `url(${wheel.image})`,
              }}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default HorizontalVehicleMovement;
